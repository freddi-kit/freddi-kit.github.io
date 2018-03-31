var cnv;
var title_image;

function setupWindow() {
  var winSetWidth, winSetHeight;
  winSetWidth = (windowWidth / 2 > 200) ? windowWidth / 2 : windowWidth;

  winSetHeight =
      max((windowWidth / 2 > 200) ? windowHeight : windowHeight / 2, 500);

  resizeCanvas(winSetWidth, winSetHeight);
}

function preload() { title_image = loadImage("./media/title.png"); }

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

  imageMode(CENTER);
  title_width = min(title_image.width, width - 50)
  title_heigth = title_image.height * (title_width / title_image.width)
  image(title_image, width / 2, height / 2, title_width, title_heigth)
}

function windowResized() { setupWindow(); }
