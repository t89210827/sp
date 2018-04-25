// pages/shopManager/auditStaff/auditStaff.js
var vm = null
var util = require('../../../utils/util.js')

Page({
  data: {
    staffList: [],           //店长下员工列表
    auditList: [],           //待审核的员工列表
  },

  onLoad: function (options) {
    vm = this
    vm.getReviewAudit()
  },
  //根据店长shop_manager_id获取需要审核的员工列表
  getReviewAudit: function () {
    var param = {
      shop_manager_id: getApp().globalData.userInfo.id
    }
    util.getReviewAudit(param, function (res) {
      if (res.data.result) {
        var auditList = res.data.ret[0].audit.data
        // if (auditList.length == 0) {
        //   vm.setData({ auditList: auditList })
        //   return
        // }
        var auditList = res.data.ret[0].audit.data
        vm.setData({ auditList: auditList })
      }
    })
  },

  //审核通过
  auditPass: function (e) {
    var auditStaffId = e.target.dataset.auditstaffid
    var param = {
      audit_id: auditStaffId,
      shop_manager_opt_time: util.getToday(),
      shop_manager_id: getApp().globalData.userInfo.id,
      status: 1
    }
    util.reviewAudit(param, function (res) {
      vm.getReviewAudit()
    })
  },

  //审核不通过
  auditFail: function (e) {
    var auditStaffId = e.target.dataset.auditstaffid
    var param = {
      audit_id: auditStaffId,
      shop_manager_opt_time: util.getToday(),
      shop_manager_id: getApp().globalData.userInfo.id,
      status: 3
    }
    util.reviewAudit(param, function (res) {
      vm.getReviewAudit()
    })
  },


  reviewAudit: function () {
    util.reviewAudit()
  },
  //店长下的员工列表
  getAudit: function () {
    var param = {
      type: 2,
      page: 1,
    }
    util.getAudit(param, function (res) {
      vm.setData({ staffList: res.data.ret.audit.data })
    })
  },
  //根据店长id查询员工信息及员工录入顾客数量（对应原型：查看员工录入客户数量）
  getAuditCount: function () {

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
    vm.getReviewAudit()
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