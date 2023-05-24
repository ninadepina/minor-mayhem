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

const progressItems = document.querySelectorAll('.progress');
let completedCount = 0;

progressItems.forEach((item) => {
	if (item.textContent.trim() === 'Voltooid') {
		completedCount++;
	}
});

const progressValue = completedCount * 10;
document.querySelector('.progress_bar').setAttribute('data-progress', progressValue);
document.querySelector('.progress_bar > div').style.width = `${progressValue}%`;
