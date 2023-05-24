import { supports_html5_storage } from './localStorage.js';

const form = document.querySelector('#info_form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const studentnummerInput = document.querySelector('#studentnummer');

form.setAttribute('novalidate', '');

document.addEventListener('DOMContentLoaded', () => {
	const inputs = document.querySelectorAll('.css-input');

	inputs.forEach((input) => {
		input.classList.remove('css-input');
	});
});

form.addEventListener('submit', function (e) {
	e.preventDefault();

	clearErrorMessages();

	if (nameInput.value.trim() === '') showError(nameInput, 'Je kan dit veld niet leeg laten');

	if (!isValidEmail(emailInput.value.trim())) {
		if (emailInput.value.trim() === '') {
			showError(emailInput, 'Je kan dit veld niet leeg laten');
		} else if (!emailInput.value.includes('@')) {
			showError(emailInput, 'Je mist een @-symbool in je e-mailadres');
		} else if (!hasValidDomain(emailInput.value.trim())) {
			showError(emailInput, 'Je mist een domein (bijv. .com of .nl) in het e-mailadres');
		} else {
			showError(emailInput, 'Weet je zeker dat je e-mailadres klopt? (bijv. jouwnaam@gmail.com)');
		}
	}

	if (!isValidStudentNumber(studentnummerInput.value.trim())) {
		const inputLength = studentnummerInput.value.trim().length;
		const requiredLength = 9;

		if (studentnummerInput.value.trim() === '') {
			showError(studentnummerInput, 'Je kan dit veld niet leeg laten');
		} else if (!containsOnlyDigits(studentnummerInput.value.trim())) {
			showError(studentnummerInput, 'Je studentnummer mag alleen cijfers bevatten');
		} else if (inputLength < requiredLength) {
			const missingDigits = requiredLength - inputLength;
			showError(
				studentnummerInput,
				`Je studentnummer bestaat uit 9 cijfers, je mist nu nog ${missingDigits} cijfer(s)`
			);
		} else {
			showError(studentnummerInput, 'Weet je zeker dat je studentnummer klopt? (bijv. 500812345)');
		}
	}
	if (isFormValid()) form.submit();
});

function showError(input, message) {
	const errorDiv = input.parentNode.querySelector('.error');
	errorDiv.innerText = message;
	input.classList.add('err');
}

function clearErrorMessages() {
	const errorDivs = document.querySelectorAll('.error');
	errorDivs.forEach(function (errorDiv) {
		errorDiv.innerText = '';
	});
}

function isValidEmail(email) {
	const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$/;
	return emailRegex.test(email);
}
function hasValidDomain(email) {
	const parts = email.split('@');
	if (parts.length === 2 && parts[1].includes('.')) {
		return true;
	}
	return false;
}

function isValidStudentNumber(studentnummer) {
	const studentnummerRegex = /^[56]\d{8}$/;
	return studentnummerRegex.test(studentnummer);
}
function containsOnlyDigits(studentnummer) {
	const letterRegex = /[a-zA-Z]/;
	return !letterRegex.test(studentnummer);
}

function isFormValid() {
	const errorDivs = document.querySelectorAll('.error');
	let isValid = true;

	errorDivs.forEach(function (errorDiv) {
		if (errorDiv.innerText !== '') isValid = false;
	});

	const answers = {};

	answers['name'] = nameInput.value;
	answers['email'] = emailInput.value;
	answers['studentnummer'] = studentnummerInput.value;

	if (supports_html5_storage()) localStorage.setItem('user', JSON.stringify(answers));

	return isValid;
}
