function Player() {
  this.x = 5;
  this.y = 5;
  this.xspeed = 0;
  this.yspeed = 0;
  this.update = function() {
    this.x = this.x + this.xspeed;
    this.y = this.y + this.yspeed;
  };
  this.show = function() {
    fill(255, 0, 0);
    rect(this.x, this.y, 10, 10);
  };
}
