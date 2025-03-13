const { Builder, By, Key, until } = require("selenium-webdriver");

const APP_URI = "http://127.0.0.1:5500/";

async function translation_NominalLanguage_NavigatorLanguageKnow() {
    let driver = await new Builder().forBrowser("chrome").build();

    try {
        // Given: On ouvre une page blanche avec le navigateur en ligne
        await driver.get("about:blank");
        await driver.sleep(2000);

        // When: On charge la page d'accueil
        await driver.get(APP_URI);

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

async function translation_NominalLanguage_ChangeNavigatorLanguage() {
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
        await driver.get(APP_URI);

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

async function translation_ChangeNavigatorLanguage_ThrowException() {
    let options = new (require("selenium-webdriver/chrome").Options)();
    options.setUserPreferences({
        "intl.accept_languages": "bs",
    });

    let driver = await new Builder()
        .forBrowser("chrome")
        .setChromeOptions(options)
        .build();

    try {
        // Given: La page d'accueil est chargée et la langue de l'application correspond à celle du navigateur
        await driver.get(APP_URI);

        // When: Changement de langue via le navigateur

        // Then: Un message apparaît sur l'application pendant 10 secondes, sans gêner l'utilisateur.
        //       "la langue du navigateur ne peut pas être appliquée"

        let errorMessage = await driver.findElement(By.id("error-message"));

        await driver.sleep(10000);

        let isHidden = await driver.executeScript(
            "return window.getComputedStyle(arguments[0]).display === 'none';",
            errorMessage
        );

        if (isHidden) {
            console.log("✅ La div est cachée !");
        } else {
            console.log("❌ La div est visible !");
        }

        await driver.sleep(2000);
    } finally {
        await driver.quit();
    }
}

async function translation_AutoTranslate_ExcludeCertainElements() {
    let options = new (require("selenium-webdriver/chrome").Options)();
    options.setUserPreferences({
        "intl.accept_languages": "bs",
    });

    let driver = await new Builder()
        .forBrowser("chrome")
        .setChromeOptions(options)
        .build();

    try {
        // Given: La page d'accueil est chargée et la langue de l'application correspond à celle du navigateur
        await driver.get(APP_URI);
        await driver.sleep(2000);

        // When: Activation d'un outil de traduction (navigateur). Peut-importe la langue.

        // Then: Les noms communs, les noms de marques, les produits ne sont pas traduits
        let excludedElementText = await driver
            .findElement(By.id("title"))
            .getText();

        if (excludedElementText == "NEOGYM") {
            console.log("✅ Test réussi");
        } else {
            console.log("❌ Test échoué");
        }

        await driver.sleep(2000);
    } finally {
        await driver.quit();
    }
}

(async function runTests() {
    await translation_NominalLanguage_NavigatorLanguageKnow();
    await translation_NominalLanguage_ChangeNavigatorLanguage();
    await translation_ChangeNavigatorLanguage_ThrowException();
    await translation_AutoTranslate_ExcludeCertainElements();
})();
