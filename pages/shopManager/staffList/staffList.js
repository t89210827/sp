// pages/shopManager/staffList/staffList.js

var vm = null
var util = require('../../../utils/util.js')

Page({
  data: {
    inputShowed: false,
    inputVal: "",

    staffList: [],           //店长下员工列表
  },
  //正序倒序
  clickSwitch: function () {
    var userInfo = vm.data.userInfo1
    userInfo.reverse()
    vm.setData({ userInfo1: userInfo })
  },

  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  onLoad: function (options) {
    vm = this
    var shop_id = options.shop_id
    vm.setData({ shop_id: shop_id })
    // vm.getAuditCount()              //店长下的员工列表
    vm.getAuditAndClientByShopId()           //店长下的员工列表及顾客数量
  },

  //店长下的员工列表及顾客数量
  getAuditAndClientByShopId: function () {
    var param = {
      shop_id: vm.data.shop_id
    }
    util.getAuditAndClientByShopId(param, function (res) {
      if (res.data.result) {
        var staffList = res.data.ret
        console.log("店长下的员工列表及顾客数量" + JSON.stringify(staffList))
        vm.setData({ staffList: staffList })
      }
    })
  },

  //根据店长id查询员工信息及员工录入顾客数量（对应原型：查看员工录入客户数量）
  getAuditCount: function () {
    var param = {
      shop_manager_id: getApp().globalData.userInfo.id,
      page: 1
    }
    util.getAuditCount(param, function (res) {
      if (res.data.result) {
        // console.log("根据店长id查询员工信息及员工录入顾客数量（对应原型：查看员工录入客户数量" + JSON.stringify(res))
        if (res.data.ret.length > 0) {
          var staffList = res.data.ret[0].audit
          vm.setData({ staffList: staffList })
        }
      }
    })
  },


  //店长下的员工列表
  // getAudit: function () {
  //   var param = {
  //     type: 2,
  //     page: 1,
  //   }
  //   util.getAudit(param, function (res) {
  //     vm.setData({ staffList: res.data.ret.audit.data })
  //   })
  // },

  //返回上一层
  back: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  //跳转到该员工下客户列表页
  jumpClientList: function (e) {
    var audit_id = e.currentTarget.dataset.auditid
    wx.navigateTo({
      url: '/pages/clientInformation/staff/staff?audit_id=' + audit_id,
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