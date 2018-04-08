var move = 0.;
var black = 255;
var TITLE = false;
var blackOut = false;

var moner;
var stage;

var score = 0;
var highscore = 0;
var cnv; //キャンバスデータ

var cursor_image;
var title_image;
var floor_images;
var moner_walk_images;
var cts;

function setup() {
  imageMode(CENTER);
  frameRate(30);

  cnv = createCanvas(450, 300);
  cnv.parent("toppage_canvas");
  noCursor();

  TITLE = true;
  stage = new ObjectStage();
}

function title() {
  image(title_image, 225, 100);
  if (frameCount % 50 > 10)
    image(cts, 225, 200);
  if (highscore < score)
    highscore = score;
  textSize(16);
  fill(230, 230, 230);
  text("HighScore: ", 10, 20);
  for (var i = 10; i >= 0; i--) {
    if (highscore >= pow(10, i)) {
      text(highscore, 100 + i * 1, 20);
      break;
    }
  }

  if (mouseIsPressed) {
    move = 0;
    score = 0;
    moner = new ObjectMoner(moner_walk_images);
    stage = new ObjectStage();
    TITLE = false;
  }
}

function game() {
  score++;

  stage.go(moner);
  moner.go(stage);

  textSize(16);
  fill(230, 230, 230);
  text("Score: ", 10, 20);
  for (var i = 10; i >= 0; i--) {
    if (score >= pow(10, i)) {
      text(score, 60 + i * 1, 20);
      break;
    }
  }

  if (moner.loca_floor >= stage.data_floor.length - 10) {
    stage = new ObjectStage();
    moner.x = 0;
  }
}

function preload() {
  cursor_image = loadImage("game_data/data/cursor.png");
  title_image = loadImage("game_data/data/title.png");
  cts = loadImage("game_data/data/cts.png");
  moner_walk_images = [
    loadImage("game_data/data/walk_01.png"),
    loadImage("game_data/data/walk_02.png")
  ];
}
function draw() {
  background(10, 10, 10);

  if (TITLE) {
    title();
  } else if (!TITLE) {

    game();

    tint(255, 255, 255, 150);
  }

  image(cursor_image, mouseX, mouseY);
  noTint();
}
