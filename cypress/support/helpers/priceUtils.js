const parsePrice = (text) => Number(String(text).replace(/[^\d.]/g, ''));

const parseAmountFromConfirmation = (text) => {
  const match = String(text).match(/Amount:\s*(\d+)/);
  return match ? Number(match[1]) : parsePrice(text);
};

const sumPrices = (prices) => prices.reduce((total, price) => total + price, 0);

module.exports = { parsePrice, parseAmountFromConfirmation, sumPrices };
