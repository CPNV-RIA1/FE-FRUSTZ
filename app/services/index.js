const users = [{ email: "joe@example.com", password: "Geeks@123" }];

const loginAttempt = JSON.parse(localStorage.getItem("loginAttempt"));

function userIdentifier(loginAttempt) {
    const { email, password } = loginAttempt;

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

    localStorage.removeItem("loginAttempt");
    return user;
}

if (loginAttempt) {
    userIdentifier(loginAttempt);
}
