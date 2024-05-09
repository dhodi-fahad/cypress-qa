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
    },
    video: true,
    retries: {
      runMode: 1,
      openMode: 1
    }
  },
});
