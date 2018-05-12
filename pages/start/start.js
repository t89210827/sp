//login.js
//获取应用实例
var util = require('../../utils/util.js')
var vm = null
Page({
  data: {
    remind: '加载中',
    angle: 0,
    userInfo: {},

    scopeUserInfo: true,                //是否授权过  默认为授权过
    // canIUse: wx.canIUse('button.open-type.getUserInfo'),   //是否兼容用户微信版本
    position: "",    //入职信息
  },

  onLoad: function () {
    vm = this
    vm.getStorageUserInfo()
    vm.getSetting()
  },

  //获取缓存中用户信息
  getStorageUserInfo: function () {
    var userInfo = getApp().globalData.userInfo
    vm.setData({ userInfo: userInfo })
    console.log("6666666" + JSON.stringify(userInfo))
  },

  getSetting: function () {
    // 可以通过 wx.getSetting 先查询一下用户是否授权了获取用户信息这个 scope
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          vm.setData({ scopeUserInfo: false })
          console.log("用户没有授权获取用户信息")
        }
      }
    })
  },

  //点击获取用户信息接口返回信息
  getUserInfo: function (e) {
    if (e.detail.errMsg == "getUserInfo:ok") {
      var userInfo = e.detail.userInfo
      getApp().updateById(userInfo)
    } else if (e.detail.errMsg == "getUserInfo:fail auth deny") {
      getApp().showModal()
    }
    console.log("用户信息" + JSON.stringify(e))
  },

  getAuditByUserId: function () {
    getApp().getAuditByUserId()
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