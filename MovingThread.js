/* The class used for 'Haystack' drawing mode*/

class MovingThread{
    // initially draw the thread randomly close to the mouse coordinates
    constructor(c, x_pos, y_pos, len){
        this.strokeColor = c;
        this.x_pos = x_pos
        this.y_pos = y_pos;
        this.len = len;
        this.angle = 0;
        this.stroke_weight = 0.35;
        this.minLength = 50;
        this.maxLength = 150;
        
        //random movement constants
        this.ANGULAR_SPEED = 2;
        this.MOVEMENT_SPEED = 20;
        this.COLOR_VARIATION = 1;
        this.LENGTH_VARIATION = 15;
        this.STROKE_VARIATION = 0.05;
        this.STROKE_MAX = 0.75;
        this.STROKE_MIN = 0.15;
        this.CRAWL_SPEED = 10;

        // for keeping track of whether the sew() function should be called right now (depends on mousePressed state)
        this.drawing = false;
    }

    // updates the max, min, and current length values
    setMaxLength(newMax) {
        let diffMax = this.maxLength - this.len;
        let diffMin = this.len - this.minLength;
        this.maxLength = newMax;
        this.len = this.maxLength - diffMax;
        this.minLength = this.len - diffMin;
        this.len = constrain(this.len, 2, this.maxLength);
        this.minLength = constrain(this.minLength, 1, this.len - 1);
    }

    /* The "thread" drawing function (called once per frame while applicable) */
    sew(){
        //randomize some variables using random() ("harsher" variation as compared to noise(); better for haystack)
        this.angle += random(-1*this.ANGULAR_SPEED, this.ANGULAR_SPEED);
        this.angle %= TWO_PI;
        this.x_pos += random(-1*this.MOVEMENT_SPEED, this.MOVEMENT_SPEED); 
        this.y_pos += random(-1*this.MOVEMENT_SPEED, this.MOVEMENT_SPEED);
        this.len += random(-1*(this.LENGTH_VARIATION), (this.LENGTH_VARIATION));
        this.len = constrain(this.len, this.minLength, this.maxLength);
   
        /* ALTER/RANDOMIZE COLOR TOO */
        let h = hue(this.strokeColor);
        let s = saturation(this.strokeColor);
        let b = brightness(this.strokeColor);
        h += + random(-1*this.COLOR_VARIATION, this.COLOR_VARIATION);
        //s += random(-1*this.COLOR_VARIATION, this.COLOR_VARIATION);
        //b += random(-1*this.COLOR_VARIATION, this.COLOR_VARIATION);
        // NOTE: for now, have it only alter the hue value
        this.strokeColor = color(h, s, b);
        stroke(this.strokeColor);

        push();
        
        //update stroke color, origin point, and current rotation angle
        this.stroke_weight += random(-1*this.STROKE_VARIATION, this.STROKE_VARIATION);
        this.stroke_weight = constrain(this.stroke_weight, this.STROKE_MIN, this.STROKE_MAX);
        strokeWeight(this.stroke_weight);
        translate(this.x_pos, this.y_pos);
        rotate(this.angle);

        //draw the line from the center point (x_pos, y_pos) extending out len/2 in both directions (following 'angle')
        line(0-(cos(this.angle)*(this.len/2)), 0-(sin(this.angle)*(this.len/2)), cos(this.angle)*(this.len/2), sin(this.angle)*(this.len/2));

        pop();

        // draw a symmetrical clone if the SYMMETRY global boolean is true (true if the checkbox is checked)
        if (SYMMETRY) {
            push();

            translate(canvasWidth-this.x_pos, canvasHeight-this.y_pos);
            let new_angle = this.angle + HALF_PI;
            rotate(new_angle);
            line(0-(cos(new_angle)*(this.len/2)), 0-(sin(new_angle)*(this.len/2)), cos(new_angle)*(this.len/2), sin(new_angle)*(this.len/2));
            
            pop();
        }
    }

    //used for making the thread "crawl" towards the target coordinates (currently will be the mouse position)
    crawlToward(targetX, targetY){
        this.x_pos += targetX > this.x_pos ? this.CRAWL_SPEED : -1*this.CRAWL_SPEED;
        this.y_pos += targetY > this.y_pos ? this.CRAWL_SPEED : -1*this.CRAWL_SPEED;
    }
}