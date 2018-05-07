// pages/staff/clientList/clientList.js
var vm = null
var util = require('../../../utils/util.js')
const { extend, Actionsheet, Tab } = require('../../../bower_components/zanui-weapp/dist/index');
// 在 Page 中混入 Tab 里面声明的方法
Page(extend({}, Actionsheet, Tab, {
  data: {
    inputShowed: false,
    inputVal: "",

    actionsheet: {
      show: false,
      cancelText: '关闭',
      closeOnClickOverlay: true,
      componentId: 'actionsheet',
      actions: [{
        name: '全部',
        // subname: '选项描述语1',
        className: 'action-class',
        loading: false
      }, {
        name: '已购买',
        // subname: '选项描述语1',
        className: 'action-class',
        loading: false
      }, {
        name: '未购买',
        // subname: '选项描述语2',
        className: 'action-class',
        loading: false
      },]
    },

    showLeftPopup: false,

    clientList: [],          //客户信息列表
    audit_id: "",            //员工id

  },
  onLoad: function (options) {
    vm = this
    vm.getClientByUserId()      //获取所有顾客信息
    vm.initSearchParam()        //初始化参数
  },

  //初始化搜索参数
  initSearchParam: function () {
    var today = util.getToday()
    // vm.setData({ start_time: today, end_time: today })

    var search = {
      user_id: getApp().globalData.userInfo.id,
      start_time: today,
      end_time: today,
      // isbuy: "",
      // tel: ""
    }
    vm.setData({ search: search })
    vm.complete()
  },

  //用户点击确定以后
  complete: function () {
    var search = vm.data.search
    util.search(search, function (res) {
      if (res.data.result) {
        console.log("搜索返回值" + JSON.stringify(res.data.ret))
        // var clientList = res.data.ret
        // for (var i = 0; i < clientList.length; i++) {
        //   clientList[i].created_at = util.date(clientList[i].created_at)
        // }
        // vm.setData({ clientList: res.data.ret })
      }
    })
  },

  //开始录入时间
  bindStartTime: function (e) {
    var search = vm.data.search
    var start_time = e.detail.value
    search.start_time = start_time
    vm.setData({
      search: search
    })
  },

  //结束录入时间
  bindEndTime: function (e) {
    var search = vm.data.search
    var end_time = e.detail.value
    search.end_time = end_time
    vm.setData({
      search: search
    })
  },

  //返回首页
  backIndex: function () {
    util.backIndex()
  },

  //根据员工id获取客户信息
  getClientByUserId: function () {
    var param = {
      audit_id: getApp().globalData.userInfo.id,
      page: 1,
    }
    util.getClientByUserId(param, function (res) {
      console.log("客户信息" + JSON.stringify(res))
      var clientList = res.data.ret.data
      for (var i = 0; i < clientList.length; i++) {
        clientList[i].created_at = util.convertDateFormateM(clientList[i].created_at)
      }
      vm.setData({ clientList: clientList })
    })
  },

  //跳转到客户详情页
  jumpClientDetail: function () {
    wx.navigateTo({
      url: '/pages/clientDetail/clientDetail',
    })
  },

  //左侧弹出框
  toggleLeftPopup() {
    this.setData({
      showLeftPopup: !this.data.showLeftPopup
    });
  },

  toggleActionsheet() {
    this.setData({
      'actionsheet.show': true
    });
  },

  handleZanActionsheetCancel({ componentId }) {
    this.setData({
      [`${componentId}.show`]: false
    });
  },

  handleZanActionsheetClick({ componentId, index }) {
    console.log(`item index ${index} clicked`);

    // 如果是分享按钮被点击, 不处理关闭
    if (index === 2) {
      return;
    }

    this.setData({
      [`${componentId}.actions[${index}].loading`]: true
    });

    setTimeout(() => {
      this.setData({
        [`${componentId}.show`]: false,
        [`${componentId}.actions[${index}].loading`]: false
      });
    }, 1500);
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
  // clearInput: function () {
  //   this.setData({
  //     inputVal: ""
  //   });
  // },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
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
}))