// pages/staff/byPhoneQueryClient/byPhoneQueryClient.js
var util = require('../../../utils/util.js')
var vm = null
Page({

  data: {
    tel: '',      //输入的客流
    page: '',       //确定跳转到哪个页面    
  },

  onLoad: function (options) {
    // var page = options.page
    vm = this
    // vm.setData({ page: page })
    // console.log("page" + page)
  },

  //输入电话
  inputPhone: function (e) {
    // console.log("---" + JSON.stringify(e))
    vm.setData({ tel: e.detail.value })
  },

  //根据电话号查询客户信息
  getClientByTel: function () {
    var param = {
      tel: vm.data.tel
    }
    util.getClientByTel(param, function (res) {
      if (res.data.result) {
        vm.setData({ clientDetail: res.data.ret[0] })
        console.log("111")

        wx.navigateTo({
          url: '/pages/staff/clientDetail/clientDetail',
        })
      } else {
        wx.navigateTo({
          url: '/pages/addClientAddDeal/addClientAddDeal',
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