/// <reference types="cypress" />

// Test Case: Login with invalid username
// Steps:
//  - Input an invalid username and a valid password.
//  - Verify that the system displays an appropriate error message indicating an invalid username.
//  - Ensure that the user is not logged in.

describe('Login: Invalid Username', ()=>{
    beforeEach(()=>{
        cy.visit(Cypress.env('baseURL'))
    })
    it('Verify user login with invalid username', ()=>{
        
        cy.get('[data-test="username"]').type('invalid_user')
        cy.get('[data-test="password"]').type('secret_sauce')

        cy.get('[data-test="login-button"]').click()
        cy.wait(500)

        const error_message = "Epic sadface: Username and password do not match any user in this service"
        cy.get('[data-test="error"]').should('contain.text', error_message)

        cy.url().should('eq',Cypress.env('baseURL'))
    })
})