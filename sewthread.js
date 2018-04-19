//HELPFUL NOTE: using Typescipt file for p5.js tooltips (with file here, ran command 'tsc .\p5.d.ts' after using 'npm install -g typescript')

//TESTING: iterating multiple times per frame in draw() method
var LOOPS = 1;
var loops_slider;

var clear_button;

function setup(){
    createCanvas(displayWidth, displayHeight);
    colorMode(RGB);
    angleMode(DEGREES);
    frameRate(60);
    background(0);
    
    //slider for loops
    loops_slider = createSlider(1, 100, 1);
    loops_slider.position(10, 0);

    //clear button
    clear_button = createButton('Clear');
    clear_button.position(5, 25);
    clear_button.mousePressed(function(){
        clear();
        background(0);
    });
}

//global MovingThread variable and constant(s)
var threadLine;

function draw(){
    LOOPS = loops_slider.value();
    fill(255);
    rect(0, 0, 150, 50);
    fill(0);
    text('Draw Speed: ' + loops_slider.value(), 50, 35);
    
    //draw the "thread" stuff
    let i;
    for(i = 0; i < LOOPS; i++){
        //draw this while mouse is currently pressed down
        if(mouseIsPressed){
            //make threadLine 'crawl' toward the mouse position (so it always follows the cursor)
            threadLine.crawlToward(mouseX, mouseY);
            
            //call the 'sew' (draw) function of threadLine
            threadLine.sew();
        }
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