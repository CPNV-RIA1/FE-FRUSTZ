const { Builder, By, Key, until } = require("selenium-webdriver");

const APP_URI = "http://127.0.0.1:3000/";

async function identifier_LoadingPage_NavigatorLoadIdentifierPage() {
    let options = new (require("selenium-webdriver/chrome").Options)();
    options.setUserPreferences({
        "intl.accept_languages": "en",
    });
    
    let driver = await new Builder().forBrowser("chrome").build();

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

        if (textPageTitle == "Get started today!") {
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



(async function runTests() {
    await identifier_LoadingPage_NavigatorLoadIdentifierPage();
})();
