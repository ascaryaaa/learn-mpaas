Page({
  data: {
      transactionDetails: {}
  },
  onLoad() {
      // Retrieve transaction details from local storage
      my.getStorage({
          key: 'transactionDetails',
          success: (res) => {
              const transactionDetails = res.data;
              console.log('Transaction Details on Load:', transactionDetails);
              this.setData({
                  transactionDetails: transactionDetails
              });
          },
          fail: (err) => {
              console.error('Failed to retrieve transaction details:', err);
              my.alert({
                  title: 'Error',
                  content: 'Failed to retrieve transaction details. Please try again.',
              });
          }
      });
  }
});
