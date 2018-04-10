// pages/addDeal/addDeal.js
var vm = null
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    image: '',       //头像
    num: 1,         //产品数量
    remark: '',      //备注
    isBuy: false,     //是否购买
    isReservation: false,    //是否交定金
    date: '2018-04-10',      //提醒时间
  },

  //提醒时间
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },

  onChangeNumber(e) {
    var num = e.detail.number
    vm.setData({ num: num })
  },

  textAreaEventListener: function (e) {
    // console.log("55555" + JSON.stringify(e.detail.value))
    vm.setData({
      remark: e.detail.value,
    })
  },

  switchBuy: function (e) {
    // console.log('携带值为', e.detail.value)
    vm.setData({ isBuy: e.detail.value })
  },
  switchReservation: function (e) {
    // console.log('携带值为', e.detail.value)
    vm.setData({ isReservation: e.detail.value })
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