describe('Favorites Page', () => {
  beforeEach(() => {
   cy.visit(`http://localhost:3000/error`);
  })
  it('Displays error text', () => {
    cy.get(".error").contains("404 Error: Page Not Found");
  })
  it('Takes user back to main page if they click the back button', () => {
    cy.get(".back-link").click();
    cy.location().should((location) => {
      expect(location.pathname).to.eq("/");
    })
  })
})