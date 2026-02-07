class CheckoutInformationPage {
  get firstNameInput() { return cy.get('#first-name') }
  get lastNameInput() { return cy.get('#last-name') }
  get zipInput() { return cy.get('#postal-code') }
  get continueButton() { return cy.get('#continue') }
  get errorMessage() { return cy.get('[data-test="error"]') }

  fillInfo(firstName, lastName, zip) {
    this.firstNameInput.type(firstName)
    this.lastNameInput.type(lastName)
    this.zipInput.type(zip)
    this.continueButton.click()
  }

  continueWithoutInfo() {
    this.continueButton.click()
  }

  validateError() {
    this.errorMessage.should('be.visible')
  }
}

export default new CheckoutInformationPage()