const {Builder, By, Key, until} = require("selenium-webdriver");

const APP_URI = "http://127.0.0.1:5500/";
const APP_IDENTIFIER_URI = "http://127.0.0.1:5500/app/views/identifier.html";

async function identifier_LoadingPage_NavigatorLoadIdentifierPage() {
    let options = new (require("selenium-webdriver/chrome").Options)();
    options.setUserPreferences({
        "intl.accept_languages": "en",
    });

    let driver = await new Builder()
        .forBrowser("chrome")
        .setChromeOptions(options)
        .build();

    try {
        // Given: 
        // La home page est affichée.
        // Je ne suis pas authentifié.
        await driver.get(APP_URI);
        await driver.sleep(2000);

        // When: En activant le bouton "login".
        let selectElement = await driver.findElement(By.id("login"));
        await selectElement.click();

        // Then: L'application a pu naviguer jusqu'à la page de login.
        await driver.sleep(2000);
        let pageTitle = await driver.findElement(By.id("page-title"));
        let textPageTitle = await pageTitle.getText();

        if (textPageTitle == "Login") {
            console.log("✅ La bonne page a été chargée !");
        } else {
            console.log("❌ Mauvaise page chargée !");
        }

    } catch (error) {
        console.error("Erreur :", error);
    } finally {
        await driver.quit();
    }
}

async function identifier_NominalLanguage_ChangeNavigatorLanguage() {
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
        // Given: 
        // La page de login est affichée.
        await driver.get(APP_IDENTIFIER_URI);
        await driver.sleep(2000);

        let defaultNavigatorLng = await driver.executeScript("return navigator.language || navigator.userLanguage;");
        console.log(`Langue détectée au chargement : ${defaultNavigatorLng}`);
        // When: Je débute la saisie...

        // Then: la possiblité de modifier la langue (FR/ALL/ANG).
        let selectElement = await driver.findElement(By.id("languageSelector"));
        await selectElement.click();
        await driver.sleep(2000);
        await driver.findElement(By.css('option[value="fr"]')).click();

        await driver.sleep(2000);

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

async function identifier_NominalValue_OnPasswordEmail() {
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
        // Given: 
        // La page de login est affichée.
        await driver.get(APP_IDENTIFIER_URI);
        await driver.sleep(2000);

        //When : Je débute la saisie...
        const emailInput = await driver.findElement(By.css("input[type='email']"));
        await emailInput.sendKeys("user@example.com");

        const passwordInput = await driver.findElement(By.css("input[type='password']"));
        await passwordInput.sendKeys("Geeks@123");
        
        //Then : le formulaire ne peut être transmit que lorsque la saisie est conforme
        const button = await driver.wait(
            until.elementIsVisible(driver.findElement(By.id("submit-button"))),
            5000,
            "❌ Le bouton ne s'est pas affiché après remplissage"
        );
        
        await driver.wait(
            until.elementIsEnabled(button),
            3000,
            "❌ Le bouton est visible mais désactivé"
        );

        console.log("✅ Le bouton est bien visible et activé !");
        
    } catch (error) {
        console.error("Erreur :", error);
    } finally {
        await driver.quit();
    }
}


(async function runTests() {
    await identifier_LoadingPage_NavigatorLoadIdentifierPage();
    await identifier_NominalLanguage_ChangeNavigatorLanguage();
    await identifier_NominalValue_OnPasswordEmail();
})();
