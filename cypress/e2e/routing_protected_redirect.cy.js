describe("Routing - protected routes", () => {
  it("redirects unauthenticated user from /dashboard to /login", () => {
    cy.visit("/dashboard", {
      onBeforeLoad(win) {
        win.localStorage.removeItem("aurum.accessToken");
      },
    });

    // verifica redirección
    cy.location("pathname").should("eq", "/login");

    // verifica que se renderiza login
    cy.get('[data-cy="page-login"]').should("be.visible");
    cy.contains("Login").should("be.visible");
  });
});
