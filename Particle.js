/* A particle class used for drawing in 'Flowy Flows' (name pending?) mode (i.e., particles that follow the flow field) */

class Particle {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
    }

    /* Applies a force to this particle, changing its acceleration (assuming a particle is massless) */
    applyForce(force) {
        p5.Vector.add(this.acc, force);
    }

    update() {
        p5.Vector.add(this.vel, this.acc);
        p5.Vector.add(this.pos, this.vel);
    }

    follow(matrix) {
        //TO-DO: make this particle follow nearby vectors from the passed-in 'matrix' flow field
    }
}