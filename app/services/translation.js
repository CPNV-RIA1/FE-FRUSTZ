"use strict";

const translationsCache = {};

async function preloadTranslations() {
    const supportedLngs = i18next.options.supportedLngs.filter(
        (lng) => lng !== "cimode"
    );

    const baseUrl = window.location.href.replace(/\/app.*|\/index\.html$/, "");

    const promises = supportedLngs.map((lang) =>
        fetch(`${baseUrl}/public/locales/${lang}.json`)
            .then((response) => response.json())
            .then((data) => {
                translationsCache[lang] = data;
            })
            .catch((err) =>
                console.error(`Erreur de chargement de la langue ${lang}`, err)
            )
    );

    await Promise.all(promises);
    console.log("Toutes les traductions ont été chargées en cache.");
}

function getTranslation(lang) {
    return translationsCache[lang] || {};
}

function showError(lang) {
    const errorDiv = document.querySelector(".error-message");
    errorDiv.textContent =
        translationsCache[lang] && translationsCache[lang]["translation_error"]
            ? translationsCache[lang]["translation_error"]
            : translationsCache[i18next.options.fallbackLng][
                  "translation_error"
              ];
    errorDiv.style.display = "block";

    // Cache l'erreur après 10 secondes
    setTimeout(() => {
        errorDiv.style.display = "none";
    }, 10000);
}

i18next.init(
    {
        lng: "en",
        fallbackLng: "en",
        supportedLngs: ["en", "fr", "de"],
        resources: {},
    },
    function (err, t) {
        applyTranslations();
    }
);

function applyTranslations() {
    const elements = document.querySelectorAll("[data-i18n]");

    elements.forEach((element) => {
        const translationKey = element.getAttribute("data-i18n");

        const dynamicData = {};
        if (element.hasAttribute("dynamic-data")) {
            dynamicData.email = element.getAttribute("dynamic-data");
        }

        element.textContent = i18next.t(translationKey, dynamicData);
    });
}

function changeLanguage(lang) {
    if (!i18next.options.supportedLngs.includes(lang)) {
        showError(lang);
        lang = i18next.options.fallbackLng;
    }

    const translations = getTranslation(lang);

    if (Object.keys(translations).length > 0) {
        i18next.addResourceBundle(lang, "translation", translations);
        i18next.changeLanguage(lang, function (err, t) {
            applyTranslations();
        });
    } else {
        showError(lang);
    }
}

// Exécuter au chargement de la page
document.addEventListener("DOMContentLoaded", async function () {
    const lng = navigator.language.split("-")[0];

    await preloadTranslations();
    changeLanguage(lng);

    const languageSelector = document.getElementById("languageSelector");
    languageSelector.value = i18next.options.supportedLngs.includes(lng)
        ? lng
        : i18next.options.fallbackLng;
    languageSelector.addEventListener("change", function (event) {
        changeLanguage(event.target.value);
    });

    let oldNavigatorLang = lng;
    const observer = new MutationObserver(() => {
        const newLng = navigator.language.split("-")[0];
        if (oldNavigatorLang !== newLng) {
            oldNavigatorLang = newLng;
            changeLanguage(newLng);
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
});
