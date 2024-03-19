// https://docs.cypress.io/api/commands/and
// https://docs.cypress.io/api/commands/click

describe("URL test", () => {
  it("Go to URL", () => {
    // Wrong URL
    cy.visit("http://localhost:3000/hello");
    cy.contains("404 Page Not Found");

    // Correct URL
    cy.visit("http://localhost:3000/");
    cy.contains("Welcome to TMU Classifieds");
  });
});

describe("Logout test", () => {
  it("Visit page and logout", () => {
    cy.visit("http://localhost:3000/");
    cy.contains("Logout").click();
  });

  it("Check logout content", () => {
    cy.visit("http://localhost:3000/items-wanted");
    cy.contains("log in");
    cy.visit("http://localhost:3000/items-for-sale");
    cy.contains("log in");
    cy.visit("http://localhost:3000/academic-services");
    cy.contains("log in").click();
  });
});

describe("Register test", () => {
  it("Visit page and register", () => {
    cy.visit("http://localhost:3000/");
    cy.get("[id=logoutButton]").click();
    cy.contains("Register").click();

    // Short password
    cy.get("[id=registerEmail]").clear().type("hello@test.com");
    cy.get("[id=registerPassword]").clear().type("123");
    cy.get("[id=registerConfirmPassword]").clear().type("123");
    cy.get("[id=registerButton]").click();
    cy.contains("Password must be at least 6 characters long.");

    // Unmatched passwords
    cy.get("[id=registerEmail]").clear().type("hello@test.com");
    cy.get("[id=registerPassword]").clear().type("123456");
    cy.get("[id=registerConfirmPassword]").clear().type("123456789");
    cy.get("[id=registerButton]").click();
    cy.contains("Passwords do not match.");
  });
});

describe("Login test", () => {
  it("Visit page and login", () => {
    cy.visit("http://localhost:3000/");
    cy.get("[id=logoutButton]").click();

    //Wrong email
    cy.get("[id=loginEmail]").clear().type("hello123@test.com");
    cy.get("[id=loginPassword]").clear().type("123456");
    cy.get("[id=loginButton]").click();
    cy.contains("Error: 401 Unauthorized");

    // Wrong password
    cy.get("[id=loginEmail]").clear().type("hello@test.com");
    cy.get("[id=loginPassword]").clear().type("123456789");
    cy.get("[id=loginButton]").click();
    cy.contains("Error: 401 Unauthorized");

    // Login successful
    cy.get("[id=loginEmail]").clear().type("hello@test.com");
    cy.get("[id=loginPassword]").clear().type("123456");
    cy.get("[id=loginButton]").click();
    cy.contains("Some text here to describe the website");
  });
});
