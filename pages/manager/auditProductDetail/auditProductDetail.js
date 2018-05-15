// pages/manager/auditProductDetail/auditProductDetail.js
var vm = null
var util = require('../../../utils/util.js')
Page({

  data: {
    date: "",                                  //今天的日期
  },

  onLoad: function (options) {
    vm = this
    var date = util.getToday()
    vm.setData({ date: date })

    var detail = options.detail
    vm.setData({ staffId: detail })
    // console.log("日报详情" + JSON.stringify(options))
    vm.getCurrentPages(detail)
  },

  //获取上一个页面日报信息
  getCurrentPages: function (detail) {
    var pages = getCurrentPages();//获取当前页面信息栈
    var prevPage = pages[pages.length - 2]//获取上一个页面信息栈
    var dailyPaper = prevPage.data.dailyPaper[detail]
    vm.setData({ dailyPaper: dailyPaper })
    console.log("上一个页面日报信息" + JSON.stringify(dailyPaper))
  },

  //审核通过日报
  auditPass: function () {
    var param = {
      clerk_id: vm.data.dailyPaper.user_id,
      status: 3,
      manager_id: getApp().globalData.userInfo.id,
      manager_opt_time: util.getToday(),
      // shop_manager_remark: "",
      stmt_date: vm.data.dailyPaper.daily_paper[0].stmt_date,
    }
    util.managerReviewDailyPaper(param, function (res) {
      if (res.data.result) {
        vm.back()
        console.log("6666" + JSON.stringify(res))
      }
    })
  },

  //审核不通过日报
  auditNoPass: function () {
    var param = {
      clerk_id: vm.data.dailyPaper.user_id,
      status: 4,
      manager_id: getApp().globalData.userInfo.id,
      manager_opt_time: util.getToday(),
      stmt_date: vm.data.dailyPaper.daily_paper[0].stmt_date,
    }
    util.managerReviewDailyPaper(param, function (res) {
      if (res.data.result) {
        vm.back()
        console.log("6666" + JSON.stringify(res))
      }
    })
  },

  // 根据日报店员clerk_id查看日报详情
  dailyPaper: function (detail) {
    var param = {
      clerk_id: detail,
      status: 1,
    }
    util.dailyPaper(param, function (res) {
      if (res.data.result) {
        var dailyPaper = res.data.ret
        vm.setData({ dailyPaper: dailyPaper })
        console.log("日报详情" + JSON.stringify(dailyPaper))
      }
    })
  },

  //日报——店长审核日报
  shopManagerReviewDailyPaper: function () {
    var param = {
      clerk_id: getApp().globalData.userInfo.id,
      status: '',
      shop_manager_id: '',
      shop_manager_opt_time: '',
      shop_manager_remark: '',
      stmt_date: '',
    }
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