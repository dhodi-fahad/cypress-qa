/// <reference types="cypress" />
import { getItemsDetails } from "../../support/utils"

// Test Case: Sort Products by Prices High to Low
// Steps:
//  - Test the functionality to sort products by price High to Low.
//  - Verify that products are displayed in the expected order after sorting.
//  - Ensure that sorting options are working correctly and consistently.

describe('Sorting by Product Price (High to Low)',()=>{

    beforeEach(()=>{
        cy.visit(Cypress.env('baseURL'))
        cy.login('standard_user', 'secret_sauce')
    })

    afterEach(()=>{
        cy.logout()
    })

    it('High to Low', () => {
        getItemsDetails((unsortedItems) => {
            const unsortedPrices = unsortedItems.map((item) => {
                let _price = item.price.substring(1)
                return parseFloat(_price)
            });

            // Sort Items by Prine
            cy.get('[class="select_container"]').find('select').select('Price (high to low)');
            cy.wait(1000);
            
             // Get sorted items details and perform assertion inside then block
             getItemsDetails((sortedItems) => {
                const sortedPrices = sortedItems.map((item) => {
                    let _price = item.price.substring(1)
                    return parseFloat(_price)
                });
                // Verify sorting
                expect(sortedPrices).to.deep.equal(unsortedPrices.sort((a, b) => b - a));
            });

       })
    })
})