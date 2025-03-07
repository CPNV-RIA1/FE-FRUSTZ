const { Builder, By, Key, until } = require("selenium-webdriver");

(async function openGoogle() {
    let driver = await new Builder().forBrowser("chrome").build();

    try {
        await driver.get("https://www.google.com");

        // Wait until the cookie acceptance button is visible and click on it
        const acceptCookiesButton = await driver.wait(
            until.elementLocated(
                By.xpath("//div[contains(@class, 'QS5gu sy4vM')]")
            ),
            5000
        );
        await acceptCookiesButton.click();

        // Wait until the search bar is ready
        let searchBox = await driver.wait(
            until.elementLocated(By.name("q")),
            5000
        );

        await driver.wait(until.elementIsVisible(searchBox), 5000);

        // Search
        await searchBox.sendKeys("Selenium avec JavaScript", Key.RETURN);
        await driver.wait(until.titleContains("Selenium"), 5000);
        console.log("Recherche effectuée avec succès !");
    } catch (error) {
        console.error("Erreur :", error);
    } finally {
        await driver.quit();
    }
})();
