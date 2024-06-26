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
  },
  confirmTransaction() {
      // Call the transfer function from the reference code
      this.transfer();
  },
  transfer() {
      // Retrieve transaction details from local storage
      const transactionDetails = this.data.transactionDetails;
      const fromCardNumber = transactionDetails.fromCardNumber;
      const toCardNumber = transactionDetails.toCardNumber;
      const amount = transactionDetails.amount;

      // Make an HTTP request to the transferCardNumber endpoint
      my.httpRequest({
          url: 'http://localhost:8083/cards/transferCardNumber',
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          data: {
              fromCardNumber,
              toCardNumber: parseFloat(toCardNumber),
              amount: parseFloat(amount),
          },
          success: (res) => {
              console.log('Transfer successful:', res);
              my.alert({
                  title: 'Transfer Successful',
                  content: JSON.stringify(res),
                  success: () => {
                      // Redirect to success payment screen
                      my.redirectTo({
                          url: '/pages/screenTransfer/screenSuccessTransfer/screenSuccessTransfer'
                      });
                  }
              });
          },
          fail: (err) => {
              console.error('Transfer failed:', err);
              my.alert({
                  title: 'Transfer Failed',
                  content: JSON.stringify(err),
              });
          }
      });
  }
});
