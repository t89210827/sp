// pages/existClient/existClient.js
var util = require('../../utils/util.js')
var vm = null
Page({
  data: {
    clientDetail: {},      //客户信息
    deals: [],             //交易信息
    dealId: '',            //选中的交易索引

    adddeal: false,        //是否可以添加交易
  },

  onLoad: function (options) {
    vm = this
    var myType = getApp().globalData.userInfo.type
    if (myType == 1) {
      vm.setData({ adddeal: true })
    } else {
      vm.setData({ adddeal: false })
    }
    console.log("---" + JSON.stringify(myType))
    var clientId = options.clientId       //客户id
    vm.setData({ clientId: clientId })

    vm.getClientById(clientId)
    vm.getDealByClientId()

    var day = util.getToday()
  },

  //拨打电话
  callTel: function () {
    var tel = vm.data.clientDetail.tel
    wx.makePhoneCall({
      phoneNumber: tel
    })
  },

  alterClient: function () {
    wx.navigateTo({
      url: '/pages/staff/alterClient/alterClient',
    })
  },

  //根据顾客id获取所有交易记录
  getDealByClientId: function () {
    var param = {
      client_id: vm.data.clientId
    }
    util.getDealByClientId(param, function (res) {
      if (res.data.result) {
        var deals = res.data.ret.data
        vm.setData({ deals: deals })
        console.log("交易记录列表" + JSON.stringify(deals))
      }
    })
  },

  //调转到交易详情页
  jumpDealDetail: function (e) {
    var dealId = e.currentTarget.id
    // var deals = vm.data.deals
    // var product_id = deals[dealId].product_id

    // vm.getProductById(product_id)
    vm.setData({ dealId: dealId })
    wx.navigateTo({
      url: '/pages/dealDetail/dealDetail',
    })
  },

  //根据产品id获取产品信息
  // getProductById: function (product_id) {
  //   var product_id = product_id
  //   var param = {
  //     id: product_id
  //   }
  //   util.getProductById(param, function (res) {
  //     if (res.data.result) {
  //       var productName = res.data.ret.name
  //       vm.setData({ productName: productName })
  //     }
  //   })
  // },

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
      vm.setData({ clientDetail: clientDetail })
    })
  },

  //返回上一层
  back: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  //跳转到添加交易记录页面
  jumpAddDeal: function () {
    var clientId = vm.data.clientDetail.id
    wx.navigateTo({
      url: '/pages/addDeal/addDeal?clientId=' + clientId,
    })
  },

  //发布成功提示
  showToast(showToastText) {
    vm.setData({
      showToastText: showToastText,
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