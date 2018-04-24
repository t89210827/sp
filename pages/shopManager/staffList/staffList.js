// pages/shopManager/staffList/staffList.js

var vm = null
var util = require('../../../utils/util.js')

Page({
  data: {
    inputShowed: false,
    inputVal: "",

    staffList: [],           //店长下员工列表
    userInfo1: [
      {
        nickName: '1',
        avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83ercjU4KE73iahS7zwuy8tyib4hGJ2TJTDGWgaI02clfND2ZIiaHtxjyn1mcd461icjW7N4B0VcPZM59dA/0'
      },
      {
        nickName: '2',
        avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83ercjU4KE73iahS7zwuy8tyib4hGJ2TJTDGWgaI02clfND2ZIiaHtxjyn1mcd461icjW7N4B0VcPZM59dA/0'
      },
      {
        nickName: '3',
        avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83ercjU4KE73iahS7zwuy8tyib4hGJ2TJTDGWgaI02clfND2ZIiaHtxjyn1mcd461icjW7N4B0VcPZM59dA/0'
      },
      {
        nickName: '4',
        avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83ercjU4KE73iahS7zwuy8tyib4hGJ2TJTDGWgaI02clfND2ZIiaHtxjyn1mcd461icjW7N4B0VcPZM59dA/0'
      },
      {
        nickName: '5',
        avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83ercjU4KE73iahS7zwuy8tyib4hGJ2TJTDGWgaI02clfND2ZIiaHtxjyn1mcd461icjW7N4B0VcPZM59dA/0'
      },
    ],

  },
  //正序倒序
  clickSwitch: function () {
    var userInfo = vm.data.userInfo1
    userInfo.reverse()
    vm.setData({ userInfo1: userInfo })
  },

  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  onLoad: function (options) {
    vm = this
    vm.getAudit()              //店长下的员工列表
    wx.login({
      success: function (res) {
        wx.getUserInfo({
          success: function (res) {
            console.log("---" + JSON.stringify(res))
            vm.setData({ userInfo: res.userInfo })
          }
        })
      }
    })
  },
  //店长下的员工列表
  getAudit: function () {
    var param = {
      type: 2,
      page: 1,
    }
    util.getAudit(param, function (res) {
      vm.setData({ staffList: res.data.ret.audit.data })
    })
  },
  //根据店长id查询员工信息及员工录入顾客数量（对应原型：查看员工录入客户数量）
  getAuditCount: function () {
    
  },

  //返回上一层
  back: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  //跳转到该员工下客户列表页
  jumpClientList: function () {
    wx.navigateTo({
      url: '/pages/clientInformation/staff/staff',
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