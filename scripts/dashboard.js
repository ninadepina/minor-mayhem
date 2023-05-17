const links = document.querySelectorAll('.courses a');

links.forEach((link) => {
	let href = link.getAttribute('href');
	href = href.replace('./', '').replace('.html', '');

	const localStorageItem = localStorage.getItem(href);
	if (localStorageItem !== null) {
		const progress = link.querySelector('.progress');
		progress.classList.add('voltooid');
		progress.textContent = 'Voltooid';
	}
});
