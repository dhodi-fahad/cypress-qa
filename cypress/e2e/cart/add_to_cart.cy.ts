/// <reference types="cypress" />

import { getRandomInt } from "../../support/utils"

// Test Case: Add to Cart Functionality
// Steps:
//  - Click on the "Add to Cart" button for a product.
//  - Verify that the product is added to the shopping cart without any errors.
//  - Ensure that the cart icon updates to reflect the added product and the total number of items in the cart

describe('Add To Cart', ()=>{
    before(()=>{
        cy.visit(Cypress.env('baseURL'))
        cy.login('standard_user', 'secret_sauce')
    })

    after(()=>{
        cy.logout()
    })

    it('Verify that the product is added and removed from the shopping cart without any errors', ()=>{
        const positon = getRandomInt(6)
        cy.get('[data-test="inventory-item"]').eq(positon).find('[class="pricebar"]')
            .find('button').should('contain.text', 'Add to cart').click()
            cy.get('[data-test="shopping-cart-badge"]').should('contain.text', '1')
        cy.get('[data-test="inventory-item"]').eq(positon).find('[class="pricebar"]')
            .find('button').should('contain.text', 'Remove').click()
        cy.get('[data-test="shopping-cart-link"]').should('not.contain.text', '1')
    })
})