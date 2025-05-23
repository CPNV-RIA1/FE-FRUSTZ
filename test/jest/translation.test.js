"use strict";
const LanguageUnknowException = require("../../app/exceptions/LanguageUnknowException");

const i18nextMock = require("./i18nextMock");

describe("Scenario 001 - Langue par défaut", () => {
    beforeEach(() => {
        // Simuler un navigateur en ligne avec une langue donnée
        global.navigator = { language: "en-EN", onLine: true };

        i18nextMock.init();
    });

    test("translation_NominalLanguage_NavigatorLanguageKnow", () => {
        // Given : Page blanche, navigateur en ligne
        expect(navigator.onLine).toBe(true);

        // When : On charge la page d'accueil

        // Then : L'application applique la langue du navigateur
        expect(i18nextMock.lng).toBe("en");
    });
});

describe("Scénario 002 - Changement de langue du navigateur", () => {
    beforeEach(() => {
        // Simuler un navigateur en ligne avec une langue donnée
        global.navigator = { language: "en-EN", onLine: false };

        i18nextMock.init();
    });

    test("translation_NominalLanguage_ChangeNavigatorLanguage", () => {
        // Given :
        // La page d'accueil est chargée.
        // La langue de l'application correspond à celle du navigateur.
        expect(i18nextMock.lng).toBe(navigator.language.split("-")[0]);

        // When : Le navigateur change de langue (ex: espagnol)
        i18nextMock.changeLanguage("es");

        // Then : L'application applique la nouvelle langue
        expect(i18nextMock.lng).toBe("es");
    });
});

describe("Scenario 003 - Changement de langue du navigateur - exception", () => {
    beforeEach(() => {
        // Simuler un navigateur en ligne avec une langue donnée
        global.navigator = { language: "en-EN", onLine: false };

        i18nextMock.init();
    });

    test("translation_ChangeNavigatorLanguage_ThrowException", () => {
        // Given :
        // La page d'accueil est chargée.
        // La langue de l'application correspond à celle du navigateur.
        expect(i18nextMock.lng).toBe(navigator.language.split("-")[0]);

        // When : Le navigateur tente de changer pour une langue inexistante (ex: japonais)
        expect(() => i18nextMock.changeLanguage("jp")).toThrow(
            LanguageUnknowException
        );

        // Then : La langue ne doit pas avoir changé
        expect(i18nextMock.lng).toBe("en"); // Toujours "en" car "jp" est invalide
    });
});
