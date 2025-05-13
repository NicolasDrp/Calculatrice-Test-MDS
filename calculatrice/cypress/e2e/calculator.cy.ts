import {} from "cypress";
describe("Calculatrice", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000"); // adapte selon ton port
  });

  it("fait une addition simple", () => {
    cy.contains("1").click();
    cy.contains("+").click();
    cy.contains("2").click();
    cy.contains("=").click();

    cy.get("div").contains("3");
  });

  it("gère une division par 0", () => {
    cy.contains("5").click();
    cy.contains("/").click();
    cy.contains("0").click();
    cy.contains("=").click();

    cy.get("div").contains("Error");
  });

  it("désactive les opérateurs après une erreur", () => {
    cy.contains("5").click();
    cy.contains("/").click();
    cy.contains("0").click();
    cy.contains("=").click();

    cy.contains("+").should("be.disabled");
    cy.contains("-").should("be.disabled");
    cy.contains("*").should("be.disabled");
    cy.contains("/").should("be.disabled");

    // C et un chiffre restent actifs
    cy.contains("C").should("not.be.disabled");
    cy.contains("1").should("not.be.disabled");
  });

  it("efface le display après clic sur C", () => {
    cy.contains("9").click();
    cy.contains("/").click();
    cy.contains("0").click();
    cy.contains("=").click();

    cy.contains("C").click();
    cy.get("div").contains("0");
  });
});
