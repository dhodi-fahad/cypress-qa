/// <reference types="cypress" />

/**
 * SCENARIO: 
 * - LOGIN
 * TEST CASES:
 * 1. Valid Credentials
 * 2. Invalid Username
 * 3. Invalid Password
 * 4. Empty Username 
 * 5. Empty Password
 * 5. Cross-Browser Compatibility
 */


describe('LOGIN', ()=>{

    beforeEach(()=>{
        cy.visit('https://www.saucedemo.com')
    })

    it('Valid Credentials',()=>{
        // Steps:
        //  - Input valid username and password.
        //  - Verify that the user is logged in successfully.
        //  - Ensure that the user is directed to the expected page after login.

        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')

        cy.get('[data-test="login-button"]').click()
        cy.wait(500)
        cy.url().should('eq','https://www.saucedemo.com/inventory.html')

        cy.get('[data-test="inventory-container"]').should('be.visible')
    })

    it('Invalid Username',()=>{
        // Steps:
        //  - Input an invalid username and a valid password.
        //  - Verify that the system displays an appropriate error message indicating an invalid username.
        //  - Ensure that the user is not logged in.

        cy.get('[data-test="username"]').type('invalid_user')
        cy.get('[data-test="password"]').type('secret_sauce')

        cy.get('[data-test="login-button"]').click()
        cy.wait(500)

        const error_message = "Epic sadface: Username and password do not match any user in this service"
        cy.get('[data-test="error"]').should('contain.text', error_message)

        cy.get('[data-test="inventory-container"]').should('not.be.visible')
        cy.url().should('eq','https://www.saucedemo.com/')
    })

    it('Invalid Password',()=>{
        // Steps
        //  - Input a valid username and an invalid password.
        //  - Verify that the system displays an appropriate error message indicating an invalid password.
        //  - Ensure that the user is not logged in.

        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('******')

        cy.get('[data-test="login-button"]').click()
        cy.wait(500)

        const error_message = "Epic sadface: Username and password do not match any user in this service"
        cy.get('[data-test="error"]').should('contain.text', error_message)

        cy.get('[data-test="inventory-container"]').should('not.be.visible')
        cy.url().should('eq','https://www.saucedemo.com/')
    })

    it('Empty Username',()=>{
        // Steps
        //  - Attempt to login without entering any username .
        //  - Verify that the system displays error messages indicating that Username field is required.
        //  - Ensure that the user is not logged in.

        cy.get('[data-test="username"]').clear()
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()
        cy.wait(500)

        const error_message = "Epic sadface: Username is required"
        cy.get('[data-test="error"]').should('contain.text', error_message)

        cy.get('[data-test="inventory-container"]').should('not.be.visible')
        cy.url().should('eq','https://www.saucedemo.com/')
    })

    it('Empty Password',()=>{
        // Steps
        //  - Attempt to login without entering any password.
        //  - Verify that the system displays error messages indicating that Password Field is required.
        //  - Ensure that the user is not logged in.

        cy.get('[data-test="username"]').clear()
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()
        cy.wait(500)

        const error_message = "Epic sadface: Password is required"
        cy.get('[data-test="error"]').should('contain.text', error_message)

        cy.get('[data-test="inventory-container"]').should('not.be.visible')
        cy.url().should('eq','https://www.saucedemo.com/')
    })

    it('Login - Chrome Browser', { browser: 'chrome' }, ()=>{
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')

        cy.get('[data-test="login-button"]').click()
        cy.wait(500)
        cy.url().should('eq','https://www.saucedemo.com/inventory.html')

        cy.get('[data-test="inventory-container"]').should('be.visible')
    })

    it('Login - Firefox Browser', { browser: 'firefox' }, ()=>{
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')

        cy.get('[data-test="login-button"]').click()
        cy.wait(500)
        cy.url().should('eq','https://www.saucedemo.com/inventory.html')

        cy.get('[data-test="inventory-container"]').should('be.visible')
    })

    it('Login - Edge Browser', { browser: 'edge' }, ()=>{
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')

        cy.get('[data-test="login-button"]').click()
        cy.wait(500)
        cy.url().should('eq','https://www.saucedemo.com/inventory.html')

        cy.get('[data-test="inventory-container"]').should('be.visible')
    })
})

