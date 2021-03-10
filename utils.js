export function removeFromArray(array, element){
    for(let i = array.length -1; i >= 0; i--){
        if(array[i] === element){
            array.splice(i,1);
        }
    }
}

export function heuristic(pointA, pointB, p5){
    const dist = p5.abs(pointA.i - pointB.i) + p5.abs(pointA.j - pointB.j)

    return dist;
}