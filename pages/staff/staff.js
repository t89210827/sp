// pages/staff/staff.js
var vm = null
var util = require("../../utils/util.js")
Page({
  data: {
    userInfo: {},
    beginDate: "",
    endDate: "",

    options: ["今日目标", "关键信息", "次要信息"],
    optionsIndex: 0,

    target: true,
    key: true,
    minor: true,
  },

  onLoad: function (options) {
    vm = this
    var today = util.getToday()
    var getTodayAddOne = util.getTodayAddOne()
    vm.setData({ beginDate: today, endDate: getTodayAddOne })
    vm.getUserInfo()
    vm.getAuditTask()         //今日任务
  },

  //员工首页主要信息
  getAuditIndexKeyMessage: function () {
    var param = {
      start_time: vm.data.beginDate,
      end_time: vm.data.endDate,
    }
    util.getAuditIndexKeyMessage(param, function (res) {
      if (res.data.result) {
        var main = res.data.ret
        console.log("员工首页关键信息" + JSON.stringify(res))
        if (main.noYellowPerotChanageRate != 0) {
          main.noYellowPerotChanageRate = main.noYellowPerotChanageRate.toFixed(2)
        }
        if (main.yellowPerotChanageRate != 0) {
          main.yellowPerotChanageRate = main.yellowPerotChanageRate.toFixed(2)
        }
        if (main.otherChanageRate != 0) {
          main.otherChanageRate = main.otherChanageRate.toFixed(2)
        }
        if (main.clientChangeNum != 0) {
          main.clientChangeNum = main.clientChangeNum.toFixed(2)
        }
        vm.setData({ main: main })
      }
    })
  },

  //开始时间
  bindBeginDate: function (e) {
    this.setData({
      beginDate: e.detail.value
    })
    vm.getAuditIndexKeyMessage()    //员工首页主要信息
    vm.getAuditIndexMinorMessage()  //员工首页次要信息
  },
  //结束时间
  bindEndDate: function (e) {
    this.setData({
      endDate: e.detail.value
    })
    vm.getAuditIndexKeyMessage()    //员工首页主要信息
    vm.getAuditIndexMinorMessage()  //员工首页次要信息
  },

  //员工首页次要信息
  getAuditIndexMinorMessage: function () {
    var param = {
      start_time: vm.data.beginDate,
      end_time: vm.data.endDate,
    }
    util.getAuditIndexMinorMessage(param, function (res) {
      if (res.data.result) {
        var minorMessage = res.data.ret
        console.log("员工首页次要信息" + JSON.stringify(res))

        var task = minorMessage.noYellowPerotPerformanceRequest - minorMessage.noYellowPerotMoneies
        if (task < 0) {
          task = 0
        }
        var percent = minorMessage.noYellowPerotMoneies / minorMessage.noYellowPerotPerformanceRequest * 100
        console.log("678" + task + "------" + percent)
        vm.setData({
          minorMessage: minorMessage,
          task: task,
          percent: percent
        })
      }
    })
  },

  //员工获取今日任务
  getAuditTask: function () {
    var param = {
      stmt_date: util.getToday()
    }
    util.getAuditTask(param, function (res) {
      console.log("678" + JSON.stringify(res))
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
    vm.setData({ userInfo: userInfo })

    // if (userInfo == null) {
    //   wx.login({
    //     success: function (res) {
    //       wx.getUserInfo({
    //         success: function (res) {
    //           console.log("---" + JSON.stringify(res))
    //           var userInfo = {
    //             name: res.userInfo.nickName,
    //             avatar: res.userInfo.avatarUrl
    //           }
    //           vm.setData({ userInfo: userInfo })
    //           wx.stopPullDownRefresh()    //停止下拉刷新
    //         }
    //       })
    //     }
    //   })
    // } else {
    //   vm.getByIdWithToken()
    //   vm.setData({ userInfo: userInfo })
    //   wx.stopPullDownRefresh()    //停止下拉刷新
    // }
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
    var shop_id = getApp().globalData.userInfo.shop_id
    wx.navigateTo({
      url: '/pages/ranking/staff/staff?shop_id=' + shop_id,
    })
  },
  //跳转到添加客户页面
  jumpAddClient: function () {
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
    if (vm.data.todayTask.length == 0) {
      util.showToast("请等待店长发布今日任务")
      return
    }

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
    vm.getAuditIndexKeyMessage()    //员工首页主要信息
    vm.getAuditIndexMinorMessage()  //员工首页次要信息
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
    vm.getAuditTask()         //今日任务
    vm.getAuditIndexKeyMessage()
    vm.getAuditIndexMinorMessage()
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