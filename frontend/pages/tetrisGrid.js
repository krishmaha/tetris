// these just define the size of the grid
const row = 20;
const column = 20;

// define the colour of an empty square (can be altered later)
const vacant = '#FFF'

// define the array, which will hold the structure of the grid
let grid = [ ];

// create the rows using a for loop that continues until the number of rows is equal to the const defined above
for (let r = 0; r < row; r++){
    // for each value of r we create an empty array inside the grid array, representing a row
    grid[r] = [ ]

    // to define the columns we also use a for loop
    for(let c = 0; c < column; c++){
        // this indexes the row arrays inside the grid arrays and sets them to vacant as initally they are all empty
        // this will create 20 empty columns inside each row
        grid[r][c] = vacant;
    }
}