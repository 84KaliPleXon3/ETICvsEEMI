describe('Home page', () => {
  describe('content', () => {
    it('should display quizz component', () => {
      cy.get('#quizz_input').should('be.visible');
    });

    it('should display title', () => {
      cy.get('h1#title').should('be.visible');
      cy.contains('h1#title', 'HETIC vs EEMI');
    });

    it('should display progress', () => {
      cy.get('span.progress').should('be.visible');
      cy.contains('span.progress', '1/2');
    });

    it('should display choice text', () => {
      cy.get('p').should('be.visible');
      cy.contains('p', 'Plus Éemien ou Héticien ?');
    });

    it('should display question', () => {
      cy.server();
      cy.route('/questions', {
        questions: [{ text: 'test_cypress', answer: 2 }],
      });

      cy.get('h2#question_text').should('be.visible');
      cy.contains('h2#question_text', 'test_cypress');
    });

    it('should display schools', () => {
      cy.server();
      cy.route('/schools', {
        schools: [
          { id: 1, name: 'school1' },
          { id: 2, name: 'school2' },
          { id: 3, name: 'school3' },
        ],
      });

      cy.get('.choice-btn').should('be.visible');
      cy.get('.choice-btn').should('have.length', 2);
      cy.get('.choice-btn')
        .first()
        .should('have.text', 'school1');
    });
  });

  it('should finish game with score 0', () => {
    cy.server();
    cy.route('/schools', {
      schools: [
        { id: 1, name: 'school1' },
        { id: 2, name: 'school2' },
      ],
    });
    cy.route('/questions', {
      questions: [
        { text: 'test_cypress', answer: 2 },
        { text: 'test_cypress', answer: 2 },
      ],
    });

    cy.visit('/');

    cy.contains('#question_text', 'test_cypress');

    cy.get('.choice-btn')
      .first()
      .click();

    cy.get('.choice-btn')
      .first()
      .click();

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/end');
    });

    cy.contains('Score: 0/2');
    cy.contains("T'as pas lu les questions avoues.");
    cy.contains('Recommencer');

    cy.get('#quizz_input').should('not.be.visible'); // Quizz is hidden
    cy.get('#score_screen').should('be.visible'); // Score screen is displayed
  });

  it('should finish game with score 1 and retry', () => {
    cy.server();
    cy.route('/schools', {
      schools: [
        { id: 1, name: 'school1' },
        { id: 2, name: 'school2' },
      ],
    });
    cy.route('/questions', {
      questions: [
        { text: 'test_cypress', answer: 1 },
        { text: 'test_cypress', answer: 1 },
      ],
    });

    cy.visit('/');

    cy.contains('#question_text', 'test_cypress');

    cy.get('.choice-btn')
      .first()
      .click();

    cy.get('.choice-btn')
      .first()
      .click();

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/end');
    });

    cy.contains('Score: 2/2');
    cy.contains("Bon bah c'est pas tip top tout ça.");
    cy.contains('Recommencer');

    cy.get('#quizz_input').should('not.be.visible'); // Quizz is hidden
    cy.get('#score_screen').should('be.visible'); // Score screen is displayed

    cy.get('.replay-btn').click();

    cy.get('#quizz_input').should('be.visible'); // Quizz is visible
    cy.get('#score_screen').should('not.be.visible'); // Score screen is hidden
  });
});
