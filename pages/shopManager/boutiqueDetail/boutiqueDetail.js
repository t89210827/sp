// pages/shopManager/boutiqueDetail/boutiqueDetail.js
var vm = null
var util = require("../../../utils/util.js")
Page({

  data: {
    boutiqueList: [],
  },

  onLoad: function (options) {
    vm = this
    vm.setData({ date: util.getToday() })
    vm.getBoutique()
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

  //提交竞品日报
  addBoutique: function () {
    var boutiqueList = vm.data.boutiqueList
    var param = {
      boutiqueDaily: boutiqueList
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
            // "user_id": getApp().globalData.userInfo.id,
            "user_id": 45,
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