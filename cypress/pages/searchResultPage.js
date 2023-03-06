class searchResultPage {
  allSearchResult = "#search";
  searchResultTitles = "//*[@data-header-feature='0']/div/a/h3";
  specificSearchResultTitles = "(//*[@data-header-feature='0']/div/a/h3)[number]";

  searchResultContainsSearchKeyword(keyword) {
    cy.wait(3000).scrollTo("bottom");
    cy.xpath(this.searchResultTitles).then((list) => {
      const numberOfResults = Cypress.$(list).length;
      for (let i = 1; i <= numberOfResults; i++) {
        let specificSearchResult = this.specificSearchResultTitles.replace("number", i);
        cy.xpath(specificSearchResult)
          .scrollIntoView()
          .invoke("text")
          .should('contain', keyword)
      }
    });
  }
}

export default new searchResultPage();
