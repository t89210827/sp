// pages/manager/auditStaff/auditStaff.js
var vm = null
var util = require('../../../utils/util.js')

Page({
  data: {
    auditList: [],           //待审核的员工列表
  },

  onLoad: function (options) {
    vm = this
  },

  //主管审核店长列表
  getShopManager: function () {

    var param = {
      manager_id: getApp().globalData.userInfo.id,
      type: 2,
      page: 1,
    }
    util.getShopManager(param, function (res) {
      var retAuditList = res.data.ret.shop.data
      var auditList = []
      for (var i = 0; i < retAuditList.length; i++) {
        var audit = retAuditList[i].audit
        if (audit.length > 0) {
          for (var j = 0; j < audit.length; j++) {
            var auditIndex = audit[j].user
            auditIndex.shopName = retAuditList[i].name
            auditList.push(auditIndex)
          }
        }
      }
      vm.setData({ auditList: auditList })
      console.log("审核数组" + JSON.stringify(auditList))
    })
  },

  //审核通过
  auditPass: function (e) {
    var auditStaffIndex = e.target.dataset.auditstaffindex
    var staffId = vm.data.auditList[auditStaffIndex].id
    var param = {
      audit_id: staffId,
      manager_opt_time: util.getToday(),
      manager_id: getApp().globalData.userInfo.id,
      status: 2
    }
    util.managerReviewAudit(param, function (res) {
      vm.getShopManager()
    })
  },

  //审核不通过
  auditFail: function (e) {
    var auditStaffIndex = e.target.dataset.auditstaffindex
    var staffId = vm.data.auditList[auditStaffIndex].id
    var param = {
      audit_id: staffId,
      manager_opt_time: util.getToday(),
      manager_id: getApp().globalData.userInfo.id,
      status: 3
    }
    util.managerReviewAudit(param, function (res) {

    })
  },



  //根据店长shop_manager_id获取需要审核的员工列表
  getReviewAudit: function () {
    var param = {
      shop_manager_id: getApp().globalData.userInfo.id
    }
    util.getReviewAudit(param, function (res) {
      if (res.data.result) {
        var auditList = res.data.ret.audit.data
        vm.setData({ auditList: auditList })
      }
    })
  },
  //返回上一层
  back: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  //跳转到该员工下客户列表页
  jumpClientList: function () {
    wx.navigateTo({
      url: '/pages/clientInformation/staff/staff',
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
    var type = vm.data.type
    if (type == 1) {
      vm.getStaff()
    } else if (type == 2) {
      vm.getShopManager()
    }
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