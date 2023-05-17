const fieldsets = document.querySelectorAll('.enq > fieldset');
const inputs = document.querySelectorAll('input[type="radio"]');
const textarea = document.querySelector('textarea');

inputs.forEach((input) => {
	input.addEventListener('click', () => {
		fieldsets.forEach((fieldset) => {
			fieldset.style.borderColor = 'transparent';
		});
	});
});

textarea.addEventListener('click', () => {
	fieldsets.forEach((fieldset) => {
		fieldset.style.borderColor = 'transparent';
	});
});
