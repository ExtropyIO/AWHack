class DrawingApp {
	private canvas: HTMLCanvasElement;
	private context: CanvasRenderingContext2D;
	private paint: boolean;

	private clickX: number[] = [];
	private clickY: number[] = [];
	private clickDrag: boolean[] = [];

	constructor() {
		let canvas = document.getElementById('canvas') as HTMLCanvasElement;
		let context = canvas.getContext('2d');
		canvas.height = 280;
		canvas.width = 280;

		this.context = context;
		this.canvas = canvas;

		this.context.fillStyle = 'black';
		this.context.fillRect(0, 0, canvas.width, canvas.height);
		this.context.lineCap = 'round';
		this.context.lineJoin = 'round';
		this.context.strokeStyle = 'white';
		this.context.lineWidth = 20;

		function sleep(ms = 0) {
			return new Promise((resolve) => setTimeout(resolve, ms));
		}
		async function updateAll() {
			console.log('game is running');
			await sleep(1000);
			window.requestAnimationFrame(updateAll);
		}

		window.onload = () => {
			window.requestAnimationFrame(updateAll);
		};

		function array28() {
			let array = [];

			for (let i = 0; i < 28; i++) {
				for (let j = 0; j < 28; j++) {
					let index = ((j * (j * i)) % 28) + i;
					if (i % 2 === 0) {
						array[index] = 1;
					} else {
						array[index] = 0;
					}
				}
			}
			return array;
		}

		const tileW = 10;
		const tileH = 10;

		const gridRows = 28;
		const gridCols = 28;

		// let map = array28().map(array28);
		let map = array28();

		console.log(map);

		this.redraw();
		this.createUserEvents();
	}

	private createUserEvents() {
		let canvas = this.canvas;
		canvas.addEventListener('mousedown', this.pressEventHandler);
		canvas.addEventListener('mousemove', this.dragEventHandler);
		canvas.addEventListener('mouseup', this.releaseEventHandler);
		canvas.addEventListener('mouseout', this.cancelEventHandler);

		canvas.addEventListener('touchstart', this.pressEventHandler);
		canvas.addEventListener('touchmove', this.dragEventHandler);
		canvas.addEventListener('touchend', this.releaseEventHandler);
		canvas.addEventListener('touchcancel', this.cancelEventHandler);

		document
			.getElementById('clear')
			.addEventListener('click', this.clearEventHandler);
	}

	private redraw() {
		let clickX = this.clickX;
		let context = this.context;
		let clickDrag = this.clickDrag;
		let clickY = this.clickY;
		for (let i = 0; i < clickX.length; ++i) {
			context.beginPath();
			if (clickDrag[i] && i) {
				context.moveTo(clickX[i - 1], clickY[i - 1]);
			} else {
				context.moveTo(clickX[i] - 1, clickY[i]);
			}

			context.lineTo(clickX[i], clickY[i]);
			context.stroke();
		}
		context.closePath();
	}

	private addClick(x: number, y: number, dragging: boolean) {
		this.clickX.push(x);
		this.clickY.push(y);
		this.clickDrag.push(dragging);
	}

	private clearCanvas() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.context.fillStyle = 'black';
		this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
		this.clickX = [];
		this.clickY = [];
		this.clickDrag = [];
	}

	private clearEventHandler = () => {
		this.clearCanvas();
	};

	private releaseEventHandler = () => {
		this.paint = false;
		this.redraw();
	};

	private cancelEventHandler = () => {
		this.paint = false;
	};
	private pressEventHandler = (e: MouseEvent | TouchEvent) => {
		let mouseX = (e as TouchEvent).changedTouches
			? (e as TouchEvent).changedTouches[0].pageX
			: (e as MouseEvent).pageX;
		let mouseY = (e as TouchEvent).changedTouches
			? (e as TouchEvent).changedTouches[0].pageY
			: (e as MouseEvent).pageY;
		mouseX -= this.canvas.offsetLeft;
		mouseY -= this.canvas.offsetTop;

		this.paint = true;
		this.addClick(mouseX, mouseY, false);
		this.redraw();
	};

	private dragEventHandler = (e: MouseEvent | TouchEvent) => {
		let mouseX = (e as TouchEvent).changedTouches
			? (e as TouchEvent).changedTouches[0].pageX
			: (e as MouseEvent).pageX;
		let mouseY = (e as TouchEvent).changedTouches
			? (e as TouchEvent).changedTouches[0].pageY
			: (e as MouseEvent).pageY;
		mouseX -= this.canvas.offsetLeft;
		mouseY -= this.canvas.offsetTop;
		if (this.paint) {
			this.addClick(mouseX, mouseY, true);
			console.log([Math.floor(mouseX / 10), Math.floor(mouseY / 10)]);
			this.redraw();
		}

		e.preventDefault();
	};
}

new DrawingApp();
