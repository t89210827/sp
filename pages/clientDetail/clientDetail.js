// pages/existClient/existClient.js
var util = require('../../utils/util.js')
var vm = null
Page({

  data: {
    clientDetail: {},      //客户信息
    deals: [],             //交易信息
    dealId: '',            //选中的交易索引
  },

  onLoad: function (options) {
    vm = this
    var clientId = options.clientId
    vm.getClientById(clientId)
    vm.getDeals(clientId)
    // console.log("clientId" + JSON.stringify(clientId))

    var day = util.getToday()

    wx.login({
      success: function (res) {
        wx.getUserInfo({
          success: function (res) {
            console.log("---" + JSON.stringify(res))
            vm.setData({ userInfo: res.userInfo })
          }
        })
      }
    })
  },
  //根据用户id和顾客id查看交易记录信息
  getDeals: function (clientId) {
    var param = {
      client_id: clientId,
      page: 1,
    }
    util.getDeals(param, function (res) {
      if (res.data.result) {
        var deals = res.data.ret.data
        vm.setData({ deals: deals })
        // console.log("交易记录列表" + JSON.stringify(deals))F
      }
    })
  },

  //预览头像
  previewImage: function () {
    wx.previewImage({
      urls: [vm.data.clientDetail.avatar] // 需要预览的图片http链接列表
    })
  },

  //根据id获取顾客信息
  getClientById: function (clientId) {
    var param = {
      id: clientId
    }
    util.getClientById(param, function (res) {
      var clientDetail = res.data.ret
      clientDetail.created_at = util.date(clientDetail.created_at)
      vm.setData({ clientDetail: res.data.ret })
    })
  },

  //返回上一层
  back: function () {
    wx.navigateBack({
      delta: 1
    })
  },

  //调转到交易详情页
  jumpDealDetail: function (e) {
    var dealId = e.currentTarget.id
    vm.setData({ dealId: dealId })
    wx.navigateTo({
      url: '/pages/dealDetail/dealDetail',
    })
  },
  //跳转到添加交易记录页面
  jumpAddDeal: function () {
    wx.navigateTo({
      url: '/pages/addDeal/addDeal',
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