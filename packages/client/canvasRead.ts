const canvas = document.getElementById('canvas');
canvas.width = 280;
canvas.height = 280;

const ctx = canvas.getContext('2d');

const updateAll = () => {
	drawMap();
	console.log('game is running');
	window.requestAnimationFrame(updateAll);
};

window.onload = () => {
	window.requestAnimationFrame(updateAll);
};

function array28() {
	return Array(28).fill(0);
}

const tileW = 40;
const tileH = 40;

const gridRows = 28;
const gridCols = 28;

let map = array28().map(array28);

const drawMap = (ctx) => {
	for (let eachRow = 0; eachRow < gridRows; eachRow++) {
		for (let eachCol = 0; eachCol < gridCols; eachCol++) {
			let arrayIndex = eachRow * gridCols + eachCol;
			if (map[arrayIndex] == 1) {
				ctx.fillStyle = 'red';
				ctx.fillRect(tileW * eachCol, tileH * eachRow, tileW, tileH);
			} else {
				ctx.fillStyle = 'black';
				ctx.fillRect(tileW * eachCol, tileH * eachRow, tileW, tileH);
			}
		}
	}
};

console.log(map);

function createGrid() {
	// small squares
	for (let i = 5; i <= 605; i = i + 6) {
		// vertical
		ctx.moveTo(i, 5);
		ctx.lineTo(i, 605);
		// horizontal
		ctx.moveTo(5, i);
		ctx.lineTo(605, i);

		ctx.strokeStyle = 'f0f0f0';
		ctx.stroke();
	}

	for (let i = 5; i <= 605; i = i + 30) {
		// vertical
		ctx.moveTo(i, 5);
		ctx.lineTo(i, 605);
		// horizontal
		ctx.moveTo(5, i);
		ctx.lineTo(605, i);

		ctx.strokeStyle = 'c0c0c0';
		ctx.stroke();
	}
}
