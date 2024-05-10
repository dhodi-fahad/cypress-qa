const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
    },
    reporter:"cypress-mochawesome-reporter",
    reporterOptions: {
      overwrite: false,
      html: false,
      json: true,
      reportDir: "cypress/reports",
      charts: true,
      reportPageTitle: 'Test Report',
      embeddedScreenshots: false,
      inlineAssets: true,
      saveAllAttempts: true,
    },
    video: true,
    videoCompression: 32,
    retries: {
      runMode: 0,
      openMode: 0
    },
    env: {
      baseURL: 'https://www.saucedemo.com/'
    }
  },
});
