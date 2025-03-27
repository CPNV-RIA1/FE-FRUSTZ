"use strict";

const userMock = require("../../test/jest/userMock");

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

describe("Scenario 003 - Transmission du formulaire d'authentification - cas \"success\"", () => {

    test("identifier_NominalValue_RegexVerification", () => {
        // Given 
        const inputEmail = "joe@example.com";
        const inputPassword = "Geeks@123";
        // When :
        const isAuthenticated =
            inputEmail === userMock.email && inputPassword === userMock.password;

        // Then :
        expect(isAuthenticated).toBe(true);
    });
});

describe("Scenario 004 - Transmission du formulaire d'authentification - cas \"failed\"", () => {

    test("identifier_NominalValue_RegexVerification", () => {
        // Given 
        const inputEmail = "david@example.com";
        const inputPassword = "Geeks@123";
        // When :
        const isAuthenticated =
            inputEmail === userMock.email && inputPassword === userMock.password;

        // Then :
        expect(isAuthenticated).toBe(false);
    });
});
