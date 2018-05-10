class cell {
  constructor(i, j, w) {
    this.i = i;
    this.j = j;
    this.w = w;
    this.x = this.j * this.w + 2;
    this.y = this.i * this.w + 2;
    this.revealed = false;
    this.mine = false;
    this.neighborMines = 0;
  }

  findNeighborMines() {
    let count = 0
    if (this.mine == true) {
      return count;
    } else {
      for (let i = -1;i <= 1;i++) {
        let indexI = this.i + i;
        if (indexI < 0 || indexI >= rows) continue;
        for (let j = -1;j <= 1;j++) {
          let indexJ = this.j + j;
          if (indexJ < 0 || indexJ >= cols) continue;
          let neighbor = board[indexI][indexJ];
          if (neighbor.mine) count++;
        }
      }
      this.neighborMines = count;
    }
  }

  cellPressed(i, j) {
    return (i < this.x + w && i > this.x && j < this.y + w && j > this.y);
  }

  revealNeighbor() {
    for (let i = -1;i <= 1;i++) {
      let indexI = this.i + i;
      if (indexI < 0 || indexI >= rows) continue;
      for (let j = -1;j <= 1;j++) {
        let indexJ = this.j + j;
        if (indexJ < 0 || indexJ >= cols) continue;
        if (i == 0 && j == 0) continue;
        let neighbor = board[indexI][indexJ];
        if (!neighbor.mine && !neighbor.revealed) {
          neighbor.revealed = true;
          neighbor.show();
        }
      }
    }
  }

  show() {
  	if (this.mine && this.revealed) {
      fill(0, 197, 172);
      stroke(0, 168, 146);
      strokeWeight(3);
		  ellipse(this.x + (w * 0.5), this.y + (w * 0.5), 25, 25);
  	} else if (this.neighborMines > 0 && this.revealed) {
      fill(0, 197, 172);
      stroke(0, 168, 146);
      strokeWeight(5);
      rect(this.x, this.y, this.w, this.w);
      fill(0, 168, 146);
      textAlign(CENTER);
      stroke(0, 168, 146);
      strokeWeight(1);
      textSize(20)
      text(this.neighborMines, this.x + (this.w * 0.5), this.y + (this.w * 0.7));
    } else if (this.neighborMines == 0 && this.revealed) {
      fill(0, 197, 172);
      stroke(0, 168, 146);
      strokeWeight(5);
      rect(this.x, this.y, this.w, this.w);
      this.revealNeighbor();
    }
  }
}
