// SEE tetrisCorrected.js SOME OF THE FUNCTIONS AND CLASSES IN THIS FILE
// WERE MISSING BRACKETS BUT WE HAVE CORRECTED THEM AND REWRITTEN THE CODE

// access the canvas
const canvasDisplay = document.getElementById("tetris");

// access the canvas styling properties
const ctx = canvasDisplay.getContext("2d");

// define the size of the grid's squares
const sqz = 20;
// these just define the size of the grid
const numberOfRows = 30;
const numberOfColumns = 30;
// define the colour of an empty square (can be altered later)
const isVacant = "WHITE";
console.log("the variables have been defined");
// debugger;
// this uses the canavas styling properties to determine where the square will be drawn and what color it should be
function fillSquare(x, y, colour) {
  ctx.fillStyle = colour;
  ctx.fillRect(x * sqz, y * sqz, sqz, sqz);
  ctx.strokeStyle = "black";
  ctx.strokeRect(x * sqz, y * sqz, sqz, sqz);
}

// define the array, which will hold the structure of the grid
let grid = [];

// create the numberOfRowss using a for loop that continues until the number of numberOfRowss is equal to the const defined above
for (r = 0; r < numberOfRows; r++) {
  // for each value of r we create an empty array inside the grid array, representing a numberOfRows
  grid[r] = [];

  // to define the numberOfColumnss we also use a for loop
  for (c = 0; c < numberOfColumns; c++) {
    // this indexes the numberOfRows arrays inside the grid arrays and sets them to isVacant as initally they are all empty
    // this will create 20 empty numberOfColumnss inside each numberOfRows
    grid[r][c] = isVacant;
  }
}

function creategrid() {
  // create the numberOfRowss
  for (r = 0; r < numberOfRows; r++) {
    //create the numberOfColumnss
    for (c = 0; c < numberOfColumns; c++) {
      // fill the squares (c and r represent the loaction but the indexing of the grid represents the colour )
      fillSquare(c, r, grid[r][c]);
    }
  }
}

// invoke the function
creategrid();
console.log("the grid has been created");
// debugger;
// creating the pieces and defining their colours
const pieces = [
  [I, "purple"],
  [J, "yellow"],
  [L, "red"],
  [O, "blue"],
  [S, "orange"],
  [T, "green"],
  [Z, "cyan"],
];

console.log("the pieces in tetris.js with colours are defined");
// debugger;
// generate a random piece
function randomPiece() {
  let ran = (randomNumber = Math.floor(Math.random() * pieces.length));
  return new Piece(pieces[ran][0], pieces[ran][1]);
}

// instantiate an instance of the Piece object
let p = randomPiece();
console.log("a random piece has been  generated and instantiated");
// this function defines the object that wil hold the pieces
function Piece(tetromino, colour) {
  this.tetromino = tetromino;
  this.colour = colour;

  // we set it to 0 so that the first value of the tetromino array is indexed
  // i.e. we start with the first orienation
  this.TetrominoNumber = 0;

  //define the active tetromino on the grid
  //by indexing the array of the tetromino passed in with
  // the tetromino number
  this.activeTetromino = this.tetromino[this.TetrominoNumber];

  // we will use the following variable to control the pieces
  this.x = 3;
  this.y = 2;
}

// filling a piece

Piece.prototype.fill = function (colour) {
  for (r = 0; r < this.activeTetromino.length; r++) {
    for (c = 0; c < this.activeTetromino.length; c++) {
      // here we use an if statement as we only want to draw on unoccupied squares
      // this indexes the matrix and their arrays to determine if there is a 1 or 0 inside
      // as 0 is falsy and 1 is truthy, the following code block will only execute
      // when it views a 1 inside the matrix, and it will draw the square
      // at that specific location on the grid
      if (this.activeTetromino[r][c]) {
        fillSquare(this.x + c, this.y + r, colour);
      }
    }
  }
};

console.log("the piece has been filled with colour");
// debugger;

// drawing a piece
Piece.prototype.draw = function () {
  this.fill(this.colour);
};
console.log("the piece has been drawn");
// debugger;
// undrawing (removing) a piece
Piece.prototype.unDraw = function () {
  this.fill(isVacant);
};

// moving the piece down
Piece.prototype.moveDown = function () {
  // check to see if there is a collision
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
  // check for collision
  if (!this.collision(1, 0, this.activeTetromino)) {
    // if there is not a collision, we erase the piece at its current postiion
    // we then increment the x coordinate to move it right and then we redraw it
    this.unDraw();
    this.x++;
    this.draw();
  }
};

// moving the piece left
Piece.prototype.moveLeft = function () {
  if (this.collision(-1, 0, this.activeTetromino)) {
    this.unDraw();
    this.x++;
    this.draw();
  }
};

Piece.prototype.lock = function () {
  for (r = 0; r < this.activeTetromino.length; r++) {
    for (c = 0; c < this.activeTetromino.length; c++) {
      // we skip the isVacant squares
      if (!this.activeTetromino[r][c]) {
        continue;
      }
      // check if pieces locked reaches the top of the grid
      if (this.y + r < 0) {
        alert("Game Over");
        gameOver = true; // define this const to control redirects
        break;
      }
      // lock the piece if it is not game over, by colouring the grid
      grid[this.y + r][this.x + c] = this.colour;
    }
  }

  // we need to remove full numberOfRowss as these are point scorers
  for (r = 0; r < numberOfRows; r++) {
    let isnumberOfRowsFull = true;
    for (c = 0; c < numberOfColumns; c++) {
      isnumberOfRowsFull = isnumberOfRowsFull && grid[r][c] !== isVacant;
    }
    if (isnumberOfRowsFull) {
      // if the numberOfRows is full we need to shift all of the numberOfRowss above it down
      for (y = r; y > 1; y--) {
        for (c = 0; c < numberOfColumns; c++) {
          grid[y][c] = grid[y - 1][c];
        }
      }
      // set the top numberOfRows to isVacant as it does not need to shift downwards
      for (c = 0; c < numberOfColumns; c++) {
        grid[0][c] = isVacant;
      }

      // increment the score
      // TO DO
    }
  }
  // update the grid
  creategrid();

  // update score
  // TO DO
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

      // conditions of violating grid
      if (newX < 0 || newX >= numberOfColumns || newY >= numberOfRows) {
        return true;
      }

      // we skip any y values less than 0, as they will literally break the game
      if (newY < 0) {
        continue;
      }

      // check if there is piece already in that place
      if (grid[newY][newX] != isVacant) {
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
  function CONTROL(event) {
    if (event.keyCode == 37) {
      p.moveLeft();
      dropStart = Date.now();
      // }else if(event.keyCode == 38){
      //     p.rotate(); TO DO implement rotate function
      dropStart = Date.now();
    } else if (event.keyCode == 39) {
      p.moveRight();
      dropStart = Date.now();
    } else if (event.keyCode == 40) {
      p.moveDown();
    }
  }
}

// drop the piece every 1sec

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
    // requestAnimationFrame(drop); TODO animation
  }
}

drop();
