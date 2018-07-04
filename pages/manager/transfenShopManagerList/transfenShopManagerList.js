// pages/manager/transfenShopManagerList/transfenShopManagerList.js
var vm = null
var util = require('../../../utils/util.js')

Page({
  data: {
    inputShowed: false,
    inputVal: "",

    staffList: [], //店长下员工列表
  },
  //正序倒序
  clickSwitch: function() {
    var userInfo = vm.data.userInfo1
    userInfo.reverse()
    vm.setData({
      userInfo1: userInfo
    })
  },

  showInput: function() {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function() {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function() {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function(e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  onLoad: function(options) {
    vm = this
  },

  //获取主管下所有店长信息
  manager_getShopManagerMsg: function() {
    var param = {
      manager_id: getApp().globalData.userInfo.id,
      page: 0,
    }
    util.manager_getShopManagerMsg(param, function(res) {
      if (res.data.result) {
        var staffList = res.data.ret.data
        vm.setData({
          staffList: staffList
        })
      }
    })
  },

  // 店长下的员工列表
  // getAudit: function() {
  //   var param = {
  //     type: 1,
  //     page: 1,
  //   }
  //   util.getAudit(param, function(res) {
  //     vm.setData({
  //       staffList: res.data.ret.audit.data
  //     })
  //   })
  // },

  //返回上一层
  back: function() {
    wx.navigateBack({
      delta: 1
    })
  },

  //跳转到该员工下客户列表页
  jumpClientList: function(e) {
    var audit_id = e.currentTarget.dataset.auditid
    wx.navigateTo({
      url: '/pages/shopManager/shopList/shopList?audit_id=' + audit_id,
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
    vm.manager_getShopManagerMsg() //店长下的员工列表
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