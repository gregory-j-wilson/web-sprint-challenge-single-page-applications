describe('Add Name, select multiple toppings, submit form', () => {
    it('can navigate to the site', () => {
        cy.visit('http://localhost:3000/pizza')
    })

    
    
    it('types name', () => {
        cy.get('input[name="name"]')
            .type('Gregory Wilson')
            .should('have.value', 'Gregory Wilson')
            
    })

    it('select multiple toppings', () => {
        cy.get('input[name="hamburger"]').check()
            
    })

    it('select multiple toppings', () => {
        cy.get('input[name="greenpeppers"]').check()
            
    })

    it('select multiple toppings', () => {
        cy.get('input[name="chicken"]').check()
            
    })

    it('select multiple toppings', () => {
        cy.get('input[name="mushrooms"]').check()
            
    })

    it('submit form', () => {
        cy.get('form').submit()
            
    })



})