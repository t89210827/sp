// pages/shopManager/alterBoutiqueDetail/alterBoutiqueDetail.js
var vm = null
var util = require("../../../utils/util.js")
Page({
  data: {
    boutiqueList: [],
  },

  onLoad: function (options) {
    vm = this
    var stmt_date = options.stmt_date
    vm.setData({ stmt_date: stmt_date })
    vm.getUppage()                //获取上一个页面数据
  },

  //获取上一个页面数据
  getUppage: function () {
    var pages = getCurrentPages();//获取当前页面信息栈
    var prevPage = pages[pages.length - 2]//获取上一个页面信息栈
    var boutique = prevPage.data.boutique
    boutique.reverse()
    for (var i = 0; i < boutique.length; i++) {
      delete boutique[i].manager_id
      delete boutique[i].opt_time
      delete boutique[i].remark
      delete boutique[i].status
      delete boutique[i].created_at
      delete boutique[i].updated_at
      delete boutique[i].deleted_at
    }
    vm.setData({ boutique: boutique })
    console.log("一条竞品日报" + JSON.stringify(boutique))
  },

  //添加自定义竞品
  addCustomBoutique: function () {
    var boutique = vm.data.boutique
    var boutiqueIndex = {
      "stmt_date": vm.data.stmt_date,
      "boutique_id": "",
      "performance": "",
      "user_id": getApp().globalData.userInfo.id,
      "activity": "",
      "custom": 1
    }
    boutique.push(boutiqueIndex)
    vm.setData({ boutique: boutique })
  },

  //提交竞品日报
  boutique: function () {
    var param = {
      boutiqueDaily: boutique
    }
    util.addBoutique(param, function (res) {
      if (res.data.result) {
        vm.showToast()
        vm.back()
        console.log("提交竞品表单" + JSON.stringify(res))
      }
    })
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
    var boutique = vm.data.boutique
    var param = {
      boutiqueDaily: boutique
    }
    util.addBoutique(param, function (res) {
      if (res.data.result) {
        vm.showToast()
        vm.back()
        console.log("提交竞品表单" + JSON.stringify(res))
      }
    })
  },

  //输入品牌
  inputClientName: function (e) {
    var index = e.currentTarget.dataset.index
    var boutique = vm.data.boutique
    var value = e.detail.value
    // console.log("---------" + JSON.stringify(boutique[index]))
    boutique[index].boutique_id = value
    console.log("---" + JSON.stringify(boutique))
    vm.setData({ boutique: boutique })
  },

  //输入竞品业绩
  inputPerformance: function (e) {
    var index = e.currentTarget.dataset.index
    var boutique = vm.data.boutique
    var value = e.detail.value
    boutique[index].performance = value
    console.log("---" + JSON.stringify(boutique))
    vm.setData({ boutique: boutique })
  },

  //输入活动
  inputActivity: function (e) {
    var index = e.currentTarget.dataset.index
    var boutique = vm.data.boutique
    var value = e.detail.value
    boutique[index].activity = value

    console.log("---" + JSON.stringify(e))
    vm.setData({ boutique: boutique })
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