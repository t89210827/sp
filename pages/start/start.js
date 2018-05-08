//login.js
//获取应用实例
var util = require('../../utils/util.js')
var vm = null
Page({
  data: {
    remind: '加载中',
    angle: 0,
    userInfo: {},

    position: "",    //入职信息
  },
  goToIndex: function () {
    var position = vm.data.position
    if (position.length == 0) {
      wx.redirectTo({
        url: '/pages/index/index',
      })
      // wx.switchTab({
      //   url: '/pages/index/index',
      // })
      return
    }
    var status = position[0].status
    var type = position[0].type

    console.log("------" + status)
    if (status == 1 && type == 1) {
      wx.redirectTo({
        url: '/pages/staff/staff',
      })
      // wx.switchTab({
      //   url: '/pages/staff/staff',
      // })
    } else if (status == 2 && type == 2) {
      wx.redirectTo({
        url: '/pages/shopManager/index/index',
      })
      // wx.switchTab({
      //   url: '/pages/shopManager/index/index',
      // })
    } else if (status == 2 && type == 3) {
      wx.redirectTo({
        url: '/pages/manager/index/index',
      })
      // wx.switchTab({
      //   url: '/pages/manager/index/index',
      // })
    } else {
      // wx.switchTab({
      //   url: '/pages/manager/index/index',
      // })
      wx.navigateTo({
        url: '/pages/hint/audit/audit',
      })
      // util.showToast('用户身份不确定')
    }
  },
  onLoad: function () {
    vm = this
    vm.getUserInfo()
    // vm.getAuditByUserId()
  },

  //根据user_id获取员工入职信息
  getAuditByUserId: function () {
    util.getAuditByUserId({}, function (res) {
      if (res.data.result) {
        var position = res.data.ret
        console.log("--" + JSON.stringify(res))
        vm.setData({
          position: position,
        })
        vm.goToIndex()
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