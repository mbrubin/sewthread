/* A wrapper class for a vector field (or just "a matrix of vectors") */

class VectorField {
    // expects 'cols' and 'rows' values to be integers greater than zero
    constructor(cols, rows) {
        this.cols = cols;
        this.rows = rows;
        let array = [];
        for (let i = 0; i < this.rows; i++) {
            array[i] = [];
            for(let j = 0; j < this.cols; j++) {
                array[i][j] = createVector(0, 0);
            }
        }
    }

    // returns the item at the (x, y) position in the matrix
    getItem(i, j) {
        return array[i][j];
    }

    // sets the x and y properties of the vector to the x and y value passed in
    setXY(i, j, x, y) {
        array[i][j].x = x;
        array[i][j].y = y;
    }
}