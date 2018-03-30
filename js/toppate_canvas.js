var cnv;

function setup() {
  cnv = createCanvas(window.innerWidth, 40, P2D);
  cnv.parent("toppage_canvas");
  noSmooth();
}

function draw() {
  if (hour() >= 20 || hour() <= 4)
    background(41, 41, 41);
  else
    background(60, 210, 210);
}
