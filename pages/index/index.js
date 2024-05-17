
Page({
  onLoad(query) {
    console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
  },
  onShareAppMessage() {
    return {
      title: 'My App',
      desc: 'My App description',
      path: 'pages/index/index',
    };
  },
  navigateToScreen1() {
    my.navigateTo({
      url: '/pages/screen1/screen1'
    });
  },
  navigateToScreen2() {
    my.navigateTo({
      url: '/pages/screen2/screen2'
    });
  },
  navigateToScreen3() {
    my.navigateTo({
      url: '/pages/screen3/screen3'
    });
  },
});
