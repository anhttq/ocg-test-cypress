import BasePage from "../commons/BasePage"

class NavigationPage extends BasePage {
    userMenu = '[data-element-name="user-menu"]'
    favouriteMenu = '[data-element-name="favorite-menu"]'
    favouriteHotelsList = '[data-element-name="favorites-screen-category"]'
    lastestAddedHotel = "(//*[@data-selenium='favorite-property-card'])[1]"

    goToFavouriteList() {
        cy.get(this.userMenu).click()
        cy.get(this.favouriteMenu).click()
    }

    goToHotelFavouriteList() {
        cy.get(this.favouriteHotelsList).click()
    }

    getLastestAddedHotel() {
        cy.get(this.lastestAddedHotel).click()
    }

}

export default NavigationPage