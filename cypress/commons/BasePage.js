class BasePage {
    clickUntilElementExist(parent, locator, nextButton) {
        cy.get(parent).then(($parent) => {
            if ($parent.find(locator).length) {
                cy.get(locator).should('be.visible').click({ force: true })

            } else {
                cy.get(nextButton).click()
                this.clickUntilElementExist(parent, locator, nextButton)
            }
        })
    }

    clickUntilValueEqual(difference, element) {
        for (let i = 0; i < difference; i++) {
            cy.get(element).click()
        }
    }

    getText(locator) {
        return cy.get(locator).then(($elem) => {
            return $elem.text()
        })
        
    }

}

export default BasePage