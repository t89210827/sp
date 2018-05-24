// pages/manager/clientDetail/clientDetail.js
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

    date: "2016-09-01",

    clientList: [],       //客户信息列表
    audit_id: "",   //员工id
  },
  onLoad: function (options) {
    vm = this
    var audit_id = options.staffid  //员工id

    var start_time = util.changeDate(-7)
    var end_time = util.changeDate(1)
    vm.setData({ start_time: start_time, end_time: end_time, audit_id: audit_id })
    console.log("结束时间" + end_time)
    vm.getBelongClientByAuditId()              //获取隶属于该员工的客户信息
    // vm.setData({ staffid: staffid })
    // vm.getBelongClientByAuditId()      //获取所有顾客信息
  },

  //获取隶属于自己的客户信息
  getBelongClientByAuditId: function () {
    var param = {
      audit_id: vm.data.audit_id,
      client_tel: vm.data.inputVal,
      start_time: vm.data.start_time,
      end_time: vm.data.end_time,
      isbuy: vm.data.isbuy
    }
    util.getBelongClientByAuditId(param, function (res) {
      if (res.data.result) {
        var clientList = res.data.ret.data
        for (var i = 0; i < clientList.length; i++) {
          clientList[i].created_at = util.convertDateFormateM(clientList[i].created_at)
        }
        vm.setData({ clientList: clientList })
        console.log("获取隶属于自己的客户信息" + JSON.stringify(clientList))
      }
    })
  },

  //根据员工id获取客户信息
  // getClientByUserId: function () {
  //   var param = {
  //     audit_id: vm.data.staffid,
  //     page: 1,
  //   }
  //   util.getClientByUserId(param, function (res) {
  //     console.log("客户信息" + JSON.stringify(res))
  //     var clientList = res.data.ret.data
  //     for (var i = 0; i < clientList.length; i++) {
  //       clientList[i].created_at = util.convertDateFormateM(clientList[i].created_at)
  //     }
  //     vm.setData({ clientList: clientList })
  //   })
  // },

  // //跳转到客户详情页
  // jumpClientDetail: function () {
  //   wx.navigateTo({
  //     url: '/pages/clientDetail/clientDetail',
  //   })
  // },

  //入职时间
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
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
  //用户点击确定以后
  complete: function () {
    var phone = vm.data.inputVal
    var param = {
      search_word: phone
    }
    util.search(param, function (res) {
      if (res.data.result) {
        var clientList = res.data.ret
        for (var i = 0; i < clientList.length; i++) {
          clientList[i].created_at = util.date(clientList[i].created_at)
        }
        vm.setData({ clientList: res.data.ret })
      }
    })
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