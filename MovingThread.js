class MovingThread{
    //initially draw the thread randomly close to the mouse coordinates
    constructor(color, x, y){
        //storing the two points in vectors
        this.p1 = createVector(x + random(5,10), y + random(5, 10));
        this.p2 = createVector(x - random(5, 10), y - random(5, 10));
        this.color = color;
    }

    get x1(){
        return this.p1.xs;
    }
    get y1(){
        return this.p1.y;
    }
    get x2(){
        return this.p2.x;
    }
    get y2(){
        return this.p2.y;
    }
    set set_x1(x1_new){
        this.p1.x = x1_new;
    }
    set set_y1(y1_new){
        this.p1.y = y1_new;
    }
    set set_x2(x2_new){
        this.p2.x = x2_new;
    }
    set set_y2(y2_new){
        this.p2.y = y2_new;
    }

    //the thread draw function
    sew(){
        stroke(this.color);
        
            line(this.p1.x  , this.p1.y, this.p2.x, this.p2.y);
            // console.log('x1 = ' + this.p1.x);
            // console.log('y1 = ' + this.p1.y);
            // console.log('x2 = ' + this.p2.x);
            // console.log('y2 = ' + this.p2.y);
            this.p1.x += random(-3,3);
            this.p1.y += random(-3,3);
            this.p2.x += random(-3,3);
            this.p2.x += random(-3,3);
        
    }
}