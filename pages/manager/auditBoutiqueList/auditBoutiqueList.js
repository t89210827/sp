// pages/manager/auditBoutiqueList/auditBoutiqueList.js
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

    dailyList: [],           //审核员工列表
  },

  onLoad: function (options) {
    vm = this
    var stmt_date = util.getToday()
    vm.setData({ stmt_date: stmt_date })
    vm.getBoutiqueDaily()         //主管查看未审核的竞品日报
  },

  //时间
  dailyPaperDate: function (e) {
    this.setData({
      stmt_date: e.detail.value
    })
    vm.getBoutiqueDaily()         //店长查看未审核的竞品日报
  },

  //主管查看未审核的竞品日报
  getBoutiqueDaily: function () {
    var param = {
      manager_id: getApp().globalData.userInfo.id,
      stmt_date: util.getToday()
    }
    util.getBoutiqueDaily(param, function (res) {
      if (res.data.result) {
        var boutiqueDaily = res.data.ret
        // for (var i = 0; i < boutiqueDaily.length; i++) {
        //   if (boutiqueDaily[i].boutiqueDaily.data.length == 0) {
        //     boutiqueDaily.splice(i, 1)
        //     break;
        //   }

        //   boutiqueDaily[i].boutiqueDaily.data[0].created_at = util.convertDateFormateM(boutiqueDaily[i].boutiqueDaily.data[0].created_at)
        // }
        console.log("未审核竞品日报" + JSON.stringify(boutiqueDaily))
        vm.setData({ boutiqueDaily: boutiqueDaily })
      }
    })
  },

  //店长查看日报列表(对应原型审核日报)
  dailyList: function () {
    var param = {
      status: 1
    }
    util.dailyList(param, function (res) {
      if (res.data.result) {
        var dailyList = res.data.ret.data[0].audit
        for (var i = 0; i < dailyList.length; i++) {
          if (dailyList[i].daily_paper.length == 0) {
            dailyList.splice(i, 1)
            break;
          }

          dailyList[i].created_at = util.convertDateFormateM(dailyList[i].created_at)
        }
        console.log("000000" + JSON.stringify(dailyList))
        vm.setData({ dailyList: dailyList })
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

  //跳转到客户详情页
  jumpAuditDailyDetail: function () {
    wx.navigateTo({
      url: '/pages/shopManager/auditDailyDetail/auditDailyDetail',
    })
  },

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
    vm.getBoutiqueDaily()
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
    vm.getBoutiqueDaily()
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