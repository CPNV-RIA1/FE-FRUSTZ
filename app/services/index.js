// Simule ta "base de données"
const users = [
    { email: "joe@example.com", password: "Geeks@123" }
];

// Vérifie s’il y a une tentative de login dans le localStorage
const loginAttempt = JSON.parse(localStorage.getItem("loginAttempt"));

if (loginAttempt) {
    const { email, password } = loginAttempt;

    // Recherche dans la "BD"
    const user = users.find(
        (u) => u.email === email && u.password === password
    );

    if (user) {
        document.getElementById("welcome-message").textContent =
            `✅ Authentifié : ${user.email}`;
    } else {
        document.getElementById("welcome-message").textContent =
            "❌ Utilisateur inconnu ou mot de passe incorrect.";
    }

    // Optionnel : nettoyer après usage
    localStorage.removeItem("loginAttempt");
}
