/// <reference types = "cypress"/>  

it('Test 1', () => {
    cy.visit("http://localhost:8080/Courses")
    cy.get(':nth-child(1) > :nth-child(2) > a').click()
    cy.get('label').should('have.length.at.least', 3)
    cy.get('input').should('have.length.at.least', 3)
    cy.get(':nth-child(2) > input').clear().type('110')
    cy.get('button').should('be.visible');
    cy.get('button').click()

})