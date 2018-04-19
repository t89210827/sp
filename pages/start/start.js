//login.js
//获取应用实例
var util = require('../../utils/util.js')
var vm = null
Page({
  data: {
    remind: '加载中',
    angle: 0,
    userInfo: {},

    status: ''      //用户入职状态
  },
  goToIndex: function () {
    var status = vm.data.status
    console.log("------" + status)
    if (status == 1) {
      wx.redirectTo({
        url: '/pages/staff/staff',
      })
    } else if (status == 2) {
      wx.switchTab({
        url: '/pages/staff/staff',
      })
      // wx.redirectTo({
      //   url: '/pages/staff/staff',
      // })
    } else {
      util.showToast('用户身份不确定')
    }
  },
  onLoad: function () {
    vm = this
    vm.getUserInfo()
    vm.getAuditByUserId()
  },

  //根据user_id获取员工入职信息
  getAuditByUserId: function () {
    util.getAuditByUserId({}, function (res) {
      if (res.data.result) {
        var status = res.data.ret[0].status
        vm.setData({ status: status })
      }
    })
  },

  //获取缓存中用户信息
  getUserInfo: function () {
    vm.setData({ userInfo: getApp().globalData.userInfo })
  },

  onShow: function () {

  },
  onReady: function () {
    setTimeout(function () {
      vm.setData({
        remind: ''
      });
    }, 1000);
    wx.onAccelerometerChange(function (res) {
      var angle = -(res.x * 30).toFixed(1);
      if (angle > 14) { angle = 14; }
      else if (angle < -14) { angle = -14; }
      if (vm.data.angle !== angle) {
        vm.setData({
          angle: angle
        });
      }
    });
  }
});