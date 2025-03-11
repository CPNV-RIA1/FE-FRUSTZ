"use strict";

describe("Scenario 001 - Langue par défaut", () => {
    test("translation_NominalLanguage_NavigatorLanguageKnow", () => {
        // Given : Page blanche, navigateur en ligne
        expect(navigator.onLine).toBe(true);

        // When : On charge la page d'accueil

        // Then : L'application applique la langue du navigateur
        expect(i18nextMock.lng).toBe("fr");
    });
});

test("translation_NominalLanguage_ChangeNavigatorLanguage", () => {
    //given
    //when
    //then
});

test("translation_ChangeNavigatorLanguage_ThrowException", () => {
    //given
    //when
    //then
});

test("translation_ChangeNavigatorLanguage_PageIsTranslated", () => {
    //given
    //when
    //then
});
