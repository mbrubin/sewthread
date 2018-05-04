/* A particle class used for drawing in 'Flowy Flows' (name pending?) mode (i.e., particles that follow the flow field) */

class Particle {
    constructor(x, y) {
        this.pos = createVector(x, y);  
        this.prevPos = this.pos.copy();
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.maxSpeed = 3;
        this.ALPHA = 50;
    }

    /* Applies a force to this particle, changing its acceleration (assuming a particle is massless) */
    applyForce(force) {
        this.acc.add(force);
    }

    setMaxSpeed(max) {
        this.maxSpeed = max;
    }

    update(flowField) {
        this.prevPos.set(this.pos);
        this.vel.add(this.acc); 
        this.pos.add(this.vel);
        // make particles wrap around edges of the canvass
        if (this.pos.x > canvasWidth) {
            this.pos.x = 0;
            this.prevPos.set(this.pos);
        }
        else if(this.pos.x < 0) {
            this.pos.x = canvasWidth - 1;
            this.prevPos.set(this.pos);
        }
        if (this.pos.y > canvasHeight) {
            this.pos.y = 0;
            this.prevPos.set(this.pos);
        }
        else if (this.pos.y < 0) {
            this.pos.y = canvasHeight - 1;
            this.prevPos.set(this.pos);
        }

        this.acc.mult(0);
        if (this.vel.mag() > this.maxSpeed) {
            this.vel.setMag(this.maxSpeed);
        }
        this.follow(flowField); 
    }

    show() {
        push();
        colorMode(RGB);
        stroke(random(10, 40), random(180,250), random(100, 130), this.ALPHA);
        strokeWeight(1);
        //point(this.pos.x, this.pos.y);
        line(this.prevPos.x, this.prevPos.y, this.pos.x, this.pos.y);
        pop();
    }

    /* Make the particle move in the direction of the nearest vector/angle in the flowField */
    follow(flowField) {
        // calculate where in the grid the particle is
        let row = floor(map(this.pos.x, 0, canvasWidth, 0, flowField.cols));
        let col = floor(map(this.pos.y, 0, canvasHeight, 0, flowField.rows));
        
        // create and apply the force to the particle
        let force = p5.Vector.fromAngle(flowField.getAngle(row, col));        
        this.applyForce(force);
    }
}