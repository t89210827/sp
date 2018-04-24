// pages/hint/addPassengerFlow/addPassengerFlow.js
const util = require('../../../utils/util.js')
var vm = null
Page({
  data: {
    image: 'https://s10.mogucdn.com/p2/161213/upload_76h1c5hjc8heecjehlfgekjdl2ki0_514x260.png',
    title: '添加客流量成功',
    // tip: '请耐心等待管理员审核通过',
    button: '返回首页'
  },
  //返回员工首页
  jumpIndex: function () {
    // wx.redirectTo({
    //   url: '/pages/index/index',
    // })
    wx.switchTab({
      url: '/pages/staff/staff',
    })
  },
  //跳转客户信息首页
  jumpClientInformation: function () {
    wx.navigateTo({
      url: '/pages/clientInformation/staff/staff',
    })
  },

  onLoad: function (options) {

  },

  //根据user_id获取员工入职信息
  getAuditByUserId: function () {
    util.getAuditByUserId({}, function (res) {
      console.log(res)
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
    wx.stopPullDownRefresh()    //停止下拉刷新

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
    vm.getAuditByUserId()
  }
})