/// <reference types="cypress" />

// Test Case: Login with empty password field
// Steps:
//  - Input a valid username and an invalid password.
//  - Verify that the system displays an appropriate error message indicating an invalid username.
//  - Ensure that the user is not logged in.

describe('Login: Empty Password', ()=>{
    beforeEach(()=>{
        cy.visit(Cypress.env('baseURL'))
    })
    it('Verify user login with empty password field', ()=>{
        
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').clear()
        cy.get('[data-test="login-button"]').click()
        cy.wait(500)

        const error_message = "Epic sadface: Password is required"
        cy.get('[data-test="error"]').should('contain.text', error_message)

        cy.url().should('eq', Cypress.env('baseURL'))
    })
})