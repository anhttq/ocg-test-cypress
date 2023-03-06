class homePage {
  searchBox = "[name='q']";

  searchByEnter(keyword) {
    cy.get(this.searchBox).type(keyword).type("{enter}");
  }
}

export default new homePage();
