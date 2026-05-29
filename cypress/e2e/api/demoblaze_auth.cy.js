describe('Demoblaze API - Signup y Login', () => {
  let authData;
  let createdUsername;

  before(() => {
    authData = {
      usernamePrefix: Cypress.env('apiUsernamePrefix'),
      password: Cypress.env('apiPassword'),
      invalidPassword: Cypress.env('apiInvalidPassword'),
    };

    expect(authData.password, 'API_PASSWORD configurado').to.be.a('string').and.not.be.empty;
    expect(authData.invalidPassword, 'API_INVALID_PASSWORD configurado').to.be.a('string').and.not.be.empty;
  });

  it('Crear un nuevo usuario en signup', () => {
    createdUsername = `${authData.usernamePrefix}_${Date.now()}_${Cypress._.random(1000, 9999)}`;

    cy.log(`request.signup.username=${createdUsername}`);
    cy.demoblazeSignup(createdUsername, authData.password).then((response) => {
      cy.log(`response.signup.new=${JSON.stringify(response.body)}`);
      expect(response.status).to.equal(200);
      expect(response.body?.errorMessage, 'signup sin errorMessage').to.be.undefined;
    });
  });

  it('Intentar crear un usuario ya existente en signup', () => {
    cy.log(`request.signup.existing.username=${createdUsername}`);
    cy.demoblazeSignup(createdUsername, authData.password).then((response) => {
      cy.log(`response.signup.existing=${JSON.stringify(response.body)}`);
      expect(response.status).to.equal(200);
      expect(response.body?.errorMessage, 'mensaje de usuario existente').to.match(/already exist/i);
    });
  });

  it('Usuario y password correcto en login', () => {
    cy.log(`request.login.valid.username=${createdUsername}`);
    cy.demoblazeLogin(createdUsername, authData.password).then((response) => {
      cy.log(`response.login.valid=${JSON.stringify(response.body)}`);
      expect(response.status).to.equal(200);
      expect(response.body?.errorMessage, 'login correcto sin errorMessage').to.be.undefined;
      expect(response.body, 'body de login correcto').to.not.be.undefined;
    });
  });

  it('Usuario y password incorrecto en login', () => {
    cy.log(`request.login.invalid.username=${createdUsername}`);
    cy.demoblazeLogin(createdUsername, authData.invalidPassword).then((response) => {
      cy.log(`response.login.invalid=${JSON.stringify(response.body)}`);
      expect(response.status).to.equal(200);
      expect(response.body?.errorMessage, 'mensaje de credenciales invalidas').to.match(/wrong password|user does not exist/i);
    });
  });
});
