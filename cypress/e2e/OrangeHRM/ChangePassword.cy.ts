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

    it('TC1: Verify that the admin can reset the password successfully', () => {
       ChangePasswordPage.fillOutChangePasswordForm(data.login.password, data.changePassword.newPassword, data.changePassword.newPassword);
       ChangePasswordPage.clickSaveButton();
       ChangePasswordPage.get.toastMessage().should('be.visible').and('have.text', data.messages.toastSuccess);
       cy.url().should('contain', data.PIMEndpoint);
    });
    it('TC2: Verify that an error message is visible when the password has less than 7 characters', () => {
        ChangePasswordPage.fillOutChangePasswordForm(data.login.password, data.changePassword.wrongPassLessThan7, data.changePassword.wrongPassLessThan7);
        ChangePasswordPage.get.errorMessage().should('be.visible').and('have.text', data.messages.lessThan7Characters);
     });
     it('TC3: Verify that an error message is visible when the password has more than 64 characters', () => {
        ChangePasswordPage.fillOutChangePasswordForm(data.login.password, data.changePassword.wrongPassMoreThan64);
        ChangePasswordPage.get.errorMessage().should('be.visible').and('have.text', data.messages.moreThan64Characters);
     });
     it('TC4: Verify that an error message is visible when the password has no numbers', () => {
        ChangePasswordPage.fillOutChangePasswordForm(data.login.password, data.changePassword.wrongPassNoNumber);
        ChangePasswordPage.get.errorMessage().should('be.visible').and('have.text', data.messages.noNumber);
     });
     it('TC5: Verify that an error message is visible when the password has no lower-case character', () => {
        ChangePasswordPage.fillOutChangePasswordForm(data.login.password, data.changePassword.wrongNoLowerCase);
        ChangePasswordPage.get.errorMessage().should('be.visible').and('have.text', data.messages.noLowerCase);
     });
     it('TC6: Verify that an error message is visible when the passwords do not match', () => {
        ChangePasswordPage.fillOutChangePasswordForm(data.login.password, data.changePassword.newPassword, data.changePassword.wrongNoLowerCase);
        ChangePasswordPage.get.errorMessage().should('be.visible').and('have.text', data.messages.notMatchingPassword);
     });
     it.only('TC7: Verify that an error message is visible when the password does not exist', () => {
        ChangePasswordPage.fillOutChangePasswordForm(data.login.username, data.changePassword.newPassword, data.changePassword.newPassword);
        ChangePasswordPage.clickSaveButton();
        ChangePasswordPage.get.toastMessage().should('be.visible').and('have.text', data.messages.toastError);
     });
     it('TC8: Verify that an error message is visible when no data is introduced into the form', () => {
        ChangePasswordPage.clickSaveButton();
        ChangePasswordPage.get.errorMessage().eq(0).should('be.visible').and('have.text', data.messages.emptyField);
        ChangePasswordPage.get.errorMessage().eq(1).should('be.visible').and('have.text', data.messages.emptyField);
        ChangePasswordPage.get.errorMessage().eq(2).should('be.visible').and('have.text', data.messages.notMatchingPassword);
     });
});