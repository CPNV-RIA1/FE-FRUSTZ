const i18nextMock = {
    lng: "en",
    resources: {
        en: { welcome: "Welcome", goodbye: "Goodbye" },
        fr: { welcome: "Bienvenue", goodbye: "Au revoir" },
        es: { welcome: "Bienvenido", goodbye: "Adiós" },
    },
    init: jest.fn(() => {
        i18nextMock.lng = navigator.language.split("-")[0] || "en";
    }),
    changeLanguage: jest.fn((lng, callback) => {
        i18nextMock.lng = lng;
        if (callback) callback();
    }),
    t: jest.fn((key) => i18nextMock.resources[i18nextMock.lng][key] || key),
};

module.exports = i18nextMock;
