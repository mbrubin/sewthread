/* The class used for 'Haystack' drawing mode*/

class MovingThread{
    //initially draw the thread randomly close to the mouse coordinates
    constructor(col, x_pos, y_pos, len){
        this.col = col;
        this.x_pos = x_pos
        this.y_pos = y_pos;
        this.len = len;
        
        this.angle = 0;
        
        //random movement constants
        this.ANGULAR_SPEED = 30;
        this.MOVEMENT_SPEED = 70;
        this.COLOR_VARIATION = 15;
        this.LENGTH_VARIATION = 20;
        this.MIN_LENGTH = 50;
        this.MAX_LENGTH = 150;
        this.STROKE_WEIGHT = 0.3;//0.15;
        //this.STROKE_MAX = 0.5; *this ain't used yet*
        this.CRAWL_SPEED = 10;
    }

    /* these getters are unnecessary, as javascript object properties can natively be accessed with period (e.g., thread.x = ..., thread.y += ...)
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
    */
    
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
        this.angle = (this.angle + (noise(this.angle) * random(-1*this.ANGULAR_SPEED, this.ANGULAR_SPEED))) % 360;
        this.x_pos += noise(this.x_pos) * random(-1*this.MOVEMENT_SPEED, this.MOVEMENT_SPEED);
        this.y_pos += noise(this.y_pos) * random(-1*this.MOVEMENT_SPEED, this.MOVEMENT_SPEED);
        this.len += noise(this.length) * random(-1*(this.LENGTH_VARIATION), (this.LENGTH_VARIATION));
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
        this.col = color(r + noise(r) * random(-1*this.COLOR_VARIATION, this.COLOR_VARIATION), g + noise(g) * random(-1*this.COLOR_VARIATION, this.COLOR_VARIATION), b + noise(b) * random(-1*this.COLOR_VARIATION, this.COLOR_VARIATION));

        //update stroke color, origin point, and current rotation angle
        stroke(this.col);
        strokeWeight(this.STROKE_WEIGHT); /* CHANGE WEIGHT randomly??? */
        
        push();

        translate(this.x_pos, this.y_pos);
        rotate(this.angle);

        //draw the line from the center point (x_pos, y_pos) extending out len/2 in both directions (following 'angle')
        line(0-(cos(this.angle)*(this.len/2)), 0-(sin(this.angle)*(this.len/2)), cos(this.angle)*(this.len/2), sin(this.angle)*(this.len/2));

        pop();

        // draw a symmetrical clone if the SYMMETRY global boolean is true (true if the checkbox is checked)
        if (SYMMETRY) {
            push();
            
            translate(canvasWidth-this.x_pos, canvasHeight-this.y_pos);
            let new_angle = this.angle + 180;
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