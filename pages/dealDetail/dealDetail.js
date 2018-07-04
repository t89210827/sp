// pages/dealDetail/dealDetail.js
var vm = null
var util = require('../../utils/util.js')
Page({
  data: {

  },

  onLoad: function (options) {
    vm = this
    vm.getCurrentPages()
    vm.getProductById()
    vm.getUserType()          //获取用户类型
  },

  //获取用户类型
  getUserType: function () {
    var userType = getApp().globalData.userInfo.type
    vm.setData({ userType: userType })
  },

  //获取上一个页面
  getCurrentPages: function () {
    var pages = getCurrentPages();//获取当前页面信息栈
    var prevPage = pages[pages.length - 2]//获取上一个页面信息栈
    var deal = prevPage.data.deals[prevPage.data.dealId]
    vm.setData({ deal: deal })
    console.log("一条交易信息" + JSON.stringify(deal))
  },

  //跳转到修改交易信息页面
  alterStatus: function () {
    wx.navigateTo({
      url: '/pages/staff/alterDeal/alterDeal',
    })
  },

  updateDealById: function () {
    var deal = vm.data.deal
    var param = {
      id: deal.id,
      // money:
    }
  },

  //根据产品id获取产品信息
  getProductById: function () {
    var pages = getCurrentPages();//获取当前页面信息栈
    var prevPage = pages[pages.length - 2]//获取上一个页面信息栈
    var product_id = prevPage.data.deals[prevPage.data.dealId].product_id
    var param = {
      id: product_id
    }
    util.getProductById(param, function (res) {
      if (res.data.result) {
        var productName = res.data.ret.name
        vm.setData({ productName: productName })
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