class MovingThread{
    //initially draw the thread randomly close to the mouse coordinates
    constructor(col, x_pos, y_pos, len){
        this.col = col;
        this.x_pos = x_pos
        this.y_pos = y_pos;
        this.len = len;
        
        this.angle = 0;
        
        //random movement constants
        this.ANGULAR_SPEED = 10;
        this.MOVEMENT_SPEED = 30;
        this.COLOR_VARIATION = 10;
        this.LENGTH_VARIATION = 15;
        this.MIN_LENGTH = 100;
        this.MAX_LENGTH = 750;
        this.STROKE_WEIGHT = 0.15;
    }

    //getters (are these all necessary???)
    get x(){
        return this.x_pos;
    }
    get y(){
        return this.y_pos;
    }
    get length(){
        return this.len;
    }
    get color(){
        return this.col;
    }
    
    //setters (are these all necessary???)
    set_x(newX){
        this.x_pos = newX;
    }
    set_y(newY){
        this.y_pos = newY;
    }
    set_length(newLength){
        this.len = newLength;
    }
    set_color(newColor){
        this.col = newColor;
    }

    //the thread drawing function
    sew(){
        //randomize some variables
        /* USE NOISE HERE somehow to make cool random patterns/movements */
        this.angle = (this.angle + random(-1*this.ANGULAR_SPEED, this.ANGULAR_SPEED)) % 360;
        this.x_pos += random(-1*this.MOVEMENT_SPEED, this.MOVEMENT_SPEED);
        this.y_pos += random(-1*this.MOVEMENT_SPEED, this.MOVEMENT_SPEED);
        this.len += random(-20, 20);
        if(this.len > this.MAX_LENGTH){
            this.len = this.MAX_LENGTH;
        }
        else if(this.len < this.MIN_LENGTH){
            this.len = this.MIN_LENGTH;
        }
        /* ALTER/RANDOMIZE COLOR TOO */
        let r = red(this.color);
        let g = blue(this.color);
        let b = green(this.color);
        this.col = color(r + random(-1*this.COLOR_VARIATION, this.COLOR_VARIATION), g + random(-1*this.COLOR_VARIATION, this.COLOR_VARIATION), b + random(-1*this.COLOR_VARIATION, this.COLOR_VARIATION));
        
        //update stroke color, origin point, and current rotation angle
        stroke(this.col);
        strokeWeight(this.STROKE_WEIGHT); /* CHANGE WEIGHT randomly??? */
        translate(this.x_pos, this.y_pos);
        rotate(this.angle);

        //draw the line from the center point (x_pos, y_pos) extending out len/2 in both directions (following 'angle')
        line(0-(cos(this.angle)*(this.len/2)), 0-(sin(this.angle)*(this.len/2)), cos(this.angle)*(this.len/2), sin(this.angle)*(this.len/2));
    }
}