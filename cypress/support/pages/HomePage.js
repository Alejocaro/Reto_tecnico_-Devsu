const { HOME_SELECTORS } = require('../selectors/demoblaze.selectors');
const { assertExistsAndVisible } = require('../helpers/elementAssertions');

class HomePage {
  visit() {
    cy.visit('/');
  }

  waitForProducts() {
    cy.get(HOME_SELECTORS.PRODUCT_CARDS).should('have.length.greaterThan', 0);
  }

  verifyPageElements() {
    assertExistsAndVisible(HOME_SELECTORS.NAV_HOME);
    assertExistsAndVisible(HOME_SELECTORS.NAV_CART);
    cy.get(HOME_SELECTORS.PRODUCT_CARDS).should('exist').and('have.length.greaterThan', 0);
    cy.get(HOME_SELECTORS.PRODUCT_CARDS).first().should('be.visible');
  }

  navigateToCart() {
    cy.get(HOME_SELECTORS.NAV_CART).click();
  }

  navigateToHome() {
    cy.get(HOME_SELECTORS.NAV_HOME).click();
  }

  clickProduct(productName) {
    cy.get(HOME_SELECTORS.PRODUCT_CARDS).contains(productName).click();
  }
}

module.exports = new HomePage();
