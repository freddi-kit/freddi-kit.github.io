var cnv;
var title_image;
var in_counter;

function setupWindow() {
  var winSetWidth, winSetHeight;
  winSetWidth = (windowWidth / 2 > 200) ? windowWidth / 2 : windowWidth;

  winSetHeight =
      max((windowWidth / 2 > 200) ? windowHeight : windowHeight / 2, 500);

  resizeCanvas(winSetWidth, winSetHeight);
}

function preload() {
  title_image = loadImage("./media/title.png");
  in_counter = 1;
}

function setup() {
  cnv = createCanvas(windowWidth / 2, windowHeight);
  cnv.parent("toppage_canvas");
  setupWindow();
  noSmooth();
  imageMode(CENTER);
}

function draw() {
  // 昼夜の画面の明るさ設定
  if (hour() >= 20 || hour() <= 4)
    background(41, 41, 41);
  else
    background(60, 210, 210);

  // タイトルの大きさ、画面に合わせる
  title_width = min(max(width * 0.5, title_image.width), width - 50)
  title_heigth = title_image.height * (title_width / title_image.width)

  // タイトルがじわーっとなるやつ
  if (in_counter < 255) in_counter += 5;
  tint(255, min(255, in_counter));
  image(title_image, width / 2, height / 2, title_width, title_heigth)
  tint(255, 255); // ココでtintをもとに戻さないと他に影響が出る
}

function windowResized() { setupWindow(); }
