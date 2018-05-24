// pages/ranking/staff/staff.js
var vm = null
var util = require('../../../utils/util.js')
Page({
  data: {
    inputShowed: false,
    inputVal: "",

    staffList: [],         //员工列表  
    reverse: true,         //判断正序还是倒序  true为正序
  },

  onLoad: function (options) {
    vm = this
    var shop_id = options.shop_id

    var start_time = util.changeDate(-7)
    var end_time = util.changeDate(1)
    vm.setData({ start_time: start_time, end_time: end_time })

    vm.setData({ shop_id: shop_id })
    vm.getAuditRanking()                     //本店员工排名
  },

  //本店员工排名
  getAuditRanking: function () {
    var param = {
      shop_id: vm.data.shop_id,
      start_time: vm.data.start_time,
      end_time: vm.data.end_time,
    }
    util.getAuditRanking(param, function (res) {
      if (res.data.result) {
        var staffRanking = res.data.ret
        console.log("员工排名" + JSON.stringify(staffRanking))
        vm.setData({ staffRanking: staffRanking })
      }
    })
  },


  //开始时间
  bindBeginDate: function (e) {
    this.setData({
      start_time: e.detail.value
    })
    vm.getAuditRanking()                     //本店员工排名    
  },
  //结束时间
  bindEndDate: function (e) {
    this.setData({
      end_time: e.detail.value
    })
    vm.getAuditRanking()                     //本店员工排名
  },


  //正序倒序
  clickSwitch: function () {
    var staffRanking = vm.data.staffRanking
    var reverse = !vm.data.reverse
    staffRanking.reverse()
    vm.setData({ staffRanking: staffRanking, reverse: reverse })
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