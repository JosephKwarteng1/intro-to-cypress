describe("Home Page", () => {
  beforeEach(() => {
    cy.fixture("todos.json").as("todosJSON");
    cy.intercept("GET", "/todos", { fixture: "todos.json" }).as("getTodos");
    cy.visit("/");
  });

  it("should display list of todos", () => {
    cy.contains("Todo App");
    cy.wait("@getTodos");

    cy.get('[data-cy="loading-state"]').should("not.exist");

    cy.get('[data-cy="todos-container"]').should("be.visible");

    cy.get(".todo-item").should("have.length", 3);

    cy.get(".todo-item").each(($el, index) => {
      cy.wrap($el).within(() => {
        if (index === 0) {
          cy.get('[data-cy="todo-title"]').should("contain", "Buy groceries");
          cy.get('[data-cy="todo-description"]').should(
            "contain",
            "Milk, Bread, Eggs, Butter"
          );
          cy.get('[data-cy="todo-priority"]').should("contain", "Priority: 1");
          cy.get('[data-cy="todo-due-date"]').should(
            "contain",
            "Due: 2023-10-15"
          );
        }
      });
    });
  });

  it("should open add-todo-form in a modal when Add button is clicked", () => {
    cy.get('[data-cy="add-todo-btn"]').click();
    cy.get("app-modal").should("be.visible");
  });
});
