/* eslint-disable */
/// <reference types="Cypress" />

context('TODO APP', () => {
  beforeEach(() => {
    cy.visit('/')
      .wait(1000);;
  });

  describe('Listing Tasks', () => {
    it('should list tasks', () => {
      cy.get('[role="button"]')
        .should('have.length', 3);
    });
  });

  describe('Adding Task', () => {
    it('should add task with given data', () => {
      cy.get('#add-task')
        .click();

      cy.get('#task-title')
        .type('Example title');

      cy.get('#task-description')
        .type('Example description');

      cy.get('#save-task')
        .click()
        .wait(1000);

      cy.get('[role="button"]')
        .last()
        .should('contain', 'Example title')
        .should('contain', 'Example description');
    });

    it('should not let user to add task if user does not fill title or description', () => {
      cy.get('#add-task')
        .click();

      cy.get('#save-task')
        .should('be.disabled');

      cy.get('#cancel-save-task')
        .click();
    });
  });

  describe('Updating Task', () => {
    it('should update task with new data', () => {
      cy.get('[role="button"]')
        .last()
        .dblclick();

      cy.get('#task-title')
        .type('{selectall}{backspace}Updated title');

      cy.get('#task-description')
        .type('{selectall}{backspace}Updated description');

      cy.get('#save-task')
        .click()
        .wait(1000);

      cy.get('[role="button"]')
        .last()
        .should('contain', 'Updated title')
        .should('contain', 'Updated description');
    });

    it('should not let user to update task if user does not fill title or description', () => {
      cy.get('[role="button"]')
        .last()
        .dblclick();

      cy.get('#task-title')
        .type('{selectall}{backspace}');

      cy.get('#task-description')
        .type('{selectall}{backspace}');

      cy.get('#save-task')
        .should('be.disabled');

      cy.get('#cancel-save-task')
        .click();
    });

    it('should complete task', () => {
      cy.get('[role="button"]')
        .last()
        .within(() => {
          cy.get('[type="checkbox"]')
            .click()
            .wait(1000);
        });

      cy.get('[role="button"]')
        .last()
        .within(() => {
          cy.get('[type="checkbox"]')
            .should('have.checked');
        });
    });

    it('should uncomplete task', () => {
      cy.get('[role="button"]')
        .last()
        .within(() => {
          cy.get('[type="checkbox"]')
            .click()
            .wait(1000);
        });

      cy.get('[role="button"]')
        .last()
        .within(() => {
          cy.get('[type="checkbox"]')
            .should('not.have.checked');
        });
    });
  });

  describe('Deleting Task', () => {
    it('should delete task', () => {
      cy.get('[role="button"]')
        .last()
        .dblclick();

      cy.get('#delete-task')
        .click()
        .wait(1000);

      cy.get('[role="button"]')
        .should('have.length', 3);
    });
  });

});
/* eslint-enable */
