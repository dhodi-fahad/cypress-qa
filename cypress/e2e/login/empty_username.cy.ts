/// <reference types="cypress" />

// Test Case: Login with empty username field
// Steps:
//  - Input a valid username and an invalid password.
//  - Verify that the system displays an appropriate error message indicating an invalid username.
//  - Ensure that the user is not logged in.

describe('Login: Empty Username', ()=>{
    beforeEach(()=>{
        cy.visit(Cypress.env('baseURL'))
    })
    it('Verify user login with empty username field', ()=>{
        
        cy.get('[data-test="username"]').clear()
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()
        cy.wait(500)

        const error_message = "Epic sadface: Username is required"
        cy.get('[data-test="error"]').should('contain.text', error_message)

        cy.url().should('eq', Cypress.env('baseURL'))
    })
})