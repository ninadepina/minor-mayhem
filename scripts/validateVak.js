import { supports_html5_storage } from './localStorage.js';

const form = document.querySelector('.enq');
const mainElement = form.closest('main').className;

const savedAnswers = localStorage.getItem(mainElement);
if (savedAnswers) {
	const parsedAnswers = JSON.parse(savedAnswers);

	const radios = document.querySelectorAll('input[type="radio"]');
	radios.forEach(function (radio) {
		const fieldName = radio.name;
		const value = radio.value;
		if (parsedAnswers.hasOwnProperty(fieldName) && parsedAnswers[fieldName] === value) {
			radio.checked = true;
		}
	});

	const textarea = document.getElementById('kladblok');
	const kladblokValue = parsedAnswers['kladblok'] || '';
	textarea.value = kladblokValue;
}

form.setAttribute('novalidate', '');

form.addEventListener('submit', function (e) {
	e.preventDefault();

	if (validateForm()) {
		saveAnswers();
		window.location.href = './dashboard.html';
	} else {
		scrollToFirstInvalidFieldset();
	}
});

function validateForm() {
	let isValid = true;

	const fieldsets = document.querySelectorAll('fieldset');
	fieldsets.forEach(function (fieldset) {
		const errorElement = fieldset.querySelector('.error');
		const radios = fieldset.querySelectorAll('input[type="radio"]');

		let isChecked = false;
		radios.forEach(function (radio) {
			if (radio.checked) {
				isChecked = true;
			}
		});

		if (!isChecked && errorElement) {
			fieldset.classList.add('err');
			errorElement.textContent = 'Je bent deze vraag vergeten te beantwoorden..';
			errorElement.classList.add('error_margin');
			isValid = false;
		} else {
			if (errorElement) {
				fieldset.classList.remove('err');
				errorElement.textContent = '';
				errorElement.classList.remove('error_margin');
			}
		}
	});

	return isValid;
}

function saveAnswers() {
	const answers = {};

	const radioButtons = document.querySelectorAll('input[type="radio"]:checked');
	radioButtons.forEach(function (radioButton) {
		const fieldName = radioButton.name;
		const value = radioButton.value;
		answers[fieldName] = value;
	});

	const textarea = document.getElementById('kladblok');
	const kladblokValue = textarea.value.trim();
	answers['kladblok'] = kladblokValue;

	if (supports_html5_storage()) localStorage.setItem(mainElement, JSON.stringify(answers));
}

function scrollToFirstInvalidFieldset() {
	const fieldsets = document.querySelectorAll('fieldset');

	for (let i = 0; i < fieldsets.length; i++) {
		const fieldset = fieldsets[i];
		const errorElement = fieldset.querySelector('.error');
		const radios = fieldset.querySelectorAll('input[type="radio"]');
		let isChecked = false;

		radios.forEach(function (radio) {
			if (radio.checked) {
				isChecked = true;
			}
		});

		if (!isChecked && errorElement) {
			const yOffset = fieldset.getBoundingClientRect().top + window.pageYOffset - 40;
			window.scrollTo({ top: yOffset, behavior: 'smooth' });
			break;
		}
	}
}
