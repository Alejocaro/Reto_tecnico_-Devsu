const { HOME_SELECTORS } = require('../selectors/demoblaze.selectors');
const productPage = require('../pages/ProductPage');

Cypress.Commands.add('addProductToCart', (productName) => {
  cy.log(`**Añadiendo al carrito:** ${productName}`);
  cy.get(HOME_SELECTORS.PRODUCT_CARDS).contains(productName).click();
  productPage.waitForLoad();
  return productPage.getPriceAsNumber().then((price) => {
    cy.log(`**Precio capturado:** $${price}`);
    productPage.clickAddToCart();
    return cy.wrap(price);
  });
});

Cypress.Commands.add('goHome', () => {
  cy.log('**Navegando a la página principal**');
  cy.get(HOME_SELECTORS.NAV_HOME).click();
});

Cypress.Commands.add('goCart', () => {
  cy.log('**Navegando al carrito**');
  cy.get(HOME_SELECTORS.NAV_CART).click();
});
