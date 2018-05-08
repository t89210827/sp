// pages/hint/audit/audit.js
const util = require('../../../utils/util.js')
var vm = null
Page({
  data: {
    image: 'https://s10.mogucdn.com/p2/161213/upload_76h1c5hjc8heecjehlfgekjdl2ki0_514x260.png',
    title: '管理员审核中',
    // tip: '请耐心等待管理员审核通过',
    tip: '下拉即可刷新状态',
    button: '修改信息'
  },
  //返回首页
  alter: function () {
    wx.redirectTo({
      url: '/pages/index/index',
    })
    // wx.switchTab({
    //   url: '/pages/index/index',
    // })
  },
  onLoad: function (options) {
    vm = this
  },

  //根据user_id获取员工入职信息
  getAuditByUserId: function () {
    util.getAuditByUserId({}, function (res) {
      // console.log(res)
      var status = res.data.ret[0].status
      var type = res.data.ret[0].type
      var id = getApp().globalData.userInfo.id

      util.getByIdWithToken({ id: id }, function (res) {
        if (res.data.result) {
          var userInfo = res.data.ret
          vm.storeUserInfo(userInfo)         //进行本地缓存
        }
      })

      if (status == 1 && type == 1) {
        wx.redirectTo({
          url: '/pages/staff/staff',
        })
      } else if (status == 2 && type == 2) {
        wx.redirectTo({
          url: '/pages/shopManager/index/index',
        })
      } else if (status == 2 && type == 3) {
        wx.redirectTo({
          url: '/pages/manager/index/index',
        })
      } else {
        util.showToast("请等待审核通过")
      }
      vm.setData({ status: status })
      wx.stopPullDownRefresh()    //停止下拉刷新
    })
  },

  //进行本地缓存
  storeUserInfo: function (obj) {
    console.log("storeUserInfo :" + JSON.stringify(obj));
    wx.setStorage({
      key: "userInfo",
      data: obj
    });
    getApp().globalData.userInfo = obj;
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
    vm.getAuditByUserId()
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