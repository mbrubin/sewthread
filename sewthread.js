//HELPFUL(?) NOTE: using Typescipt file for p5.js tooltips (with file here, ran command 'tsc .\p5.d.ts' after using 'npm install -g typescript') <-- [doesn't really seem to work... whatever :p]

const canvasWidth = 1000;
const canvasHeight = 600;

/* For checking whether a mouse click was in the canvas bounds */
function mouseInCanvas() {
    return mouseX >= 0 && mouseX <= canvasWidth && mouseY >= 0 && mouseY <= canvasHeight;
}

// 'loops' is how many times per frame to call 'sew()' in draw() method
let loops;
let loops_slider;
let loops_display;
let clear_button;

let threadSize;
let threadSize_slider;
let threadSize_display;

/* Allow user to change drawing modes using the dropdown */
let DRAW_MODE;
let SYMMETRY;

const HSB_MAX = 100;

// global MovingThread variable
let threadLine;

/* Variables for the Perlin noise space */
const gridSize = 20;
const gridCols = canvasWidth / gridSize;
const gridRows = canvasHeight / gridSize;
const Z_NOISE_SPEED = 0.015;
let zoff;
let particles = [];
let flowField;

let numParticles;
let numParticles_slider;
let numParticles_display;

let flowSpeed;
let flowSpeed_slider;
let flowSpeed_display;


// FOR DEBUGGING: displaying the framerate
let frameCounter;

function setup() {
    // TO-DO: (maybe) make separate function for creating/updating these DOM elements/variables since this looks like repeated code...

    /* Seting up DOM elements with asynchronous event handlers (not called in draw() loop!) */

    loops_slider = select('#loops-slider');
    loops = loops_slider.value();
    loops_display = select('#loops-p');
    loops_display.html('Draw Speed: ' + loops);
    loops_slider.changed(function() {
        loops = loops_slider.value();
        loops_display.html('Draw Speed: ' + loops);
    });

    threadSize_slider = select('#haystack-size-slider');
    threadSize = threadSize_slider.value();
    threadSize_display = select('#haystack-size-p')
    threadSize_display.html('Hay Needle Length: ' + threadSize);
    threadSize_slider.changed(function() {
        threadSize = threadSize_slider.value();
        threadSize_display.html('Hay Needle Length: ' + threadSize);
        if(threadLine) {
            threadLine.setMaxLength(threadSize);
        }
    });

    flowSpeed_slider = select('#flow-speed-slider');
    flowSpeed = flowSpeed_slider.value();
    flowSpeed_display = select('#flow-speed-p');
    flowSpeed_display.html('Flow Speed: ' + flowSpeed);
    flowSpeed_slider.changed(function() {
        flowSpeed = flowSpeed_slider.value();
        flowSpeed_display.html('Flow Speed: ' + flowSpeed);
    });

    numParticles_slider = select('#num-particles-slider');
    numParticles = numParticles_slider.value();
    numParticles_display = select('#num-particles-p');
    numParticles_display.html('# of Particles: ' + numParticles);
    numParticles_slider.changed(function() {
        numParticles = numParticles_slider.value();
        numParticles_display.html('# of Particles: ' + numParticles);
    });

    // initialize DRAW_MODE to the initial selection of the dropdown
    DRAW_MODE = select('#draw-mode-picker').selected();

    // initially hide whatever controls are not part of the selected mode
    switch(DRAW_MODE){
        case 'haystack-mode':
            select('#flowy-controls').hide();
            break;
        case 'flowy-mode':
            select('#haystack-controls').hide();
            break;
    }

    /* Handle event of dropdown being changed */
    select('#draw-mode-picker').changed(function() {
        DRAW_MODE = select('#draw-mode-picker').selected();
        if (DRAW_MODE === 'haystack-mode') {
            select('#flowy-controls').hide();
            select('#haystack-controls').style('display', 'inline-block');
        }
        else if (DRAW_MODE === 'flowy-mode') {
            select('#haystack-controls').hide();
            select('#flowy-controls').style('display', 'inline-block');
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

    // Initial p5 setings
    createCanvas(canvasWidth, canvasHeight);
    angleMode(RADIANS);
    rectMode(CORNER);
    frameRate(60);
    background(0);
    colorMode(HSB, HSB_MAX, HSB_MAX, HSB_MAX);

    // Initialize the MovingThread object for "Haystack" mode
    let c = color(random(HSB_MAX), random(HSB_MAX - HSB_MAX/10, HSB_MAX), HSB_MAX);
    threadLine = new MovingThread(c, mouseX, mouseY, random(30, 60));

    // Initialize the 3-D Perlin noise space (defaults to random seed each time browser page is reloaded)
    flowField = new VectorField(gridCols, gridRows);
    zoff = 0;
    for (let i = 0; i < numParticles; i++) {
        particles[i] = new Particle(random(canvasWidth), random(canvasHeight));
    }

    frameCounter = createP('');
}

function draw() {    
    if (DRAW_MODE === 'haystack-mode') {
        // draw this while mouse is currently pressed down in the canvas, and it was originally clicked in the canvas (which is the case if threadLine.drawing is true)
        if(mouseIsPressed && mouseInCanvas() && threadLine.drawing){
            for(let i = 0; i < loops; i++){
                // make threadLine 'crawl' toward the mouse position (so it always follows the cursor)
                threadLine.crawlToward(mouseX, mouseY);
               
                // call the 'sew' (draw) function of threadLine, which is its own drawing function
                threadLine.sew();
            }
        }
    }
    else if (DRAW_MODE === 'flowy-mode') {
        // draw this while mouse us currently pressed down in the canvas, and it was originally clicked in the canvas (which is the case if flowField.drawing is true)
        if(mouseIsPressed && mouseInCanvas() && flowField.  drawing){
            flowField.applyNoise(zoff);
            zoff += Z_NOISE_SPEED;
            // update and display particles
            for (let i = 0; i < numParticles; i++) {
                particles[i].setMaxSpeed(flowSpeed);
                particles[i].update(flowField);
                particles[i].show();
            }
        }
    }

    // DEBUGGING: display the frameRate each frame
    frameCounter.html('fps: ' + floor(frameRate()));
}

const PARTICLE_RADIUS = 30;

/* When mouse is clicked, create a new MovingThread at the mouse position */
function mousePressed() {
    if (mouseInCanvas()) {
        if (DRAW_MODE === 'haystack-mode') {
            threadLine.drawing = true;
            threadLine.x_pos = mouseX;
            threadLine.y_pos = mouseY;
        }
        else if (DRAW_MODE === 'flowy-mode') {
            flowField.drawing = true;
            // place the particles close to the mouse position
            for (let i = 0; i < numParticles; i++) {
                let px = mouseX + random(-1 * PARTICLE_RADIUS, PARTICLE_RADIUS);
                let py = mouseY + random(-1 * PARTICLE_RADIUS, PARTICLE_RADIUS);
                particles[i] = new Particle(px, py);
            }
        }
    }
}

/* When mouse is released, destroy the MovingThread */
function mouseReleased(){
    if (DRAW_MODE === 'haystack-mode') {
        threadLine.drawing = false;
    }
    else if (DRAW_MODE === 'flowy-mode') {
        flowField.drawing = false;
    }
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