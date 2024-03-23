describe("UserContext and UserDetails", () => {
  beforeEach(() => {
    // Mock localStorage item for user
    localStorage.setItem("user", JSON.stringify({ id: "123", token: "abc" }));
  });

  it("fetches and displays user details", () => {
    cy.visit("http://localhost:5173/");
    cy.intercept("GET", "http://localhost:5000/api/users/details/123", {
      fixture: "userdetails.json",
    }); // Mock the API response
    cy.contains("John Doe");
  });
});
