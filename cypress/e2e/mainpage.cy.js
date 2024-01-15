describe('Main Page', () => {
  beforeEach(() => {
    cy.intercept("GET", `https://api.harvardartmuseums.org/object?apikey=${Cypress.env("REACT_APP_API_KEY")}&hasimage=1&classification=Paintings&size=21&sort`, {
      statusCode: 200,
      fixture: "/testdata.json"
    })
    .visit("http://localhost:3000");
  })
  it('Displays header upon load with text "Article"', () => {
    cy.get(".heading-text").contains("Article").should("be.visible");
  })
  it(`Displays picture link which takes user to favorites page`, () => {
    cy.get(".favorite-link").should("be.visible").click();
    cy.location().should((location) => {
      expect(location.pathname).to.eq("/favorites");
    })
  })
  it('Displays pictures', () => {
      cy.get(".img-work").first().should('be.visible');
      cy.get(".img-work").last().should('be.visible');
   })
  it("Navigates to details page when picture is clicked on", () => {
    cy.get(".img-work").first().click();
    cy.location().should((location) => {
      expect(location.pathname).to.eq("/details/1428");
    })
  })
})
describe(`Error handling`, () => {
  it('should display an error if the server fails', () => {
    cy.intercept("GET", `https://api.harvardartmuseums.org/object?apikey=${Cypress.env("REACT_APP_API_KEY")}&hasimage=1&classification=Paintings&size=21&sort`,  {  
    statusCode: 500,
    fixture: "/testdata.json"
  }).as("networkfailure");
    cy.visit("http://localhost:3000");
    cy.wait("@networkfailure");
    cy.get(".error-message").contains("500 Error! Try again later!");
  })
})