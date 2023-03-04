/// <reference types="Cypress" />
/// <reference types="cypress-xpath" />

// Cypress.Commands.add("clickUntilElementExist", (parent, locator, nextButton) => {
//     cy.get(parent).then(($parent) => {
//         cy.log(locator)
//         cy.log($parent.find(locator).length)
//         if ($parent.find(locator).length) {
//             cy.get(locator).should('be.visible').click({ force: true })

//         } else {
//             cy.get(nextButton).click()
//             this.clickUntilElementExist(parent, locator, nextButton)
//         }
//     })
// }) 

Cypress.Commands.add("isElementExist", (selector) => {
  cy.get('body').then(($body) => {
    if ($body.find(selector).length) {
      return true
    } else {
      return false
    }
  }) 
})
