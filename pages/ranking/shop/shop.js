// pages/ranking/shop/shop.js
var vm = null
var util = require('../../../utils/util.js')
Page({
  data: {
    shopList: [], //员工列表  
    reverse: true, //判断正序还是倒序
  },

  //正序倒序
  clickSwitch: function() {
    var shopList = vm.data.shopList
    var reverse = !vm.data.reverse
    shopList.reverse()
    vm.setData({
      shopList: shopList,
      reverse: reverse
    })
  },

  onLoad: function(options) {
    vm = this
    var start_time = util.changeDate(-7)
    var end_time = util.changeDate(1)
    vm.setData({
      start_time: start_time,
      end_time: end_time
    })
    vm.getShopRanking()
  },
  // 主管查看店铺排名：非黄珀业绩+大额订单的业绩 / 非黄珀任务额（按月算，倒叙）（业绩保留两位小数）
  getShopRanking: function() {
    var param = {
      shop_id: getApp().globalData.userInfo.shop_id,
      start_time: vm.data.start_time,
      end_time: vm.data.end_time,
    }
    util.getShopRanking(param, function(res) {
      if (res.data.result) {
        var shops = res.data.ret
        var allMoney = 0 //总额
        for (var index in shops) {
          allMoney += shops[index].moneies
        }

        vm.setData({
          shops: shops,
          allMoney: allMoney
        })
      }
    })
  },

  //开始时间
  bindBeginDate: function(e) {
    this.setData({
      start_time: e.detail.value
    })
    vm.getShopRanking()
  },
  //结束时间
  bindEndDate: function(e) {
    this.setData({
      end_time: e.detail.value
    })
    vm.getShopRanking()
  },

  //返回上一层
  back: function() {
    wx.navigateBack({
      delta: 1
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})