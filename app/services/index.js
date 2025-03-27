// Simule ta "base de données"
const users = [{ email: "joe@example.com", password: "Geeks@123" }];

// Vérifie s’il y a une tentative de login dans le localStorage
const loginAttempt = JSON.parse(localStorage.getItem("loginAttempt"));

function userIdentifier(loginAttempt) {
    const { email, password } = loginAttempt;

    // Recherche dans la "BD"
    const user = users.find(
        (u) => u.email === email && u.password === password
    );

    const welcomeMessage = document.getElementById("welcome-message");

    if (user) {
        welcomeMessage.setAttribute("data-i18n", "logged-in");
        welcomeMessage.setAttribute("dynamic-data", user.email);
    } else {
        welcomeMessage.setAttribute("data-i18n", "authentication-error");
    }

    // Optionnel : nettoyer après usage
    localStorage.removeItem("loginAttempt");
    return user;
}
module.exports = { userIdentifier };

if (loginAttempt) {
    userIdentifier(loginAttempt);
}
