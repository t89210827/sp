// pages/daily/staff/staff.js
var util = require('../../../utils/util.js')
var vm = null
Page({
  data: {
    submitDaily: [],                 //提交日报信息
    date: "",                        //日期
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
      passstmt_dateword: vm.data.date,
      status: 0,
      shop_id: getApp().globalData.userInfo.shop_id,
    }
    util.getAuditDailyPaperData(param, function (res) {
      if (res.data.result) {
        submitDaily: res.data.ret.dailPapers
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