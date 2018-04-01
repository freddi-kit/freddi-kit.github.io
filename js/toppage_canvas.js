
// 描く画像とかをObjectとして管理するためのクラス
// これ継承してほしい・・・
class drawObject {
  constructor() {}
  draw() {}
}

class titleObject extends drawObject {
  constructor() {
    super();
    this.title_image = loadImage("./media/title.png");
    this.in_counter = 1;
  }
  draw() {

    super.draw();
    // タイトルの大きさ、画面に合わせる
    let title_width = min(max(width * 0.5, this.title_image.width), width - 50)
    let title_heigth =
        this.title_image.height * (title_width / this.title_image.width)

    // タイトルがじわーっとなるやつ
    if (this.in_counter < 255) this.in_counter += 5;
    tint(255, min(255, this.in_counter));
    image(this.title_image, width / 2, height / 2, title_width,
          this.title_heigth)
    tint(255, 255); // ココでtintをもとに戻さないと他に影響が出る
  }
}

var cnv;   //キャンバスデータ
var title; //タイトルのオブジェクト管理

// リサイズとかがおこった時の関数
function setupWindow() {
  var winSetWidth, winSetHeight;
  winSetWidth = (windowWidth / 2 > 200) ? windowWidth / 2 : windowWidth;

  winSetHeight =
      max((windowWidth / 2 > 200) ? windowHeight : windowHeight / 2, 500);

  resizeCanvas(winSetWidth, winSetHeight);
}

function preload() { title = new titleObject(); }

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

  title.draw();
}

function windowResized() { setupWindow(); }
