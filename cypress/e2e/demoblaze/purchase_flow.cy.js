const homePage      = require('../../support/pages/HomePage');
const productPage   = require('../../support/pages/ProductPage');
const cartPage      = require('../../support/pages/CartPage');
const checkoutModal = require('../../support/pages/CheckoutModal');
const { sumPrices } = require('../../support/helpers/priceUtils');

describe('Demoblaze - Flujo de Compra E2E', () => {
  let checkoutData;
  let productData;
  let capturedPrices = [];

  before(() => {
    cy.fixture('checkout').then((data) => { checkoutData = data; });
    cy.fixture('products').then((data) => { productData = data; });
  });

  beforeEach(() => {
    // Cypress auto-descarta window.alert; aquí validamos alerts esperados del flujo
    cy.on('window:alert', (alertText) => {
      expect(
        ['Product added', 'Please fill out Name and Creditcard.'],
        'mensaje de alert esperado',
      ).to.include(alertText);
    });
  });

  it('Añadir dos productos al carrito, visualizar, completar y finalizar la compra', () => {
    capturedPrices = [];
    // ── Paso 1: Visitar la página principal ───────────────────────────────────
    cy.log('**PASO 1: Visitar la página principal**');
    homePage.visit();
    homePage.waitForProducts();
    homePage.verifyPageElements();
    cy.wait(2000);

    // ── Paso 2: Añadir primer producto ───────────────────────────────────────
    cy.log('**PASO 2: Añadir primer producto al carrito**');
    cy.addProductToCart(productData.demoblaze[0]).then((price) => {
      capturedPrices.push(price);
    });
    productPage.verifyPageElements();
    cy.wait(2000);

    // ── Paso 3: Volver a home y añadir segundo producto ───────────────────────
    cy.log('**PASO 3: Añadir segundo producto al carrito**');
    cy.goHome();
    homePage.waitForProducts();
    homePage.verifyPageElements();
    cy.addProductToCart(productData.demoblaze[1]).then((price) => {
      capturedPrices.push(price);
    });
    productPage.verifyPageElements();
    cy.wait(2000);

    // ── Paso 4: Visualizar el carrito ────────────────────────────────────────
    cy.log('**PASO 4: Visualizar el carrito**');
    cy.goCart();
    cartPage.waitForLoad();
    cartPage.verifyPageElements();

    cartPage.verifyProductPresent(productData.demoblaze[0]);
    cartPage.verifyProductPresent(productData.demoblaze[1]);
    cartPage.getRows().should('exist').and('have.length', 2).and('be.visible');
    cartPage.verifyRowPricesMatch(capturedPrices);
    cartPage.verifyTotalMatchesRowPrices();
    cy.wait(2000);

    // ── Paso 5: Completar el formulario de compra ────────────────────────────
    cy.log('**PASO 5: Completar el formulario de compra**');
    cartPage.clickPlaceOrder();
    cy.wait(2000);
    checkoutModal.waitForModal();
    cy.wait(2000);
    checkoutModal.fillForm(checkoutData); 
    cy.wait(2000);
    checkoutModal.verifyFormElements();
    cy.wait(2000);

    // ── Paso 6: Finalizar la compra ──────────────────────────────────────────
    cy.log('**PASO 6: Finalizar la compra**');
    checkoutModal.submitPurchase();
    checkoutModal.verifySuccessAlert();
    checkoutModal.verifyConfirmationElements();
    checkoutModal.verifyOrderDetailsContainName(checkoutData.name);
    cy.wait(2000);
    cy.then(() => {
      checkoutModal.verifyOrderAmount(sumPrices(capturedPrices));
    });
    checkoutModal.clickOk();
    cy.wait(2000);
  });

  it('No permite finalizar compra con formulario vacío', () => {
    cy.log('**ESCENARIO NEGATIVO: Compra con checkout vacío**');

    // ── Preparación: añadir un producto al carrito ───────────────────────────
    homePage.visit();
    homePage.waitForProducts();
    cy.addProductToCart(productData.demoblaze[0]);
    cy.wait(2000);

    // ── Intento de compra sin completar datos ────────────────────────────────
    cy.goCart();
    cartPage.waitForLoad();
    cartPage.verifyPageElements();
    cartPage.getRows().should('have.length.greaterThan', 0);

    cartPage.clickPlaceOrder();
    checkoutModal.waitForModal();
    checkoutModal.verifyFormElements();

    // No diligenciar ningún campo y pulsar Purchase.
    checkoutModal.submitPurchase();
    cy.wait(2000);

    // No debe aparecer el modal de compra exitosa.
    cy.get('.sweet-alert').should('not.exist');
    cy.get('#orderModal').should('be.visible');
  });

  it('Eliminar producto recalcula total correctamente', () => {
    let firstProductPrice;
    let secondProductPrice;

    cy.log('**ESCENARIO: Eliminar producto y recalcular total**');
    homePage.visit();
    homePage.waitForProducts();

    cy.addProductToCart(productData.demoblaze[0]).then((price) => {
      firstProductPrice = price;
    });
    cy.goHome();
    homePage.waitForProducts();
    cy.addProductToCart(productData.demoblaze[1]).then((price) => {
      secondProductPrice = price;
    });

    cy.goCart();
    cartPage.waitForLoad();
    cartPage.verifyPageElements();
    cartPage.waitForRowCount(2);
    cy.then(() => {
      cartPage.verifyTotalEquals(sumPrices([firstProductPrice, secondProductPrice]));
    });

    cartPage.removeProductByName(productData.demoblaze[0]);
    cartPage.waitForRowCount(1);
    cartPage.verifyProductNotPresent(productData.demoblaze[0]);
    cartPage.verifyProductPresent(productData.demoblaze[1]);
    cy.then(() => {
      cartPage.verifyTotalEquals(secondProductPrice);
    });
    cartPage.verifyTotalMatchesRowPrices();
  });
});
