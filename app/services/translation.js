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
        lng: "en", // Langue par défaut
        fallbackLng: "en", // Langue par défaut en cas d'erreur de chargement
        resources: {}, // Les ressources seront ajoutées dynamiquement
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

        localStorage.setItem("language", lang);
    });
}

// Fonction pour récupérer la langue depuis localStorage
function getLanguageFromStorage() {
    const storedLang = localStorage.getItem("language");
    return storedLang ? storedLang : "en"; // 'en' est la langue par défaut
}

// Changement de langue via le sélecteur
document.addEventListener("DOMContentLoaded", function () {
    // Charger la langue sauvegardée depuis localStorage
    const userLang = getLanguageFromStorage();

    // Charge les traductions pour la langue choisie
    loadTranslation(userLang).then((translations) => {
        i18next.addResourceBundle(userLang, "translation", translations);
        i18next.changeLanguage(userLang, function (err, t) {
            applyTranslations(); // Appliquer les traductions à la page
        });
    });

    // Mettre à jour le sélecteur de langue avec la langue actuelle
    const languageSelector = document.getElementById("languageSelector");
    languageSelector.value = userLang; // Met à jour le sélecteur pour afficher la langue actuelle

    // Gérer le changement de langue via le sélecteur
    languageSelector.addEventListener("change", function (event) {
        const selectedLang = event.target.value;
        changeLanguage(selectedLang); // Charger et appliquer la langue choisie
    });
});
