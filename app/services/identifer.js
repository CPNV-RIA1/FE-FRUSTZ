const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const submitBtn = document.getElementById("submitBtn");
const emailWarning = document.getElementById("email-warning");
const passwordWarning = document.getElementById("password-warning");

const emailRegex = /^[\w.-]+@[\w.-]+\.\w{2,}$/;
const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;

function validateForm() {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    const emailIsValid = emailRegex.test(email);
    const passwordIsValid = passwordRegex.test(password);

    if (!emailIsValid && email !== "") {
        emailWarning.innerHTML = `
          ❌ L'adresse email doit respecter le format :
          <ul style="margin-top: 4px; padding-left: 18px; font-size: 0.9em;">
            <li>• Commencer par des lettres, chiffres, points ou tirets</li>
            <li>• Contenir un <code>@</code> suivi d’un nom de domaine</li>
            <li>• Se terminer par une extension valide (ex: <code>.fr</code>, <code>.com</code>, etc.)</li>
          </ul>
        `;
        emailWarning.style.display = "block";
        emailInput.classList.add("invalid");
    } else {
        emailWarning.style.display = "none";
        emailInput.classList.remove("invalid");
    }

    if (!passwordIsValid && password !== "") {
        passwordWarning.innerHTML = `
          ❌ Le mot de passe doit contenir :
          <ul style="margin-top: 4px; padding-left: 18px; font-size: 0.9em;">
            <li>• Entre 8 et 15 caractères</li>
            <li>• Au moins une lettre minuscule (a–z)</li>
            <li>• Au moins une lettre majuscule (A–Z)</li>
            <li>• Au moins un chiffre (0–9)</li>
            <li>• Au moins un caractère spécial : <code>@ . # $ ! % * ? &</code></li>
          </ul>`;
        passwordWarning.style.display = "block";
        passwordInput.classList.add("invalid");
    } else {
        passwordWarning.style.display = "none";
        passwordInput.classList.remove("invalid");
    }

    submitBtn.disabled = !(emailIsValid && passwordIsValid);
}

emailInput.addEventListener("input", validateForm);
passwordInput.addEventListener("input", validateForm);

document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    localStorage.setItem("loginAttempt", JSON.stringify({ email, password }));

    window.location.href = "/index.html";
});
