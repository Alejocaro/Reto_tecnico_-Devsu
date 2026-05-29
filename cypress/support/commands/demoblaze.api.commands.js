const getApiUrl = () => Cypress.env('demoblazeApiUrl');

Cypress.Commands.add('demoblazeApiRequest', (path, payload) => {
  return cy.request({
    method: 'POST',
    url: `${getApiUrl()}${path}`,
    body: payload,
    failOnStatusCode: false,
    headers: {
      'Content-Type': 'application/json',
    },
  });
});

Cypress.Commands.add('demoblazeSignup', (username, password) => {
  return cy.demoblazeApiRequest('/signup', { username, password });
});

Cypress.Commands.add('demoblazeLogin', (username, password) => {
  return cy.demoblazeApiRequest('/login', { username, password });
});
