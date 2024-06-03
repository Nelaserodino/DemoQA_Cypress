class Login {
    get: {
        getUsernameInput: () => Cypress.Chainable<JQuery<HTMLElement>>;
        getPasswordInput: () => Cypress.Chainable<JQuery<HTMLElement>>;
        loginButton: () => Cypress.Chainable<JQuery<HTMLElement>>
    } = {
        getUsernameInput: () => cy.get('[name="username"]'),
        getPasswordInput: () => cy.get('[name="password"]'),
        loginButton: () => cy.get('[type="submit"]')
    }

    login(username:string, password:string): void {
        this.get.getUsernameInput().type(username);
        this.get.getPasswordInput().type(password);
        this.get.loginButton().click();
    }
}
export const loginPage = new Login();