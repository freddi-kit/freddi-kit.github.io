class ObjectHashira {

  constructor() {
    this.Hashira = loadImage("game_data/data/Hashira.png");
    this.pid = null;
  }
  go(x, y) {
    this.pid = this.Hashira;
    image(this.pid, x, y);
  }
}
