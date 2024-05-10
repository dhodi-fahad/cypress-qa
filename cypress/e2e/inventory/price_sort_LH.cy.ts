/// <reference types="cypress" />
import { getItemsDetails } from "../../support/utils"

// Test Case: Sort Products by Prices Low to Hight
// Steps:
//  - Test the functionality to sort products by price Low to High.
//  - Verify that products are displayed in the expected order after sorting.
//  - Ensure that sorting options are working correctly and consistently.

describe('Sorting by Product Price (Low to High)',()=>{

    beforeEach(()=>{
        cy.visit(Cypress.env('baseURL'))
        cy.login('standard_user', 'secret_sauce')
    })

    afterEach(()=>{
        cy.logout()
    })

    it('Low to High', () => {
        getItemsDetails((unsortedItems) => {
            const unsortedPrices = unsortedItems.map((item) => {
                let _price = item.price.substring(1)
                return parseFloat(_price)
            });

            // Sort Items by Price
            cy.get('[class="select_container"]').find('select').select('Price (low to high)');
            cy.wait(1000);

             // Get sorted items details and perform assertion inside then block
             getItemsDetails((sortedItems) => {
                const sortedPrices = sortedItems.map((item) => {
                    let _price = item.price.substring(1)
                    return parseFloat(_price)
                });
                // Verify sorting
                expect(sortedPrices).to.deep.equal(unsortedPrices.sort((a, b) => a - b));
            });

       })
    })
})