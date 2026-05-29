const { CART_SELECTORS } = require('../selectors/demoblaze.selectors');
const { assertExistsAndVisibleAll } = require('../helpers/elementAssertions');
const { parsePrice } = require('../helpers/priceUtils');

class CartPage {
  waitForLoad() {
    cy.url().should('include', 'cart.html');
  }

  verifyPageElements() {
    assertExistsAndVisibleAll([
      CART_SELECTORS.TBODY,
      CART_SELECTORS.TOTAL,
      CART_SELECTORS.PLACE_ORDER_BTN,
    ]);
  }

  getTableBody() {
    return cy.get(CART_SELECTORS.TBODY);
  }

  getRows() {
    return cy.get(CART_SELECTORS.TABLE_ROWS);
  }

  getTotal() {
    return cy.get(CART_SELECTORS.TOTAL);
  }

  verifyProductPresent(productName) {
    cy.get(CART_SELECTORS.TBODY).should('contain.text', productName);
  }

  verifyProductNotPresent(productName) {
    cy.get(CART_SELECTORS.TBODY).should('not.contain.text', productName);
  }

  verifyRowPricesMatch(expectedPrices) {
    cy.then(() => {
      const pricesSnapshot = [...expectedPrices];
      cy.get(CART_SELECTORS.ROW_PRICE)
        .should('have.length', pricesSnapshot.length)
        .then(($cells) => {
          const rowPrices = [...$cells].map((cell) => parsePrice(cell.innerText));
          const sortedRowPrices = [...rowPrices].sort((a, b) => a - b);
          const sortedExpected = [...pricesSnapshot].sort((a, b) => a - b);

          expect(
            sortedRowPrices,
            'precios del carrito vs precios capturados (sin depender del orden)',
          ).to.deep.equal(sortedExpected);
        });
    });
  }

  verifyTotalMatchesRowPrices() {
    cy.get(CART_SELECTORS.ROW_PRICE).then(($cells) => {
      const rowSum = [...$cells].reduce(
        (total, cell) => total + parsePrice(cell.innerText),
        0,
      );

      cy.get(CART_SELECTORS.TOTAL)
        .should('exist')
        .and('be.visible')
        .invoke('text')
        .then((totalText) => {
          const displayedTotal = parsePrice(totalText);
          expect(rowSum, 'suma de filas vs total del carrito').to.equal(displayedTotal);
        });
    });
  }

  removeProductByName(productName) {
    cy.contains(`${CART_SELECTORS.TABLE_ROWS} td:nth-child(2)`, productName)
      .parents('tr')
      .find('td:nth-child(4) a')
      .click();
  }

  waitForRowCount(expectedCount) {
    cy.get(CART_SELECTORS.TABLE_ROWS).should('have.length', expectedCount);
  }

  verifyTotalEquals(expectedTotal) {
    cy.get(CART_SELECTORS.TOTAL)
      .should('exist')
      .and('be.visible')
      .invoke('text')
      .then((totalText) => {
        const displayedTotal = parsePrice(totalText);
        expect(displayedTotal, 'total mostrado en carrito').to.equal(expectedTotal);
      });
  }

  clickPlaceOrder() {
    cy.get(CART_SELECTORS.PLACE_ORDER_BTN).click();
  }
}

module.exports = new CartPage();
