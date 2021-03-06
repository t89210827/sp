// pages/clientInformation/staff/staff.js
var vm = null
var util = require('../../../utils/util.js')
const { extend, Actionsheet, Tab } = require('../../../bower_components/zanui-weapp/dist/index');
// 在 Page 中混入 Tab 里面声明的方法
Page(extend({}, Actionsheet, Tab, {
  data: {
    inputShowed: false,

    inputVal: "",              //电话号
    start_time: "",            //开始时间
    end_time: "",              //结束时间
    isbuy: "",                 //是否购买
    isearnest: "",             //是否交定金

    actionsheet: {
      show: false,
      cancelText: '关闭',
      closeOnClickOverlay: true,
      componentId: 'actionsheet',
      actions: [{
        name: '全部',
        className: 'action-class',
        loading: false
      }, {
        name: '已购买',
        className: 'action-class',
        loading: false
      }, {
        name: '未购买',
        className: 'action-class',
        loading: false
      }, {
        name: '已交定金',
        className: 'action-class',
        loading: false
      }, {
        name: '未交定金',
        className: 'action-class',
        loading: false
      },]
    },

    showLeftPopup: false,

    dealStatus: 0,           //搜索状态索引 （例：已购买  未购买）

    clientList: [],          //客户信息列表
    audit_id: "",            //员工id

  },
  onLoad: function (options) {
    vm = this
    var audit_id = options.audit_id                           //员工id
    var start_time = util.changeDate(-7)
    var end_time = util.changeDate(1)
    vm.setData({ start_time: start_time, end_time: end_time, audit_id: audit_id })
    console.log("结束时间" + end_time)
    vm.getBelongClientByAuditId()              //获取隶属于该员工的客户信息
    // vm.getClientByUserId()                  //获取所有顾客信息
    // vm.initSearchParam()                    //初始化参数
  },

  //获取隶属于自己的客户信息
  getBelongClientByAuditId: function () {
    var param = {
      audit_id: vm.data.audit_id,
      client_tel: vm.data.inputVal,
      start_time: vm.data.start_time,
      end_time: vm.data.end_time,
      isbuy: vm.data.isbuy,
      isearnest: vm.data.isearnest
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

  //用户搜索框点击确定
  complete: function () {
    vm.getBelongClientByAuditId()   //获取隶属于该员工的客户信息
  },

  //开始录入时间
  bindStartTime: function (e) {
    // var search = vm.data.search
    var start_time = e.detail.value
    // search.start_time = start_time
    vm.setData({
      start_time: start_time
    })
    vm.getBelongClientByAuditId()   //获取隶属于该员工的客户信息
  },

  //结束录入时间
  bindEndTime: function (e) {
    // var search = vm.data.search
    var end_time = e.detail.value
    // search.end_time = end_time
    vm.setData({
      end_time: end_time
    })
    vm.getBelongClientByAuditId()   //获取隶属于该员工的客户信息
  },

  //返回首页
  backIndex: function () {
    util.backIndex()
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
    vm.getBelongClientByAuditId()   //获取隶属于该员工的客户信息
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

    if (index == 0) {
      vm.setData({ isbuy: "", isearnest: '', dealStatus: 0 })
    } else if (index == 1) {
      vm.setData({ isbuy: 0, isearnest: '', dealStatus: 1 })
    } else if (index == 2) {
      vm.setData({ isbuy: 1, isearnest: '', dealStatus: 2 })
    } else if (index == 3) {
      vm.setData({ isearnest: 0, isbuy: '', dealStatus: 3 })
    } else if (index == 4) {
      vm.setData({ isearnest: 1, isbuy: '', dealStatus: 4 })
    }

    this.setData({
      [`${componentId}.actions[${index}].loading`]: true
    });

    setTimeout(() => {
      this.setData({
        [`${componentId}.show`]: false,
        [`${componentId}.actions[${index}].loading`]: false
      });
    }, 1000);

    vm.getBelongClientByAuditId()   //获取隶属于该员工的客户信息

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
    vm.getBelongClientByAuditId()   //获取隶属于该员工的客户信息      
  },

  //返回上一层
  back: function () {
    wx.navigateBack({
      delta: 1
    })
  },

  //发布成功提示
  showToast(showToastText) {
    vm.setData({
      showToastText: showToastText,
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