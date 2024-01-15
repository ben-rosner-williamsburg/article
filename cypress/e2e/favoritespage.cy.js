describe('Favorites Page', () => {
  beforeEach(() => {
    cy.intercept("GET", `https://api.harvardartmuseums.org/object?apikey=${Cypress.env("REACT_APP_API_KEY")}&id=${Cypress.env("id")}`, {
      statusCode: 200,
      fixture: "/testdatadetails.json"
    })
    .visit(`http://localhost:3000/favorites`)
  })
  it('Displays header upon load with text "Favorites"', () => {
    cy.get(".heading-text").contains("Favorites").should("be.visible");
  })
  it("Displays text that says 'No Favorites Found' if there are no favorites", () => {
    cy.get(".no-img-text").contains("No images here!").should("be.visible");
  })
  it("Takes user back to home page if they click the back button", () => {
    cy.get(".back-link").click();
    cy.location().should((location) => {
      expect(location.pathname).to.eq("/");
    })
  })
})