Page({
  data: {
    localStorageImages: [], // Array to store images in local storage
  },

  chooseAndUploadImage() {
    my.chooseImage({
      success: (res) => {
        if (res.apFilePaths && res.apFilePaths.length > 0) {
          const path = res.apFilePaths[0];
          const fs = my.getFileSystemManager();
          const localPath = `${my.env.USER_DATA_PATH}/${Date.now()}-${Math.floor(Math.random() * 1000)}.jpg`;
          fs.saveFile({
            tempFilePath: path,
            filePath: localPath,
            success: (saveRes) => {
              fs.getSavedFileList({
                success: (res) => {
                  const localStorageImages = res.fileList.map(file => file.filePath);
                  this.setData({ localStorageImages });
                },
                fail: (error) => {
                  console.error('Failed to get files from local storage:', error);
                }
              });
              my.alert({ title: 'Upload Successful' });
            },
            fail: (error) => {
              console.error('Save to local storage failed: ', error);
              my.alert({ title: 'Save Failed', content: JSON.stringify(error) });
            },
          });
        }
      },
      fail: (error) => {
        if (error.error !== 11) {
          console.error('Image selection failed: ', error);
        } else {
          console.log('Image selection was canceled by the user.');
        }
      }
    });
  },

  logLocalStorageFiles() {
    const fs = my.getFileSystemManager();
    fs.getSavedFileList({
      success: (res) => {
        const localStorageImages = res.fileList.map(file => file.filePath);
        this.setData({ localStorageImages });
      },
      fail: (error) => {
        console.error('Failed to get files from local storage:', error);
      }
    });
  },

  onRemoveLocalStorageImage(e) {
    const imageUrl = e.target.dataset.file;
    const fs = my.getFileSystemManager();
    fs.getSavedFileList({
      success: (res) => {
        const fileList = res.fileList || [];
        const fileToRemove = fileList.find(file => file.filePath === imageUrl);
        if (fileToRemove) {
          fs.removeSavedFile({
            filePath: fileToRemove.filePath,
            success: () => {
              const updatedImages = this.data.localStorageImages.filter(item => item !== imageUrl);
              this.setData({ localStorageImages: updatedImages });
              console.log('Local storage images after removal:', updatedImages);
            },
            fail: (error) => {
              console.error('Failed to remove from local storage:', error);
            }
          });
        } else {
          console.error('File not found in local storage:', imageUrl);
        }
      },
      fail: (error) => {
        console.error('Failed to get files from local storage:', error);
      }
    });
  },
});
