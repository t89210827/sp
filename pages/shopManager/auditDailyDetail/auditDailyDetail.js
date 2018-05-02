// pages/shopManager/auditDailyDetail/auditDailyDetail.js
var vm = null
var util = require('../../../utils/util.js')
Page({

  data: {
    date: "",                             //今天的日期
  },

  onLoad: function (options) {
    vm = this
    var date = util.getToday()
    vm.setData({ date: date })

    var detail = options.detail
    vm.setData({ staffId: detail })
    console.log("日报详情" + JSON.stringify(options))
    vm.dailyPaperOne(detail)
    vm.dailyPaperTwo(detail)
  },

  //审核通过日报
  auditPass: function () {
    var param = {
      clerk_id: vm.data.staffId,
      status: 2,
      shop_manager_id: getApp().globalData.userInfo.id,
      shop_manager_opt_time: util.getToday(),
      // shop_manager_remark: "",
      stmt_date: vm.data.dailyPaperOne[0].stmt_date,
    }
    util.shopManagerReviewDailyPaper(param, function (res) {
      if (res.data.result) {
        vm.back()
        console.log("6666" + JSON.stringify(res))
      }
    })
  },

  //审核不通过日报
  auditNoPass: function () {
    var param = {
      clerk_id: vm.data.staffId,
      status: 4,
      shop_manager_id: getApp().globalData.userInfo.id,
      shop_manager_opt_time: util.getToday(),
      // shop_manager_remark: "",
      stmt_date: vm.data.dailyPaperOne[0].stmt_date,
    }
    util.shopManagerReviewDailyPaper(param, function (res) {
      if (res.data.result) {
        vm.back()
        console.log("6666" + JSON.stringify(res))
      }
    })
  },

  // 根据日报店员clerk_id查看目标详情
  dailyPaperOne: function (detail) {
    var param = {
      clerk_id: detail,
      status: 0,
    }
    util.dailyPaper(param, function (res) {
      if (res.data.result) {
        var dailyPaperOne = res.data.ret
        // dailyPaperOne[0].created_at = util.convertDateFormateM(dailyPaperOne[0].created_at)
        vm.setData({ dailyPaperOne: dailyPaperOne })
        console.log("日报目标详情" + JSON.stringify(dailyPaperOne))
      }
    })
  },

  // 根据日报店员clerk_id查看日报详情
  dailyPaperTwo: function (detail) {
    var param = {
      clerk_id: detail,
      status: 1,
    }
    util.dailyPaper(param, function (res) {
      if (res.data.result) {
        var dailyPaperTwo = res.data.ret
        vm.setData({ dailyPaperTwo: dailyPaperTwo })
        console.log("日报详情" + JSON.stringify(dailyPaperTwo))
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