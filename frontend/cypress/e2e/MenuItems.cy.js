describe("Menu Items Fetching and Display", () => {
  it("successfully loads and displays menu items", () => {
    cy.visit("http://localhost:5173/menu");
    cy.intercept("GET", "http://localhost:5000/api/menuitems", {
      fixture: "menuitems.json",
    }); // Mock the API response
    cy.contains("Margherita Pizza");
  });
});
