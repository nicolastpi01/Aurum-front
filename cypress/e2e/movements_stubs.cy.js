describe("Account Movements - Stubs", () => {
  
  beforeEach(() => {
    // Stub login API para poder acceder al dashboard
    cy.intercept("POST", "**/api/v1/auth/login", {
      statusCode: 200,
      body: { accessToken: "fake-jwt-token-test" }
    }).as("loginSuccess");

    // Stub de cuentas para que esté disponible antes del login
    cy.intercept("GET", "**/api/v1/accounts", {
      statusCode: 200,
      body: [
        {
          id: 1,
          currency: "ARS",
          balance: 1500.50,
          status: "ACTIVE",
          userId: 123
        }
      ]
    }).as("getAccounts");

    // Login
    cy.visit("/login");
    cy.get('input').eq(0).type("test@aurum.com", { force: true });
    cy.get('input').eq(1).type("password123", { force: true });
    cy.contains("button", /LOGIN/i).click();
    cy.wait("@loginSuccess");

    // Redirige a dashboard
    cy.url().should("include", "/dashboard");
    cy.wait("@getAccounts");
  });

  it("Intercept exitoso: Renderiza 15 movimientos con paginación funcional", () => {
    // Stub de movimientos (página 1 - primeros 10)
    cy.intercept("GET", "**/api/v1/accounts/1/movements?page=0&size=10", {
      statusCode: 200,
      body: {
        content: Array.from({ length: 10 }, (_, i) => ({
          id: i + 1,
          entryType: i % 2 === 0 ? "CREDIT" : "DEBIT",
          amount: (i + 1) * 100,
          currency: "ARS",
          description: `Movimiento ${i + 1}`,
          balanceAfter: 1500.50 + ((i + 1) * 100 * (i % 2 === 0 ? 1 : -1)),
          createdAt: new Date().toISOString()
        })),
        number: 0,
        size: 10,
        totalPages: 2,
        totalElements: 15
      }
    }).as("getMovementsPage1");

    // Stub de movimientos (página 2 - últimos 5)
    cy.intercept("GET", "**/api/v1/accounts/1/movements?page=1&size=10", {
      statusCode: 200,
      body: {
        content: Array.from({ length: 5 }, (_, i) => ({
          id: i + 11,
          entryType: i % 2 === 0 ? "CREDIT" : "DEBIT",
          amount: (i + 11) * 100,
          currency: "ARS",
          description: `Movimiento ${i + 11}`,
          balanceAfter: 1500.50 + ((i + 11) * 100 * (i % 2 === 0 ? 1 : -1)),
          createdAt: new Date().toISOString()
        })),
        number: 1,
        size: 10,
        totalPages: 2,
        totalElements: 15
      }
    }).as("getMovementsPage2");

    cy.wait("@getAccounts");

    // Click en "Ver Movimientos"
    cy.get('[data-cy="btn-view-movements-1"]').click();
    cy.wait("@getMovementsPage1");

    // Verificar página 1
    cy.get('[data-cy="page-account-movements"]').should("be.visible");
    cy.contains("Movimientos de Cuenta #1").should("be.visible");
    cy.contains("Total: 15 movimientos").should("be.visible");
    cy.get("tbody tr").should("have.length", 10);
    cy.contains("Página 1 de 2").should("be.visible");

    // Verificar que el botón "Anterior" está deshabilitado
    cy.get('[data-cy="btn-previous"]').should("be.disabled");
    cy.get('[data-cy="btn-next"]').should("not.be.disabled");

    // Click en "Siguiente"
    cy.get('[data-cy="btn-next"]').click();
    cy.wait("@getMovementsPage2");

    // Verificar página 2
    cy.get("tbody tr").should("have.length", 5);
    cy.contains("Página 2 de 2").should("be.visible");
    cy.get('[data-cy="btn-next"]').should("be.disabled");
    cy.get('[data-cy="btn-previous"]').should("not.be.disabled");

    // Verificar contenido de la tabla
    cy.contains("Movimiento 11").should("be.visible");
    cy.contains("Movimiento 15").should("be.visible");
  });

  it("Intercept error 500: Muestra mensaje de error", () => {
    // Stub de cuenta
    cy.intercept("GET", "**/api/v1/accounts", {
      statusCode: 200,
      body: [
        {
          id: 1,
          currency: "ARS",
          balance: 1500.50,
          status: "ACTIVE",
          userId: 123
        }
      ]
    }).as("getAccounts");

    // Stub de error 500
    cy.intercept("GET", "**/api/v1/accounts/1/movements*", {
      statusCode: 500,
      body: { message: "Internal Server Error" }
    }).as("getMovementsError");

    cy.wait("@getAccounts");

    cy.get('[data-cy="btn-view-movements-1"]').click();
    cy.wait("@getMovementsError");

    // Verificar que muestra alert de error
    cy.get('[data-cy="page-account-movements"]').should("be.visible");
    cy.get(".MuiAlert-root").should("be.visible");
    cy.contains("Error interno del servidor").should("be.visible");
  });

});
