// pages/ranking/staff/staff.js
var vm = null
var util = require('../../../utils/util.js')
Page({
  data: {
    inputShowed: false,
    inputVal: "",

    staffList: [],         //员工列表  
    reverse: true,         //判断正序还是倒序
  },
  //正序倒序
  clickSwitch: function () {
    var staffList = vm.data.staffList
    var reverse = !vm.data.reverse
    staffList.reverse()
    vm.setData({ staffList: staffList, reverse: reverse })
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
    // wx.login({
    //   success: function (res) {
    //     wx.getUserInfo({
    //       success: function (res) {
    //         console.log("---" + JSON.stringify(res))
    //         vm.setData({ userInfo: res.userInfo })
    //       }
    //     })
    //   }
    // })

    vm.getAudit()
  },

  // 店长下的员工列表
  getAudit: function () {
    var param = {
      type: 1,
      page: 1,
    }
    util.getAudit(param, function (res) {
      var staffList = res.data.ret.audit.data
      vm.setData({ staffList: staffList })
    })
  },

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