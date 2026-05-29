const assertExistsAndVisible = (selector) => {
  cy.get(selector).should('exist').and('be.visible');
};

const assertExistsAndVisibleAll = (selectors) => {
  selectors.forEach((selector) => assertExistsAndVisible(selector));
};

module.exports = { assertExistsAndVisible, assertExistsAndVisibleAll };
