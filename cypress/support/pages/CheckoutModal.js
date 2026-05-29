const { CHECKOUT_SELECTORS, CONFIRMATION_SELECTORS } = require('../selectors/demoblaze.selectors');
const { assertExistsAndVisible, assertExistsAndVisibleAll } = require('../helpers/elementAssertions');
const { parseAmountFromConfirmation } = require('../helpers/priceUtils');

class CheckoutModal {
  waitForModal() {
    cy.get(CHECKOUT_SELECTORS.MODAL).should('be.visible');
  }

  verifyFormElements() {
    assertExistsAndVisible(CHECKOUT_SELECTORS.MODAL);
    assertExistsAndVisibleAll([
      CHECKOUT_SELECTORS.NAME_INPUT,
      CHECKOUT_SELECTORS.COUNTRY_INPUT,
      CHECKOUT_SELECTORS.CITY_INPUT,
      CHECKOUT_SELECTORS.CARD_INPUT,
      CHECKOUT_SELECTORS.MONTH_INPUT,
      CHECKOUT_SELECTORS.YEAR_INPUT,
      CHECKOUT_SELECTORS.PURCHASE_BTN,
    ]);
  }

  verifyConfirmationElements() {
    assertExistsAndVisibleAll([
      CONFIRMATION_SELECTORS.SWEET_ALERT,
      CONFIRMATION_SELECTORS.TITLE,
      CONFIRMATION_SELECTORS.LEAD_TEXT,
      CONFIRMATION_SELECTORS.OK_BTN,
    ]);
  }

  fillForm({ name, country, city, card, month, year }) {
    cy.get(CHECKOUT_SELECTORS.NAME_INPUT).clear().type(name);
    cy.get(CHECKOUT_SELECTORS.COUNTRY_INPUT).clear().type(country);
    cy.get(CHECKOUT_SELECTORS.CITY_INPUT).clear().type(city);
    cy.get(CHECKOUT_SELECTORS.CARD_INPUT).clear().type(card);
    cy.get(CHECKOUT_SELECTORS.MONTH_INPUT).clear().type(month);
    cy.get(CHECKOUT_SELECTORS.YEAR_INPUT).clear().type(year);
  }

  submitPurchase() {
    cy.get(CHECKOUT_SELECTORS.PURCHASE_BTN).click();
  }

  verifySuccessAlert() {
    cy.get(CONFIRMATION_SELECTORS.SWEET_ALERT).should('be.visible');
    cy.get(CONFIRMATION_SELECTORS.TITLE).should('contain.text', 'Thank you for your purchase!');
  }

  getOrderDetails() {
    return cy.get(CONFIRMATION_SELECTORS.LEAD_TEXT);
  }

  verifyOrderDetailsContainName(fullName) {
    const firstName = fullName.trim().split(/\s+/)[0];

    this.getOrderDetails()
      .should('exist')
      .and('be.visible')
      .invoke('text')
      .then((text) => {
        const match = /Name:\s*(.*?)\s*Date:/.exec(String(text));
        expect(match, 'campo Name presente en confirmación').to.not.be.null;
        const rawDisplayedName = match[1].trim();
        const displayedNameToken = rawDisplayedName
          .split(/\s+/)[0]
          .replace(/[^a-zA-Z]/g, '')
          .toLowerCase();
        const expectedFirstName = firstName
          .replace(/[^a-zA-Z]/g, '')
          .toLowerCase();

        expect(displayedNameToken, 'nombre mostrado en confirmación').to.not.equal('');
        expect(
          expectedFirstName.startsWith(displayedNameToken)
            || displayedNameToken.startsWith(expectedFirstName),
          'nombre mostrado en confirmación (completo/truncado o con variación de formato)',
        ).to.equal(true);
      });
  }

  verifyOrderAmount(expectedAmount) {
    this.getOrderDetails()
      .should('exist')
      .and('be.visible')
      .invoke('text')
      .then((text) => {
        const amount = parseAmountFromConfirmation(text);
        expect(amount, 'importe en confirmación de compra').to.equal(expectedAmount);
      });
  }

  clickOk() {
    cy.get(CONFIRMATION_SELECTORS.OK_BTN).click();
  }
}

module.exports = new CheckoutModal();
