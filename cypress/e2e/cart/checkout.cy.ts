/// <reference types="cypress" />

import { getRandomInt } from "../../support/utils"

// Test Case: Checkout
// Steps:
//  - Add 2 products to cart
//  - Go to cart and verify that they have been added successfully 
//  - Proceed to check and fill the customer delevery details 
//  - Verify that the order summary has correct detials

describe('Product Checkout', () => { 
    before(()=>{
        cy.visit(Cypress.env('baseURL'))
        cy.login('standard_user', 'secret_sauce')
    })

    after(()=>{
        cy.logout()
    })

    it('Verify checkout works successfully', ()=>{
        const positon = getRandomInt(6)
        cy.get('[data-test="inventory-item"]').eq(positon).find('[class="pricebar"]')
            .find('button').should('contain.text', 'Add to cart').click()

        let itemName: string;
        let itemDescription: string;
        let itemPrice: string;
        cy.get('[data-test="inventory-item"]').eq(positon).then(($el)=>{
                itemName = $el.find('[data-test="inventory-item-name"]').text()
                itemPrice = $el.find('[data-test="inventory-item-price"]').text();
                itemDescription = $el.find('[data-test="inventory-item-desc"]').text();


                cy.get('[data-test="shopping-cart-link"]').click()
                cy.get('[data-test="inventory-item"]').should('exist')
        
                cy.get('[data-test="inventory-item-name"]').should('contain.text', itemName)
                cy.get('[data-test="inventory-item-desc"]').should('contain.text', itemDescription)
                cy.get('[data-test="inventory-item-price"]').should('contain.text', itemPrice)
        
                cy.get('[data-test="checkout"]').should('contain.text', 'Checkout').click()
        
                cy.get('[data-test="checkout-info-container"]').should('be.visible')
        
                cy.get('[data-test="firstName"]').type('John')
                cy.get('[data-test="lastName"]').type('Doe')
                cy.get('[data-test="postalCode"]').type('0000')
        
                cy.get('[data-test="continue"]').click()
                cy.get('[data-test="checkout-summary-container"]').should('be.visible')
        
                cy.get('[data-test="inventory-item-name"]').should('contain.text', itemName)
                cy.get('[data-test="inventory-item-desc"]').should('contain.text', itemDescription)
                cy.get('[data-test="inventory-item-price"]').should('contain.text', itemPrice)
        
                cy.get('[data-test="finish"]').should('contain.text', 'Finish').click()
        
                cy.get('[data-test="complete-header"]').should('contain.text', 'Thank you for your order!')
        })

      

    })
 })

