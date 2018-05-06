// pages/ranking/shop/shop.js
var vm = null
var util = require('../../../utils/util.js')
Page({
  data: {
    shopList: [],         //员工列表  
    reverse: true,         //判断正序还是倒序
  },

  //正序倒序
  clickSwitch: function () {
    var shopList = vm.data.shopList
    var reverse = !vm.data.reverse
    shopList.reverse()
    vm.setData({ shopList: shopList, reverse: reverse })
  },

  onLoad: function (options) {
    vm = this
    // vm.getShopList()
    vm.getShop()
  },

  //主管下的店铺列表
  getShop: function () {
    var param = {
      manager_id: getApp().globalData.userInfo.id,
      page: 1,
    }
    util.getShop(param, function (res) {
      if (res.data.result) {
        var shops = res.data.ret.shop.data
        vm.setData({
          shops: shops,
        })
      }
    })
  },

  //获取所有生效的店铺信息
  // getShopList: function () {
  //   util.getShopList({}, function (res) {
  //     if (res.data.result) {
  //       var shopList = res.data.ret
  //       vm.setData({ shopList: shopList })
  //     }
  //   })
  // },

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