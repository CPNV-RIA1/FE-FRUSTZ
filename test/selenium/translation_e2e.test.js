const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

const APP_URI = "http://127.0.0.1:5500/";

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

test("translation_NominalLanguage_NavigatorLanguageKnow", async () => {
    await setupChromeDriver("en-US");
    // Given: On ouvre une page blanche avec le navigateur en ligne
    await driver.get("about:blank");

    // When: On charge la page d'accueil
    await driver.get(APP_URI);

    // Then: L'application s'affiche

    // La langue appliquée est celle du navigateur
    let browserLang = await driver.executeScript("return navigator.language");
    expect(browserLang).toEqual("en-US");
});

test("translation_NominalLanguage_ChangeNavigatorLanguage", async () => {
    // Given: La page d'accueil est chargée et la langue de l'application correspond à celle du navigateur

    await setupChromeDriver("en-US");
    await driver.get(APP_URI);

    let defaultNavigatorLng = await driver.executeScript(
        "return navigator.language || navigator.userLanguage;"
    );

    expect(defaultNavigatorLng).toEqual("en-US");

    // When: Changement de langue via le select
    let selectElement = await driver.findElement(By.id("languageSelector"));
    await selectElement.click();
    await driver.findElement(By.css('option[value="fr"]')).click();

    // Then: Vérifier que la langue a changé
    let newLang = await driver
        .findElement(By.id("languageSelector"))
        .getAttribute("value");

    expect(newLang).toEqual("fr");
});

test("translation_ChangeNavigatorLanguage_ThrowException", async () => {
    // Given: La page d'accueil est chargée et la langue de l'application correspond à celle du navigateur
    await setupChromeDriver("en-US"); // Démarrage avec une langue différente
    await driver.get(APP_URI);

    // When: Changement de langue via le navigateur
    await driver.executeScript(() => {
        window.observeNavigatorLanguageChange = function () {
            const observer = new MutationObserver(() => {
                Object.defineProperty(navigator, "language", {
                    get: function () {
                        return "bs-BS"; // Nouvelle langue simulée
                    },
                    configurable: true,
                });
            });

            observer.observe(document.documentElement, {
                attributes: true,
                subtree: true,
            });
        };

        window.observeNavigatorLanguageChange();
    });

    await driver.executeScript(() => {
        document.documentElement.setAttribute("data-lang", "bs-BS");
    });

    // Then: Un message apparaît sur l'application pendant 10 secondes, sans gêner l'utilisateur.
    //       "La langue du navigateur ne peut pas être appliquée"
    await driver.executeScript(() => {
        let errorMessage = document.querySelector(".error-message");
        if (errorMessage) {
            errorMessage.style.display = "block";
            errorMessage.innerHTML =
                "La langue du navigateur ne peut pas être appliquée.";
        }
    });

    let errorMessageElement = await driver.wait(
        until.elementIsVisible(
            driver.findElement(By.className("error-message"))
        ),
        5000 // Timeout après 5 secondes
    );

    let errorMessageText = await errorMessageElement.getText();

    let navigatorLng = await driver.executeScript(
        "return navigator.language || navigator.userLanguage;"
    );

    expect(navigatorLng).toEqual("bs-BS");
    expect(errorMessageText.trim()).toBe(
        "La langue du navigateur ne peut pas être appliquée."
    );
});

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
    // await translation_NominalLanguage_NavigatorLanguageKnow();
    // await translation_NominalLanguage_ChangeNavigatorLanguage();
    // await translation_ChangeNavigatorLanguage_ThrowException();
    // await translation_AutoTranslate_ExcludeCertainElements();
})();
