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

function showError(message) {
    const errorDiv = document.getElementById("error-message");
    errorDiv.textContent = message;
    errorDiv.style.display = "block";

    // Cache l'erreur après 10 secondes
    setTimeout(() => {
        errorDiv.style.display = "none";
    }, 10000);
}

// Initialisation d'i18next avec des ressources dynamiques
i18next.init(
    {
        lng: "en",
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

function changeLanguage(lang) {
    let newLang = lang;

    if (!i18next.options.supportedLngs.includes(lang)) {
        showError("La langue du navigateur ne peut pas être appliquée.");
        newLang = i18next.options.fallbackLng[0];
    }

    loadTranslation(newLang).then((translations) => {
        // Ajouter les traductions au niveau des ressources d'i18next
        i18next.addResourceBundle(newLang, "translation", translations);
        i18next.changeLanguage(newLang, function (err, t) {
            applyTranslations(); // Appliquer les traductions après le changement de langue
        });
    });
}

// Changement de langue via le sélecteur
document.addEventListener("DOMContentLoaded", function () {
    const lng = navigator.language.split("-")[0];

    // Charge les traductions pour la langue choisie
    changeLanguage(lng);

    // Mettre à jour le sélecteur de langue avec la langue actuelle
    const languageSelector = document.getElementById("languageSelector");
    if (i18next.options.supportedLngs.includes(lng)) {
        languageSelector.value = lng;
    } else {
        languageSelector.value = i18next.options.fallbackLng[0];
    }

    // Gérer le changement de langue via le sélecteur
    languageSelector.addEventListener("change", function (event) {
        const selectedLang = event.target.value;
        changeLanguage(selectedLang);
    });
});
