Page({
  data: {
    productId: null,
    product: {} // Initialize an object to store the product details
  },

  onLoad(options) {
    const { productId } = options;
    this.setData({
      productId
    });
    this.fetchProductDetails(productId);
  },

  fetchProductDetails(productId) {
    my.httpRequest({
      url: `http://localhost:8084/products/${productId}`, // API endpoint to fetch product details
      method: 'GET',
      dataType: 'json',
      success: (res) => {
        console.log('Product details fetched successfully:', res.data);
        this.setData({
          product: res.data // Update product object with fetched details
        });
      },
      fail: (error) => {
        console.error('Error fetching product details:', error);
        my.alert({
          title: 'Error',
          content: 'Failed to fetch product details. Please try again.'
        });
      }
    });
  }
});
