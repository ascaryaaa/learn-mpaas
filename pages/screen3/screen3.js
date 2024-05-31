Page({
  data: {
    uploadedFiles: [], // Array to store the uploaded files
  },

  onChange(fileList) {
    // This data includes both the successful and failed upload lists. If you need to filter out the successfully uploaded images, handle it here.
    console.log('Image list:', fileList);
  },

  onPreview(file) {
    console.log('preview', file);
  },

  onRemove(e) {
    const file = e.target.dataset.file;
    console.log('File to be removed:', file);
    console.log('Uploaded files:', this.data.uploadedFiles);
  
    // Log the URLs of all files stored in local storage
    const fs = my.getFileSystemManager();
    fs.getSavedFileList({
      success: (res) => {
        const fileList = res.fileList || []; // Ensure fileList is defined
        console.log('Files in local storage:', fileList.map(file => file.filePath));
  
        const correctFile = fileList.find(savedFile => savedFile.filePath.includes(file.url));
        if (correctFile) {
          // Remove the file from local storage
          fs.removeSavedFile({
            filePath: correctFile.filePath,
            success: () => {
              console.log('Removed from local storage:', correctFile.filePath);
              const updatedFiles = this.data.uploadedFiles.filter((item) => item.url !== file.url);
              this.setData({
                uploadedFiles: updatedFiles
              });
              console.log('Local storage after removal:', updatedFiles);
            },
            fail: (error) => {
              console.error('Remove from local storage failed: ', error);
            },
          });
        } else {
          console.error('File not found in local storage:', file.url);
        }
      },
      fail: (error) => {
        console.error('Failed to get files from local storage:', error);
      }
    });
  },
  
  
  

  chooseAndUploadImage() {
    my.chooseImage({
      success: (res) => {
        if (res.apFilePaths && res.apFilePaths.length > 0) {
          const path = res.apFilePaths[0];
          console.log('Selected image path:', path);
  
          // Save to local storage
          const fs = my.getFileSystemManager();
          const localPath = `${my.env.USER_DATA_PATH}/${Date.now()}-${Math.floor(Math.random() * 1000)}.jpg`; // Generate a unique file name
          fs.saveFile({
            tempFilePath: path,
            filePath: localPath,
            success: (saveRes) => {
              console.log('Saved to local storage:', saveRes.savedFilePath);
              
              // Log the URLs of all files stored in local storage
              fs.getSavedFileList({
                success: (res) => {
                  const fileList = res.fileList || []; // Ensure fileList is defined
                  console.log('Files in local storage:', fileList.map(file => file.filePath));
                  
                  // Update the uploaded files array with the correct filename
                  const uploadedFile = { 
                    url: path, // Use the original URL
                    localPath: saveRes.savedFilePath // Save the local storage filename
                  };
                  const updatedFiles = [...this.data.uploadedFiles, uploadedFile];
                  this.setData({ uploadedFiles: updatedFiles });
                  console.log('Uploaded files:', updatedFiles);
                  my.alert({ title: 'Upload Successful' });
                },
                fail: (error) => {
                  console.error('Failed to get files from local storage:', error);
                }
              });
            },
            fail: (error) => {
              console.error('Save to local storage failed: ', error);
              my.alert({ title: 'Save Failed', content: JSON.stringify(error) });
            },
          });
        }
      },
      fail: (error) => {
        if (error.error !== 11) { // 11 is the error code for user cancellation
          console.error('Image selection failed: ', error);
        } else {
          console.log('Image selection was canceled by the user.');
        }
      }
    });
  },
  
  
  
});
