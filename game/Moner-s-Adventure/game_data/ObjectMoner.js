class ObjectMoner {

  constructor(moner_walk_images) {
    this.FALL = false;
    this.KUCHU = false;
    this.DIE = false;

    this.scrx = 225;
    this.speed = 20;
    this.x = 0;
    this.y = 0;

    this.speed = 0.0;
    this.fall_speed = 0.0;
    this.loca_floor = 0;

    this.yGround = 0.;
    this.moner_walk = moner_walk_images;
    this.pid = null;
  }

  fly() {

    if (frameCount % 1 == 0) {
      this.y = this.y - this.speed;
      this.speed -= 1.5;
    }
    if (this.speed < 0) {
      this.fall_speed = this.speed;
      this.FALL = true;
      this.KUCHU = false;

      this.speed = 20;
    }

    this.pid = this.moner_walk[1];
  }

  fall() {

    if (frameCount % 1 == 0) {
      this.y = this.y - this.fall_speed;
      this.fall_speed -= 1.5;

      if (this.y > this.yGround) {
        this.FALL = false;
      }
    }

    this.pid = this.moner_walk[0];
  }

  getLocation(stage) {
    for (var i = 0; i < stage.data_floor.length; i++) {
      if (this.scrx >= 22.5 + 45 * i - this.x * 2 - 22.5 &&
          this.scrx < 22.5 + 45 * i - this.x * 2 + 22.5) {
        this.loca_floor = i;
      }
    }
  }

  getGround(stage) {
    if (stage.data_floor[this.loca_floor] == 0)
      this.yGround = 0;
    else if (stage.data_floor[this.loca_floor] == 2)
      this.yGround = -72;
    else
      this.yGround = 500;
  }

  changeMove() {
    if (this.KUCHU)
      this.fly();
    else if (this.FALL)
      this.fall();

    else if (this.y < this.yGround && !this.FALL) {
      this.fall();
    }

    else if (!this.DIE) {
      this.fall_speed = 0;

      this.y = this.yGround;

      if (frameCount % 5 == 0)
        this.pid = this.moner_walk[1];
      else
        this.pid = this.moner_walk[0];
    }
  }

  getMouse(stage) {
    if (mouseIsPressed && !this.KUCHU && !this.FALL &&
        stage.data_floor[this.loca_floor] != 1) {
      this.KUCHU = true;
    }

    if (mouseX != this.scrx) {
      if (mouseX < this.scrx)
        this.scrx -= 3;
      if (mouseX > this.scrx)
        this.scrx += 3;
    }
  }

  getGimic(stage) {
    if (this.loca_floor < stage.data_floor.length - 1)
      if ((stage.data_floor[this.loca_floor] == 1 &&
           stage.data_floor[this.loca_floor + 1] == 0 && this.y >= 0) ||
          (stage.data_floor[this.loca_floor] != 2 &&
           stage.data_floor[this.loca_floor + 1] == 2 && this.y >= -72)) {
        if (this.scrx > 22.5 + 45 * this.loca_floor - this.x * 2 + 5) {
          this.scrx = 22.5 + 45 * this.loca_floor - this.x * 2 + 5;
        }
      }
  }

  goImage() {
    this.scry = this.y + 200;

    if (!this.KUCHU && frameCount % 5 == 0)
      this.scry = this.y + 210 - 4;

    image(this.pid, this.scrx, this.scry);
  }

  checkDie() {
    if (this.scrx < -20 || this.y > 300) {
      this.DIE = true;
      TITLE = true;
    }
  }

  go(stage) {
    this.getGround(stage);

    if (!this.DIE) {
      this.x = this.x + 4.5;
      this.getMouse(stage);
    }

    this.getLocation(stage);
    this.changeMove();
    this.getGimic(stage);
    this.checkDie();

    this.goImage();
  }
}
