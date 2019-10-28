// https://docs.cypress.io/api/introduction/api.html

describe("Home page", () => {
  it("Should have titles displayed", () => {
    cy.visit("/");
    cy.contains("h1", "HETIC vs EEMI");
    cy.contains("Plus Éemien ou Héticien ?");
    cy.get('span button').should('have.length', 2)
  });

  // it("should finish game", () => {
  //   cy.wait(600);

  //   for (const i = 1; i <= 5; i++) {
  //     cy.get("span button")
  //       .first()
  //       .click();
  //     cy.wait(600);
  //     i++;
  //   }

  //   cy.contains("Score:");
  //   cy.contains("Bon bah c'est pas tip top tout ça.");
  //   cy.contains("Rejouer");
  // });

  // it("should finish game and replay", () => {
  //   cy.wait(600);

  //   for (const i = 1; i <= 5; i++) {
  //     cy.get("span button")
  //       .first()
  //       .click();
  //     cy.wait(600);
  //     i++;
  //   }

  //   cy.contains("Score:");
  //   cy.contains("Bon bah c'est pas tip top tout ça.");
  //   cy.contains("Rejouer");

  //   cy.get(".replay-btn").click();
  // });
});
