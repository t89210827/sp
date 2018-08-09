// pages/shopManager/auditDailyDetail/auditDailyDetail.js
var vm = null
var util = require('../../../utils/util.js')
Page({

  data: {
    date: "", //今天的日期
  },

  onLoad: function(options) {
    vm = this
    var date = util.getToday()
    vm.setData({
      date: date
    })
    var staff_id = options.staff_id //员工id
    var stmt_date = options.stmt_date //时间
    var status = options.status //状态
    vm.setData({
      staff_id: staff_id,
      stmt_date: stmt_date,
      status: status
    })
    vm.dailyPaper()
  },

  //审核通过日报
  auditPass: function() {
    wx.showModal({
      title: '确认',
      content: '确定审核通过吗？',
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          var param = {
            clerk_id: vm.data.staff_id,
            status: 2,
            shop_manager_id: getApp().globalData.userInfo.id,
            shop_manager_opt_time: util.getToday(),
            // shop_manager_remark: "",
            stmt_date: vm.data.dailyPaper[0].stmt_date,
          }
          util.shopManagerReviewDailyPaper(param, function(res) {
            if (res.data.result) {
              vm.back()
              console.log("6666" + JSON.stringify(res))
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  //审核不通过日报
  auditNoPass: function() {
    wx.showModal({
      title: '确认',
      content: '确定审核驳回吗？',
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击确定')

          var param = {
            clerk_id: vm.data.staff_id,
            status: 4,
            shop_manager_id: getApp().globalData.userInfo.id,
            shop_manager_opt_time: util.getToday(),
            stmt_date: vm.data.dailyPaper[0].stmt_date,
          }
          util.shopManagerReviewDailyPaper(param, function(res) {
            if (res.data.result) {
              vm.back()
              console.log("6666" + JSON.stringify(res))
            }
          })

        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })


  },

  // 根据日报店员clerk_id查看日报详情
  dailyPaper: function() {
    var param = {
      clerk_id: vm.data.staff_id,
      stmt_date: vm.data.stmt_date,
    }
    util.dailyPaper(param, function(res) {
      if (res.data.result) {
        var dailyPaper = res.data.ret
        dailyPaper.reverse()
        vm.setData({
          dailyPaper: dailyPaper
        })
        console.log("日报详情" + JSON.stringify(dailyPaper))
      }
    })
  },

  //日报——店长审核日报
  shopManagerReviewDailyPaper: function() {
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
  back: function() {
    wx.navigateBack({
      delta: 1
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