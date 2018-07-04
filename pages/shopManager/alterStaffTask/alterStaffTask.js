// pages/shopManager/alterStaffTask/alterStaffTask.js
var vm = null
var util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // shopTask: [],     //参数
  },

  onLoad: function (options) {
    vm = this
    vm.getUpPage()
  },

  //获取上一个页面的任务
  getUpPage: function () {
    var pages = getCurrentPages();//获取当前页面信息栈
    var prevPage = pages[pages.length - 2]//获取上一个页面信息栈 
    var task = prevPage.data.task

    for (var index in task) {
      if (task[index].product_id == 1) {
        vm.setData({ no_yellow: task[index].id })
      } else if (task[index].product_id == 2) {
        vm.setData({ yellow: task[index].id })
      } else if (task[index].product_id == 3) {
        vm.setData({ other: task[index].id })
      }
    }
    vm.setData({
      audit_id: task[0].user_id,
      shop_id: task[0].shop_id,
      stmt_date: task[0].stmt_date,
    })
    // vm.setData({ task: task })
  },

  //输入任务
  inputTask: function (e) {
    console.log("inputTask:" + JSON.stringify(e))
    var product_id = e.currentTarget.id
    var value = e.detail.value                         //目标金额
    if (product_id == 1) {
      vm.setData({ no_yellowTask: value })
    } else if (product_id == 2) {
      vm.setData({ yellowTask: value })
    }
    // var task = vm.data.task
    // for (var index in task) {
    //   if (task[index].product_id == product_id) {
    //     task[index].product_request = value
    //   }
    // }
    // vm.setData({ task: task })
  },

  //店长改任务
  confirm: function (e) {
    var task = vm.data.task
    var param = {
      shopManager: [
        {
          "id": vm.data.no_yellow,
          "audit_id": vm.data.audit_id,
          "shop_id": vm.data.shop_id,
          "stmt_date": vm.data.stmt_date,
          "product_id": "1",
          "performance_request": vm.data.no_yellowTask,
          "shop_manager_id": getApp().globalData.userInfo.id,
        },
        {
          "id": vm.data.yellow,
          "audit_id": vm.data.audit_id,
          "shop_id": vm.data.shop_id,
          "stmt_date": vm.data.stmt_date,
          "product_id": "2",
          "performance_request": vm.data.yellowTask,
          "shop_manager_id": getApp().globalData.userInfo.id,
        },
        {
          "id": vm.data.other,
          "audit_id": vm.data.audit_id,
          "shop_id": vm.data.shop_id,
          "stmt_date": vm.data.stmt_date,
          "product_id": "3",
          "performance_request": "0",
          "shop_manager_id": getApp().globalData.userInfo.id,
        }
      ]
    }
    util.shopManagerReleaseTask(param, function (res) {
      if (res.data.result) {
        var pages = getCurrentPages();//获取当前页面信息栈
        var prevPage = pages[pages.length - 2]//获取上一个页面信息栈
        var task = prevPage.getAudit()
        vm.back()
      }
    })
    // for (var index in task) {
    //   delete task[index].created_at
    //   delete task[index].updated_at
    //   delete task[index].deleted_at
    // }
    // var param = {
    //   manager: vm.data.task
    // }
    // util.releaseTask(param, function (res) {
    //   if (res.data.result) {
    //     console.log("主管改任务:" + JSON.stringify(res.data.ret))
    //   }
    // })
  },

  //输入名字
  inputName: function (e) {
    vm.setData({ name: e.detail.value })
  },

  //返回上一层
  back: function () {
    wx.navigateBack({
      delta: 1
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