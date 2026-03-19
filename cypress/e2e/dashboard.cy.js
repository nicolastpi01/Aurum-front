describe("Dashboard - Accounts Listing", () => {
  
  beforeEach(() => {
    // Stub login API para poder acceder al dashboard
    cy.intercept("POST", "**/api/v1/auth/login", {
      statusCode: 200,
      body: { accessToken: "fake-jwt-token-test" }
    }).as("loginSuccess");

    // Login
    cy.visit("/login");
    cy.get('input').eq(0).type("test@aurum.com", { force: true });
    cy.get('input').eq(1).type("password123", { force: true });
    cy.contains("button", /LOGIN/i).click();
    cy.wait("@loginSuccess");

    // Redirige a dashboard
    cy.url().should("include", "/dashboard");
  });

  it("Intercept exitoso: Renderiza stub de cuentas (3 filas)", () => {
    // Stub de 3 cuentas
    cy.intercept("GET", "**/api/v1/accounts", {
      statusCode: 200,
      body: [
        {
          id: 1,
          currency: "ARS",
          balance: 1500.50,
          status: "ACTIVE",
          userId: 123
        },
        {
          id: 2,
          currency: "USD",
          balance: 2500.75,
          status: "ACTIVE",
          userId: 123
        },
        {
          id: 3,
          currency: "EUR",
          balance: 10000.00,
          status: "ACTIVE",
          userId: 123
        }
      ]
    }).as("getAccounts");

    cy.visit("/dashboard");
    cy.wait("@getAccounts");

    // Verificar que el dashboard está visible
    cy.get('[data-cy="page-dashboard"]').should("be.visible");
    cy.contains("Tus cuentas bancarias:").should("be.visible");

    // Verificar que se renderizan exactamente 3 cuentas
    cy.get(".MuiCard-root").should("have.length", 3);

    // Verificar contenido específico de cada cuenta
    cy.contains("Cuenta ID: 1 - ARS").should("be.visible");
    cy.contains("Balance: $1500.5 | Estado: ACTIVE").should("be.visible");

    cy.contains("Cuenta ID: 2 - USD").should("be.visible");
    cy.contains("Balance: $2500.75 | Estado: ACTIVE").should("be.visible");

    cy.contains("Cuenta ID: 3 - EUR").should("be.visible");
    cy.contains("Balance: $10000 | Estado: ACTIVE").should("be.visible");
  });

  it("Intercept error 500: Muestra mensaje de error acorde", () => {
    cy.intercept("GET", "**/api/v1/accounts", {
      statusCode: 500,
      body: { message: "Internal Server Error" }
    }).as("getAccountsError500");

    cy.visit("/dashboard");
    cy.wait("@getAccountsError500");

    // Verificar que muestra alert de error
    cy.get(".MuiAlert-root").should("be.visible");
    cy.contains("Error interno del servidor").should("be.visible");
  });

  it("Intercept error 401: Redirige a login", () => {
    cy.intercept("GET", "**/api/v1/accounts", {
      statusCode: 401,
      body: { message: "Unauthorized" }
    }).as("getAccountsError401");

    cy.visit("/dashboard");
    cy.wait("@getAccountsError401");

    // Debe redirigir a login
    cy.location("pathname").should("eq", "/login");
  });

});
