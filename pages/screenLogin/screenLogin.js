Page({
  data: {
    username: '',
    password: ''
  },

  onLoad() {
    // Initialization logic
  },

  handleInputUsername(e) {
    this.setData({
      username: e.detail.value.trim() // Trim whitespace from username input
    });
  },

  handleInputPassword(e) {
    this.setData({
      password: e.detail.value
    });
  },

  handleLogin() {
    const { username, password } = this.data;

    // Validate username and password
    if (!username || !password) {
      my.alert({
        title: 'Error',
        content: 'Please enter username and password.'
      });
      return;
    }

    // Simulate login with the user data stored in the backend
    this.loginUser(username, password);
    console.log(username, password);
  },

  loginUser(username, password) {
    my.httpRequest({
      url: 'http://localhost:8083/users', // Ensure this URL is correct and accessible
      method: 'GET',
      success: (res) => {
        console.log('Users fetched successfully:', res.data);

        try {
          // No need to parse JSON, directly use the response data
          const userData = res.data;
          
          // Find the user in the list based on username and password
          const foundUser = userData.find(user => user.userUsername === username && user.userPassword === password);

          if (foundUser) {
            // Successful login
            console.log('Login successful for:', foundUser);

            // Navigate to home screen or perform any other action
            my.navigateTo({
              url: '/pages/index/index'
            });
          } else {
            // Invalid credentials
            my.alert({
              title: 'Error',
              content: 'Invalid username or password. Please try again.'
            });
          }
        } catch (error) {
          console.error('Error processing user data:', error);
          my.alert({
            title: 'Error',
            content: 'Failed to process user data. Please try again.'
          });
        }
      },
      fail: (err) => {
        console.error('Error fetching users:', err);
        my.alert({
          title: 'Error',
          content: 'Failed to fetch user data. Please try again.'
        });
      }
    });
  }
});
