// pages/queryClient/queryClient.js
var util = require('../../utils/util.js')
var vm = null
Page({

  data: {
    phone: '',      //输入的电话
  },

  onLoad: function (options) {
    vm = this
  },

  //输入电话
  inputPhone: function (e) {
    console.log("---" + JSON.stringify(e))
    vm.setData({ phone: e.detail.value })
  },
  //查询客户
  getClientByTel: function () {
    var param = {
      tel: vm.data.phone
    }
    util.getClientByTel(param, function (res) {
      if (res.data.code === 902) {
        wx.navigateTo({
          url: '/pages/addClient/addClient',
        })
      } else if (res.data.code === 200) {
        wx.navigateTo({
          url: '',
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