const HOME_SELECTORS = {
  NAV_CART:      '#cartur',
  NAV_HOME:      'a.navbar-brand',
  PRODUCT_CARDS: '.card-title a',
};

const PRODUCT_SELECTORS = {
  ADD_TO_CART_BTN: 'a.btn-success',
  PRODUCT_TITLE:   '.name',
  PRICE:           '#tbodyid h3.price-container',
};

const CART_SELECTORS = {
  TBODY:           '#tbodyid',
  TABLE_ROWS:      '#tbodyid tr',
  ROW_TITLE:       '#tbodyid tr td:nth-child(2)',
  ROW_PRICE:       '#tbodyid tr td:nth-child(3)',
  DELETE_LINK:     '#tbodyid tr td:nth-child(4) a',
  TOTAL:           '#totalp',
  PLACE_ORDER_BTN: 'button[data-target="#orderModal"]',
};

const CHECKOUT_SELECTORS = {
  MODAL:        '#orderModal',
  NAME_INPUT:   '#name',
  COUNTRY_INPUT:'#country',
  CITY_INPUT:   '#city',
  CARD_INPUT:   '#card',
  MONTH_INPUT:  '#month',
  YEAR_INPUT:   '#year',
  PURCHASE_BTN: 'button[onclick="purchaseOrder()"]',
};

const CONFIRMATION_SELECTORS = {
  SWEET_ALERT: '.sweet-alert',
  TITLE:       '.sweet-alert h2',
  LEAD_TEXT:   '.sweet-alert p.lead',
  OK_BTN:      '.confirm',
};

module.exports = {
  HOME_SELECTORS,
  PRODUCT_SELECTORS,
  CART_SELECTORS,
  CHECKOUT_SELECTORS,
  CONFIRMATION_SELECTORS,
};
