Page({
  data: {
    studentName: '',
    jurusan: '',
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
  navigateToVideo() {
    my.navigateTo({
      url: '/pages/screenVideo/screenVideo'
    });
  },
  navigateToAnimation() {
    my.navigateTo({
      url: '/pages/screenAnimation/screenAnimation'
    });
  },
  navigateToCamera() {
    my.navigateTo({
      url: '/pages/camera/camera'
    });
  },
  navigateToScreenTransfer() {
    my.navigateTo({
      url: '/pages/screenTransfer/screenTransfer'
    });
  },
  navigateToScreenMarket() {
    my.navigateTo({
      url: '/pages/screenMarket/screenMarket'
    });
  },
  navigateToScreenKampusKu() {
    my.navigateTo({
      url: '/pages/screenKampusKu/screenKampusKu'
    });
  },
  navigateToYoutube() {
    my.navigateTo({
      url: '/pages/screenYoutube/screenYoutube'
    });
  },
  navigateToChart() {
    my.navigateTo({
      url: '/pages/chart/chart'
    });
  },
  fetchUsers() {
    my.getStorage({
      key: 'userId',
      success: (res) => {
        const userId = res.data;
        this.fetchStudentData(userId);
      },
      fail: (err) => {
        console.error('Failed to fetch userId from storage:', err);
        my.alert({
          title: 'Error',
          content: 'Failed to fetch user data. Please try again.'
        });
      }
    });
  },

  fetchStudentData(userId) {
    my.httpRequest({
      url: `http://localhost:8083/users/${userId}`, // Endpoint to fetch user data based on userId
      method: 'GET',
      success: (res) => {
        console.log('User data fetched successfully:', res.data);

        try {
          const user = res.data;
          const saldo = user.cards.length > 0 ? user.cards[0].cardBalance : 0;
          const jurusan = user.userJurusan;
          const studentName = user.userName;
          const studentID = user.cards[0].cardNumber.toString();
          const studentProfilePicture = user.userProfilePicture;

          // Update saldo view
          this.setData({
            saldo: saldo
          });

          // Update student info view
          this.setData({
            studentName: studentName,
            studentID: studentID,
            jurusan: jurusan,
            studentProfilePicture: studentProfilePicture
          });
        } catch (error) {
          console.error('Error parsing user data:', error);
          my.alert({
            title: 'Error',
            content: 'Failed to parse user data. Please try again.'
          });
        }
      },
      fail: (err) => {
        console.error('Error fetching user data:', err);
        my.alert({
          title: 'Error',
          content: 'Failed to fetch user data. Please try again.'
        });
      }
    });
  },
});
