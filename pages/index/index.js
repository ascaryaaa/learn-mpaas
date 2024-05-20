Page({
  data: {
    studentName: '',
    jurusan: '-',
    studentID: '',
    saldo: ''
  },

  onLoad() {
    this.fetchUsers(); // Fetch users when the page is loaded
  },

  onShareAppMessage() {
    return {
      title: 'My App',
      desc: 'My App description',
      path: 'pages/index/index'
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
  navigateToScreenTransfer() {
    my.navigateTo({
      url: '/pages/screenTransfer/screenTransfer'
    });
  },

  fetchUsers() {
    my.httpRequest({
      url: 'http://localhost:8083/users',
      method: 'GET',
      success: (res) => {
        console.log('Users fetched successfully:', res.data);
        this.updateUserContent(res.data); // Update user content
      },
      fail: (err) => {
        console.error('Error fetching users:', err);
        my.alert({
          title: 'Error',
          content: 'Failed to fetch user data. Please try again.'
        });
      },
      complete: () => {
        console.log('Fetch users request completed');
      }
    });
  },

  updateUserContent(userData) {
    try {
      if (Array.isArray(userData) && userData.length > 0) {
        const user = userData[0];
        const saldo = user.cards.length > 0 ? user.cards[0].cardBalance : 0;
        const studentName = user.userName;
        const studentID = user.cards[0].cardNumber.toString();

        // Update saldo view
        this.setData({
          saldo: saldo
        });

        // Update student info view
        this.setData({
          studentName: studentName,
          studentID: studentID
        });
      }
    } catch (error) {
      console.error('Error parsing user data:', error);
      my.alert({
        title: 'Error',
        content: 'Failed to parse user data. Please try again.'
      });
    }
  }
});
