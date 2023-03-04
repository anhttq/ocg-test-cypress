import BasePage from "../commons/BasePage"

class searchResultPage extends BasePage {
    area = "(//*[@data-selenium='area-city'])[number]"
    hotelName = "a[data-element-index='number'] > div:nth-child(1) > div:nth-child(2) > div > header > div > h3"
    firstHotel = '(//ol[@class="hotel-list-container"]/li)[number]/div/a'

    verifyAreaOfXFirstXHotelsContainKeyword(numberHotels, keyword) {
        for (let i = 1; i < numberHotels + 1; i++) {
            let path = this.area.replace("number", i)
            cy.xpath(path).scrollIntoView().should('contain.text', keyword)
        }
    }

    selectHotel(order) {
        let locator = this.firstHotel.replace("number", order)
        cy.xpath(locator).invoke('removeAttr', 'target').click()
    }

    getHotelName(order) {
        let locator = this.hotelName.replace("number", order - 1)
        cy.get(locator).invoke('text').as('innerText')
        return cy.get('@innerText')
    }

}

export default searchResultPage