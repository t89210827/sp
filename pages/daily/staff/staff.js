// pages/daily/staff/staff.js
var util = require('../../../utils/util.js')
var vm = null
Page({
  data: {
    submitDaily: [],                 //提交日报信息
    date: "",                        //日期
    num: 0,                        //订货数量
  },

  onLoad: function (options) {
    vm = this
    var date = util.getToday()
    vm.setData({ date: date })
    vm.getAuditDailyPaperData()  //根据店员id和时间查询日报信息
  },

  //根据店员id和时间查询日报信息
  getAuditDailyPaperData: function () {
    var param = {
      stmt_date: vm.data.date,
      shop_id: getApp().globalData.userInfo.shop_id,
    }
    util.getAuditDailyPaperData(param, function (res) {
      if (res.data.result) {
        var daily = res.data.ret
        var submitDaily = res.data.ret.dailPapers
        var passenger_flow = res.data.ret.passenger_flow.passenger_flow
        vm.setData({ submitDaily: submitDaily, passenger_flow: passenger_flow, daily: daily })
      }
    })
  },

  onChangeNumber(e) {
    var num = e.detail.number
    var arr = []
    var productArr = []
    for (var i = 0; i < num; i++) {
      arr.push({
        "user_id": getApp().globalData.userInfo.id,
        "shop_id": getApp().globalData.userInfo.shop_id,
        "client_id": "",
        "product_id": "",
        "product_name": "",
        "budget": "0-5000",
        "isbuy": 1,
        "money": "",
        "isearnest": 1,
        "isearnest_money": "",
        "purpose": "",
        "purpose_time": "2018-04-10",
        "remind_time": "",
        "remark": "",
        "num": ""
      })
      productArr.push("黄铂")
    }
    console.log("777" + JSON.stringify(arr))
    // vm.setData({ num: num, dealData: arr, productArr: productArr })
    vm.setData({ num: num })
  },

  //提价日报 跳转到员工首页
  getShopManagerTask: function () {

    wx.switchTab({
      url: '/pages/staff/staff',
    })
  },

  //返回上一层
  back: function () {
    wx.navigateBack({
      delta: 1
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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