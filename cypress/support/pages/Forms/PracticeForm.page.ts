/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
class Form {
	get : {
		firstName: () => Cypress.Chainable<JQuery<HTMLElement>>;
		lastName: () => Cypress.Chainable<JQuery<HTMLElement>>;
		email: () => Cypress.Chainable<JQuery<HTMLElement>>;
		mobile: () => Cypress.Chainable<JQuery<HTMLElement>>;
		calendar: () => Cypress.Chainable<JQuery<HTMLElement>>;
		monthSelector: () => Cypress.Chainable<JQuery<HTMLElement>>;
		yearSelector: () => Cypress.Chainable<JQuery<HTMLElement>>;
		validDaysSelector: () => Cypress.Chainable<JQuery<HTMLElement>>;
		subjects: () => Cypress.Chainable<JQuery<HTMLElement>>;
		currentAddress: () => Cypress.Chainable<JQuery<HTMLElement>>;
		gender: () => Cypress.Chainable<JQuery<HTMLElement>>;
		hobbies: () => Cypress.Chainable<JQuery<HTMLElement>>;
		uploadFile: () => Cypress.Chainable<JQuery<HTMLElement>>;
		state: () => Cypress.Chainable<JQuery<HTMLElement>>;
		city: () => Cypress.Chainable<JQuery<HTMLElement>>;
		stateAndCityOptions: () => Cypress.Chainable<JQuery<HTMLElement>>;
		selectedStateOrCity: () => Cypress.Chainable<JQuery<HTMLElement>>;
		submitButton: () => Cypress.Chainable<JQuery<HTMLElement>>;
		modalHeader: () => Cypress.Chainable<JQuery<HTMLElement>>;
	} = {
        firstName: () => cy.get('#firstName'),
		lastName: () => cy.get('#lastName'),
		email: () => cy.get('#userEmail'),
		mobile: () => cy.get('#userNumber'),
		calendar: () => cy.get('#dateOfBirthInput'),
		monthSelector: () => cy.get('.react-datepicker__month-select'),
		yearSelector: () => cy.get('.react-datepicker__year-select'),
		validDaysSelector: () => cy.get('.react-datepicker__week > div:not(.react-datepicker__day--outside-month)'),
		subjects: () => cy.get('#subjectsContainer'),
		currentAddress: () => cy.get('#currentAddress'),
		gender: () => cy.get('.custom-radio > input'),
		hobbies: () => cy.get('.custom-checkbox > input'),
		uploadFile: () => cy.get('#uploadPicture'),
		state: () => cy.get('#state'),
		city: () => cy.get('#city'),
		stateAndCityOptions: () => cy.get('[class$=option]'),
		selectedStateOrCity: () => cy.get('[class$=singleValue'),
		submitButton: () => cy.get('#submit'),
		modalHeader: () => cy.get('.modal-header'),
    };

	completeInputs(firstName: string, lastName: string, email: string, mobile: string, subjects: string, address: string) : void {
		this.get.firstName().type(firstName);
		this.get.lastName().type(lastName);
		this.get.email().type(email);
		this.get.mobile().type(mobile);
		this.get.subjects().type(`${subjects}{enter}`);
		this.get.currentAddress().type(address);
	}
	readSubject(): Cypress.Chainable<string> {
		return this.get.subjects().then(subject => {
			return cy.wrap(subject).invoke('text');
		});
	}
	selectRandomOption(option: () => Cypress.Chainable<JQuery<HTMLElement>>): Cypress.Chainable<{ index: number; value: string }>{
		return option()
			.its('length')
			.then(optionsCount => {
				const randomOption = Math.floor(Math.random() * optionsCount);
				return option()
					.eq(randomOption)
					.invoke('text')
					.then(text => {
						option().eq(randomOption).click({ force: true });
						return cy.wrap({ index: randomOption, value: text });
					});
		});
	}
	getTodayDate() : string {
		const today = new Date();
		const day = today.getDate().toString().padStart(2, '0');
		const month = today.toLocaleString('en-GB', { month: 'short' });
		const year = today.getFullYear();
		return `${day} ${month} ${year}`;
	}
	selectRandomDateOfBirth(): Cypress.Chainable<string> {
        this.get.calendar().click();
        return this.selectRandomMonth().then(month => {
          return this.selectRandomYear().then(year => {
            return this.selectRandomDay().then(day => {
              const formattedDate = `${day} ${month} ${year}`;
              return formattedDate;
            });
          });
        }).then(formattedDate => cy.wrap(formattedDate));
      }
	selectRandomMonth(): Cypress.Chainable<string> {
        return this.get.monthSelector().then($selectMonth => {
          const optionsCount = $selectMonth.find('option').length;
          const randomOption = Math.floor(Math.random() * optionsCount);
          return cy.wrap($selectMonth).select(randomOption).then(() => {
            const fullMonthName = $selectMonth.find('option:selected').text();
            const selectedMonthName = fullMonthName.substring(0, 3);
            return selectedMonthName;
          });
        }).then(selectedMonthName => cy.wrap(selectedMonthName));
    }
	selectRandomYear(): Cypress.Chainable<string> {
        const currentYear = new Date().getFullYear();
        return this.get.yearSelector().then($selectYear => {
          const arrayOfYears = $selectYear.find('option').toArray() as HTMLOptionElement[];
          const validYears = arrayOfYears.filter(years => parseInt(years.text) <= currentYear);
          const randomOption = Math.floor(Math.random() * validYears.length);
          return cy.wrap($selectYear).select(validYears[randomOption].value).then(() => {
            const selectedYearValue = validYears[randomOption].text;
            return selectedYearValue;
          });
        }).then(selectedYearValue => cy.wrap(selectedYearValue));
    }
	selectRandomDay(): Cypress.Chainable<string> {
        return this.get.validDaysSelector().then($days => {
          const optionsCount = $days.length;
          const randomOption = Math.floor(Math.random() * optionsCount);
          return cy.wrap($days).eq(randomOption).invoke('text').then(dayText => {
            return cy.wrap($days).eq(randomOption).click().then(() => {
              const dayNumber = parseInt(dayText, 10);
              const formattedDayText = dayNumber < 10 ? `0${dayNumber.toString()}` : dayText;
              return formattedDayText;
            });
          });
        }).then(formattedDayText => cy.wrap(formattedDayText));
    }
	selectFile(): void {
		this.get.uploadFile().selectFile('cypress/fixtures/images/Typescript_logo.png');
	}
	selectState(option: () => Cypress.Chainable<JQuery<HTMLElement>>): Cypress.Chainable<{ index: number; value: string }> {
		this.get.state().click();
		return this.selectRandomOption(option);
	}
	selectCity(option: () => Cypress.Chainable<JQuery<HTMLElement>>): Cypress.Chainable<{ index: number; value: string }> {
		this.get.city().click();
		return this.selectRandomOption(option);
	}
	submitForm(): void {
		this.get.submitButton().click({ force: true });
	}
}
export const formPage = new Form();