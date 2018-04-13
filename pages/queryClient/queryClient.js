// pages/queryClient/queryClient.js
var util = require('../../utils/util.js')
var vm = null
Page({

  data: {
    phone: '',      //输入的电话
    page: '',       //确定跳转到哪个页面    
  },

  onLoad: function (options) {
    var page = options.page
    vm = this
    vm.setData({ page: page })
    console.log("page" + page)
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
      if (vm.data.page === "deal") {
        console.log("deal")

        // 如果没有这个顾客
        if (res.data.code === 902) {
          wx.navigateTo({
            url: '/pages/addClient/addClient',
          })
        } else if (res.data.code === 200) {
          wx.navigateTo({
            url: '/pages/addDeal/addDeal',
          })
        }
        return
      }

      console.log("111")


      if (res.data.code === 902) {
        wx.navigateTo({
          url: '/pages/addClient/addClient',
        })
      } else if (res.data.code === 200) {
        wx.navigateTo({
          url: '/pages/existClient/existClient',
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