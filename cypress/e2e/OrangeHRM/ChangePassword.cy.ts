import data from '../../fixtures/data/OrangeHRM/data.json'
import { loginPage } from '@pages/OrangHRM/Login.page';
import { ChangePasswordPage } from '@pages/OrangHRM/ChangePassword.page';

describe('OrangeHRM | Admin | Change Password', () => {
    beforeEach('Precon: Go to OrangeHRM and Login as an admin', () => {
        cy.visit(`${data.baseUrl}`);
        cy.url().should('contain', data.loginEndpoint);
        loginPage.login(data.login.username, data.login.password);
        cy.url().should('contain', data.dashboardEndpoint)
        ChangePasswordPage.openUserDropdownMenu();
        ChangePasswordPage.clickChangePasswordButton();
        cy.url().should('contain', data.changePasswordEndpoint);
    });

    it('TC1: Verify that the admin can reset the password', () => {
       ChangePasswordPage.fillOutChangePasswordForm(data.login.password, data.changePassword.newPassword, data.changePassword.newPassword);
       ChangePasswordPage.clickSaveButton();
       ChangePasswordPage.get.successMessage().should('be.visible').and('have.text', 'Successfully Saved');
       cy.url().should('contain', data.PIMEndpoint);
    });
    it('TC2: Verify that an error message is visible when the password has less than 7 characters', () => {
        ChangePasswordPage.fillOutChangePasswordForm(data.login.password, data.changePassword.wrongPassLessThan7, data.changePassword.wrongPassLessThan7);
        ChangePasswordPage.get.errorMessage().should('be.visible').and('have.text', 'Should have at least 7 characters');
     });
     it.only('TC3: Verify that an error message is visible when the password has more than 64 characters', () => {
        ChangePasswordPage.fillOutChangePasswordForm(data.login.password, data.changePassword.wrongPassMoreThan64);
        ChangePasswordPage.get.errorMessage().should('be.visible').and('have.text', 'Should not exceed 64 characters');
     });
});