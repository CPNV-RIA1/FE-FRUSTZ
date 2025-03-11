"use strict";
const LanguageUnknowException = require("../../app/exceptions/LanguageUnknowException");

describe("Scenario 001 - Langue par défaut", () => {
    test("translation_NominalLanguage_NavigatorLanguageKnow", () => {
        // Given : Page blanche, navigateur en ligne
        expect(navigator.onLine).toBe(true);

        // When : On charge la page d'accueil

        // Then : L'application applique la langue du navigateur
        expect(i18nextMock.lng).toBe("fr");
    });
});

describe("Scénario 002 - Changement de langue du navigateur", () => {
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
    test("translation_ChangeNavigatorLanguage_ThrowException", () => {
        //given
        //when
        //then
    });
});

describe("Scenario 004 - Traduction de la page", () => {
    test("translation_ExterneTranslatorLanguage_WordUntranslate", () => {
        // Given :
        // La page d'accueil est chargée.
        // La langue de l'application correspond à celle du navigateur.
        expect(i18nextMock.lng).toBe(navigator.language.split("-")[0]);
        
        //When : Activation d'un outil de traduction (navigateur). Peut-importe la langue.
        simulateTranslation(elements);
        //Then : Les noms communs, les noms de marques, les produits ne sont pas traduits
        expect(document.querySelector("p[translate='no']").textContent).toBe("Couteaux Suisses");
    });
});
