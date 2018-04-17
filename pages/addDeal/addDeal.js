// pages/addDeal/addDeal.js
var vm = null
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isBuy: false,     //是否购买
    isReservation: false,    //是否交定金
    num: 1,         //产品数量
    remark: '',      //备注
    productType: "黄铂",          //产品类型

    date: '2018-04-10',      //提醒时间
  },
  //数量
  onChangeNumber(e) {
    var num = e.detail.number
    vm.setData({ num: num })
  },
  //多行文本
  textAreaEventListener: function (e) {
    // console.log("55555" + JSON.stringify(e.detail.value))
    vm.setData({
      remark: e.detail.value,
    })
  },
  //开关
  switchBuy: function (e) {
    // console.log('携带值为', e.detail.value)
    vm.setData({ isBuy: e.detail.value })
  },
  switchReservation: function (e) {
    // console.log('携带值为', e.detail.value)
    vm.setData({ isReservation: e.detail.value })
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

  //添加交易
  addDeal: function () {
    wx.navigateTo({
      url: '/pages/hint/addClient/addClient',
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