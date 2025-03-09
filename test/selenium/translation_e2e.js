const { Builder } = require("selenium-webdriver");

(async function defaultLanguage() {
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
})();
