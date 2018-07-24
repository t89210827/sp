// pages/staff/clientDetail/clientDetail.js
var util = require('../../../utils/util.js')
var vm = null
Page({

  data: {
    clientDetail: {}, //客户信息
  },

  onLoad: function() {
    vm = this
    vm.getClientDetail()
  },

  //预览头像
  previewImage: function() {
    wx.previewImage({
      urls: [vm.data.clientDetail.avatar] // 需要预览的图片http链接列表
    })
  },

  //根据id获取顾客信息
  getClientDetail: function() {
    var page = getCurrentPages()
    var upPage = page[page.length - 2]
    var clientDetail = upPage.data.clientDetail

    clientDetail.created_at = util.date(clientDetail.created_at)

    vm.setData({
      clientDetail: clientDetail
    })
    console.log("111111" + JSON.stringify(clientDetail))
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

  //返回上一层
  back: function() {
    wx.navigateBack({
      delta: 1
    })
  },

  //跳转到添加交易记录页面
  jumpAddDeal: function(e) {
    var clientId = e.currentTarget.dataset.clientid
    wx.navigateTo({
      url: '/pages/addDeal/addDeal?clientId=' + clientId,
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