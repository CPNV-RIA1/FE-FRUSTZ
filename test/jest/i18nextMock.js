const LanguageUnknowException = require("../../app/exceptions/LanguageUnknowException");

const i18nextMock = {
    lng: "en",
    fallbackLng: "en",
    resources: {
        en: { welcome: "Welcome", goodbye: "Goodbye" },
        fr: { welcome: "Bienvenue", goodbye: "Au revoir" },
        es: { welcome: "Bienvenido", goodbye: "Adiós" },
    },
    supportedLngs: ["en", "fr", "es"],
    init: jest.fn(() => {
        i18nextMock.lng = navigator.language.split("-")[0];
    }),
    changeLanguage: jest.fn((lng) => {
        if (!i18nextMock.supportedLngs.includes(lng)) {
            throw new LanguageUnknowException();
        }
        i18nextMock.lng = lng;
    }),
};

module.exports = i18nextMock;
