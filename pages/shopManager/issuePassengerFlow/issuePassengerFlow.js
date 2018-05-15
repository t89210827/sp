// pages/shopManager/issuePassengerFlow/issuePassengerFlow.js
var util = require('../../../utils/util.js')
var vm = null
Page({

  data: {
    passengerFlow: '',      //输入的客流
    page: '',       //确定跳转到哪个页面    
  },

  onLoad: function (options) {
    // var page = options.page
    vm = this
    // vm.setData({ page: page })
    // console.log("page" + page)
    vm.releasePassengerFlow()
  },

  //已发布客流数
  releasePassengerFlow: function () {
    var param = {
      shop_id: getApp().globalData.userInfo.shop_id,
      stmt_date: util.getToday()
    }
    util.releasePassengerFlow(param, function (res) {
      if (res.data.result) {
        var passenger_flow = res.data.ret
        vm.setData({ passenger_flow: passenger_flow })
        console.log("已发布客流数" + JSON.stringify(vm.data.passenger_flow))
      }
    })
  },

  //发布今日客流
  addPassengerFlow: function () {
    var passenger_flow = vm.data.passenger_flow
    var param = {}
    if (passenger_flow.length > 0) {
      param = {
        id: passenger_flow[0].id,
        passenger_flow: vm.data.passengerFlow,
        shop_id: getApp().globalData.userInfo.shop_id
      }
    } else {
      param = {
        passenger_flow: vm.data.passengerFlow,
        shop_id: getApp().globalData.userInfo.shop_id
      }
    }
    util.addPassengerFlow(param, function (res) {
      vm.showToast()         //提示
      vm.releasePassengerFlow()     //刷新
      // if (res.data.result) {
      //   wx.navigateTo({
      //     url: '/pages/hint/addPassengerFlow/addPassengerFlow',
      //   })
      // }
    })
  },

  //输入电话
  inputPhone: function (e) {
    console.log("---" + JSON.stringify(e))
    vm.setData({ passengerFlow: e.detail.value })
  },

  //发布成功提示
  showToast() {
    vm.setData({
      toast: {
        show: true
      }
    })
    setTimeout(() => {
      vm.setData({
        toast: {
          show: false
        }
      })
    }, 1500)
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