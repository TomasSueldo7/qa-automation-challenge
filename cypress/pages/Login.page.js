class LoginPage {
  get usernameInput() { return cy.get('#user-name') }
  get passwordInput() { return cy.get('#password') }
  get loginButton() { return cy.get('#login-button') }
  get errorMessage() { return cy.get('[data-test="error"]') }

  visit() {
    cy.visit('/')
  }

  login(username, password) {
    this.usernameInput.type(username)
    this.passwordInput.type(password)
    this.loginButton.click()
  }
}

export default new LoginPage()