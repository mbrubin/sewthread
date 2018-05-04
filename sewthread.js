//HELPFUL(?) NOTE: using Typescipt file for p5.js tooltips (with file here, ran command 'tsc .\p5.d.ts' after using 'npm install -g typescript') <-- [doesn't really seem to work... whatever :p]

const canvasWidth = 1400;
const canvasHeight = 800;

/* For checking whether a mouse click was in the canvas bounds */
function inCanvas() {
    return mouseX >= 0 && mouseX <= canvasWidth && mouseY >= 0 && mouseY <= canvasHeight;
}

// 'loops' is how many times per frame to call 'sew()' in draw() method
let loops = 1;
let loops_slider;
let loops_display;
let clear_button;

/* Allow user to change drawing modes using the dropdown */
let DRAW_MODE;
let SYMMETRY;

/* Variables for the Perlin noise space */
const gridSize = 10;
const gridCols = canvasWidth / gridSize;
const gridRows = canvasHeight / gridSize;
let grid;
const numParticles = 10;

function setup(){
    /* Slider for loops */
    loops_slider = select('#loops-slider');
    //loops_slider.position(10, 0);
    loops_display = select('#loops-p');

    // initialize DRAW_MODE to the initial selection of the dropdown
    DRAW_MODE = select('#draw-mode-picker').selected();
    
    /* Handle event of dropdown being changed */
    select('#draw-mode-picker').changed(function() {
        DRAW_MODE = select('#draw-mode-picker').selected();
        if (DRAW_MODE === 'haystack-mode') {
            select('#haystack-controls').style('display', 'inline-block');
            colorMode(RGB);
        }
        else if (DRAW_MODE === 'flowy-mode') {
            select('#haystack-controls').hide();
            colorMode(HSB);
        }
    });

    SYMMETRY = select('#symmetry-checkbox').checked();

    /* Handle event of checkbox being changed */
    select('#symmetry-checkbox').changed(function() {
        SYMMETRY = select('#symmetry-checkbox').checked();
    });

    /* Clear button */
    clear_button = select('#clear-button');
    //clear_button.position(5, 25);
    clear_button.mousePressed(function() {
        clear();
        background(0);
    });

    /* Initial p5 setings */
    createCanvas(canvasWidth, canvasHeight);
    angleMode(DEGREES);
    rectMode(CORNER);
    frameRate(60);
    background(0);

    // initialize the 3-D Perlin noise space (defaults to random seed each time browser page is reloaded)
    grid = new VectorField(gridCols, gridRows);
    console.log(grid.cols, grid.rows);
    stroke(255);
    for (let i = 0; i < gridCols; i++) {
        for(let j = 0; j < gridRows; j++) {
            grid.setXY(i, j, i, j);
        }
    }
    for (let i = 0; i < grid.cols; i++) {
        for (let j = 0; j < grid.rows; j++) {
            let v = grid.getItem(i, j);
            line(v.x, v.y, v.y + 1, v.x -5);
        }
    }
}

/* Global MovingThread variable and constant(s) */
var threadLine;

function draw(){
    loops = loops_slider.value();
    loops_display.html('Draw Speed: ' + loops_slider.value());
    
    if (DRAW_MODE === 'haystack-mode') {
        // draw the "thread" stuff
        for(let i = 0; i < loops; i++){
            // draw this while mouse is currently pressed down
            if(mouseIsPressed && inCanvas()){
                if (threadLine) {
                    // make threadLine 'crawl' toward the mouse position (so it always follows the cursor)
                    threadLine.crawlToward(mouseX, mouseY);
                    
                    // call the 'sew' (draw) function of threadLine, which is its own drawing function
                    threadLine.sew();
                }
            }
        }
    }
    else if (DRAW_MODE === 'flowy-mode') {
        //do Perlin noise flow field stuff around the mouse location...
        //dump some number of particles (from Particle.js) near the mouse location, and have them follow the flow field!
        //... something like: particles[i] = new Particle(mouseX, mouseY); (DO THIS IN A SEPARATE FUNCTION WHERE IT LOOPS AND CREATES 'numParticles' particles)
    }
}

/* When mouse is clicked, create a new MovingThread at the mouse position */
function mousePressed() {
    if(inCanvas()) {
        threadLine = new MovingThread(color(23, 232, 158), mouseX, mouseY, random(100, 300));
    }
}

/* When mouse is released, destroy the MovingThread */
function mouseReleased(){
    threadLine = null;
}

/* commenting out for now since it's acting mysterious... (or I just don't fully understand it)
//* Dynamically resize the canvas when the browser window is resized
function windowResized() {
    let noRedraw = true;
    // 'noRedraw' argument makes it so canvas doesn't redraw when resized (since it is true)
    resizeCanvas(windowWidth, windowHeight, noRedraw);
    background(0); //shouldn't be necessary but either the 'noRedraw' is broken, or I'm doing something wrong
}
*/