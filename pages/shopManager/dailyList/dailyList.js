// pages/shopManager/dailyList/dailyList.js
var vm = null
var util = require("../../../utils/util.js")
Page({

  data: {

  },

  //发布成功提示
  showToast() {
    vm.setData({
      toast: {
        show: true
      }
    })
    setTimeout(() => {
      vm.setData({
        toast: {
          show: false
        }
      })
    }, 1500)
  },

  //判断今天是否提交过竞品日报
  judgeBoutique: function () {
    var param = {
      shop_manager_id: getApp().globalData.userInfo.id,
      stmt_date: util.getToday()
    }
    util.shopManagerGetBoutiqueDaily(param, function (res) {
      if (res.data.result) {
        wx.navigateTo({
          url: '/pages/shopManager/boutiqueDetail/boutiqueDetail',
        })
      } else {
        vm.showToast()
        // util.showToast("今天已经提交过竞品日报")
      }
    })
  },

  //判断今天是否提交过产品日报
  judgeProduct: function () {
    var param = {
      shop_manager_id: getApp().globalData.userInfo.id,
      shop_manager_opt_time: util.getToday()
    }
    util.getShopManagerDailyPaper(param, function (res) {
      if (res.data.result) {
        wx.navigateTo({
          url: '/pages/shopManager/productDaily/productDaily',
        })
      } else {
        vm.showToast()
        // util.showToast("今天已经提交过产品日报")
      }
    })
  },

  //返回上一层
  back: function () {
    wx.navigateBack({
      delta: 1
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    vm = this
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