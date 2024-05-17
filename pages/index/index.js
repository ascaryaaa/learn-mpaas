function onRemove(file) {
  return new Promise((resolve) => {
      console.log('即将移除的图片为：', file);
      my.confirm({
          title: '是否确认移除图片',
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          success: (e) => {
              resolve(e.confirm);
          },
      });
  });
}
function onUpload(file) {
  console.log('当前上传的图片为：', file);
  return new Promise((resolve) => {
      setTimeout(() => {
          resolve('https://gw.alipayobjects.com/mdn/rms_226d75/afts/img/A*5m0ZQYhxhjEAAAAAAAAAAAAAARQnAQ');
      }, 2000);
  });
}
Page({
  data: {
    defaultFileList: [
        {
            url: 'https://gw.alipayobjects.com/mdn/rms_226d75/afts/img/A*znK_ToIL8rQAAAAAAAAAAAAAARQnAQ',
            status: 'done',
        },
        {
            url: 'https://gw.alipayobjects.com/mdn/rms_226d75/afts/img/A*kStORbDQxwMAAAAAAAAAAAAAARQnAQ',
            status: 'done',
        },
        {
            url: 'https://gw.alipayobjects.com/mdn/rms_226d75/afts/img/A*K4Z-RLHuliYAAAAAAAAAAAAAARQnAQ',
            status: 'done',
        },
    ],
  },
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
  onChange(fileList) {
    console.log('Picture list：', fileList);
  },
  handleUploaderRef(ref) {
    console.log('handleUploaderRef', ref);
    this.handleUploaderRef = ref;
  },
  upload() {
      this.handleUploaderRef.chooseImage();
  },
  onUpload,
});
