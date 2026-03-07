describe("Login Flow - Aurum", () => {
  
  beforeEach(() => {
    cy.visit("/login");
  });

  it("✅ Éxito: Debe redirigir al dashboard tras un login exitoso", () => {
    cy.intercept("POST", "**/api/v1/auth/login", {
      statusCode: 200,
      body: { 
        accessToken: "fake-jwt-token-valido",
        user: { email: "test@mail.com" }
      }
    }).as("loginSuccess");

    // Llenamos campos por posición
    cy.get('input').eq(0).type("test@mail.com", { force: true });
    cy.get('input').eq(1).type("123456", { force: true });

    // Click en el botón LOGIN
    cy.contains('button', /LOGIN/i).click();

    cy.wait("@loginSuccess");
    cy.url().should("include", "/dashboard");
  });

  it("❌ Error: Debe mostrar mensaje de error cuando las credenciales fallan (401)", () => {
    // 1. Interceptamos el error 401
    cy.intercept("POST", "**/api/v1/auth/login", {
      statusCode: 401,
      body: { 
        message: "Credenciales incorrectas", // Ajustado a lo que muestra tu pantalla
        status: 401
      }
    }).as("loginError");

    cy.get('input').eq(0).type("error@mail.com", { force: true });
    cy.get('input').eq(1).type("wrongpass", { force: true });

    cy.contains('button', /LOGIN/i).click();

    cy.wait("@loginError");

    // 2. Buscamos el texto EXACTO que se ve en la captura rosada
    // Usamos la clase de Typography de MUI que se ve en tu log de Cypress
    cy.contains("Credenciales incorrectas")
      .should("be.visible")
      .and("have.css", "color", "rgb(211, 47, 47)"); // Opcional: verifica que sea rojo
  });

  it("Login contra el back real", () => {
    // 1. Interceptamos sin simular respuesta (para que vaya al servidor real)
    cy.intercept("POST", "**/api/v1/auth/login").as("loginRequest");

    // 2. Usamos los selectores que SÍ funcionan en tu pantalla
    cy.get('input').eq(0).type("test@aurum.com", { force: true });
    cy.get('input').eq(1).type("12345678", { force: true });

    // 3. El botón dice LOGIN en mayúsculas
    cy.contains("button", /LOGIN/i).click();

    // 4. Esperamos la respuesta del servidor real
    cy.wait("@loginRequest");

    // 5. Verificamos la ruta
    cy.location("pathname").should("eq", "/dashboard");
  });

});