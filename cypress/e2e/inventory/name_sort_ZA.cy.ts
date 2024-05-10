/// <reference types="cypress" />
import { getItemsDetails } from "../../support/utils"

// Test Case: Sort Products by Names Z to A
// Steps:
//  - Test the functionality to sort products by name Z to A.
//  - Verify that products are displayed in the expected order after sorting.
//  - Ensure that sorting options are working correctly and consistently.

describe('Sorting by Product Name Z to A',()=>{

    beforeEach(()=>{
        cy.visit(Cypress.env('baseURL'))
        cy.login('standard_user', 'secret_sauce')
    })

    afterEach(()=>{
        cy.logout()
    })
 
     it('Z to A', ()=>{
         getItemsDetails((unsortedItems) => {
             const unsortedNames = unsortedItems.map((item)=>item.name);
 
             // Sort Items by name
             cy.get('[class="select_container"]').find('select').select('Name (Z to A)');
             cy.wait(1000);
 
              // Get sorted items details and perform assertion inside then block
              getItemsDetails((sortedItems) => {
                 const sortedNames = sortedItems.map((item) => item.name);
                 // Verify sorting
                 expect(sortedNames).to.deep.equal(unsortedNames.sort((a, b) => b.localeCompare(a)));
             });
 
        })
     })
 

})