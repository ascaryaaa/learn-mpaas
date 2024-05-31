Page({
  data: {
    video: {
      src: 'https://xxx.mp4',
      poster: "https://xxx.jpg",
      posterSize: "contain", //contain, cover
      showAllControls: false,
      isLooping: false,
      muteWhenPlaying: false,
      initTime: 0,
      autoPlay: false,
      directionWhenFullScreen: 0
    }
  },
  onLoad() {
    this.videoContext = my.createVideoContext('myVideo');
  },
  play() {
    this.videoContext.play();
  },
  pause() {
    this.videoContext.pause();
  },
  stop() {
    this.videoContext.stop();
  },
  seek() {
    this.videoContext.seek(15);
  },
  requestFullScreen() {
    this.videoContext.requestFullScreen({
      direction: -90,
    });
  },
  exitFullScreen() {
    this.videoContext.exitFullScreen();
  },
  mute() {
    this.videoContext.mute(false);
  },
  onPlay(e) {
    console.log('video: onPlay');
  },
  onPause(e) {
    console.log('video: onPause');
  },
  onEnded(e) {
    console.log('video: onEnded');
  },
  onError(e) {
    console.log('video: onPlayError, e=' + JSON.stringify(e));
  },
  onRenderStart(e) {
    console.log('video: onRenderStart');
  },
  onTimeUpdate(e) {
    // console.log('video: onTimeUpdate: ' +  JSON.stringify(e));
  },
  onUserAction(e) {
   console.log('video: onUserAction: ' +  JSON.stringify(e));
  },
  onTap(e) {
    console.log('video: onTap: ' +  JSON.stringify(e));
  },
  onFullScreenChange(e) {
    console.log('video: onFullScreenChange: ' +  JSON.stringify(e));
  },
  onLoading(e) {
    console.log('video: onLoading: ' +  JSON.stringify(e));
  },
});