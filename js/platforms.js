function createPlatforms(x, y, length) {
  var p = {
    x: x,
    y: y,
    length: length,
    draw: function () {
     // grass top
fill(80, 170, 60);
rect(this.x, this.y, this.length, 6, 3);

// dirt body
fill(150, 90, 40);
rect(this.x, this.y + 6, this.length, 8);

// darker shadow bottom
fill(80, 40, 10);
rect(this.x, this.y + 14, this.length, 3);

// small grass details
stroke(40,120,40);
line(this.x + 10, this.y, this.x + 10, this.y - 3);
line(this.x + 30, this.y, this.x + 30, this.y - 4);
line(this.x + 50, this.y, this.x + 50, this.y - 2);
noStroke();
// flower stem
stroke(40,150,60);
line(this.x + 25, this.y, this.x + 25, this.y - 20);
noStroke();

// flower petals
fill(255,100,150);
ellipse(this.x + 25, this.y - 10, 6);
ellipse(this.x + 22, this.y - 8, 6);
ellipse(this.x + 28, this.y - 8, 6);

// flower center
fill(255,220,0);
ellipse(this.x + 25, this.y - 8, 4);
    },
    checkContact: function (gc_x, gc_y) {
      if (gc_x > this.x && gc_x < this.x + this.length) {
        let d = this.y - gc_y;

        if (d >= 0 && d < 20) {
          return true;
        }
      }
      return false;
    },
  };
  return p;
}