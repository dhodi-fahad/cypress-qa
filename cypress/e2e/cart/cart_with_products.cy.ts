/// <reference types="cypress" />

import { getRandomInt } from "../../support/utils"

// Test Case: View Cart with products from Product Page
// Steps:
//  - Click on the "View Cart" or "Cart" button from the product details page.
//  - Verify that the user is directed to the shopping cart page.
//  - Ensure that the products added to the cart are displayed correctly


describe('View Cart with products from Product Page', ()=>{

    before(()=>{
        cy.visit(Cypress.env('baseURL'))
        cy.login('standard_user', 'secret_sauce')
    })

    after(()=>{
        cy.logout()
    })

    it('View cart', ()=>{

        const positon = getRandomInt(6)
        cy.get('[data-test="inventory-item"]').eq(positon).find('[class="pricebar"]')
            .find('button').should('contain.text', 'Add to cart').click()
        cy.get('[data-test="shopping-cart-link"]').click()
        cy.get('[data-test="inventory-item"]').should('exist')

        cy.get('[data-test="continue-shopping"]').should('contain.text', 'Continue Shopping').click()
        cy.get('[data-test="inventory-container"]').should('be.visible')
    })
})