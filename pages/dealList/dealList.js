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
    productType: { type: "黄铂", time: "2018-10-02", money: "2999" },
    deals: [],           //交易记录数组
    dealId: '',          //选中的交易索引
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var day = util.getToday()
    vm = this
    // vm.getDeal()
    var start_time = util.changeDate(-7)
    var end_time = util.changeDate(1)
    vm.setData({ start_time: start_time, end_time: end_time })
    vm.getDealsByTime()
  },

  //开始时间
  bindBeginDate: function (e) {
    this.setData({
      start_time: e.detail.value
    })
    vm.getDealsByTime()
    // vm.getAuditRanking()                     //本店员工排名    
  },
  //结束时间
  bindEndDate: function (e) {
    this.setData({
      end_time: e.detail.value
    })
    vm.getDealsByTime()
    // vm.getAuditRanking()                     //本店员工排名
  },

  // 根据时间段获取已购买的交易记录
  getDealsByTime: function () {
    var param = {
      start_time: vm.data.start_time,
      end_time: vm.data.end_time
    }
    util.getDealsByTime(param, function (res) {
      if (res.data.result) {
        console.log("已购买的交易记录" + JSON.stringify(res))
        var deals = res.data.ret.data
        vm.setData({ deals: deals })
      }
    })
  },

  // 根据员工id获取交易记录
  getDeal: function () {
    var param = {
      page: 1
    }
    util.getDeal(param, function (res) {
      var deals = res.data.ret.data
      vm.setData({ deals: deals })
    })
  },

  //调转到交易详情页
  jumpDealDetail: function (e) {
    var dealId = e.currentTarget.dataset.dealid
    console.log("---" + JSON.stringify(dealId))
    vm.setData({ dealId: dealId })
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