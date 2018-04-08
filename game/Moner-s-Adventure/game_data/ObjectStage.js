
class ObjectStage {
  constructor() {

    this.data_floor = [];
    for (var i = 0; i < 250; i++) {
      this.data_floor.push(0)
    }
    this.x = 0.;
    this.pid = null;
    this.floor = [
      loadImage("game_data/data/floor.png"),
      loadImage("game_data/data/floor2.png")
    ];

    this.Status_go = new Status();
    this.Hashira = new ObjectHashira();

    for (var i = 0; i < this.data_floor.length; i++) {

      if (i > 10) {
        this.data_floor[i] = parseInt(random(0, 3));

        if (this.data_floor[i - 1] == 1 && this.data_floor[i] == 2 ||
            this.data_floor[i - 2] == 1 && this.data_floor[i - 1] == 1)
          this.data_floor[i] = 0;

        if (this.data_floor[i - 3] == 2 && this.data_floor[i - 2] == 0 &&
            this.data_floor[i - 1] == 1 && this.data_floor[i] == 1) {
          this.data_floor[i - 3] = 0;
        }
      } else
        this.data_floor[i] = 0;
    }

    for (var i = this.data_floor.length - 20; i < this.data_floor.length; i++) {
      this.data_floor[i] = 0;
    }
  }

  go(moner) {

    this.x++;
    for (var i = 0; i < 100; i++) {
      this.Hashira.go(i * 90 - this.x * 1.5, 220);
    }

    for (var i = 0; i < this.data_floor.length; i++) {
      if (this.data_floor[i] == 0)
        this.pid = this.floor[0];
      else if (this.data_floor[i] == 2)
        this.pid = this.floor[1];

      if (this.data_floor[i] != 1)
        image(this.pid, 22.5 + 45 * i - moner.x * 2, 150);
    }

    this.Status_go.status(moner, this);
  }
}
