import homePage from "../pages/homePage";
import searchResultPage from "../pages/searchResultPage";

describe("Search By Enter", () => {
  it("Search Successfully With Existed Keyword", () => {
    cy.visit("");
    cy.fixture("testData").then((data) => {
      homePage.searchByEnter(data.keyword);
      searchResultPage.searchResultContainsSearchKeyword(data.keyword);
    });
  });
});
