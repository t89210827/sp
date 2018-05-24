// pages/manager/alterShopTask/alterShopTask.js
var vm = null
var util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // shopTask: [],     //参数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    vm = this
    vm.getUpPage()
  },

  //获取上一个页面的任务
  getUpPage: function () {
    var pages = getCurrentPages();//获取当前页面信息栈
    var prevPage = pages[pages.length - 2]//获取上一个页面信息栈
    var task = prevPage.data.task
    vm.setData({ task: task })
    // vm.back()
  },

  //输入任务
  inputTask: function (e) {
    console.log("inputTask:" + JSON.stringify(e))
    var product_id = e.currentTarget.id
    var value = e.detail.value                         //目标金额
    var task = vm.data.task
    for (var index in task) {
      if (task[index].product_id == product_id) {
        task[index].product_request = value
      }
    }
    vm.setData({ task: task })
  },

  //主管改任务
  confirm: function (e) {
    var task = vm.data.task
    for (var index in task) {
      delete task[index].created_at
      delete task[index].updated_at
      delete task[index].deleted_at
      // delete task[index].product_finish
    }
    var param = {
      manager: vm.data.task
    }
    util.releaseTask(param, function (res) {
      if (res.data.result) {
        console.log("主管改任务:" + JSON.stringify(res.data.ret))
        // vm.back()
      }
    })
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