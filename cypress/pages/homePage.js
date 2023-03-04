import dateHelper from "../support/dateHelper"
import BasePage from "../commons/BasePage"

class HomePage extends BasePage {

    //ads popup
    closeAdsButton = '.ab-close-button'

    //search field
    searchTextBox = '#textInput'
    searchSuggestOption = '[data-text="destination"]'
    searchButton = "[data-element-name='search-button']"

    //date picker
    chooseDateButton = ".ficon-check-in"
    dayPickerWeekWide = ".DayPicker-Week-Wide"
    startDate = "[aria-label='startDate']"
    endDate = "[aria-label='endDate']"
    nextMonthButton = "[aria-label='Next Month']"

    //room
    chooseRoomButton = ".SearchBoxTextDescription__child"
    addRoomButton = "[data-element-name='occupancy-selector-panel-rooms'][data-selenium='plus']"
    subtractRoomButton = "[data-element-name='occupancy-selector-panel-rooms'][data-selenium='minus']"
    addAdultsButton = "[data-element-name='occupancy-selector-panel-adult'][data-selenium='plus']"
    subtractAdultsButton = "[data-element-name='occupancy-selector-panel-adult'][data-selenium='plus']"
    numberOfRoom = "[data-component='desktop-occ-room-value']"
    numberOfAdults = "[data-component='desktop-occ-adult-value']"

    //room new UX
    updateUXDialog = '.Traveller'

    //room old UX
    typeOfTravelers = "//div[text()='typeOfTravelers']"


    closeAds() {
        cy.get(this.closeAdsButton, { timeout: 10000 }).click()
    }

    searchWithKeyword(keyword) {
        cy.get(this.searchTextBox).type(keyword)
        let desOption = this.searchSuggestOption.replace("destination", keyword)
        cy.get(desOption).click()
    }

    selectXDaysFrTomorrow(numberX) {
        let startDate = this.startDate.replace("startDate", dateHelper.getTomorrow())
        let endDate = this.endDate.replace("endDate", dateHelper.getXDaysFrTomorrow(numberX))
        this.clickUntilElementExist(this.dayPickerWeekWide, startDate, this.nextMonthButton)
        this.clickUntilElementExist(this.dayPickerWeekWide, endDate, this.nextMonthButton)
    }

    selectXDaysFrNextWeekday(weekday, stayDays) {
        let startDate = this.startDate.replace("startDate", dateHelper.getNextWeekday(weekday))
        cy.log(startDate)
        let endDate = this.endDate.replace("endDate", dateHelper.getXDaysFrNextWeekday(weekday, stayDays))
        cy.log(endDate)
        this.clickUntilElementExist(this.dayPickerWeekWide, startDate, this.nextMonthButton)
        this.clickUntilElementExist(this.dayPickerWeekWide, endDate, this.nextMonthButton)
    }

    selectDate(checkinDate, checkoutDate) {
        let startDate = this.startDate.replace("startDate", dateHelper.formatDate(checkinDate))
        let endDate = this.endDate.replace("endDate", dateHelper.formatDate(checkoutDate))
        this.clickUntilElementExist(this.dayPickerWeekWide, startDate, this.nextMonthButton)
        this.clickUntilElementExist(this.dayPickerWeekWide, endDate, this.nextMonthButton)
    }

    selectRoomAndPeople(type, numberOfRoom, numberOfAdults) {
        cy.wait(1000)
        cy.isElementExist(this.updateUXDialog).then((exists) => {
            cy.log(`exist: ${exists}`)
            if (exists) {

                let typeOfTravelers = this.typeOfTravelers.replace("typeOfTravelers", type)
                cy.xpath(typeOfTravelers).should('be.visible').click({ force: true })

                cy.get(this.numberOfAdults).invoke('text').as('defaultAdults')
                cy.get('@defaultAdults').then((defaultAdults) => {
                    let difference = numberOfAdults - defaultAdults
                    cy.log(`difference: ${difference}`)
                    if (difference > 0) {
                        this.clickUntilValueEqual(difference, this.addAdultsButton)
                    } else if (difference < 0) {
                        this.clickUntilValueEqual(difference, this.subtractAdultsButton)
                    }
                })

                cy.get(this.numberOfRoom).invoke('text').as('defaultRoom')
                cy.get('@defaultRoom').then((defaultRoom) => {
                    cy.log(`defaultRoom: ${defaultRoom}`)
                    let difference = numberOfRoom - defaultRoom
                    if (difference > 0) {
                        this.clickUntilValueEqual(difference, this.addRoomButton)
                    } else if (difference < 0) {
                        this.clickUntilValueEqual(difference, this.subtractRoomButton)
                    }
                })
                
            } else {
                cy.get(this.numberOfRoom).invoke('text').as('defaultRoom')
                cy.get('@defaultRoom').then((defaultRoom) => {
                    cy.log(`defaultRoom: ${defaultRoom}`)
                    let difference = numberOfRoom - defaultRoom
                    if (difference > 0) {
                        this.clickUntilValueEqual(difference, this.addRoomButton)
                    } else if (difference < 0) {
                        this.clickUntilValueEqual(difference, this.subtractRoomButton)
                    }
                })

                cy.get(this.numberOfAdults).invoke('text').as('defaultAdults')
                cy.get('@defaultAdults').then((defaultAdults) => {
                    let difference = numberOfAdults - defaultAdults
                    cy.log(`difference: ${difference}`)
                    if (difference > 0) {
                        this.clickUntilValueEqual(difference, this.addAdultsButton)
                    } else if (difference < 0) {
                        this.clickUntilValueEqual(difference, this.subtractAdultsButton)
                    }
                })
            }
            
        })

        cy.get(this.chooseRoomButton).click()
    }

    searchHotel() {
        cy.get(this.searchButton).should('be.visible').click({ force: true })
    }

}

export default HomePage