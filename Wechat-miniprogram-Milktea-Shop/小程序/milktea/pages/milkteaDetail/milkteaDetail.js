// pages/milkteaDetail/milkteaDetail.js
var base = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    milktea: "",
    //设置中间变量，把onLoad中的获取到的标题函数传入到onReady中使用
    navigateTitle: "",
    price: 0,
    total: "", //选择内容的描述
    num: 1, //购买数量
    pickupTime: "12:00",      // 取餐时间
    minTime: "09:00",        // 最早时间
    maxTime: "21:00",        // 最晚时间
    dineInOrTakeout: 0,      // 0-堂食 1-打包
    zero_buttons: [{
      id: 1,
      name: "0糖低卡糖￥1"
    }],
    zero: 0,

    cheese_buttons: [{
      id: 1,
      name: "卤蛋￥2"
    }],
    cheese: 0,

    double_buttons: [{
      id: 1,
      name: "豆干￥1"
    }],
    double: 0,
  },

   // 新增时间选择事件
   onTimeChange(e) {
    this.setData({
      pickupTime: e.detail.value
    })
    this.generateTotal()
  },

  // 新增就餐方式事件
  onDineInOrTakeoutChange(e) {
    this.setData({
      dineInOrTakeout: parseInt(e.detail.value)
    })
    this.generateTotal()
  },

  generateTotal: function (e) {
    let description = ""
    if (this.data.cheese != 0) {
      description += "卤蛋"
    }
    if (this.data.double != 0) {
      description += "豆干"
    }
     // 新增取餐信息
     description += ` | 取餐时间：${this.data.pickupTime}`
     description += this.data.dineInOrTakeout === 0 ? "（堂食）" : "（打包）"
 
     this.setData({ total: description })
  },

  minusCount: function (e) {
    if (this.data.num > 1) {
      // 当数量为1时不可减少
      // 计算单价
      var singlePrice = this.data.price / this.data.num
      console.log(singlePrice)
      var newPrice = this.data.price - singlePrice
      var newNum = this.data.num - 1
      this.setData({
        num: newNum,
        price: newPrice
      })
    }
  },

  plusCount: function (e) {
    // 计算单价
    var singlePrice = Math.round(this.data.price / this.data.num)
    console.log(singlePrice)
    var newPrice = Number(this.data.price) + Number(singlePrice)
    console.log(newPrice)
    var newNum = this.data.num + 1
    this.setData({
      num: newNum,
      price: newPrice
    })
  },


  strawButtonTap: function (e) {
    console.log(e)
    let id = e.currentTarget.dataset.id
    console.log(id)
    for (let i = 0; i < this.data.straw_buttons.length; i++) {
      if (this.data.straw_buttons[i].id == id) {
        //当前点击的位置为true即选中
        this.data.straw_buttons[i].checked = true
      } else {
        //其他的位置为false
        this.data.straw_buttons[i].checked = false
      }
    }
    this.setData({
      straw_buttons: this.data.straw_buttons,
      straw: id
    })
    this.generateTotal()
  },

  sugarButtonTap: function (e) {
    console.log(e)
    let id = e.currentTarget.dataset.id
    console.log(id)
    for (let i = 0; i < this.data.sugar_buttons.length; i++) {
      if (this.data.sugar_buttons[i].id == id) {
        //当前点击的位置为true即选中
        this.data.sugar_buttons[i].checked = true
      } else {
        //其他的位置为false
        this.data.sugar_buttons[i].checked = false
      }
    }
    this.setData({
      sugar_buttons: this.data.sugar_buttons,
      sugar: id
    })
    this.generateTotal()
  },

  iceButtonTap: function (e) {
    console.log(e)
    let id = e.currentTarget.dataset.id
    console.log(id)
    for (let i = 0; i < this.data.ice_buttons.length; i++) {
      if (this.data.ice_buttons[i].id == id) {
        //当前点击的位置为true即选中
        this.data.ice_buttons[i].checked = true
      } else {
        //其他的位置为false
        this.data.ice_buttons[i].checked = false
      }
    }
    this.setData({
      ice_buttons: this.data.ice_buttons,
      ice: id
    })
    this.generateTotal()
  },

  cheeseButtonTap: function (e) {
    console.log(e)
    var id
    // 当前价格
    var oldPrice = Number(this.data.price)
    if (this.data.cheese == 0) {
      id = 1
      oldPrice += 2 * Number(this.data.num)
    } else {
      id = 0
      oldPrice -= 2 * Number(this.data.num)
    }
    console.log(id)
    this.data.cheese_buttons[0].checked = !this.data.cheese_buttons[0].checked
    this.setData({
      cheese_buttons: this.data.cheese_buttons,
      cheese: id,
      price: oldPrice
    })
    this.generateTotal()
  },

  doubleButtonTap: function (e) {
    console.log(e)
    var id
    // 当前价格
    var oldPrice = Number(this.data.price)
    if (this.data.double == 0) {
      id = 1
      oldPrice += 1 * Number(this.data.num)
    } else {
      id = 0
      oldPrice -= 1 * Number(this.data.num)
    }
    console.log(id)
    this.data.double_buttons[0].checked = !this.data.double_buttons[0].checked
    this.setData({
      double_buttons: this.data.double_buttons,
      double: id,
      price: oldPrice
    })
    this.generateTotal()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const now = new Date()
    now.setMinutes(now.getMinutes() + 30)
    const defaultTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`

    const milkteaData = JSON.parse(options.milktea)

    this.setData({
      milktea: milkteaData,
      navigateTitle: milkteaData.name,
      price: milkteaData.price,
      pickupTime: defaultTime,  // 初始化取餐时间
      total: ""
    })
  },

  confirmButtonTap: function (e) {
    const that = this
    const singlePrice = Number(this.data.price / this.data.num)
    base.cart.cartno = Number(base.cart.cartno) + 1
    console.log("supplyno in confirmButtonTap" + base.cart.cartno)
    if (base.cart.add({
      supplyno: base.cart.cartno,
      id: this.data.milktea.id,
      name: this.data.milktea.name,
      size: this.data.total,
      price: singlePrice,
      num: this.data.num,
      pickupTime: this.data.pickupTime,        // 新增
      dineInOrTakeout: this.data.dineInOrTakeout // 新增
    })) {
      this.setData({ cartNum: base.cart.getNum() })
      base.modal({
        title: '加入成功！',
        content: "跳转到购物车或留在当前页",
        showCancel: true,
        cancelText: "留在此页",
        confirmText: "去购物车",
        success: function (res) {
          if (res.confirm) {
            that.goc();
          }
        }
      })
    }
  },
  goc: function () {
    var _this = this;
    // base.cart.ref = "../cakeDetail/cakeDetail?pname=" + _this.data.name + "&brand=" + _this.data.brand;
    wx.switchTab({
        url: "../cart/cart"
    })
},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: this.data.navigateTitle
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})