import BasePage from "../commons/BasePage"

class filterPage extends BasePage {
    //room offers filter
    breakfastIncluded = "(//*[@data-selenium='filter-item-text'][text()='option'])[1]"

    filterByRoomOffers(option) {
        let locator = this.breakfastIncluded.replace("option", option)
        cy.xpath(locator).click({force: true})
    }

}

export default filterPage