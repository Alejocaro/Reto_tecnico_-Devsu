const { defineConfig } = require('cypress');
require('dotenv').config();

module.exports = defineConfig({
  env: {
    demoblazeApiUrl: process.env.DEMOBLAZE_API_URL || 'https://api.demoblaze.com',
    apiUsernamePrefix: process.env.API_USERNAME_PREFIX || 'qa_auto_user',
    apiPassword: process.env.API_PASSWORD || '',
    apiInvalidPassword: process.env.API_INVALID_PASSWORD || '',
  },
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports',
    overwrite: false,
    html: true,
    json: true,
    charts: true,
    embeddedScreenshots: true,
    inlineAssets: true,
  },
  e2e: {
    baseUrl: 'https://www.demoblaze.com',
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',
    fixturesFolder: 'cypress/fixtures',
    screenshotOnRunFailure: true,
    video: true,
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 12000,
    pageLoadTimeout: 30000,
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      return config;
    },
  },
});
