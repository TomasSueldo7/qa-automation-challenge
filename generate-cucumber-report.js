const report = require('multiple-cucumber-html-reporter')

report.generate({
  jsonDir: 'cypress/reports',
  reportPath: 'cypress/reports',
  displayDuration: true,
  metadata: {
    browser: { name: 'chrome', version: 'latest' },
    device: 'Local machine',
    platform: { name: 'Windows', version: '11' }
  },
  customData: {
    title: 'Desafío QA Automation - Reporte Cucumber',
    data: [
      { label: 'Proyecto', value: 'QA Automation Challenge' },
      { label: 'Fecha', value: new Date().toLocaleString() }
    ]
  }
})