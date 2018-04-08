class Status {
  constructor() {}
  status(moner,stage) {
    stroke(50, 250, 250);
    for (var i = 0; i < stage.data_floor.length; i++) {
      if (stage.data_floor[i] == 0)
        line(i + 10, 20 + 250, i + 10, 15 + 250);
      else if (stage.data_floor[i] == 2)
        line(i + 10, 20 + 250, i + 10, 10 + 250);
    }
    stroke(250, 10, 10);
    line(moner.loca_floor + 10, 20 + 250, moner.loca_floor + 10, 5 + 250);
    noStroke();
  }
}
