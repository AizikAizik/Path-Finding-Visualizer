import Cell from './cells.js';
import {
    removeFromArray,
    heuristic
} from './utils.js';

import { Timer } from './timer.js';

let width, height;

let row = 50;
let col = 50;
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

    start.wall = false;
    end.wall = false;

    Timer.start(1000, "timer")

    openSet.push(start);

    console.log(grid);
    console.log(openSet);
}

// p5 js draw function
function draw(p5) {
    p5.background(0);

    let winner = 0;
    let current = openSet[winner];

    if (openSet.length) {

        for (let i = 0; i < openSet.length; i++) {
            if (openSet[i].f < openSet[winner].f) {
                winner = i;
            }
        }

        if (current === end) {
            let timerVal = document.getElementById("timer").innerText;
            p5.noLoop();
            alert(`Path Found in ${timerVal} seconds`);
            Timer.setSpeed(0);
            document.getElementById("timer").innerText = `0`;
        }

        removeFromArray(openSet, current);
        closedSet.push(current);

        let neighbours = current.neighbours;

        neighbours.forEach(neighbour => {
            if (!closedSet.includes(neighbour) && !neighbour.wall) {
                let tempG = current.g + 1;

                let newPath = false;

                if (openSet.includes(neighbour)) {
                    if (tempG < neighbour.g) {
                        neighbour.g = tempG;
                        newPath = true;
                    }
                } else {
                    neighbour.g = tempG;
                    newPath = true;
                    openSet.push(neighbour);
                }

                if (newPath) {
                    neighbour.h = heuristic(neighbour, end, p5);
                    neighbour.f = neighbour.g + neighbour.h;
                    neighbour.previous = current;
                }
            }
        });

    } else {
        alert('No path to end destination');
        Timer.setSpeed(0);
        p5.noLoop();
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

    //find the path
    path = [];
    let temp = current;
    path.push(temp);

    while (temp?.previous) {
        path.push(temp.previous);
        temp = temp.previous;
    }

    for (let i = 0; i < path.length; i++) {
        path[i]?.show(p5, width, height, p5.color(0, 0, 255));
    }
}


// load particles
particlesJS.load('particles-js', 'particles.json', function() {
    console.log('callback - particles.js config loaded');
});

// window.setup = setup;
// window.draw = draw;