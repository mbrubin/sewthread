/* A wrapper class for a vector field (or just "a matrix of vectors") */

class VectorField {
    // expects 'cols' and 'rows' values to be integers greater than zero
    constructor(cols, rows) {
        this.cols = cols;
        this.rows = rows;
        this.angles = [];
        for (let i = 0; i < this.cols; i++) {
            this.angles[i] = [];
            // for(let j = 0; j < this.rows; j++) {
            //     this.angles[i][j] = 0;
            // }
        }

        // for keeping track of whether the particle should be updated/drawn right now (depends on mousePressed state)
        this.drawing = false;
    }

    // returns the item at the (x, y) position in the matrix
    getAngle(i, j) {
        return this.angles[i][j];   
    }

    // apply noise to the entire vector field by rotating each vector (based on the noise space at the specified zoff value)
    applyNoise(zoff) {
        const XY_NOISE_CHANGE = 0.2;
        const ROT_SCALE = 2;
        let xoff = 0;
        for (let i = 0; i < gridCols; i++) {
            // start yoff "really far" from xoff
            let yoff = 100000;
            for (let j = 0; j < gridRows; j++) {
                // rotate each vector based on the noise function
                let n = noise(xoff, yoff, zoff);
                let rot = map(n, 0, 1, -1 * PI, PI) * ROT_SCALE;
                this.angles[i][j] = rot;

                // DEBUG: draw each vector
                //this.show(i, j);
               

                yoff += XY_NOISE_CHANGE;
            }
            xoff += XY_NOISE_CHANGE;
        }
    }

    /* Draw a vector as a line */
    show(i, j) {
        push();
        stroke(255, 0.5);
        strokeWeight(2);
        translate(i * gridSize, j * gridSize);
        rotate(this.angles[i][j]);
        line(0, 0, gridSize, 0);
        pop();
    }
}