import BasePage from "../commons/BasePage"

class LoginPage extends BasePage {
    emailTextBox = "#email"
    passwordTextBox = "#password"
    submitButton = '[data-element-name="universal-login-signin-email-button"]'
    
    loginWithAccount(username, password) {
        cy.get(this.emailTextBox).type(username)
        cy.get(this.passwordTextBox).type(password)
        cy.get(this.submitButton).click()
    }

}

export default LoginPage