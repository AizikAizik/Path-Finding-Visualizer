import Cell from './cells.js';
import {
    removeFromArray,
    heuristic
} from './utils.js';

let width, height;

let row = 25;
let col = 25;
let grid = new Array(col);

// cells visited or unvisited
let openSet = [];
let closedSet = [];

let start = 0;
let end = 0;

let path = [];

new p5(function (p5) {
    p5.setup = () => setup(p5);

    p5.draw = () => draw(p5);
})

// p5 js set-up function
function setup(p5) {
    p5.createCanvas(400, 400);
    console.log("A* Algorithm!!");

    // set height and width of the grids
    width = p5.width / col;
    height = p5.height / row;

    // creating a 2D Array
    for (let i = 0; i < grid.length; i++) {
        grid[i] = new Array(row);
    }

    for (let i = 0; i < col; i++) {
        for (let j = 0; j < row; j++) {
            grid[i][j] = new Cell(i, j);
        }
    }

    // add neigbours for each cell
    for (let i = 0; i < col; i++) {
        for (let j = 0; j < row; j++) {
            grid[i][j].addNeighbours(grid, col, row);
        }
    }

    start = grid[0][0];
    end = grid[col - 1][row - 1];

    openSet.push(start);

    console.log(grid);
    console.log(openSet);
}

// p5 js draw function
function draw(p5) {
    p5.background(0);

    if (openSet.length) {
        let winner = 0;
        for (let i = 0; i < openSet.length; i++) {
            if (openSet[i].f < openSet[winner].f) {
                winner = i;
            }
        }

        let current = openSet[winner];

        if (current === end) {
            //find the path
            path = [];
            let temp = current;
            path.push(temp);

            while (temp.previous) {
                path.push(temp.previous);
                temp = temp.previous;
            }

            p5.noLoop();
            alert('Path Found!!');
        }

        removeFromArray(openSet, current);
        closedSet.push(current);

        let neighbours = current.neighbours;

        neighbours.forEach(neighbour => {
            if (!closedSet.includes(neighbour)) {
                let tempG = current.g + 1;

                if (openSet.includes(neighbour)) {
                    if (tempG < neighbour.g) {
                        neighbour.g = tempG;
                    }
                } else {
                    neighbour.g = tempG;
                    openSet.push(neighbour);
                }

                neighbour.h = heuristic(neighbour, end, p5);
                neighbour.f = neighbour.g + neighbour.h;
                neighbour.previous = current;
            }
        });

    } else {

    }

    for (let i = 0; i < col; i++) {
        for (let j = 0; j < row; j++) {
            grid[i][j].show(p5, width, height, p5.color(255));
        }
    }

    // check closed sets
    for (let i = 0; i < closedSet.length; i++) {
        closedSet[i].show(p5, width, height, p5.color(255, 0, 0));
    }

    // check opened sets
    for (let i = 0; i < openSet.length; i++) {
        openSet[i].show(p5, width, height, p5.color(0, 255, 0));
    }

    for (let i = 0; i < path.length; i++) {
        path[i].show(p5, width, height, p5.color(0, 0, 255));
    }
}

// window.setup = setup;
// window.draw = draw;