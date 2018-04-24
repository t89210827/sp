// pages/dealList/dealList.js
var util = require('../../utils/util.js')
var vm = null
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: "",
    userInfo: '',      //用户信息
    productType: { type: "黄铂", time: "2018-10-02", money: "2999" }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var day = util.getToday()
    vm = this

    wx.login({
      success: function (res) {
        wx.getUserInfo({
          success: function (res) {
            console.log("---" + JSON.stringify(res))
            vm.setData({ userInfo: res.userInfo })
          }
        })
      }
    })

    vm.getDeal()
  },

  // 根据员工id获取交易记录
  getDeal: function () {
    var param = {
      page: 1
    }
    util.getDeal(param, function (res) {

    })
  },

  //调转到交易详情页
  jumpDealDetail: function () {
    wx.navigateTo({
      url: '/pages/dealDetail/dealDetail',
    })
  },

  //开始时间
  bindDate: function (e) {
    this.setData({
      date: e.detail.value
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