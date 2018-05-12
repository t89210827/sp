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
    vm.getShopRanking()
  },
  // 主管查看店铺排名：非黄珀业绩+大额订单的业绩 / 非黄珀任务额（按月算，倒叙）（业绩保留两位小数）
  getShopRanking: function () {
    var param = {
      shop_id: getApp().globalData.userInfo.shop_id,
    }
    util.getShopRanking(param, function (res) {
      if (res.data.result) {
        var shops = res.data.ret
        vm.setData({
          shops: shops
        })
      }
    })
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