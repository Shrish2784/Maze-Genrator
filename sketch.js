let board;
const rows = 10;
const cols = 10;
const w = 40;

function setup() {
	createCanvas(405, 405);
	//Creating Board.
	board = new Array(cols);
	for (let i = 0;i < cols;i++) {
		board[i] = new Array(rows);
	}
	//Inserting Cells in the board.
	for (let i = 0;i < rows;i++) {
		for (let j = 0;j < cols;j++) {
			board[i][j] = new cell(i, j, w);
		}
	}
	//Inserting mines in some cells.
	insertMines(10);
	//Find the neighbor mines.
	for (let i = 0;i < rows;i++) {
		for (let j = 0;j < cols;j++) {
			board[i][j].findNeighborMines();
		}
	}
	//Drawing the board.
	background(255);
	for (let i = 0;i < rows;i++) {
		for (let j = 0;j < cols;j++) {
			noFill();
			stroke(0, 168, 146);
			strokeWeight(5);
			rect(board[i][j].x, board[i][j].y, board[i][j].w, board[i][j].w);
		}
	}
	// for (let i = 0;i < rows;i++) {
	// 	for (let j = 0;j < cols;j++) {
	// 		board[i][j].show();
	// 	}
	// }
}

function draw() {
	for (let i = 0;i < rows;i++) {
		for (let j = 0;j < cols;j++) {
			board[i][j].show();
		}
	}
}

function mousePressed() {
	for (let i = 0;i < rows;i++) {
		for (let j = 0;j < cols;j++) {
			let bool = board[i][j].cellPressed(mouseX, mouseY);
			if (bool) {
				board[i][j].revealed = true;
			}
		}
	}
}

function insertMines(numberOfMines) {
	let selectedCells = [];
	for (let n = 0;n < numberOfMines;n++) {
		let number = floor(random(100));
		while (selectedCells.includes(number)) {
			number = floor(random(100));
		}
		let i = floor(number / 10);
		let j = number % 10;
		board[i][j].mine = true;
		selectedCells.push(number);
	}
	// console.log(selectedCells);
}
