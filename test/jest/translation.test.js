"use strict";

const i18next = jest.fn().mockImplementation((lng, fallbackLng, resources) => {
    return {
        lng,
        fallbackLng,
        resources,
        addResourceBundle: jest.fn(),
        changeLanguage: jest.fn(),
    };
});

test("translation_NominalLanguage_NavigatorLanguageKnow", () => {
    //given
    //when
    //we call the getters directly in assertion below
    //then
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
