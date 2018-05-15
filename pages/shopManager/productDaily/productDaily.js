// pages/shopManager/productDaily/productDaily.js
var vm = null
var util = require('../../../utils/util.js')
Page({
  data: {

  },

  onLoad: function (options) {
    vm = this
    var date = util.getToday()
    vm.setData({ date: date })
    vm.getShopManagerDailyPaperData()   //店长查看日报信息  
  },

  addShopManagerDailyPaper: function () {
    wx.showModal({
      title: '确认',
      content: '确定提交产品日报吗？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          vm.shopManagerDailyPaper()
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  // 店长提交日报
  shopManagerDailyPaper: function () {
    var dailyPaperData = vm.data.dailyPaperData
    var shopManagerDailyPaper = []
    for (var i = 0; i < dailyPaperData.length; i++) {
      if (dailyPaperData[i].product_id == 2) {
        console.log("1378461238748129346" + JSON.stringify(dailyPaperData[i].product_request))

        var shopManagerDailyPaperIndex = {
          "user_id": getApp().globalData.userInfo.id,
          "shop_id": getApp().globalData.userInfo.shop_id,
          "stmt_date": vm.data.date,
          "product_id": dailyPaperData[i].product_id,

          "performance_request": dailyPaperData[i].product_request,

          "performance_finish": dailyPaperData[i].performance_finish,
          "gram_weight": dailyPaperData[i].gram_weight,
          "gold_number": dailyPaperData[i].gold_number,
          "status": 5,
          "shop_manager_id": getApp().globalData.userInfo.id,
          "num": dailyPaperData[i].daily_paper_num,
          // "total_piece_number": "2000",
          // "total_than_number": "6",
          // "passenger_flow_num": "36",
          // "phone_num": "6",
          // "status": "2",
          // "phone_ratio": "6"
        }
      } else {
        var shopManagerDailyPaperIndex = {
          "user_id": getApp().globalData.userInfo.id,
          "shop_id": getApp().globalData.userInfo.shop_id,
          "stmt_date": vm.data.date,
          "product_id": dailyPaperData[i].product_id,

          "performance_request": dailyPaperData[i].product_request,

          "performance_finish": dailyPaperData[i].performance_finish,
          "status": 5,
          "shop_manager_id": getApp().globalData.userInfo.id,
          "num": dailyPaperData[i].daily_paper_num,
          // "total_piece_number": "2000",
          // "total_than_number": "6",
          // "passenger_flow_num": "36",
          // "phone_num": "6",
          // "status": "2",
          // "phone_ratio": "6"
        }
      }
      shopManagerDailyPaper.push(shopManagerDailyPaperIndex)
    }
    util.addShopManagerDailyPaper({ shopManagerDailyPaper }, function (res) {
      if (res.data.result) {
        console.log("提交产品日报返回数据" + JSON.stringify(res))
        vm.back()
      }
    })
  },

  //店长查看日报信息
  getShopManagerDailyPaperData: function () {
    var param = {
      shop_id: getApp().globalData.userInfo.shop_id,
      stmt_date: util.getToday()
    }
    util.getShopManagerDailyPaperData(param, function (res) {
      if (res.data.result) {
        console.log("店长查看产品日报" + JSON.stringify(res))
        var dailyPaperData = res.data.ret
        dailyPaperData.reverse()
        vm.setData({ dailyPaperData: dailyPaperData })
      } else {
        util.showToast(res.data.message)
      }
    })
  },

  //返回上一层
  back: function () {
    wx.navigateBack({
      delta: 1
    })
  },

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