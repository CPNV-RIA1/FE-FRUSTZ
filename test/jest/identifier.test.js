"use strict";

const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;

describe("Scenario 002 - Authentification / Format PSW", () => {

    test("identifier_NominalValue_RegexVerification", () => {
        // Given : Les champs sont
        let password = "Geeks@123";

        // When : On charge la page d'accueil
        
        
        // Then : L'application applique la langue du navigateur
        expect(password).toMatch(regex);
    });

    test("identifier_InvalideValue_RegexVerification", () => {
        // Given : Les champs sont
        let password = "GeeksforGeeks";

        // When : On charge la page d'accueil
        

        // Then : L'application applique la langue du navigateur
        expect(password).not.toMatch(regex);
    });
});
