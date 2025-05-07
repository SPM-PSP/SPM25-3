// pages/location/location.js
Page({
  data: {
    nickName: '',
    longitude: 104.065, // 成都的经度
    latitude: 30.572, // 成都的纬度
    scale: 14, // 地图缩放级别
    location: '成都市中心',
    markers: [ // 地图上的标记点数组
      {
        id: 1,
        longitude: 104.065,
        latitude: 30.572,
        title: '成都市中心',
      }
    ],
    hasLocationAuth: false // 新增数据属性，用于记录用户是否授权位置信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 接收传递过来的昵称参数
    if (options.nickName) {
      this.setData({
        nickName: decodeURIComponent(options.nickName)
      });
    }
    // 检查位置授权状态
    this.checkLocationAuth();
  },

  /**
   * 检查位置授权状态
   */
  checkLocationAuth: function() {
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userLocation']) {
          // 用户已授权地理位置权限
          this.setData({ hasLocationAuth: true });
          this.getLocation(); // 获取位置信息
        } else {
          // 用户未授权地理位置权限
          this.setData({ hasLocationAuth: false });
          this.requestLocationAuth(); // 请求位置授权
        }
      }
    });
  },

  /**
   * 请求位置授权
   */
  requestLocationAuth: function() {
    wx.authorize({
      scope: 'scope.userLocation',
      success: () => {
        // 用户点击同意授权
        this.setData({ hasLocationAuth: true });
        this.getLocation(); // 获取位置信息
      },
      fail: () => {
        // 用户拒绝授权
        wx.showModal({
          title: '提示',
          content: '您拒绝了位置授权，将无法使用定位功能',
          showCancel: false,
          confirmText: '我知道了'
        });
      }
    });
  },

  /**
   * 获取位置信息
   */
  getLocation: function() {
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        const latitude = res.latitude;
        const longitude = res.longitude;
        // 更新页面数据
        this.setData({
          latitude,
          longitude,
          // 更新标记点位置
          markers: [{
            id: 1,
            latitude,
            longitude,
            title: '成都市中心'
          },
          {
            id: 2,
            longitude: 113.11111, // 固定位置1的经度
            latitude: 23.08888, // 固定位置1的纬度
            iconPath: 'http://localhost:8080/images/location.png', // 标记的图标路径
            width: 30, // 图标的宽度
            height: 30 // 图标的高度
          }
        ]
        });
      },
      fail: () => {
        // 获取地理位置失败
        wx.showToast({
          title: '获取位置失败',
          icon: 'none'
        });
      }
    });
  },
   
  refreshLocation: function() {
    // 检查用户是否授权了地理位置权限
    if (this.data.hasLocationAuth) {
      this.getLocation(); // 如果已授权，直接获取新的位置信息
    } else {
      // 如果未授权，请求位置授权
      this.requestLocationAuth();
    }
  },

  addGpsData: function() {
    const data = {
      longitude: 104.065, // 示例数据，实际使用时需要动态获取
      latitude: 30.572,
      time: new Date().toISOString(), // 使用ISO格式的时间字符串
      altitude: 0 // 示例数据
    };

    wx.request({
      url: 'http://your-server-domain/addGps', // 你的服务器API地址
      method: 'POST',
      data: data,
      success: function(res) {
        console.log('Data added:', res);
      },
      fail: function(error) {
        console.error('Failed to add data:', error);
      }
    });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    // 可以在这里处理上拉触底的逻辑
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    // 可以在这里处理分享的逻辑
  },

  /**
   * 页面相关事件处理函数--监听地图点击事件
   */
  
});