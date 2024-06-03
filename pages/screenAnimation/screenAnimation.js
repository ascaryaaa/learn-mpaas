Page({
  data: {
    animation: null,
    x: 0,
    y: 0,
    angle: 0, // Initial angle of the rotation
    gif1X: 100,
    gif1Y: 200,
    gif2X: -100,
    gif2Y: -200,
  },
  onLoad() {
    this.animation = my.createAnimation({
      duration: 500,
      timingFunction: 'ease-in-out'
    });
  },
  moveUp() {
    this.setData({
      y: this.data.y - 100
    }, () => {
      this.animate();
    });
  },
  moveDown() {
    this.setData({
      y: this.data.y + 100
    }, () => {
      this.animate();
    });
  },
  moveLeft() {
    this.setData({
      x: this.data.x - 100
    }, () => {
      this.animate();
    });
  },
  moveRight() {
    this.setData({
      x: this.data.x + 100
    }, () => {
      this.animate();
    });
  },
  rotate() {
    // Rotate the box by 90 degrees clockwise
    const newAngle = this.data.angle + 90;
    this.setData({
      angle: newAngle
    }, () => {
      this.animation.rotate(newAngle).step();
      this.setData({
        animation: this.animation.export()
      });
    });
  },
  animate() {
    this.animation.translate(this.data.x, this.data.y).step();
    this.setData({
      animation: this.animation.export()
    });
  },
  onCatchMove(e) {
    const { x, y } = e.detail;
    this.setData({
      x: this.data.x + x,
      y: this.data.y + y
    });
  },
});
