const containers = document.querySelectorAll('.courses .answers');

containers.forEach((container) => {
	const link = container.querySelector('a');
	let href = link.getAttribute('href');
	href = href.replace('./', '').replace('.html', '');

	const storageObj = JSON.parse(localStorage.getItem(href));

	if (storageObj) {
		const parentEl = container.parentElement;
		parentEl.querySelector('.progress').classList.add('voltooid');
		parentEl.querySelector('.progress').textContent = 'Voltooid';

		container.querySelector('.schaal_lesstof').textContent = storageObj.schaal_lesstof;
		container.querySelector('.schaal_uitleg').textContent = storageObj.schaal_uitleg;
		container.querySelector('.schaal_inzicht').textContent = storageObj.schaal_inzicht;
		container.querySelector('.kladblok').textContent = storageObj.kladblok;
	}
});
