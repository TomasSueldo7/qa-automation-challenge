import { normalizeNumber } from '../utils/data.utils.js'

class CheckoutPage {
  get summaryTitle() { return cy.get('.title') }
  get finishButton() { return cy.get('#finish') }
  get confirmationTitle() { return cy.get('.title') }
  get confirmationMessage() { return cy.get('.complete-header') }
  get itemTotal() { return cy.get('[data-test="subtotal-label"]') }
  get tax() { return cy.get('[data-test="tax-label"]') }
  get total() { return cy.get('[data-test="total-label"]') }
  
  validateSummary() {
    this.summaryTitle.should('have.text', 'Checkout: Overview')
  }

  getItemTotal() {
    return this.itemTotal.invoke('text').then((text) => {
      return normalizeNumber(text)
    })
  }

  getTax(){
    return this.tax.invoke('text').then((text) => {
      return normalizeNumber(text)
    })
  }

  getTotal(){
    return this.total.invoke('text').then((text) => {
      return normalizeNumber(text)
    })
  }

  finishPurchase() {
    this.finishButton.click()
  }

  validateConfirmation() {
    this.confirmationTitle.should('have.text', 'Checkout: Complete!')
    this.confirmationMessage.should('have.text', 'Thank you for your order!')
  }

}

export default new CheckoutPage()