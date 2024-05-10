/// <reference types="cypress" />

// Test Case: Product Details
// Steps:
//  - Click on a product to view its details.
//  - Verify that the product details page displays all relevant information 
// such as images, description, price, and availability.
//  - Ensure that users can navigate back to the inventory/products page easily.

describe('Product Details', () => {

    beforeEach(()=>{
        cy.visit(Cypress.env('baseURL'))
        cy.login('standard_user', 'secret_sauce')
    })

    afterEach(()=>{
        cy.logout()
    })

    it('Verify product details', () => {

        cy.get('[data-test="inventory-item"]').each(($item, index) => {
            const name = $item.find('[data-test="inventory-item-name"]').text();
            const price = $item.find('[data-test="inventory-item-price"]').text();
            const description = $item.find('[data-test="inventory-item-desc"]').text();

            cy.get('[data-test="inventory-item"]').eq(index).find('.inventory_item_img > a').should('be.visible').click()
            cy.wait(500)

            cy.get('[data-test="inventory-item"]').should('be.visible')
            cy.get('[data-test="inventory-item-name"]').should('contain.text', name)
            cy.get('[data-test="inventory-item-desc"]').should('contain.text', description)
            cy.get('[data-test="inventory-item-price"]').should('contain.text', price)
            cy.get('[class="inventory_details_img_container"]').find('img').should('be.visible').and('have.prop', 'naturalWidth').should('be.greaterThan', 0)

            cy.get('[data-test="back-to-products"]').click()
            cy.wait(500)
            cy.get('[data-test="inventory-list"]').should('be.visible')
            
        })
    })
})