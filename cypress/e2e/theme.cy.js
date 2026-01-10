describe("Theme toggle", () => {
  it("toggles theme and persists after reload", () => {
    cy.visit("/", {
      onBeforeLoad(win) {
        win.localStorage.removeItem("aurum.theme");
      },
    });

    cy.get("html").should("have.attr", "data-theme", "light");

    cy.get('[data-cy="theme-toggle"]').click();
    cy.get("html").should("have.attr", "data-theme", "dark");

    cy.reload();
    cy.get("html").should("have.attr", "data-theme", "dark");
  });
});
