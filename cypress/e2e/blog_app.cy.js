describe("blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    const user = {
      name: "kera lal babu",
      username: "kerabahadur",
      password: "ilovekera",
    };
    cy.request("POST", "http://localhost:3001/api/users", user);

    cy.visit("http://localhost:5173");
  });

  it("front page can be opened", function () {
    cy.contains("Login to form");
  });

  it("logs in with correct username, password", function () {
    cy.get("#username").type("kerabahadur");
    cy.get("#password").type("ilovekera");
    cy.get("#login-btn").click();

    cy.contains("kerabahadur logged in");
  });

  it("fails login with incorrect password", function () {
    cy.get("#username").type("kerabahadur");
    cy.get("#password").type("ilovemasu");
    cy.get("#login-btn").click();

    cy.contains("Login to form");
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.visit("http://localhost:5173");
      cy.get("#username").type("kerabahadur");
      cy.get("#password").type("ilovekera");
      cy.get("#login-btn").click();
    });

    it("a new blog can be creatd", function () {
      cy.get("#new-blog-btn").click();
      cy.get("#title-input").type("cypress automated blog");
      cy.get("#url-input").type("cypress.com");
      cy.get("#create-btn").click();
      cy.contains("cypress automated blog");
    });

    it("user can upvote a blog", function () {
      cy.get("#new-blog-btn").click();
      cy.get("#title-input").type("cypress automated blog");
      cy.get("#url-input").type("cypress.com");
      cy.get("#create-btn").click();
      cy.contains("cypress automated blog");

      cy.get("#view-btn").click();
      cy.contains("0");
      cy.get("#upvote-btn").click();
      cy.contains("1");
    });

    // it("users can delete their blogs", function () {
    //   cy.get("#delete-btn").click();
    // });
  });
});
