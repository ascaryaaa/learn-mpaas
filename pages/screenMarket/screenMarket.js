// screenMarket.js

Page({
  data: {
    products: [] // Initialize products array to store fetched products
  },

  onLoad() {
    this.fetchProducts(); // Fetch products when the page is loaded
  },

  fetchProducts() {
    my.httpRequest({
      url: 'http://localhost:8084/products', // API endpoint to fetch products
      method: 'GET',
      dataType: 'json',
      success: (res) => {
        console.log('Products fetched successfully:', res.data);
        this.setData({
          products: res.data // Update products array with fetched products
        });
      },
      fail: (error) => {
        console.error('Error fetching products:', error);
        my.alert({
          title: 'Error',
          content: 'Failed to fetch products. Please try again.'
        });
      }
    });
  },
  navigateToScreenMarketDetail(event) {
    const productId = event.currentTarget.dataset.id;
    my.navigateTo({
      url: `/pages/screenMarket/screenMarketDetail/screenMarketDetail?productId=${productId}`
    });
  }
});
