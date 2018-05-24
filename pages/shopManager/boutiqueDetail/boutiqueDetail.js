// pages/shopManager/boutiqueDetail/boutiqueDetail.js
var vm = null
var util = require("../../../utils/util.js")
Page({

  data: {
    boutiqueList: [],             //固定四个竞品表单
    customBoutique: [],           //自定义表单
    fixedly: false,               //固定业绩开关
    // custom: false,             //自定义业绩开关
  },

  onLoad: function (options) {
    vm = this
    vm.setData({ date: util.getToday() })
    vm.getBoutique()
  },

  //固定竞品业绩展开与收取
  fixedlySwitch: function () {
    vm.setData({ fixedly: !vm.data.fixedly })
  },

  //自定义展开与收取
  // customSwitch: function () {
  //   vm.setData({ custom: !vm.data.custom })
  // },

  //添加自定义竞品
  addCustomBoutique: function () {
    var customBoutique = vm.data.customBoutique
    var boutiqueIndex = {
      "stmt_date": util.getToday(),
      "boutique_id": "",
      "performance": "",
      "user_id": getApp().globalData.userInfo.id,
      "activity": "",
      "custom": 1
    }
    customBoutique.push(boutiqueIndex)
    vm.setData({ customBoutique: customBoutique })
  },

  //输入自定义品牌
  customClientName: function (e) {
    var index = e.currentTarget.dataset.index
    var customBoutique = vm.data.customBoutique
    var value = e.detail.value
    customBoutique[index].boutique_id = value
    console.log("---" + JSON.stringify(customBoutique))
    vm.setData({ customBoutique: customBoutique })
  },

  //输入自定义业绩
  customPerformance: function (e) {
    var index = e.currentTarget.dataset.index
    var customBoutique = vm.data.customBoutique
    var value = e.detail.value
    customBoutique[index].performance = value
    console.log("---" + JSON.stringify(customBoutique))
    vm.setData({ customBoutique: customBoutique })
  },

  //输入自定义活动
  customActivity: function (e) {
    var index = e.currentTarget.dataset.index
    var customBoutique = vm.data.customBoutique
    var value = e.detail.value
    customBoutique[index].activity = value

    console.log("---" + JSON.stringify(e))
    vm.setData({ customBoutique: customBoutique })
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

  addBoutique: function () {
    wx.showModal({
      title: '确认',
      content: '确定提交竞品日报吗？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          vm.boutique()
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  //提交竞品日报
  boutique: function () {
    var boutiqueList = vm.data.boutiqueList           //固定竞品业绩
    var customBoutique = vm.data.customBoutique       //自定义竞品业绩
    var boutiqueParam = boutiqueList.concat(customBoutique)
    var param = {
      // boutiqueDaily: boutiqueParam
      boutiqueDaily: customBoutique
    }
    util.addBoutique(param, function (res) {
      if (res.data.result) {
        vm.showToast()
        vm.back()
        console.log("提交竞品表单" + JSON.stringify(res))
      }
    })
  },

  //输入竞品业绩
  inputPerformance: function (e) {
    var index = e.currentTarget.dataset.index
    var boutiqueList = vm.data.boutiqueList
    var value = e.detail.value
    boutiqueList[index].performance = value

    console.log("---" + JSON.stringify(boutiqueList))
    vm.setData({ boutiqueList: boutiqueList })
  },

  //输入活动
  inputActivity: function (e) {
    var index = e.currentTarget.dataset.index
    var boutiqueList = vm.data.boutiqueList
    var value = e.detail.value
    boutiqueList[index].activity = value

    console.log("---" + JSON.stringify(e))
    vm.setData({ boutiqueList: boutiqueList })
  },

  //获取生效的竞品信息
  getBoutique: function () {
    var param = {
      page: 1
    }
    util.getBoutique(param, function (res) {
      if (res.data.result) {
        var boutique = res.data.ret.data
        var boutiqueList = []
        for (var i = 0; i < boutique.length; i++) {
          var boutiqueIndex = {
            "stmt_date": util.getToday(),
            "boutique_id": boutique[i].id,
            "performance": "",
            "user_id": getApp().globalData.userInfo.id,
            "activity": "",
            "custom": 0
          }
          boutiqueList.push(boutiqueIndex)
        }
        console.log("初始化" + JSON.stringify(boutiqueList))
        vm.setData({ boutique: boutique, boutiqueList: boutiqueList })
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