class ChangePassword {
    get: {
        userDropdownMenu: () => Cypress.Chainable<JQuery<HTMLElement>>;
        changePasswordButton: () => Cypress.Chainable<JQuery<HTMLElement>>;
        currentPasswordInput: () => Cypress.Chainable<JQuery<HTMLElement>>;
        newPasswordInput: () => Cypress.Chainable<JQuery<HTMLElement>>;
        confirmPasswordInput: () => Cypress.Chainable<JQuery<HTMLElement>>;
        saveButton: () => Cypress.Chainable<JQuery<HTMLElement>>;
        cancelButton: () => Cypress.Chainable<JQuery<HTMLElement>>;
        errorMessage: () => Cypress.Chainable<JQuery<HTMLElement>>;
        toastMessage: () => Cypress.Chainable<JQuery<HTMLElement>>
    } = {
        userDropdownMenu: () => cy.get('.oxd-userdropdown-name'),
        changePasswordButton: () => cy.get('a:contains("Change Password")'),
        currentPasswordInput: () => cy.get('[type=password]').eq(0),
        newPasswordInput: () => cy.get('[type=password]').eq(1),
        confirmPasswordInput: () => cy.get('[type=password]').eq(2),
        saveButton: () => cy.get('[type=submit').contains('Save'),
        cancelButton: () => cy.get('[type=button]').contains('Cancel'),
        errorMessage: () => cy.get('.oxd-input-field-error-message'),
        toastMessage: () => cy.get('.oxd-text--toast-message')
    }
    openUserDropdownMenu(): void {
        this.get.userDropdownMenu().click();
    }
    clickChangePasswordButton(): void {
        this.get.changePasswordButton().click();
    }
    fillOutChangePasswordForm(currentPassword?: string , newPassword?: string, confirmPassword?: string): void {
        if (currentPassword !== undefined) {
            this.get.currentPasswordInput().type(currentPassword);
        }
        if (newPassword !== undefined) {
            this.get.newPasswordInput().type(newPassword);
        }
        if (confirmPassword !== undefined) {
            this.get.confirmPasswordInput().type(confirmPassword);
        }
    }
    clickSaveButton(): void {
        this.get.saveButton().click();
    }
    clickCancelButton(): void {
        this.get.cancelButton().click();
    }
}
export const ChangePasswordPage = new ChangePassword();