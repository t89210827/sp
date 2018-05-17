// pages/shopManager/index/index.js
var vm = null
var util = require('../../../utils/util.js')
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
    var start_time = util.getToday()
    var end_time = util.getTodayAddOne()
    vm.setData({ start_time: start_time, end_time: end_time })
    vm.getUserInfo()
    vm.getShopManagerTask()               //店长获取本月任务
    vm.indexRefresh()                       //首页数据
  },

  getShopManagerMonthTaskAmount: function () {
    var param = {
      shop_id: getApp().globalData.userInfo.shop_id,
      stmt_date: util.getMonth()
    }
    util.getShopManagerMonthTaskAmount(param, function (res) {
      if (res.data.result) {
        var shopManagerMonthTaskAmount = res.data.ret
        if (shopManagerMonthTaskAmount.surplusMoney < 0) {
          shopManagerMonthTaskAmount.surplusMoney = 0
        }
        if (shopManagerMonthTaskAmount.finishPercentage < 0) {
          shopManagerMonthTaskAmount.finishPercentage = 0
        }
        console.log("剩余任务" + JSON.stringify(shopManagerMonthTaskAmount))
        vm.setData({ shopManagerMonthTaskAmount: shopManagerMonthTaskAmount })
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

  //获取缓存中用户信息
  getUserInfo: function () {
    var userInfo = getApp().globalData.userInfo
    vm.setData({ userInfo: userInfo })
    console.log("userInfo : " + JSON.stringify(userInfo))
  },

  //店长获取本月任务
  getShopManagerTask: function () {
    var param = {
      stmt_date: util.getMonth(),
      shop_id: getApp().globalData.userInfo.shop_id,
    }
    util.getShopManagerTask(param, function (res) {
      if (res.data.result) {
        console.log("--------------" + JSON.stringify(res))
        var taskList = res.data.ret.task
        taskList.splice(0, 1);
        vm.setData({ taskList: taskList })
      }
    })
  },

  //首页刷新
  indexRefresh: function () {
    vm.getShopManagerTask()                     //月任务    
    vm.getShopManagerMonthTaskAmount()          //店长本月剩余任务额    
    vm.getShopManagerIndexKeyMessage()          //店长首页主要信息
    vm.getShopManagerIndexMinorMessage()        //店长首页次要信息
  },

  //店长首页主要信息
  getShopManagerIndexKeyMessage: function () {
    var param = {
      shop_id: getApp().globalData.userInfo.shop_id,
      start_time: vm.data.start_time,
      end_time: vm.data.end_time,
    }
    util.getShopManagerIndexKeyMessage(param, function (res) {
      if (res.data.result) {
        var main = res.data.ret
        console.log("店长首页关键信息" + JSON.stringify(res))
        vm.setData({ main: main })
      }
    })
  },

  //获取本月剩余业绩
  shopManagerSurplusTask: function () {
    var param = {
      shop_id: getApp().globalData.userInfo.shop_id,
      stmt_date: util.getMonth()
    }
    util.shopManagerSurplusTask(param, function (res) {
      if (res.data.result) {
        var minorMessage = vm.data.minorMessage
        var surplusTask = res.data.ret
        var task = surplusTask.noYellowPerotProductNum
        if (task < 0) {
          task = "你真棒 恭喜你完成任务"
        } else {
          task = "距离完成任务额还剩 " + task + " 元"
        }
        var percent = 100 - (surplusTask.noYellowPerotProductNum + surplusTask.otherProductNum / minorMessage.noYellowPerotTask * 100)
        if (percent > 100) {
          percent = 100
        }
        vm.setData({ task: task, percent: percent })
      }
    })
  },

  //店长首页次要信息
  getShopManagerIndexMinorMessage: function () {
    var param = {
      shop_id: getApp().globalData.userInfo.shop_id,
      start_time: vm.data.start_time,
      end_time: vm.data.end_time,
    }
    util.getShopManagerIndexMinorMessage(param, function (res) {
      if (res.data.result) {
        var minorMessage = res.data.ret     //次要信息
        vm.setData({ minorMessage: minorMessage })
        if (minorMessage.noYellowPerotTask == 0) {
          var task = "请等待店长发布任务"
          var percent = 0
          vm.setData({
            task: task,
            percent: percent
          })
        } else {
          vm.shopManagerSurplusTask()       //获取本月剩余业绩
        }
        console.log("店长首页次要信息" + JSON.stringify(res))
      }
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
    // wx.navigateTo({
    //   url: '/pages/addClient/addClient',
    // })
    wx.navigateTo({
      url: '/pages/queryClient/queryClient',
    })
  },
  //跳转到店员客户信息页面
  jumpStaffList: function () {
    var shop_id = getApp().globalData.userInfo.shop_id
    wx.navigateTo({
      url: '/pages/shopManager/staffList/staffList?shop_id=' + shop_id,
    })
  },
  //跳转到提交日报页面
  jumpIssueList: function () {
    wx.navigateTo({
      url: '/pages/shopManager/issueList/issueList',
    })
  },
  //跳转到交易信息页面
  jumpDailyList: function (e) {
    // console.log("---1111" + JSON.stringify())
    wx.navigateTo({
      url: '/pages/shopManager/dailyList/dailyList',
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
      start_time: e.detail.value
    })
    vm.indexRefresh()                       //首页数据
  },
  //结束时间
  bindEndDate: function (e) {
    this.setData({
      end_time: e.detail.value
    })
    vm.indexRefresh()                       //首页数据
  },
  // 选项选择
  bindOption: function (e) {
    console.log('选项选择 发生选择改变，携带值为', e.detail.value);
    this.setData({
      optionsIndex: e.detail.value
    })
    vm.getShopManagerIndexKeyMessage()    //员工首页主要信息
    vm.getShopManagerIndexMinorMessage()  //员工首页次要信息
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
    vm.indexRefresh()                       //首页数据
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