describe("Account Movements - E2E Real", () => {
  
  it("E2E real: Login y navegación a movimientos de cuenta real", () => {
    // Configurar intercept ANTES de visitar login
    cy.intercept("GET", "**/api/v1/accounts").as("getAccountsReal");
    
    // Login real contra el backend SIN stubs
    cy.visit("/login");
    cy.get('input').eq(0).type(Cypress.env("TEST_USER"), { force: true });
    cy.get('input').eq(1).type(Cypress.env("TEST_PASS"), { force: true });
    cy.contains("button", /LOGIN/i).click();
    
    // Esperar redirección automática al dashboard después del login exitoso
    cy.url().should("include", "/dashboard");

    // Esperar llamada real al API de cuentas (ya debería estar configurado)
    cy.wait("@getAccountsReal").then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      expect(interception.response.body).to.be.an('array');
      expect(interception.response.body.length).to.be.greaterThan(0);
    });

    // Verificar que hay al menos una cuenta
    cy.get(".MuiCard-root").should("have.length.greaterThan", 0);

    // Configurar intercept de movimientos ANTES del click
    cy.intercept("GET", "**/api/v1/accounts/*/movements*").as("getMovementsReal");

    // Tomar el primer botón de "Ver Movimientos" y hacer click
    cy.get('[data-cy^="btn-view-movements-"]').first().click();

    // Verificar que la página de movimientos se abre
    cy.get('[data-cy="page-account-movements"]').should("be.visible");
    cy.contains("Movimientos de Cuenta #").should("be.visible");

    // Esperar llamada real al API de movimientos (ya debería estar configurado)
    cy.wait("@getMovementsReal").then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
    });

    // Verificar que se muestra el mensaje de no hay movimientos
    cy.contains("No hay movimientos para esta cuenta.").should("be.visible");
    cy.contains("Total: 0 movimientos").should("be.visible");

    // Verificar botón de volver al dashboard
    cy.contains("Volver al Dashboard").should("be.visible");
  });

});