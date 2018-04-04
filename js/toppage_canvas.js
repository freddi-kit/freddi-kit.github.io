
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
    this.sin_counter = 1;
  }
  draw() {

    super.draw();
    // タイトルの大きさ、画面に合わせる
    let title_width = min(max(width * 0.5, this.title_image.width), width - 50)
    let title_heigth =
        this.title_image.height * (title_width / this.title_image.width)

    // タイトルがじわーっとなるやつ
    if (this.in_counter < 255) this.in_counter += 5;
    this.sin_counter += 10;
    if (this.sin_counter > 60)
      this.sin_counter = 0;
    tint(255, 0, 0, min(255 / 2, this.in_counter));
    image(this.title_image, width / 2 + 5 * Math.sin(this.sin_counter + 1),
          height / 2, title_width, title_heigth);
    tint(0, 255, 0, min(255 / 2, this.in_counter));
    image(this.title_image, width / 2 - 5 * Math.sin(this.sin_counter / 2),
          height / 2, title_width, title_heigth);

    tint(255, min(255 / 1.5, this.in_counter));
    image(this.title_image, width / 2, height / 2, title_width, title_heigth);

    tint(255, 255); // ココでtintをもとに戻さないと他に影響が出る
  }
}
class noiseObject extends drawObject {
  constructor() {
    super();
    this.noise_num = 10000;
    this.positions = [];
    for (var i = 0; i < this.noise_num; i++) {
      this.positions.push([ int(random(width)), int(random(height)) ]);
    }
  }
  draw() {
    super.draw();
    fill(57, 57, 57);
    noStroke();
    for (var i = 0; i < this.positions.length; i++) {
      rect(this.positions[i][0], this.positions[i][1], height * 0.01,
           height * 0.01);
    }
  }
}

var cnv;    //キャンバスデータ
var title;  //タイトルのオブジェクト管理
var noises; //ノイズ

// リサイズとかがおこった時の関数
function setupWindow() {
  var winSetWidth, winSetHeight;
  winSetWidth = (windowWidth > 480) ? windowWidth / 2 : windowWidth;

  winSetHeight = (windowWidth > 480) ? windowHeight : windowHeight / 2;

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
  noises = new noiseObject();
  // 昼夜の画面の明るさ設定
  background(41, 41, 41);
  noises.draw();

  title.draw();
}

function windowResized() { setupWindow(); }
