window.addEventListener('load', () => {
	const canvas = document.querySelector('#canvas');
	let context = canvas.getContext('2d');

	// canvas.width = window.innerWidth - 60;
	// canvas.height = window.innerHeight - 60;
	canvas.context.fillStyle = 'white';
	context.fillRect(0, 0, canvas.clientWidth, canvas.height);
	// context.beginPath();
	// context.moveTo(20, 0);
	// context.lineTo(20, 200);
	// context.stroke();
	// variables
	let drawing = false;

	function startPostion(e) {
		drawing = true;
		draw(e);
	}

	function finishPostion(e) {
		drawing = false;
		context.beginPath();
	}

	function draw(e) {
		if (!drawing) {
			return;
		}
		context.lineWidth = 5;
		context.linecap = 'round';

		context.lineTo(e.clientX, e.clientY);
		context.stroke();
		context.beginPath();
		context.moveTo(e.clientX, e.clientY);
	}

	// events
	canvas.addEventListener('mousedown', startPostion);
	canvas.addEventListener('mouseup', finishPostion);
	canvas.addEventListener('mousemove', draw);
});
