var cnv;

function setupWindow() { resizeCanvas(windowWidth / 2, windowHeight); }

function setup() {
  cnv = createCanvas(windowWidth / 2, windowHeight);
  cnv.parent("toppage_canvas");
  setupWindow();
  noSmooth();
}

function draw() {
  if (hour() >= 20 || hour() <= 4)
    background(41, 41, 41);
  else
    background(60, 210, 210);
}

function windowResized() { setupWindow(); }
