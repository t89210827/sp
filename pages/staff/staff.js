// pages/staff/staff.js
var vm = null
Page({
  data: {
    userInfo: {},
    beginDate: "2018-04-09",
    endDate: "2018-04-09",

    options: ["今日目标", "关键信息", "次要信息"],
    optionsIndex: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    vm = this
    vm.getUserInfo()
    // wx.login({
    //   success: function (res) {
    //     wx.getUserInfo({
    //       success: function (res) {
    //         console.log("---" + JSON.stringify(res))
    //         vm.setData({ userInfo: res.userInfo })
    //       }
    //     })
    //   }
    // })
  },

  getUserInfo: function () {
    vm.setData({ userInfo: getApp().globalData.userInfo })
  },

  //跳转到店员排名页面
  jumpRanking: function () {
    wx.navigateTo({
      url: '/pages/ranking/staff/staff',
    })
  },
  //跳转到添加客户页面
  jumpAddClient: function () {
    // wx.navigateTo({
    //   url: '/pages/addClient/addClient',
    // })
    wx.navigateTo({
      url: '/pages/queryClient/queryClient',
    })
  },
  //跳转到店员客户信息页面
  jumpClientInformation: function () {
    wx.navigateTo({
      url: '/pages/clientInformation/staff/staff',
    })
  },
  //跳转到提交日报页面
  jumpdaily: function () {
    wx.navigateTo({
      url: '/pages/daily/staff/staff',
    })
  },
  //开始时间
  bindBeginDate: function (e) {
    this.setData({
      beginDate: e.detail.value
    })
  },
  //结束时间
  bindEndDate: function (e) {
    this.setData({
      endDate: e.detail.value
    })
  },
  // 选项选择
  bindOption: function (e) {
    console.log('选项选择 发生选择改变，携带值为', e.detail.value);
    this.setData({
      optionsIndex: e.detail.value
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