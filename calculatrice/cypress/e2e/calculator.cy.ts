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

  it("fait une multiplication simple", () => {
    cy.contains("3").click();
    cy.contains("*").click();
    cy.contains("4").click();
    cy.contains("=").click();

    cy.get("div").contains("12");
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

  it("ajoute le calcul à l'historique", () => {
    cy.contains("6").click();
    cy.contains("-").click();
    cy.contains("1").click();
    cy.contains("=").click();

    cy.contains("Historique")
      .parent()
      .within(() => {
        cy.contains("6 - 1 = 5").should("exist");
      });
  });

  it("permet de recharger un ancien calcul depuis l'historique", () => {
    cy.contains("7").click();
    cy.contains("+").click();
    cy.contains("2").click();
    cy.contains("=").click();

    cy.contains("Historique")
      .parent()
      .within(() => {
        cy.contains("7 + 2 = 9").click();
      });

    cy.get("div").contains("9");
  });

  it("efface l'historique", () => {
    cy.contains("8").click();
    cy.contains("+").click();
    cy.contains("1").click();
    cy.contains("=").click();

    cy.contains("Effacer l'historique").click();

    cy.contains("8 + 1 = 9").should("not.exist");
  });

  it("gère plusieurs opérations consécutives", () => {
    cy.contains("5").click();
    cy.contains("+").click();
    cy.contains("5").click();
    cy.contains("=").click(); // 10

    cy.contains("*").click();
    cy.contains("2").click();
    cy.contains("=").click(); // 20

    cy.get("div").contains("20");
  });
});
