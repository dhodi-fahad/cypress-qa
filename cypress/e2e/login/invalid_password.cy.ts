/// <reference types="cypress" />

// Test Case: Login with invalid password
// Steps:
//  - Input a valid username and an invalid password.
//  - Verify that the system displays an appropriate error message indicating an invalid username.
//  - Ensure that the user is not logged in.

describe('Login: Invalid Password', ()=>{
    
    beforeEach(()=>{
        cy.visit(Cypress.env('baseURL'))
    })

    it('Verify user login with invalid password', ()=>{
        
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('invalid_password')

        cy.get('[data-test="login-button"]').click()
        cy.wait(500)

        const error_message = "Epic sadface: Username and password do not match any user in this service"
        cy.get('[data-test="error"]').should('contain.text', error_message)

        cy.url().should('eq',Cypress.env('baseURL'))
    })
})