describe('My First Test', () => {
  it('Log in process', () => {
    cy.visit('/login')
    cy.get('input[name=userName]').type('saeed.sharman')
    cy.get('input[name=password]').type('password1')
    cy.get('button[type=submit]').click();
  })
})
