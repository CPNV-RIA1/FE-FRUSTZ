// Fonction pour charger les fichiers JSON de traduction
function loadTranslation(lang) {
    return fetch(`/public/locales/${lang}.json`) // Charge le fichier JSON en fonction de la langue
        .then((response) => response.json())
        .catch((err) =>
            console.error(
                "Erreur de chargement des fichiers de traduction",
                err
            )
        );
}

// Initialisation d'i18next avec des ressources dynamiques
i18next.init(
    {
        lng: navigator.language.split("-")[0],
        fallbackLng: "en",
        supportedLngs: ["en", "fr"],
        resources: {},
    },
    function (err, t) {
        // Appliquer la traduction dès le chargement de la page
        applyTranslations();
    }
);

// Fonction pour appliquer les traductions dynamiquement
function applyTranslations() {
    // Sélectionne tous les éléments qui ont un attribut 'data-i18n'
    const elements = document.querySelectorAll("[data-i18n]");

    elements.forEach((element) => {
        const translationKey = element.getAttribute("data-i18n");
        element.textContent = i18next.t(translationKey);
    });
}

// Fonction pour changer de langue et sauvegarder cette langue dans localStorage
function changeLanguage(lang) {
    loadTranslation(lang).then((translations) => {
        // Ajouter les traductions au niveau des ressources d'i18next
        i18next.addResourceBundle(lang, "translation", translations);
        i18next.changeLanguage(lang, function (err, t) {
            applyTranslations(); // Appliquer les traductions après le changement de langue
        });
    });
}

// Changement de langue via le sélecteur
document.addEventListener("DOMContentLoaded", function () {
    const lng = navigator.language.split("-")[0];

    // Charge les traductions pour la langue choisie
    loadTranslation(lng).then((translations) => {
        i18next.addResourceBundle(lng, "translation", translations);
        i18next.changeLanguage(lng, function (err, t) {
            applyTranslations(); // Appliquer les traductions à la page
        });
    });

    // Mettre à jour le sélecteur de langue avec la langue actuelle
    const languageSelector = document.getElementById("languageSelector");
    languageSelector.value = lng;

    // Gérer le changement de langue via le sélecteur
    languageSelector.addEventListener("change", function (event) {
        const selectedLang = event.target.value;
        changeLanguage(selectedLang);
    });
});
