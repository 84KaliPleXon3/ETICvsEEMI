describe("Home page", () => {
  it("should have content displayed", () => {
    cy.visit("/");

    // Elements are visible
    cy.get("h1#title").should("be.visible");
    cy.get("h2#question_text").should("be.visible");
    cy.get("span.progress").should("be.visible");
    cy.get("p").should("be.visible");
    cy.get(".choice-btn").should("be.visible");
    cy.get("#quizz_input").should("be.visible");
    cy.get("#score_screen").should("not.be.visible");

    // Elements contain right content
    cy.contains("#title", "HETIC vs EEMI");
    cy.get("h2#question_text").should("not.be.empty");
    cy.contains("p", "Plus Éemien ou Héticien ?");
    cy.get(".choice-btn").should("have.length", 2);
  });

  it("should finish game with score 0", () => {
    cy.server({ status: 200 });
    cy.route("/questions", {
      questions: [{ text: "test_cypress", answer: 2 }]
    });

    cy.visit("/");

    cy.contains("#question_text", "test_cypress");

    cy.get(".choice-btn")
      .first()
      .click();

    cy.contains("Score: 0/1");
    cy.contains("T'as pas lu les questions avoues.");
    cy.contains("Recommencer");

    cy.get("#quizz_input").should("not.be.visible"); // Quizz is hidden
    cy.get("#score_screen").should("be.visible"); // Score screen is displayed
  });

  it("should finish game with score 1 and retry", () => {
    cy.server({ status: 200 });
    cy.route("/questions", {
      questions: [{ text: "test_cypress", answer: 1 }]
    });

    cy.visit("/");

    cy.contains("#question_text", "test_cypress");

    cy.get(".choice-btn")
      .first()
      .click();

    cy.contains("Score: 1/1");
    cy.contains("Bon bah c'est pas tip top tout ça.");
    cy.contains("Recommencer");

    cy.get("#quizz_input").should("not.be.visible"); // Quizz is hidden
    cy.get("#score_screen").should("be.visible"); // Score screen is displayed

    cy.get(".replay-btn").click();

    cy.get("#quizz_input").should("be.visible");
    cy.get("#score_screen").should("not.be.visible");
  });
});
