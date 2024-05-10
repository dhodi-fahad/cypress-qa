/// <reference types="cypress" />

// Test Case: View Empty Cart from Product Page
// Steps:
//  - Click on the "View Cart" or "Cart" button from the product details page.
//  - Verify that the user is directed to the shopping cart page.
//  - Ensure that no products are displayed on the cart page.


describe('View Empty Cart from Product Page', ()=>{
    before(()=>{
        cy.visit(Cypress.env('baseURL'))
        cy.login('standard_user', 'secret_sauce')
    })

    after(()=>{
        cy.logout()
    })

    it('View empty cart', ()=>{
        cy.get('[data-test="shopping-cart-link"]').click()
        cy.get('[data-test="inventory-item"]').should('not.exist')
        cy.get('[data-test="continue-shopping"]').should('contain.text', 'Continue Shopping').click()
        cy.get('[data-test="inventory-container"]').should('be.visible')
    })
})