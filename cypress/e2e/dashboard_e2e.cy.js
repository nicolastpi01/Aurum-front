describe("Dashboard E2E - Real Backend", () => {
  
  it("✅ E2E real: Login con backend y validación de cuentas reales", () => {
    // 1. Login real contra el backend con credenciales de desarrollo
    cy.intercept("POST", "**/api/v1/auth/login").as("loginRequest");
    
    cy.visit("/login");
    cy.get('input').eq(0).type(Cypress.env("TEST_USER"), { force: true });
    cy.get('input').eq(1).type(Cypress.env("TEST_PASS"), { force: true });
    cy.contains("button", /LOGIN/i).click();
    
    // 2. Esperar respuesta real del login
    cy.wait("@loginRequest").then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      expect(interception.response.body).to.have.property('accessToken');
    });

    // 3. Verificar redirección al dashboard
    cy.location("pathname").should("eq", "/dashboard");

    // 4. Esperar llamada real al API de cuentas (sin stub)
    cy.intercept("GET", "**/api/v1/accounts").as("getAccountsReal");

    // 5. Visitar dashboard y esperar respuesta real
    cy.visit("/dashboard");
    cy.wait("@getAccountsReal").then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      expect(interception.response.body).to.be.an('array');
      
      // Validar que hay al menos una cuenta
      expect(interception.response.body.length).to.be.greaterThan(0);
      
      // Validar estructura de la primera cuenta
      const account = interception.response.body[0];
      expect(account).to.have.property('id');
      expect(account).to.have.property('currency');
      expect(account).to.have.property('balance');
      expect(account).to.have.property('status');
    });

    // 6. Verificar renderizado en UI de MUI
    cy.get('[data-cy="page-dashboard"]').should("be.visible");
    cy.contains("Tus cuentas bancarias:").should("be.visible");

    // 7. Validar que se renderiza al menos una cuenta real en la UI
    cy.get(".MuiCard-root").should("have.length.greaterThan", 0);

    // 8. Verificar contenido dinámico de las cuentas
    cy.get(".MuiCard-root").first().within(() => {
      cy.contains("Cuenta ID:");
      cy.contains("Balance: $");
      cy.contains("Estado:");
    });

    // 9. Validar que no hay estado de carga o error
    cy.get(".CircularProgress-root").should("not.exist");
    cy.get(".MuiAlert-root").should("not.exist");
  });

});
