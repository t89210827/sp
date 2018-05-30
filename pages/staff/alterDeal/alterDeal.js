// pages/staff/alterDeal/alterDeal.js
var vm = null
var util = require('../../../utils/util.js')
Page({
  data: {

  },

  onLoad: function (options) {
    vm = this
    vm.getCurrentPages()
    vm.getProductById()
  },

  updateDealById: function () {
    var deal = vm.data.deal
    // console.log("交易记录" + JSON.stringify(deal))

    if (deal.money == null || deal.money == '') {
      util.showToast("购买金额不能为空")
      return
    }

    if (deal.num == null || deal.num == '') {
      util.showToast("件数不能为空")
      return
    }

    wx.showModal({
      title: '提示',
      content: '提交后不可更改',
      confirmText: "确定修改",
      success: function (res) {
        if (res.confirm) {
          var param = {
            id: deal.id,
            money: deal.money,
            num: deal.num,
            remark: deal.remark,
            isbuy: 0,
            isearnest: 1,
            isearnest_money: 0
          }
          util.updateDealById(param, function (res) {
            if (res.data.result) {
              console.log("修改交易详情返回json" + JSON.stringify(res))
              var pages = getCurrentPages();//获取当前页面信息栈
              var prevPage = pages[pages.length - 3]//获取上一个页面信息栈
              prevPage.getDealByClientId()
              wx.navigateBack({
                delta: 2
              })
            }
          })
        }
      }
    })

  },

  //获取上一个页面
  getCurrentPages: function () {
    var pages = getCurrentPages();//获取当前页面信息栈
    var prevPage = pages[pages.length - 2]//获取上一个页面信息栈
    var deal = prevPage.data.deal
    vm.setData({ deal: deal })
    console.log("一条交易信息" + JSON.stringify(deal))
  },

  //购买金额
  inputName: function (e) {
    var deal = vm.data.deal
    deal.money = e.detail.value
    vm.setData({ deal: deal })
    console.log("---" + JSON.stringify(deal))
  },

  //件数
  inputNum: function (e) {
    var deal = vm.data.deal
    deal.num = e.detail.value
    vm.setData({ deal: deal })
    console.log("---" + JSON.stringify(deal))
  },

  //备注
  textAreaEventListener: function (e) {
    var deal = vm.data.deal
    deal.remark = e.detail.value
    vm.setData({
      deal: deal
    })
    console.log("---" + JSON.stringify(deal))
  },

  //是否购买
  switchBuy: function (e) {
    var isBuy = e.detail.value
    var deal = vm.data.deal
    // var productindex = e.currentTarget.dataset.productindex
    if (isBuy) {
      deal.isbuy = 0
    } else {
      deal.isbuy = 1
      // 如果为flase清空件数和购买金额
      deal.money = ""
      deal.num = ""
    }
    console.log("---" + JSON.stringify(deal))
    vm.setData({ deal: deal })
  },
  //是否交定金
  switchReservation: function (e) {
    var isReservation = e.detail.value
    var deal = vm.data.deal
    if (isReservation) {
      deal.isearnest = 0
    } else {
      deal.isearnest = 1
      // 如果为flase清空定金
      deal.isearnest_money = ""
    }
    console.log("-----" + JSON.stringify(isReservation))
    vm.setData({ deal: deal })
  },

  // updateDealById: function () {
  //   var deal = vm.data.deal
  //   var param = {
  //     id: deal.id,
  //   }
  // },

  //根据产品id获取产品信息
  getProductById: function () {
    var pages = getCurrentPages();//获取当前页面信息栈
    var prevPage = pages[pages.length - 2]//获取上一个页面信息栈
    var product_id = prevPage.data.deal.product_id
    var param = {
      id: product_id
    }
    util.getProductById(param, function (res) {
      if (res.data.result) {
        var productName = res.data.ret.name
        vm.setData({ productName: productName })
      }
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