import HomePage from "../pages/homePage"
import SearchResultPage from "../pages/SearchResultPage"
import FilterPage from "../pages/FilterPage"
import HotelDetailedPage from "../pages/hotelDetailedPage"

const homePage = new HomePage()
const searchResultPage = new SearchResultPage()
const filterPage = new FilterPage()
const hotelDetailedPage = new HotelDetailedPage()

describe('TC 01', () => {
  it('Add hotel into Favourite successfully', () => {
    cy.visit("")
    cy.fixture('TC01Data').then((data) => {
      homePage.closeAds()
      homePage.searchWithKeyword(data.place)
      homePage.selectXDaysFrTomorrow(data.stayDays)
      homePage.selectRoomAndPeople(data.typeOfTravelers, data.numberOfRoom, data.numberOfPeople)
      homePage.searchHotel()
      searchResultPage.verifyAreaOfXFirstXHotelsContainKeyword(data.numberOfHotelsNeedToVerify, data.place)

      //filter
      filterPage.filterByRoomOffers(data.filter)

      //verify hotel name at detailed page displays correctly
      searchResultPage.getHotelName(data.detailedHotelToCheck).then((hotelNameAtSearch) => {
        cy.log(`hotelNameAtSearch: ${hotelNameAtSearch}`)
        searchResultPage.selectHotel(data.detailedHotelToCheck)
        hotelDetailedPage.getHotelName().then((hotelNameAtDetailed) => {
          cy.log(`hotelNameAtSearch: ${hotelNameAtDetailed}`)
          expect(hotelNameAtSearch).to.eql(hotelNameAtDetailed)
        })
      })

      //verify hotel address at detailed page displays correctly
      hotelDetailedPage.getHotelAddress().then((hotelAddress) => {
        cy.log(`hotelAddress: ${hotelAddress}`)
        expect(hotelAddress).contains(data.place)
      })

      //verify breaskfast included
      hotelDetailedPage.getRoomOfferFilter(data.filter).should('exist')

    })
  })
})