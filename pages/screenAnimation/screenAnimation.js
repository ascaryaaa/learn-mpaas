Page({
  data: {
    animation: null,
    x: 0,
    y: 0
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
  animate() {
    this.animation.translate(this.data.x, this.data.y).step();
    this.setData({
      animation: this.animation.export()
    });
  }
});
