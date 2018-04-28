// pages/daily/staff/staff.js
var util = require('../../../utils/util.js')
var vm = null
Page({
  data: {
    submitDaily: [],                 //提交日报信息
    date: "",                        //日期
    num: 0,                        //订货数量
  },

  onLoad: function (options) {
    vm = this
    var date = util.getToday()
    vm.setData({ date: date })
    vm.getAuditDailyPaperData()  //根据店员id和时间查询日报信息
  },

  //根据店员id和时间查询日报信息
  getAuditDailyPaperData: function () {
    var param = {
      stmt_date: vm.data.date,
      shop_id: getApp().globalData.userInfo.shop_id,
    }
    util.getAuditDailyPaperData(param, function (res) {
      if (res.data.result) {
        var daily = res.data.ret
        var submitDaily = res.data.ret.dailPapers
        var passenger_flow = res.data.ret.passenger_flow.passenger_flow

        var percentage = util.Percentage(daily.tel_num, passenger_flow)
        vm.setData({ submitDaily: submitDaily, passenger_flow: passenger_flow, daily: daily, percentage: percentage })
      }
    })
  },

  //输入销售克重
  getGramWeight: function (e) {
    console.log("销售克重" + JSON.stringify(e))
    vm.setData({ gram_weight: e.detail.value })
  },

  //输入的旧料抵金值
  getGold_number: function (e) {
    console.log("旧料抵金值" + JSON.stringify(e))
    vm.setData({ gold_number: e.detail.value })
  },

  //判断
  judge: function () {
    var submitDaily = vm.data.submitDaily

    // if (submitDaily.length == 0) {
    //   util.showToast("店长还未发布今日目标")
    //   return
    // }
    // if (vm.data.passenger_flow == 1) {
    //   util.showToast("等待店长录入客流")
    //   return
    // }

    wx.showModal({
      title: '确认',
      content: '确定提交日报吗？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          vm.getShopManagerTask()
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },

  //提价日报 跳转到员工首页
  getShopManagerTask: function () {
    var submitDaily = vm.data.submitDaily
    var auditDailyPaper = []
    for (var i = 0; i < submitDaily.length; i++) {
      var auditDailyPaperIndex = null
      if (submitDaily[i].product_id == 2) {
        auditDailyPaperIndex = {
          "user_id": submitDaily[i].user_id,
          "shop_id": submitDaily[i].shop_id,
          "stmt_date": submitDaily[i].stmt_date,
          "product_id": submitDaily[i].product_id,
          "performance_finish": submitDaily[i].performance_finish == null ? "0" : submitDaily[i].performance_finish,
          "gram_weight": vm.data.gram_weight,
          "gold_number": vm.data.gold_number,
          "status": "1",
          "num": submitDaily[i].product[0].num
        }
      } else {
        auditDailyPaperIndex = {
          "user_id": submitDaily[i].user_id,
          "shop_id": submitDaily[i].shop_id,
          "stmt_date": submitDaily[i].stmt_date,
          "product_id": submitDaily[i].product_id,
          "performance_finish": submitDaily[i].performance_finish == null ? "0" : submitDaily[i].performance_finish,
          "status": "1",
          "num": submitDaily[i].product[0].num
        }
      }
      // console.log("提交日报 ： " + JSON.stringify(auditDailyPaperIndex))
      auditDailyPaper.push(auditDailyPaperIndex)
    }
    var total = {
      "user_id": getApp().globalData.userInfo.id,
      "shop_id": getApp().globalData.userInfo.shop_id,
      "stmt_date": util.getToday(),
      "total_piece_number": submitDaily[0].total_num,
      "total_than_number": submitDaily[0].total_pen_num,
      "passenger_flow_num": vm.data.passenger_flow,
      "phone_num": vm.data.daily.tel_num,
      "phone_ratio": vm.data.percentage
    }
    auditDailyPaper.push(total)
    console.log("提交日报:" + JSON.stringify(auditDailyPaper))

    var param = {
      auditDailyPaper: auditDailyPaper
    }
    util.addAuditDailyPaper(param, function (res) {

      wx.switchTab({
        url: '/pages/staff/staff',
      })

    })
  },

  onChangeNumber(e) {
    var num = e.detail.number
    var arr = []
    var productArr = []
    for (var i = 0; i < num; i++) {
      arr.push({
        "user_id": getApp().globalData.userInfo.id,
        "shop_id": getApp().globalData.userInfo.shop_id,
        "client_id": "",
        "product_id": "",
        "product_name": "",
        "budget": "0-5000",
        "isbuy": 1,
        "money": "",
        "isearnest": 1,
        "isearnest_money": "",
        "purpose": "",
        "purpose_time": "2018-04-10",
        "remind_time": "",
        "remark": "",
        "num": ""
      })
      productArr.push("黄铂")
    }
    console.log("777" + JSON.stringify(arr))
    // vm.setData({ num: num, dealData: arr, productArr: productArr })
    vm.setData({ num: num })
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