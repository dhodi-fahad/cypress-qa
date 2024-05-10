/// <reference types="cypress" />

// Test Case: Login with valid credentials
// Steps:
//  - Input valid username and password.
//  - Verify that the user is logged in successfully.
//  - Ensure that the user is directed to the expected page after login.


describe('Login: Valid Credentials', ()=>{
    
    beforeEach(()=>{
        cy.visit(Cypress.env('baseURL'))
    })

    it('Verify user login with valid credentilas', ()=>{
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')

        cy.get('[data-test="login-button"]').click()
        cy.wait(500)
        cy.url().should('eq',Cypress.env('baseURL')+'inventory.html')

        cy.get('[data-test="inventory-container"]').should('be.visible')
    })
})