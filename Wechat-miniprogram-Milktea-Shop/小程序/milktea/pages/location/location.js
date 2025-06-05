// pages/location/location.js
Page({
  data: {
    apiUrl: "http://169.254.137.62:8080",
    imageBaseUrl: "http://169.254.137.62:8080",
    nickName: '',
    longitude: 103.99201, // 成都的经度
    latitude: 30.552785, // 成都的纬度
    scale: 14, // 地图缩放级别
    location: '四川大学江安校区',
    
    hasLocationAuth: false // 新增数据属性，用于记录用户是否授权位置信息
  },

  onLoad: function(options) {
    if (options.nickName) {
      this.setData({
        nickName: decodeURIComponent(options.nickName)
      });
    }
    this.checkLocationAuth();
  },

  checkLocationAuth: function() {
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userLocation']) {
          this.setData({ hasLocationAuth: true });
          this.getLocation();
        } else {
          this.setData({ hasLocationAuth: false });
          this.requestLocationAuth();
        }
      }
    });
  },

  requestLocationAuth: function() {
    wx.authorize({
      scope: 'scope.userLocation',
      success: () => {
        this.setData({ hasLocationAuth: true });
        this.getLocation();
      },
      fail: () => {
        wx.showModal({
          title: '提示',
          content: '您拒绝了位置授权，将无法使用定位功能',
          showCancel: false,
          confirmText: '我知道了'
        });
      }
    });
  },

  getLocation: function() {
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        const latitude = res.latitude;
        const longitude = res.longitude;
        this.setData({
          latitude,
          longitude,
          markers: [{
            mname: '我的位置' ,
            id: 1,
            latitude,
            longitude,
            title: '成都市中心',
            iconPath:  this.data.imageBaseUrl + '/images/img1.png', 
          },
          {
            mname: '西园二食堂' ,
            
            id: 2,
            longitude: 103.99201, // 固定位置1的经度
            latitude: 30.552785, // 固定位置1的纬度
            iconPath:  this.data.imageBaseUrl + '/images/img2.png', // 标记的图标路径
            width: 30, // 图标的宽度
            height: 30 // 图标的高度
          },
          {
            mname: '馨苑美食广场' ,
            id: 3,
            longitude: 103.99369, // 固定位置1的经度
            latitude: 30.553785, // 固定位置1的纬度
            iconPath:  this.data.imageBaseUrl + '/images/img2.png', // 标记的图标路径
            width: 30, // 图标的宽度
            height: 30 // 图标的高度
          },
          {
            mname: '西园一食堂' ,
            id: 4,
            longitude: 103.99444, // 固定位置1的经度
            latitude: 30.554435, // 固定位置1的纬度
            iconPath:  this.data.imageBaseUrl + '/images/img2.png', // 标记的图标路径
            width: 30, // 图标的宽度
            height: 30 // 图标的高度
          },
          {
            mname: '东园食堂' ,
            id: 5,
            longitude: 104.00371, // 固定位置1的经度
            latitude: 30.561275, // 固定位置1的纬度
            iconPath:  this.data.imageBaseUrl + '/images/img2.png', // 标记的图标路径
            width: 30, // 图标的宽度
            height: 30 // 图标的高度
          },
        ]
        }
        );
        this.calculateRelativePositions(latitude, longitude);
      },
      fail: () => {
        wx.showToast({
          title: '获取位置失败',
          icon: 'none'
        });
      }
    });
  },

  calculateRelativePositions: function(latitude, longitude) {
    const markers = this.data.markers;
    const earthRadius = 6371; // 地球半径，单位：千米
    const relativePositions = [];

    markers.forEach(marker => {
      const lat1 = latitude * Math.PI / 180;
      const lon1 = longitude * Math.PI / 180;
      const lat2 = marker.latitude * Math.PI / 180;
      const lon2 = marker.longitude * Math.PI / 180;

      // 计算距离
      const deltaLat = lat2 - lat1;
      const deltaLon = lon2 - lon1;
      const a = Math.sin(deltaLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLon / 2) ** 2;
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = earthRadius * c;

      relativePositions.push({
        mname: marker.mname,
        distance: distance.toFixed(2) + ' km'
      });
    });

    this.setData({
      relativePositions
    });
  },

  refreshLocation: function() {
    if (this.data.hasLocationAuth) {
      this.getLocation();
    } else {
      this.requestLocationAuth();
    }
  },

  onReachBottom: function() {
    // 上拉触底逻辑
  },

  onShareAppMessage: function() {
    // 分享逻辑
  },

  onMapTap: function(event) {
    // 地图点击事件
  }
});