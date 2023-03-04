import BasePage from "../commons/BasePage"

class hotelDetailedPage extends BasePage {
    hotelName = "[data-selenium='hotel-header-name']"
    hotelAddress = '[data-selenium="hotel-address-map"]'

    //room offer
    filterRoomOffer = "//*[text()='option']"
    addToFavouriteButton = "[data-element-name='favorite-heart']"

    getHotelName() {
        cy.get(this.hotelName).invoke('text').as('innerText')
        return cy.get('@innerText')
    }

    getHotelAddress() {
        cy.get(this.hotelAddress).invoke('text').as('innerText')
        return cy.get('@innerText')
    }

    getRoomOfferFilter(option) {
        let locator = this.filterRoomOffer.replace("option", option)
        return cy.xpath(locator).contains(option)
    }

    addHotelToSavedList() {
        cy.get(this.addToFavouriteButton).click()
    }
}

export default hotelDetailedPage