describe("Routing - /login", () => {
  it("renders login page", () => {
    cy.visit("/login");
    cy.get('[data-cy="page-login"]').should("be.visible");
    cy.contains("Login").should("be.visible");
  });
});
