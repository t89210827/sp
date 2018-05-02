// pages/shopManager/productDaily/productDaily.js
var vm = null
var util = require('../../../utils/util.js')
Page({
  data: {

  },

  onLoad: function (options) {
    vm = this
    vm.getShopManagerDailyPaperData()   //店长查看日报信息  
  },

  //店长查看日报信息
  getShopManagerDailyPaperData: function () {
    var param = {
      // shop_id: getApp().globalData.userInfo.shop_id,
      shop_id: 45,
      stmt_date: util.getToday()
    }
    util.getShopManagerDailyPaperData(param, function (res) {
      if (res.data.result) {
        // var dailyPaperData = res.data.ret.daily_paper
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