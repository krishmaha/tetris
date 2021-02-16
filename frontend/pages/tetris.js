// access the canvas
const canvasDisplay = document.getElementById('tetris');

// access the canvas styling properties
const ctx = canvasDisplay.getContext('2d');

// define the size of the grid's squares
const sqz = squaresize = 20;
// these just define the size of the grid
const row = 30;
const column = 30;
// define the colour of an empty square (can be altered later)
const vacant = 'WHITE'

// this uses the canavas styling properties to determine where the square will be drawn and what color it should be
function fillSquare(x, y, colour){
    ctx.fillStyle = colour;
    ctx.fillRect(x*sqz, y*sqz, sqz, sqz);
    ctx.strokeStyle = "black";
    ctx.strokeRect(x*sqz, y*sqz, sqz, sqz)
}


// define the array, which will hold the structure of the grid
let grid = [];

// create the rows using a for loop that continues until the number of rows is equal to the const defined above
for (let r = 0; r < row; r++){
    // for each value of r we create an empty array inside the grid array, representing a row
    grid[r] = []

    // to define the columns we also use a for loop
    for(let c = 0; c < column; c++){
        // this indexes the row arrays inside the grid arrays and sets them to vacant as initally they are all empty
        // this will create 20 empty columns inside each row
        grid[r][c] = vacant;
    }
}

function createGrid(){
    // create the rows
    for(r = 0; r < row; r++){
        //create the columns
        for(c = 0; c<column; c++){
            // fill the squares (c and r represent the loaction but the indexing of the grid represents the colour )
            fillSquare(c,r, grid[r][c])
        }
    }
}

// invoke the function
createGrid()