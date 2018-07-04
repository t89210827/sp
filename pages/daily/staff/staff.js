// pages/daily/staff/staff.js
var util = require('../../../utils/util.js')
var vm = null
Page({
  data: {
    submitDaily: [], //提交日报信息
    date: "", //日期
    num: 0, //订货数量
  },

  onLoad: function(options) {
    vm = this
    var date = util.changeDate(0)
    vm.setData({
      date: date
    })
    vm.getAuditDailyPaperData() //根据店员id和时间查询日报信息
  },

  //根据店员id和时间查询日报信息
  getAuditDailyPaperData: function() {
    var param = {
      stmt_date: vm.data.date,
      shop_id: getApp().globalData.userInfo.shop_id,
    }
    util.getAuditDailyPaperData(param, function(res) {
      if (res.data.result) {
        console.log("日报数据" + JSON.stringify(res))

        var daily = res.data.ret //全部日报数据
        var submitDaily = res.data.ret.dailPapers //产品日报数据
        submitDaily.reverse()
        //客流信息
        // var passenger_flow_num = daily.passenger_flow_num
        if (daily.passenger_flow_num == 0) {
          var percentage = "无"
        } else {
          var percentage = util.Percentage(daily.tel_num, daily.passenger_flow_num)
        }
        vm.setData({
          submitDaily: submitDaily,
          daily: daily,
          percentage: percentage
        })
      }
    })
  },

  //提价日报 跳转到员工首页
  getShopManagerTask: function() {
    var submitDaily = vm.data.submitDaily
    var daily = vm.data.daily
    // var today = util.getToday()
    var auditDailyPaper = {
      auditDailyPaper: []
    }
    for (var i = 0; i < submitDaily.length; i++) {
      var auditDailyPaperIndex = null
      if (submitDaily[i].product_id == 2) {
        auditDailyPaperIndex = {
          // "user_id": submitDaily[i].user_id,
          // "shop_id": submitDaily[i].shop_id,
          "dailyPaper_id": submitDaily[i].id,
          "product_id": submitDaily[i].product_id,
          "performance_finish": submitDaily[i].real_sale,
          "status": "1",
          "num": submitDaily[i].pen_num,

          "total_piece_number": daily.tel_num,
          "total_than_number": daily.total_pen_num,
          "passenger_flow_num": vm.data.daily.passenger_flow_num,
          "phone_num": daily.tel_num,
          "phone_ratio": vm.data.percentage,
          "type": getApp().globalData.userInfo.type,

          "gram_weight": vm.data.gram_weight,
          "gold_number": vm.data.gold_number,
        }
      } else {
        auditDailyPaperIndex = {
          // "user_id": submitDaily[i].user_id,
          // "shop_id": submitDaily[i].shop_id,
          "dailyPaper_id": submitDaily[i].id,
          "product_id": submitDaily[i].product_id,
          "performance_finish": submitDaily[i].real_sale,
          "status": "1",
          "num": submitDaily[i].pen_num,

          "total_piece_number": daily.tel_num,
          "total_than_number": daily.total_pen_num,
          "passenger_flow_num": vm.data.daily.passenger_flow_num,
          "phone_num": daily.tel_num,
          "phone_ratio": vm.data.percentage,
          "type": getApp().globalData.userInfo.type,
        }
      }
      auditDailyPaper.auditDailyPaper.push(auditDailyPaperIndex)
    }
    console.log("提交日报:" + JSON.stringify(auditDailyPaper))
    util.addAuditDailyPaper(auditDailyPaper, function(res) {
      if (res.data.result) {
        vm.addOrderGoods()
        wx.redirectTo({
          url: '/pages/staff/staff',
        })
        // wx.switchTab({
        //   url: '/pages/staff/staff',
        // })
      }
    })
  },

  //输入销售克重
  getGramWeight: function(e) {
    console.log("销售克重" + JSON.stringify(e))
    vm.setData({
      gram_weight: e.detail.value
    })
  },

  //输入的旧料抵金值
  getGold_number: function(e) {
    console.log("旧料抵金值" + JSON.stringify(e))
    vm.setData({
      gold_number: e.detail.value
    })
  },

  //订货数量
  onChangeNumber(e) {
    var num = e.detail.number
    var orderGoods = []
    for (var i = 0; i < num; i++) {
      orderGoods.push({
        "user_id": getApp().globalData.userInfo.id,
        "shop_id": getApp().globalData.userInfo.shop_id,
        "product_number": "",
        "money": "",
      })
    }
    console.log("订货数量" + JSON.stringify(orderGoods))
    vm.setData({
      num: num,
      orderGoods: orderGoods
    })
  },

  init: function() {

  },

  //输入货号
  inputProductName: function(e) {
    var index = e.currentTarget.dataset.index
    var orderGoods = vm.data.orderGoods
    var value = e.detail.value
    orderGoods[index].product_number = value
    console.log("订货货号" + JSON.stringify(orderGoods))
    vm.setData({
      orderGoods: orderGoods
    })
  },

  //输入金额
  inputMoney: function(e) {
    var index = e.currentTarget.dataset.index
    var orderGoods = vm.data.orderGoods
    var value = e.detail.value
    orderGoods[index].money = value
    console.log("订货金额" + JSON.stringify(orderGoods))
    vm.setData({
      orderGoods: orderGoods
    })
  },

  //添加订货信息
  addOrderGoods: function() {
    if (vm.data.num == 0) {
      return
    }
    var orderGoods = vm.data.orderGoods
    util.addOrderGoods({
      orderGoods
    }, function(res) {
      if (res.data.result) {
        console.log("添加订货信息" + JSON.stringify(res))
      }
    })
  },

  //判断
  judge: function() {
    var submitDaily = vm.data.submitDaily
    if (submitDaily.length == 0) {
      util.showToast("店长还未发布今日目标")
      // util.showToast("店长昨日未发布目标")
      return
    }
    if (vm.data.daily.passenger_flow_num == 0) {
      util.showToast("等待店长录入客流")
      return
    }
    wx.showModal({
      title: '确认',
      content: '确定提交日报吗？',
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          vm.getShopManagerTask()
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
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