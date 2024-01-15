describe('Details Page', () => {
  beforeEach(() => {
    cy.intercept("GET", `https://api.harvardartmuseums.org/object?apikey=${Cypress.env("REACT_APP_API_KEY")}&id=${Cypress.env("id")}`, {
      statusCode: 200,
      fixture: "/testdatadetails.json"
    })
    .visit(`http://localhost:3000/details/${Cypress.env("id")}`);
  })
  it('Displays header upon load with text "Article"', () => {
    cy.get(".detail-heading-text").contains("Article").should("be.visible");
  })
  it(`Displays artwork with information about the selected artwork`, () => {
    cy.get(".artwork-element").first().invoke("attr", "src").should("eq","https://nrs.harvard.edu/urn-3:HUAM:ISL10069_dynmc");
    cy.get('.title').contains("Battle Scene, folio fragment from an album of the Bhagavata Purana (Ancient Stories of the Lord)a Bhagavat Purana series");
    cy.get('.artist-name').contains("Unknown Artist");
    cy.get('.division').contains("Asian and Mediterranean Art");
    cy.get(".artwork-element").last().contains("More Info");
  })
  it("Takes user to the corresponding page of the Harvard Art Archive referring to the work", () => {
    cy.get(".artwork-element").last().invoke("attr", "href").should("eq","https://www.harvardartmuseums.org/collections/object/1428");
  })
  it("Allows users to favorite an artwork and then take them to the favorites page. The user can then remove that favorite.", () => {
    cy.get(".heart-button").click();
    cy.location().should((location) => {
      expect(location.pathname).to.eq("/favorites");
    })
    cy.get(".img-work-favorite").should('be.visible');
    cy.get(".remove-fave").should("be.visible").click()
    cy.get(".no-img-text").contains("No images here!").should("be.visible");
  })
    it("Allows users to go back to the main page if they wish", () => {
      cy.get(".back-link").click();
      cy.location().should((location) => {
        expect(location.pathname).to.eq("/")
      });
   })
})