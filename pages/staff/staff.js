// pages/staff/staff.js
var vm = null
var util = require("../../utils/util.js")
Page({
  data: {
    userInfo: {},
    start_time: "",
    end_time: "",

    options: ["今日目标", "关键信息", "次要信息"],
    optionsIndex: 0,

    target: true,
    key: true,
    minor: true,
  },

  onLoad: function (options) {
    vm = this
    var start_time = util.getToday()
    var end_time = util.getTodayAddOne()
    vm.setData({ start_time: start_time, end_time: end_time })
    vm.getUserInfo()          //获取用户信息
    vm.indexRefresh()         //刷新首页
    vm.shopGetShopName()         //刷新首页店铺名字
    console.log("员工首页")
  },

  //跳转到修改资料页
  alterUserInfo: function () {
    wx.navigateTo({
      url: '/pages/alterUserInfo/alterUserInfo',
    })
  },

  //根据店铺id获取店铺名字
  shopGetShopName: function () {
    var param = {
      id: getApp().globalData.userInfo.shop_id
    }
    util.shopGetShopName(param, function (res) {
      if (res.data.result) {
        var shopName = res.data.ret.name
        vm.setData({ shopName: shopName })
        console.log("员工店铺名字" + JSON.stringify(shopName))

      }
    })
  },

  //获取缓存中用户信息
  getUserInfo: function () {
    var userInfo = getApp().globalData.userInfo
    vm.setData({ userInfo: userInfo })
  },

  //发布成功提示
  showToast(toastText) {
    vm.setData({
      toastText: toastText,
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

  //开始时间
  bindBeginDate: function (e) {
    this.setData({
      start_time: e.detail.value
    })
    vm.indexRefresh()         //刷新首页
  },
  //结束时间
  bindEndDate: function (e) {
    this.setData({
      end_time: e.detail.value
    })
    vm.indexRefresh()         //刷新首页
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
    if (vm.data.todayTask.no_yellow_perot_product == 0) {
      vm.showToast("请等待店长发布今日任务")
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
        vm.showToast("今日已经提交过日报")
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
    // wx.navigateTo({
    //   url: '/pages/dealList/dealList',
    // })
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

  //首页刷新
  indexRefresh: function () {
    vm.getAuditTask()               //今日任务    
    vm.getAuditIndexKeyMessage()    //员工首页主要信息
    vm.getAuditIndexMinorMessage()  //员工首页次要信息
  },

  //员工获取今日任务
  getAuditTask: function () {
    var param = {
      start_time: vm.data.start_time,
      end_time: vm.data.end_time
    }
    util.getAuditTask(param, function (res) {
      console.log("今日任务" + JSON.stringify(res))
      var todayTask = res.data.ret
      if (todayTask.no_yellow_perot_product == 0) {
        isTask: false
      }
      vm.setData({ todayTask: todayTask })
    })
  },

  //员工首页主要信息
  getAuditIndexKeyMessage: function () {
    var param = {
      start_time: vm.data.start_time,
      end_time: vm.data.end_time,
    }
    util.getAuditIndexKeyMessage(param, function (res) {
      if (res.data.result) {
        var main = res.data.ret
        console.log("员工首页关键信息" + JSON.stringify(res))
        vm.setData({ main: main })
      }
    })
  },

  //员工首页次要信息
  getAuditIndexMinorMessage: function () {
    var param = {
      start_time: vm.data.start_time,
      end_time: vm.data.end_time,
    }
    util.getAuditIndexMinorMessage(param, function (res) {
      if (res.data.result) {
        var minorMessage = res.data.ret
        console.log("员工首页次要信息" + JSON.stringify(res))

        var task = null
        var percent = null
        if (minorMessage.noYellowPerotPerformanceRequest == 0) {
          task = "请等待店长发布任务"
          percent = 0
        } else {
          //首页剩余任务量(非黄珀任务额 - （非黄珀业绩+大额订单的业绩))
          task = minorMessage.noYellowPerotPerformanceRequest - minorMessage.noYellowPerotMoneies - minorMessage.otherMoneies
          if (task <= 0) {
            task = "你真棒 恭喜你完成任务"
          } else {
            task = "距离完成任务额还剩 " + task + " 元"
          }
          //首页进度条(非黄珀业绩+大额订单的业绩/非黄珀任务额)
          percent = minorMessage.noYellowPerotMoneies / minorMessage.noYellowPerotPerformanceRequest * 100

          if (percent > 100) {
            percent = 100
          }
        }
        vm.setData({
          minorMessage: minorMessage,
          task: task,
          percent: percent
        })
      }
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
    vm.getAuditTask()         //今日任务
    vm.getAuditIndexKeyMessage()
    vm.getAuditIndexMinorMessage()
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