// TEST CASES
// 1. Verify Page Elements
// 2. Product Sorting
// 3. Product Filtering
// 4. Product Details
// 5. Add to Cart Functionality
// 6. View Cart from Product Page
// 7. Responsive Design


/// <reference types="cypress" />



/**
 * Interface representing the details of an inventory item.
 */
interface ItemDetails {
    name: string;
    price: string;
}

/**
 * Function to retrieve details of all inventory items.
 * @returns Array of ItemDetails representing the inventory items.
 */
const getItemsDetails = (callback:(items: ItemDetails[])=>void): void => {
    const itemsDetails: ItemDetails[] = []

    cy.get('[data-test="inventory-item"]').each(($item) => {
        const name = $item.find('[data-test="inventory-item-name"]').text();
        const price = $item.find('[data-test="inventory-item-price"]').text();
        itemsDetails.push({ name, price });
    }).then(()=>{
        callback(itemsDetails)
    })

    
};


describe('INVENTORY PAGE ELEMENTS', () => {
    beforeEach(() => {
        // Login
        cy.visit('https://www.saucedemo.com');
        cy.get('[data-test="username"]').type('standard_user');
        cy.get('[data-test="password"]').type('secret_sauce');
        cy.get('[data-test="login-button"]').click();
        cy.wait(500);
        cy.url().should('eq', 'https://www.saucedemo.com/inventory.html');
        cy.get('[data-test="inventory-container"]').should('be.visible');
    });

    afterEach(()=>{
        cy.get('[class="bm-burger-button"]').find('[id="react-burger-menu-btn"]').click()
        cy.get('[data-test="logout-sidebar-link"]').click()
        
    })

    it('Product Name Sorting A to Z', () => {
       getItemsDetails((unsortedItems) => {
            const unsortedNames = unsortedItems.map((item)=>item.name);

            // Sort Items by name
            cy.get('[class="select_container"]').find('select').select('Name (A to Z)');
            cy.wait(1000);

             // Get sorted items details and perform assertion inside then block
             getItemsDetails((sortedItems) => {
                const sortedNames = sortedItems.map((item) => item.name);
                // Verify sorting
                expect(sortedNames).to.deep.equal(unsortedNames.sort());
            });

       })
    });

    it('Product Name Sorting Z to A', ()=>{
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


    it('Product Price Sorting (low to high)', () => {
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
                expect(sortedPrices).to.deep.equal(unsortedPrices.sort());
            });

       })
    })

    it('Product Price Sorting (high to low)', () => {
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

    it('Product details', ()=>{

        // Steps:
        //  - Click on a product to view its details.
        //  - Verify that the product details page displays all relevant information 
        // such as images, description, price, and availability.
        //  - Ensure that users can navigate back to the inventory/products page easily.

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
});
