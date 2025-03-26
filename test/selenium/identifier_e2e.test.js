"use strict";

const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

const APP_URI = "http://127.0.0.1:5500/";
const APP_IDENTIFIER_URI = "http://127.0.0.1:5500/app/views/identifier.html";

let driver;

async function setupChromeDriver(lang) {
    let options = new chrome.Options();
    options.addArguments(
        `--lang=${lang}`,
        "--headless",
        "--disable-gpu",
        "--no-sandbox",
        "--disable-dev-shm-usage"
    );

    driver = await new Builder()
        .forBrowser("chrome")
        .setChromeOptions(options)
        .build();
}

afterEach(async () => {
    if (driver) {
        await driver.quit();
    }
});

test("identifier_LoadingPage_NavigatorLoadIdentifierPage", async () => {
    await setupChromeDriver("en-US");

    // Given:
    // La home page est affichée.
    // Je ne suis pas authentifié.
    await driver.get(APP_URI);

    // When: En activant le bouton "login".
    let selectElement = await driver.findElement(By.id("login"));
    let loginUrl = await selectElement.getAttribute("href");

    await driver.get(loginUrl);

    // Then: L'application a pu naviguer jusqu'à la page de login.
    let pageTitle = await driver.findElement(By.id("page-title"));
    let textPageTitle = await pageTitle.getText();

    expect(loginUrl).toEqual("http://127.0.0.1:5500/app/views/identifier.html");
    expect(textPageTitle).toEqual("Login");
});

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

        let defaultNavigatorLng = await driver.executeScript(
            "return navigator.language || navigator.userLanguage;"
        );
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
        const emailInput = await driver.findElement(
            By.css("input[type='email']")
        );
        await emailInput.sendKeys("user@example.com");

        const passwordInput = await driver.findElement(
            By.css("input[type='password']")
        );
        await passwordInput.sendKeys("Geeks@123");

        //Then : le formulaire ne peut être transmit que lorsque la saisie est conforme
        const button = await driver.wait(
            until.elementIsVisible(driver.findElement(By.id("submitBtn"))),
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

async function identifier_ValidationIdentification_OnPasswordEmail() {
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

        const emailInput = await driver.findElement(
            By.css("input[type='email']")
        );
        await emailInput.sendKeys("joe@example.com");

        const passwordInput = await driver.findElement(
            By.css("input[type='password']")
        );
        await passwordInput.sendKeys("Geeks@123");

        //When : Je débute la saisie...
        const button = await driver.wait(
            until.elementIsVisible(driver.findElement(By.id("submitBtn"))),
            5000,
            "❌ Le bouton ne s'est pas affiché après remplissage"
        );
        await button.click();
        await driver.sleep(2000);

        //Then : le formulaire ne peut être transmit que lorsque la saisie est conforme
        const emailIdentify = await driver.findElement(
            By.id("welcome-message")
        );
        let textEmailIdentify = await emailIdentify.getText();

        if (textEmailIdentify !== "✅Authentifié : joe@example.com") {
            console.log("✅ Test réussi : Vous vous êtes authentifié.");
        } else {
            console.log("❌ Test échoué : Vous n'êtes authentifié. ");
        }
    } catch (error) {
        console.error("Erreur :", error);
    } finally {
        await driver.quit();
    }
}

(async function runTests() {
    // await identifier_LoadingPage_NavigatorLoadIdentifierPage();
    // await identifier_NominalLanguage_ChangeNavigatorLanguage();
    // await identifier_NominalValue_OnPasswordEmail();
    // await identifier_ValidationIdentification_OnPasswordEmail();
})();
