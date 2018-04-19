// pages/addDeal/addDeal.js
var vm = null
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isBuy: 1,     //是否购买
    isReservation: 1,    //是否交定金
    num: 1,         //产品数量
    remark: '',      //备注
    productType: "黄铂",          //产品类型

    date: '2018-04-10',      //提醒时间
    budget: '0-5000',        //预算
  },

  //返回上一层
  back: function () {
    wx.navigateBack({
      delta: 1
    })
  },

  //数量
  onChangeNumber(e) {
    var num = e.detail.number
    vm.setData({ num: num })
  },
  //多行文本
  textAreaEventListener: function (e) {
    vm.setData({
      remark: e.detail.value,
    })
  },
  //购买开关
  switchBuy: function (e) {
    // console.log('携带值为', e.detail.value)
    var isBuy = e.detail.value
    if (isBuy) {
      vm.setData({ isBuy: 0 })
    } else {
      vm.setData({ isBuy: 1 })
    }
  },

  switchReservation: function (e) {
    var isearnest = e.detail.value
    if (isearnest) {
      vm.setData({ isearnest: 0 })
    } else {
      vm.setData({ isearnest: 1 })
    }
  },

  //提醒时间
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },

  //选择产品类型
  productType: function () {
    var productType = ['黄铂', '非黄铂', '其他']
    wx.showActionSheet({
      itemList: ['黄铂', '非黄铂', '其他'],
      success: function (res) {
        // console.log("11111" + JSON.stringify(res))
        if (!res.cancel) {
          console.log(res.tapIndex)
          vm.setData({
            productType: productType[res.tapIndex]
            // 'userInfo.gender': res.tapIndex + 1
          })
          // console.log("11111" + JSON.stringify(vm.data.userInfo.gender))
        }
      }
    });
  },
  //获取产品货号
  inputProductId: function (e) {
    var value = e.detail.value
    vm.setData({ product_id: value })
  },

  //获取购买金额
  inputMoney: function (e) {
    var value = e.detail.value
    vm.setData({ money: value })
  },

  //获取件数
  inputNum: function (e) {
    var value = e.detail.value
    vm.setData({ num: value })
  },

  //获取定金金额
  inputIsearnest: function (e) {
    var value = e.detail.value
    vm.setData({ isearnest_money: value })
  },

  //获取用途
  inputPurpose: function (e) {
    var value = e.detail.value
    vm.setData({ purpose: value })
  },

  //选择预算
  open: function () {
    var budget = ['0-5000', '5000-10000', '10000-15000', '15000-20000']
    wx.showActionSheet({
      itemList: ['0-5000', '5000-10000', '10000-15000', '15000-20000'],
      success: function (res) {
        // console.log("11111" + JSON.stringify(res))
        if (!res.cancel) {
          console.log(res.tapIndex)
          vm.setData({
            budget: budget[res.tapIndex]
          })
        }
      }
    });
  },

  //添加交易
  addDeal: function () {
    var pages = getCurrentPages();//获取当前页面信息栈
    var prevPage = pages[pages.length - 2]//获取上一个页面信息栈

    var client_id = prevPage.data.clientDetail.id   //获取客户id
    var userInfo = getApp().globalData.userInfo
    var param = {
      shop_id: userInfo.shop_id,
      client_id: client_id,
      product_id: vm.data.product_id,
      product_name: vm.data.productType,
      budget: vm.data.budget,
      isbuy: vm.data.isBuy,
      money: vm.data.money,
      // num: vm.data.num,             //件数
      isearnest: vm.data.isearnest,
      isearnest_money: vm.data.isearnest_money,
      purpose: vm.data.purpose,     //用途
      purpose_time: vm.data.date,   //提醒时间
      remark: vm.data.remark,       //备注
    }
    util.addDeal(param, function (res) {
      if (res.data.result) {
        wx.navigateTo({
          url: '/pages/hint/addClient/addClient',
        })
      }
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    vm = this
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