// access the canvas
const canvasDisplay = document.getElementById("tetris1");

// access the canvas styling properties
const ctx = canvasDisplay.getContext("2d");

// access score div
const scoreElement = document.getElementById("score");

const row = 20;
const column = (columnUMN = 10);
const sqz = (squareSize = 25);
const vacant = "WHITE"; // color of an empty square

// this uses the canavas styling properties to determine where the square will be drawn and what color it should be
function fillSquare(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x * sqz, y * sqz, sqz, sqz);

  ctx.strokeStyle = "BLACK";
  ctx.strokeRect(x * sqz, y * sqz, sqz, sqz);
}

// define the array that the grid will hold
let grid = [];
// create the numberOfRowss using a for loop that continues until the number of numberOfRowss is equal to the const defined above
for (r = 0; r < row; r++) {
  grid[r] = [];

  // this indexes the numberOfRows arrays inside the grid arrays and sets them to isVacant as initally they are all empty
  // this will create 20 empty numberOfColumnss inside each numberOfRows
  for (c = 0; c < column; c++) {
    grid[r][c] = vacant;
  }
}

// draw the grid
function drawgrid() {
  // create the number of rows
  for (r = 0; r < row; r++) {
    //create the number of columns
    for (c = 0; c < column; c++) {
      // fill the squares (c and r represent the loaction but the indexing of the grid represents the colour )
      fillSquare(c, r, grid[r][c]);
    }
  }
}

// invoking the function
drawgrid();

// creating pieces and defining their colours

const pieces = [
  [Z, "red"],
  [O, "blue"],
  [I, "green"],
  [S, "yellow"],
  [L, "cyan"],
  [T, "purple"],
  [J, "orange"],
];

// generate random pieces using Math.random()
// index the arrays above to retrieve colour and piece shape
function randomPiece() {
  let r = (randomN = Math.floor(Math.random() * pieces.length));
  return new Piece(pieces[r][0], pieces[r][1]);
}
// instantiate an instance of the piece
let p = randomPiece();

// defines the pieces class

function Piece(tetromino, color) {
  this.tetromino = tetromino;
  this.color = color;

  // we set it to 0 so that the first value of the tetromino array is indexed
  // i.e. we start with the first orienation
  this.tetrominoN = 0;

  //define the active tetromino on the grid
  //by indexing the array of the tetromino passed in with
  // the tetromino number
  this.activeTetromino = this.tetromino[this.tetrominoN];

  // we need to control the pieces
  this.x = 3;
  this.y = -2;
}

// filling a piece

Piece.prototype.fill = function (color) {
  for (r = 0; r < this.activeTetromino.length; r++) {
    for (c = 0; c < this.activeTetromino.length; c++) {
      // here we use an if statement as we only want to draw on unoccupied squares
      // this indexes the matrix and their arrays to determine if there is a 1 or 0 inside
      // as 0 is falsy and 1 is truthy, the following code block will only execute
      // when it views a 1 inside the matrix, and it will draw the square
      // at that specific location on the grid
      if (this.activeTetromino[r][c]) {
        fillSquare(this.x + c, this.y + r, color);
      }
    }
  }
};

// drawing a piece

Piece.prototype.draw = function () {
  this.fill(this.color);
};

// undrawing (removing) a piece

Piece.prototype.unDraw = function () {
  this.fill(vacant);
};

// moving the piece down
Piece.prototype.moveDown = function () {
  // check for a collision
  if (!this.collision(0, 1, this.activeTetromino)) {
    // if there is not a collision, we erase the piece at its current postiion
    // we then increment the y coordinate to move it down and then we redraw it
    this.unDraw();
    this.y++;
    this.draw();
  } else {
    // if there is a collision we need to lock the piece and create a new one
    this.lock();
    p = randomPiece();
  }
};

// moving the piece right
Piece.prototype.moveRight = function () {
  if (!this.collision(1, 0, this.activeTetromino)) {
    this.unDraw();
    this.x++;
    this.draw();
  }
};

// moving the piece left
Piece.prototype.moveLeft = function () {
  // checking for collision again
  if (!this.collision(-1, 0, this.activeTetromino)) {
    // if there is not a collision, we erase the piece at its current postiion
    // we then increment the x coordinate to move it right and then we redraw it
    this.unDraw();
    this.x--;
    this.draw();
  }
};

// rotating the piece
Piece.prototype.rotate = function () {
  // divide the tetromino number by the length of tetrominos to determine
  // the next pattern in the array of pieces
  let nextPattern = this.tetromino[
    (this.tetrominoN + 1) % this.tetromino.length
  ];
  // variable used to define collisions with the wall
  let clash = 0;

  if (this.collision(0, 0, nextPattern)) {
    if (this.x > column / 2) {
      // this if statement determines if it is right wall
      // by taking the x value and seeing if its greater than the number of columns
      clash = -1; // if it is the right wall we need to move the piece to the left
    } else {
      // if its not the right wall it must be the left
      clash = 1; //so we need to move the piece to the right
    }
  }

  if (!this.collision(clash, 0, nextPattern)) {
    // if there is no collision
    // the piece's old postition is undrawn and its new one drawn
    this.unDraw();
    this.x += clash;
    this.tetrominoN = (this.tetrominoN + 1) % this.tetromino.length;
    this.activeTetromino = this.tetromino[this.tetrominoN];
    this.draw();
  }
};
// setting the score variable
let score = 0;

Piece.prototype.lock = function () {
  for (r = 0; r < this.activeTetromino.length; r++) {
    for (c = 0; c < this.activeTetromino.length; c++) {
      // we skip the vacant squares as these don't mean anythin
      if (!this.activeTetromino[r][c]) {
        continue;
      }
      // checks if the pieces locked reach the top of the grid, in which case
      // the game is over
      if (this.y + r < 0) {
        alert("Game Over!!!");
        // we will use this const to redirect to the game over page
        gameOver = true;
        break;
      }
      // lock the piece if it is not game over, by permanently colouring its position
      grid[this.y + r][this.x + c] = this.color;
    }
  }
  // we need to remove full rows as these are point scorers
  for (r = 0; r < row; r++) {
    let isRowFull = true;
    for (c = 0; c < column; c++) {
      isRowFull = isRowFull && grid[r][c] != vacant;
    }
    if (isRowFull) {
      // if the row is full
      // we need to shift all of the rows above it down
      // otherwise there would be a gap at the bottom
      for (y = r; y > 1; y--) {
        for (c = 0; c < column; c++) {
          grid[y][c] = grid[y - 1][c];
        }
      }
      // set the top row to vacant as there will be no pieces there
      // immediately after everything has shifted down
      for (c = 0; c < column; c++) {
        grid[0][c] = vacant;
      }
      // increment the score variable
      // can be assigned a variable number to change depending on level
      score += 10;
    }
  }
  // update the grid with the new values
  drawgrid();

  // update the score
  scoreElement.innerHTML = score;
};

// testing for piece collisions with the side of the grid, other pieces, and the bottom
Piece.prototype.collision = function (x, y, piece) {
  for (r = 0; r < piece.length; r++) {
    for (c = 0; c < piece.length; c++) {
      // disregarding empty squares, indexes the matrix of the piece and if
      // nothing is present i.e. its value is 0, the loop continues
      if (!piece[r][c]) {
        continue;
      }
      // when testing for collisions the the piece will have been moved
      // so we set the coordinates of the new piece after movement
      let newX = this.x + c + x;
      let newY = this.y + r + y;

      // conditions of violating the grids
      if (newX < 0 || newX >= column || newY >= row) {
        return true;
      }

      // we skip any y values less than 0, as they will literally break the game
      if (newY < 0) {
        continue;
      }

      // check if there is piece already in that place
      if (grid[newY][newX] != vacant) {
        return true;
      }
    }
  }
  // if the above conditions, which would violate our game, are all true
  // we return false and break the for loop
  return false;
};







//controlling the pieces
// keycode for arnumberOfRows keys are:
// left arnumberOfRows =	37
// up arnumberOfRows	= 38
// right arnumberOfRows = 39
// down arnumberOfRows =	40

// to control the piece we need an event listener to determine when keys are pressed
// it is defined in all caps to distinguish between user input and internal logic

document.addEventListener("keydown", CONTROL);

function CONTROL(event) {
  if (event.keyCode == 37) {
    p.moveLeft();
    dropStart = Date.now();
  } else if (event.keyCode == 38) {
    p.rotate();
    dropStart = Date.now();
  } else if (event.keyCode == 39) {
    p.moveRight();
    dropStart = Date.now();
  } else if (event.keyCode == 40) {
    p.moveDown();
  }
}

// drop the piece every second, we could make this a variable which changes depending on difficulty
// and just use an object with key:value pairs to determine the drop rate

let dropStart = Date.now();
let gameOver = false;
function drop() {
  let now = Date.now();
  let delta = now - dropStart;
  if (delta > 1000) {
    p.moveDown();
    dropStart = Date.now();
  }
  if (!gameOver) {
    requestAnimationFrame(drop);
  }
}

drop();
