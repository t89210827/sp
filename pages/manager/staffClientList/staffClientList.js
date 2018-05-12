// pages/manager/staffClientList/staffClientList.js
var vm = null
var util = require('../../../utils/util.js')
Page({
  data: {
    staffList: [],         //员工列表  
  },
  onLoad: function (options) {
    vm = this
    var shop_id = options.shop_id
    vm.setData({ shop_id: shop_id })
    // vm.getAuditListByShopId(shop_id)
    vm.getAuditAndClientByShopId()
  },

  getAuditAndClientByShopId: function () {
    var param = {
      shop_id: vm.data.shop_id
    }
    util.getAuditAndClientByShopId(param, function (res) {
      if (res.data.result) {
        var staffList = res.data.ret
        vm.setData({ staffList: staffList })
      }
    })
  },

  // 根据shop_id获取员工列表
  // getAuditListByShopId: function (shop_id) {
  //   var param = {
  //     shop_id: shop_id
  //   }
  //   util.getAuditListByShopId(param, function (res) {
  //     if (res.data.result) {
  //       var staffList = res.data.ret.userRole.data
  //       vm.setData({ staffList: staffList })
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