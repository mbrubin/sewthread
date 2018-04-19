//HELPFUL NOTE: using Typescipt file for p5.js tooltips (with file here, ran command 'tsc .\p5.d.ts' after using 'npm install -g typescript')

function setup(){
    createCanvas(displayWidth, displayHeight);
    colorMode(RGB);
    angleMode(DEGREES);
    frameRate(60);
    background(0);
}

//global MovingThread variable and constant(s)
var threadLine;

function draw(){
    //draw this while mouse is currently pressed down
    if(mouseIsPressed){
        //make threadLine 'crawl' toward the mouse position (so it always follows the cursor)
        threadLine.crawlToward(mouseX, mouseY);
        
        //call the 'sew' (draw) function of threadLine
        threadLine.sew();
    }
}

//when mouse is clicked, create a new MovingThread at the mouse position
function mousePressed(){
    threadLine = new MovingThread(color(23, 232, 158), mouseX, mouseY, random(100, 300));
}

//when mouse is released, destroy the MovingThread
function mouseReleased(){
    threadLine = null;
}