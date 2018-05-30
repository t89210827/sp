// pages/shopManager/lookboutiqueDetail/lookboutiqueDetail.js
var vm = null
var util = require('../../../utils/util.js')
Page({

  data: {
    stmt_date: '',          //竞品时间
    boutique: [],           //竞品日报列表
  },

  onLoad: function (options) {
    vm = this
    var stmt_date = util.getToday()
    vm.setData({ stmt_date: stmt_date })
  },

  //修改竞品日报
  alterBoutique: function () {
    wx.navigateTo({
      url: '/pages/shopManager/alterBoutiqueDetail/alterBoutiqueDetail?stmt_date=' + vm.data.stmt_date,
    })
  },

  //竞品日报时间
  selectDate: function (e) {
    this.setData({
      stmt_date: e.detail.value
    })
    vm.getBoutiqueByBetweenDate()          //店长根据日期段查看自己提交的竞品日报  
  },

  //店长根据日期段查看自己提交的竞品日报
  getBoutiqueByBetweenDate: function () {
    var param = {
      stmt_date: vm.data.stmt_date
    }
    util.shopManager_getBoutiqueByDate(param, function (res) {
      if (res.data.result) {
        var boutique = res.data.ret.boutiqueDaily
        vm.setData({ boutique: boutique })
        console.log("查看竞品日报：" + JSON.stringify(res.data.ret))
      }
    })
  },

  //返回上一层
  back: function () {
    wx.navigateBack({
      delta: 1
    })
  },

  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    vm.getBoutiqueByBetweenDate()          //店长根据日期段查看自己提交的竞品日报
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