const { defineConfig } = require('cypress');
const { addCucumberPreprocessorPlugin } = require('@badeball/cypress-cucumber-preprocessor');
const { default: createEsbuildPlugin } = require('@bahmutov/cypress-esbuild-preprocessor');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');

module.exports = defineConfig({
  e2e: {
    async setupNodeEvents(on, config) {
      const bundler = createBundler({
        plugins: [createEsbuildPlugin(config)],
      });
      on('file:preprocessor', bundler);
      await addCucumberPreprocessorPlugin(on, config);
      return config;
    },
    specPattern: 'cypress/e2e/**/*.feature',
    baseUrl: 'https://www.saucedemo.com',
    chromeWebSecurity: false,
  },
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports',
    overwrite: false,
    html: true,
    json: true,
  },
});