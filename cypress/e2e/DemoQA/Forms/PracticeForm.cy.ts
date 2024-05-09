import { faker } from '@faker-js/faker';
import { formPage } from '@pages/Forms/PracticeForm.page';
import  FormData  from '../../../fixtures/data/Forms/Forms.json'
import type { fakerData } from '../../../../types/dataTypes';

describe('ToolsQA | Forms | Practice Form', () => {
	const data: fakerData = {
		firstName: faker.person.firstName(),
		lastName: faker.person.lastName(),
		email: faker.internet.email(),
		phoneNumber: faker.string.numeric(10),
		subjects: faker.string.alpha({ length: 1, exclude: ['x', 'y', 'q', 'j', 'f', 'w', 'z'] }),
		address: faker.location.streetAddress(true),
	};
	beforeEach(() => {
		cy.visit(FormData.url);
		cy.url().should('include', FormData.urlContains);
	});
	it('2223 | TC1: Check that the user can fill in the form with correct data', () => {
		//Type inputs
		formPage.completeInputs(data.firstName, data.lastName, data.email, data.phoneNumber, data.subjects, data.address);
		formPage.get.firstName().should('have.value', data.firstName);
		formPage.get.lastName().should('have.value', data.lastName);
		formPage.get.email().should('have.value', data.email);
		formPage.get.mobile().should('have.value', data.phoneNumber);
		formPage.readSubject().then(subjectValue => {
			formPage.get.subjects().invoke('text').should('contain', subjectValue);
		});
		formPage.get.currentAddress().should('have.value', data.address);

		//Select gender from radio buttons
		formPage.selectRandomOption(formPage.get.gender).then($option => {
			formPage.get.gender().eq($option.index).should('be.checked');
		});

		//Check the calendar loads with today´s date
		formPage.get.calendar().invoke('val').should('equal', formPage.getTodayDate());

		//Select a different birth date from the calendar
		formPage.selectRandomDateOfBirth().then(date => {
			formPage.get.calendar().invoke('val').should('include', date);
		});

		//Select 1 hobbie from the different checkboxes
		formPage.selectRandomOption(formPage.get.hobbies).then($option => {
			formPage.get.hobbies().eq($option.index).should('be.checked');
		});

		//Upload a picture file
		formPage.selectFile();
		formPage.get.uploadFile().should('contain.value', FormData.image);

		//Select a random state
		formPage.selectState(formPage.get.stateAndCityOptions).then(data => {
			formPage.get.selectedStateOrCity().invoke('text').should('contain', data.value);
		});

		//Select a random city
		formPage.selectCity(formPage.get.stateAndCityOptions).then(data => {
			formPage.get.selectedStateOrCity().eq(1).invoke('text').should('contain', data.value);
		});

		//submit Form
		formPage.submitForm();
		formPage.get.modalHeader().should('be.visible').and('have.text', FormData.successMessage);
	});
});
