Page ({
  onCameraReady (e) {
    this.cameraContext = my.createCameraContext ('camera');

    this.cameraContext.takePhoto ({
      quality: 'high',
      success (res) {
        console.log (res);
      },
      fail (err) {
        console.log (err);
      },
    });
  },
});