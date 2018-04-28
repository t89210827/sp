// pages/staff/staff.js
var vm = null
var util = require("../../utils/util.js")
Page({
  data: {
    userInfo: {},
    beginDate: "2018-04-09",
    endDate: "2018-04-09",

    options: ["今日目标", "关键信息", "次要信息"],
    optionsIndex: 0,

    target: true,
    key: true,
    minor: true,
  },

  onLoad: function (options) {
    vm = this
    vm.getUserInfo()
    vm.getAuditTask()
  },
  //员工获取今日任务
  getAuditTask: function () {
    var param = {
      stmt_date: util.getToday()
    }
    util.getAuditTask(param, function (res) {
      var todayTask = res.data.ret.task
      vm.setData({ todayTask: todayTask })
    })
  },

  //根据id获取用户信息（不带token）
  getByIdWithToken: function () {
    var param = {
      id: getApp().globalData.userInfo.id
    }
    util.getByIdWithToken(param, function (res) {
      var userInfo = res.data.ret
      vm.setData({ userInfo: userInfo })
    })
  },

  //获取缓存中用户信息
  getUserInfo: function () {
    var userInfo = getApp().globalData.userInfo

    if (userInfo == null) {
      wx.login({
        success: function (res) {
          wx.getUserInfo({
            success: function (res) {
              console.log("---" + JSON.stringify(res))
              var userInfo = {
                name: res.userInfo.nickName,
                avatar: res.userInfo.avatarUrl
              }
              vm.setData({ userInfo: userInfo })
              wx.stopPullDownRefresh()    //停止下拉刷新
            }
          })
        }
      })
    } else {
      vm.getByIdWithToken()
      // vm.setData({ userInfo: userInfo })
      wx.stopPullDownRefresh()    //停止下拉刷新
    }
    console.log("userInfo : " + JSON.stringify(userInfo))
  },


  //今日目标展开与收取
  targetSwitch: function () {
    vm.setData({ target: !vm.data.target })
  },

  //关键信息展开与收取
  KeySwitch: function () {
    vm.setData({ key: !vm.data.key })
  },

  //次要信息展开与收取
  minorSwitch: function () {
    vm.setData({ minor: !vm.data.minor })
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
      url: '/pages/staff/clientList/clientList',
    })
  },
  //跳转到提交日报页面
  jumpdaily: function () {
    var param = {
      audit_id: getApp().globalData.userInfo.id,
      stmt_date: util.getToday()
    }
    util.getAuditDailyPaper(param, function (res) {
      console.log("是否提交过日报" + JSON.stringify(res))
      if (res.data.result) {
        wx.navigateTo({
          url: '/pages/daily/staff/staff',
        })
      } else {
        util.showToast("今日已经提交过日报")
      }
    })
  },
  //跳转到根据电话查询客户页面
  jumpAddClientAddDeal: function (e) {
    // console.log("---1111" + JSON.stringify())
    // wx.navigateTo({
    //   url: '/pages/addClientAddDeal/addClientAddDeal',
    // })
    wx.navigateTo({
      url: '/pages/staff/byPhoneQueryClient/byPhoneQueryClient',
    })
  },
  //跳转到交易列表页面
  jumpDealList: function () {
    wx.navigateTo({
      url: '/pages/dealList/dealList',
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
    vm.getUserInfo()
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