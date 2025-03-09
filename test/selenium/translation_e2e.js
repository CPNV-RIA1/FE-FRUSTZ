const { Builder, By, until } = require("selenium-webdriver");

async function defaultLanguage() {
    let driver = await new Builder().forBrowser("chrome").build();

    try {
        // Given: On ouvre une page blanche avec le navigateur en ligne
        await driver.get("about:blank");
        await driver.sleep(2000);

        // When: On charge la page d'accueil
        await driver.get("http://127.0.0.1:5500/");

        // Then: L'application s'affiche

        // La langue appliquée est celle du navigateur
        let browserLang = await driver.executeScript(
            "return navigator.language"
        );
        console.log(`Langue détectée par le navigateur : ${browserLang}`);

        await driver.sleep(5000);
    } catch (error) {
        console.error("Erreur :", error);
    } finally {
        await driver.quit();
    }
}

async function changeNavigatorLanguage() {
    let options = new (require("selenium-webdriver/chrome").Options)();
    options.addArguments("--lang=en");
    options.setUserPreferences({
        "intl.accept_languages": "en,en-US",
    });

    let driver = await new Builder()
        .forBrowser("chrome")
        .setChromeOptions(options)
        .build();

    try {
        // Given: La page d'accueil est chargée et la langue de l'application correspond à celle du navigateur
        await driver.get("http://127.0.0.1:5500/");

        let defaultNavigatorLng = await driver.executeScript(
            "return navigator.language || navigator.userLanguage;"
        );

        console.log(`Langue détectée au chargement : ${defaultNavigatorLng}`);

        await driver.wait(
            until.elementLocated(By.id("languageSelector")),
            10000
        );

        if (defaultNavigatorLng !== "en") {
            console.error("❌ Langue incorrecte au chargement !");
            return;
        }

        // When: Changement de langue via le select
        let selectElement = await driver.findElement(By.id("languageSelector"));
        await selectElement.click();
        await driver.sleep(2000);
        await driver.findElement(By.css('option[value="fr"]')).click();

        await driver.sleep(5000);

        // Then: Vérifier que la langue a changé
        let newLang = await driver
            .findElement(By.id("languageSelector"))
            .getAttribute("value");

        console.log(`Nouvelle langue après sélection : ${newLang}`);

        if (newLang !== defaultNavigatorLng) {
            console.log("✅ Test réussi : la langue a bien été changée.");
        } else {
            console.log("❌ Test échoué : la langue ne s'est pas mise à jour.");
        }
    } catch (error) {
        console.error("Erreur :", error);
    } finally {
        await driver.quit();
    }
}

// TODO : Implement e2e for Scenario 003 et 004

(async function runTests() {
    await defaultLanguage();
    await changeNavigatorLanguage();
})();
