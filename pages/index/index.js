Page({
  onLoad(query) {
    console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
    this.fetchUsers(); // Fetch users when the page is loaded
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
      },
      complete: () => {
        console.log('Fetch users request completed');
      }
    }).then((res) => {
      console.log('Promise resolved with response:', res);
    }).catch((err) => {
      console.error('Promise rejected with error:', err);
    });
  },
  updateUserContent(userData) {
    // Assuming userData is an array containing user objects
    if (userData && userData.length > 0) {
      const user = userData[0]; // Assuming only one user for simplicity
      const saldo = parseFloat(user.user_balance).toLocaleString('id-ID');
      const studentName = user.user_name;
      const jurusan = 'Your Jurusan Here'; // Replace with actual jurusan from user data
      const studentID = '890 278 0092'; // Replace with actual student ID from user data

      // Update saldo view
      this.setData({
        saldo: saldo
      });

      // Update student info view
      this.setData({
        studentName: studentName,
        jurusan: jurusan,
        studentID: studentID
      });
    }
  }
});
