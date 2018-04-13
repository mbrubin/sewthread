//HELPFUL NOTE: using Typescipt file for p5.js tooltips (with file here, ran command 'tsc .\p5.d.ts' after using 'npm install -g typescript')

var threadLine;

var v;

function setup(){
    createCanvas(displayWidth, displayHeight);
    colorMode(RGB);
    angleMode(DEGREES);//RADIANS);
    //black background
    background(0);

    v = createVector(100, 100);//fromAngle(radians(0), 10);
    v.setMag(100);
    print('v initial magnitude = ' + round(v.mag()));
    stroke(255)
    v.x = 500;
    v.y = 500;
    //math! like, high school trig! yay!
    //v.heading() is the vectors angle
    line(v.x, v.y, v.x + v.mag()*cos(v.heading()), v.y + v.mag()*sin(v.heading()));
    print('v initial angle = ' + v.heading());
}

function draw(){
    if(frameCount > 10){
        noLoop();
    }
    print('WOW : '+round(v.mag()));
    //let newX = v.x + round(v.mag()*cos(degrees(v.heading()))/2);
    //let newY = v.y + round((v.mag()*sin(v.heading()))/2);
    //print('v.x diff = ' + round((v.mag()*cos(degrees(v.heading()))/2)));
    //print('v.y diff = ' + (v.mag()*sin(v.heading()))/2);
    ///translate(newX, newY);
    //print('('+newX+', '+newY+')');
    //v.rotate(1);
    //rotate(degrees(1)); 
    //line(v.x, v.y, v.x + v.mag()*cos(v.heading()), v.y + v.mag()*sin(v.heading()));

    //draw threadLine if it currentlt exists
    if(threadLine){
        threadLine.sew();
    }
}

//when mouse is clicked, create a new MovingThread at the mouse position
function mousePressed(){
    threadLine = new MovingThread(mouseX, mouseY, color(23, 232, 158));
}

//when mouse is released, destroy the MovingThread
function mouseReleased(){
    threadLine = null;
}

//while mouse is dragged, have the MovingThread follow the cursor position
function mouseDragged(){
    threadLine.x1 = threadLine.x1 + (mouseX > threadLine.x1 ? 1 : -1);
    threadLine.y1 = threadLine.y1 + (mouseY > threadLine.y1 ? 1 : -1);
    threadLine.x2 = threadLine.x2 + (mouseX > threadLine.x2 ? 1 : -1);
    threadLine.y2 = threadLine.y2 + (mouseY > threadLine.y2 ? 1 : -1);
}