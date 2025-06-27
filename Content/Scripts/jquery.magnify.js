function magnify(imgElement, zoom) {
	const glass = setupGlass();
	const container = imgElement.parentNode;
	container.addEventListener('mousemove', moveMagnifier, false);
	function moveMagnifier(e) {
		const style = glass.style;
		const x = e.pageX - this.offsetLeft - 384 /*  384px - width of the menu on the left side */;
		const y = e.pageY - this.offsetTop - 70 + document.querySelector('.body-container').scrollTop /*  105px - height of the page header */;
		const imgWidth = imgElement.width;
		const imgHeight = imgElement.height;
		const glassHeight = glass.getBoundingClientRect().height;
		const glassWidth = glass.getBoundingClientRect().width;
		let xPerc = (x / imgWidth) * 100;
		let yPerc = (y / imgHeight) * 100;
		// // Add some margin for right edge
		if (x > 0.01 * imgWidth) {
			xPerc += 0.15 * xPerc;
		}
		// // Add some margin for bottom edge
		if (y >= 0.01 * imgHeight) {
			yPerc += 0.15 * yPerc;
		}
		const xDelta = x < 0.5 * imgWidth ? -5 : -13;
		const yDelta = y <= 0.5 * imgHeight ? -9 : -15;
		// Set the background of the magnified image horizontal
		style.backgroundPositionX = `${xPerc + xDelta}%`;
		// Set the background of the magnified image vertical
		style.backgroundPositionY = `${yPerc + yDelta}%`;
		// Move the magnifying glass with the mouse movement.
		// 0.425 - experimantal delta
		style.left = `${x - glassWidth * 0.425}px`;
		style.top = `${y - glassHeight * 0.425}px`;
	}
	function setupGlass() {
		/*create magnifier glass:*/
		const glass = document.createElement('div');
		glass.classList.add('img-magnifier-glass');
		// /*set background properties for the magnifier glass:*/
		glass.style.backgroundImage = `url('${imgElement.src}')`;
		glass.style.backgroundRepeat = 'no-repeat';
		glass.style.backgroundSize = `${imgElement.width *
			zoom}px ${(imgElement.height || imgElement.width * 0.505) * zoom}px`;
		imgElement.parentElement.appendChild(glass);
		return glass;
		}
}
function setupMagnify(className = '.myimage') {
	const images = document.querySelectorAll(className);
	images.forEach(image => magnify(image, 3));
		}