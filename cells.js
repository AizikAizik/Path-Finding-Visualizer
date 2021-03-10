export default class Cell{

    constructor(i, j){
        this.f = 0;
        this.g = 0;
        this.h = 0;

        this.i = i;
        this.j = j;

        this.neighbours = [] // neighbors of each nodes in the graph
        this.previous = undefined;
    }

    show = (p5, width, height, color) =>{
        p5.fill(color);
        p5.noStroke(0);
        p5.rect(this.i*width, this.j*height, width-1, height-1);
    }

    addNeighbours = (grid, col, row) =>{
        const i = this.i;
        const j = this.j;

        if(i > 0){
            this.neighbours.push(grid[i-1][j]); //up neighbour
        }

        if(i < col -1){
            this.neighbours.push(grid[i+1][j]); //down neighbour
        }

        if(j < row -1){
            this.neighbours.push(grid[i][j+1]); //right neigbour
        }

        if(j > 0){
            this.neighbours.push(grid[i][j-1]); // left neighbour
        }
        
    }

}
