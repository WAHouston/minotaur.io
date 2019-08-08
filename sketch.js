var cols, rows;
var w = 20;
var grid = [];
var current;
var stack = [];
var player;

function setup() {
  createCanvas(401, 401);
  cols = floor(width / w);
  rows = floor(height / w);
  player = new Player();

  for (var j = 0; j < rows; j++) {
    for (var i = 0; i < cols; i++) {
      var cell = new Cell(i, j);
      grid.push(cell);
    }
  }

  current = grid[0];
}

function draw() {
  background(205);
  player.update();
  player.show();
  for (var i = 0; i < grid.length; i++) {
    grid[i].show();
  }
  for (var i = 0; i < Math.sqrt(grid.length); i++) {
    stroke(0);
    noFill();
    rect(rows * w, i * w, 1, w);
    rect(i * w, cols * w, w, 1);
  }

  current.visited = true;
  var next = current.checkNeighbors();
  if (next) {
    next.visited = true;
    stack.push(current);
    removeWalls(current, next);
    current = next;
  } else if (stack.length > 0) {
    current = stack.pop();
  }
}

function keyPressed() {
  if (keyCode === 87) {
    player.yspeed--;
  } else if (keyCode === 83) {
    player.yspeed++;
  } else if (keyCode === 68) {
    player.xspeed++;
  } else if (keyCode === 65) {
    player.xspeed--;
  }
}

function keyReleased() {
  if (keyCode === 87) {
    player.yspeed++;
  } else if (keyCode === 83) {
    player.yspeed--;
  } else if (keyCode === 68) {
    player.xspeed--;
  } else if (keyCode === 65) {
    player.xspeed++;
  }
}

function index(i, j) {
  if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
    return -1;
  }
  return i + j * cols;
}

function Cell(i, j) {
  this.i = i;
  this.j = j;
  this.walls = [true, true, true, true];
  this.visited = false;
  this.checkNeighbors = function() {
    var neighbors = [];
    var top = grid[index(i, j - 1)];
    var right = grid[index(i + 1, j)];
    var bottom = grid[index(i, j + 1)];
    var left = grid[index(i - 1, j)];

    if (top && !top.visited) {
      neighbors.push(top);
    }
    if (right && !right.visited) {
      neighbors.push(right);
    }
    if (bottom && !bottom.visited) {
      neighbors.push(bottom);
    }
    if (left && !left.visited) {
      neighbors.push(left);
    }

    if (neighbors.length > 0) {
      var r = floor(random(0, neighbors.length));
      return neighbors[r];
    } else {
      return undefined;
    }
  };

  this.show = function() {
    var x = this.i * w;
    var y = this.j * w;
    stroke(0);
    noFill();
    if (this.walls[0]) {
      rect(x, y, w, 1);
    }
    if (this.walls[1]) {
      rect(x + w, y, 1, w);
    }
    if (this.walls[2]) {
      rect(x, y + w, w, 1);
    }
    if (this.walls[3]) {
      rect(x, y, 1, w);
    }
    // if (this.visited) {
    //   noStroke();
    //   fill(255, 0, 255, 100);
    //   rect(x, y, w, w);
    // }
  };
}

function removeWalls(a, b) {
  var x = a.i - b.i;
  var y = a.j - b.j;
  if (x === 1) {
    a.walls[3] = false;
    b.walls[1] = false;
  } else if (x === -1) {
    a.walls[1] = false;
    b.walls[3] = false;
  }
  if (y === 1) {
    a.walls[0] = false;
    b.walls[2] = false;
  } else if (y === -1) {
    a.walls[2] = false;
    b.walls[0] = false;
  }
}
