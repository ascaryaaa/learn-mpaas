Page({
  data: {
    loading: false,
    populationData: [], // Initialize an empty array to store population data
  },
  onLoad() {
    this.getPopulationData();
  },
  getPopulationData() {
    this.setData({
      loading: true
    });
    my.request({
      url: 'https://datausa.io/api/data?drilldowns=Nation&measures=Population',
      complete: () => {
        this.setData({
          loading: false
        });
      },
      success: (response) => {
        this.setData({
          populationData: response.data.data
        });
        console.log('Population data:', this.data.populationData);
      },
      fail(err) {
        console.log("Error fetching population data:", err);
      }
    });
  }
});
