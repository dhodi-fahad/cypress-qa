/**
 * Interface representing the details of an inventory item.
 */
interface ItemDetails {
    name: string;
    price: string;
}


/**
 * Retrieves details of items from the inventory.
 * @param callback A callback function to handle the retrieved item details.
 *                 It takes an array of ItemDetails as its argument.
 * @returns void
 */
export const getItemsDetails = (callback: (items: ItemDetails[]) => void): void => {
    // Array to store the details of items
    const itemsDetails: ItemDetails[] = [];

    // Iterates over each inventory item to extract its name and price
    cy.get('[data-test="inventory-item"]').each(($item) => {
        // Extracts the name of the item
        const name = $item.find('[data-test="inventory-item-name"]').text();
        // Extracts the price of the item
        const price = $item.find('[data-test="inventory-item-price"]').text();
        
        // Pushes the name and price of the item into the itemsDetails array
        itemsDetails.push({ name, price });
    }).then(() => {
        // Calls the callback function with the retrieved item details
        callback(itemsDetails);
    });
};
