const { PRODUCT_SELECTORS } = require('../selectors/demoblaze.selectors');
const { assertExistsAndVisible } = require('../helpers/elementAssertions');
const { parsePrice } = require('../helpers/priceUtils');

class ProductPage {
  waitForLoad() {
    cy.get(PRODUCT_SELECTORS.ADD_TO_CART_BTN).should('be.visible');
    this.waitForPrice();
  }

  waitForPrice() {
    cy.get(PRODUCT_SELECTORS.PRICE)
      .should('exist')
      .and('be.visible')
      .and('not.be.empty')
      .invoke('text')
      .should('match', /\$\s*\d+/);
  }

  verifyPageElements() {
    assertExistsAndVisible(PRODUCT_SELECTORS.PRODUCT_TITLE);
    this.verifyPriceDisplayed();
    assertExistsAndVisible(PRODUCT_SELECTORS.ADD_TO_CART_BTN);
  }

  verifyPriceDisplayed() {
    assertExistsAndVisible(PRODUCT_SELECTORS.PRICE);
    cy.get(PRODUCT_SELECTORS.PRICE)
      .invoke('text')
      .should('match', /\$\s*\d+/);
  }

  getPriceAsNumber() {
    this.waitForPrice();
    return cy.get(PRODUCT_SELECTORS.PRICE)
      .invoke('text')
      .then((text) => {
        const price = parsePrice(text);
        expect(price, `precio parseado de "${text.trim()}"`).to.be.greaterThan(0);
        return price;
      });
  }

  getTitle() {
    return cy.get(PRODUCT_SELECTORS.PRODUCT_TITLE);
  }

  clickAddToCart() {
    cy.get(PRODUCT_SELECTORS.ADD_TO_CART_BTN).click();
  }
}

module.exports = new ProductPage();
