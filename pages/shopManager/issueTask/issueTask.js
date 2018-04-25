// pages/shopManager/issueTask/issueTask.js
var vm = null
var util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
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

    productList: [],         //产品数组
    dailyList: [],           //审核员工列表
    shop_id: '',             //店铺id
    staffIndex: '',          //用户当前操作的员工id

    open: [],                //展开收起数组

    managerTask: [],         //发布任务数组
  },

  onLoad: function (options) {
    vm = this
    vm.getAudit()       //店长下的员工列表
  },

  showToast() {
    vm.setData({
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

  //主管查看发布任务
  getManagerTask: function () {
    var param = {
      stmt_date: util.getToday()
    }
    util.getManagerTask(param, function (res) {
      var managerTask = res.data.ret
      vm.setData({ managerTask: managerTask })
    })
  },

  //展开收起
  openTarget: function (e) {
    var idx = e.currentTarget.dataset.index // 获取当前下标
    var staffList = vm.data.staffList
    staffList[idx].check = !staffList[idx].check
    vm.setData({ staffList: staffList });
  },

  //获取任务信息剩余目标金额
  getReleaseTask: function () {
    var param = {
      shop_manager_id: getApp().globalData.userInfo.id,
      stmt_date: util.getToday(),
      shop_id: getApp().globalData.userInfo.shop_id
    }
    util.getReleaseTask(param, function (res) {
      console.log("获取任务信息剩余目标金额" + JSON.stringify(res))
    })
  },

  //获取生效产品数组
  getProductList: function () {
    var param = {
      page: 1
    }
    util.getProductList(param, function (res) {
      var productList = res.data.ret.data
      var staffList = vm.data.staffList
      for (var i = 0; i < staffList.length; i++) {
        var product = []
        for (var j = 0; j < productList.length; j++) {
          var productIndex = {}
          productIndex.productid = productList[j].id
          productIndex.value = ""
          product.push(productIndex)
        }
        staffList[i].product = product
      }
      console.log("员工列表" + JSON.stringify(staffList))
      vm.setData({ productList: productList, staffList: staffList })
    })
  },

  //店长下的员工列表
  getAudit: function () {
    var param = {
      type: 1,
      page: 1,
    }
    util.getAudit(param, function (res) {
      if (res.data.result) {
        var shop_id = res.data.ret.shop_id
        var staffList = res.data.ret.audit.data
        for (var i = 0; i < staffList.length; i++) {
          staffList[i].check = false
        }
        // console.log("员工列表" + JSON.stringify(staffList))
        vm.setData({ staffList: staffList, shop_id: shop_id })

        vm.getReleaseTask() //获取任务信息剩余目标金额
        vm.getProductList() //获取生效产品数组
      }
    })
  },

  //用户当前操作的员工id
  staff: function (e) {
    console.log("999" + JSON.stringify(e))
    var staffIndex = e.currentTarget.dataset.staffid
    vm.setData({ staffIndex: staffIndex })
  },

  //店长发任务
  confirm: function (e) {
    vm.openTarget(e)
    // console.log("index:" + JSON.stringify(e))
    // var product_id = e.currentTarget.id         //员工id
    var index = e.currentTarget.dataset.index   //员工索引
    var staff = vm.data.staffList[index]        //员工信息

    var performance = staff.product
    console.log("222:" + JSON.stringify(performance))
    var param = { shopManager: [] }
    for (var i = 0; i < performance.length; i++) {
      var paramIndex = {
        audit_id: staff.id,
        shop_id: vm.data.shop_id,
        stmt_date: util.getToday(),
        product_id: performance[i].productid,
        performance_request: performance[i].value,
        shop_manager_id: getApp().globalData.userInfo.id
      }
      param.shopManager.push(paramIndex)
    }
    util.shopManagerReleaseTask(param, function (res) {
      if (res.data.result) {
        vm.showToast()
      }
    })
  },

  //输入非黄
  inputOne: function (e) {
    console.log("inputOne:" + JSON.stringify(e))
    var productIndex = e.target.dataset.productindex
    var staffIndex = e.target.dataset.staffindex    //员工索引

    // var productid = e.target.dataset.productid      //产品id
    var value = e.detail.value                      //目标金额

    var staffList = vm.data.staffList               //员工列表

    staffList[staffIndex].product[productIndex].value = value
    vm.setData({ staffList: staffList })
    // console.log("333" + JSON.stringify(staffList[staffIndex].product))
  },
  //输入黄金
  inputTwo: function (e) {
    var index = e.target.dataset.index
    var staffList = vm.data.staffList
    staffList[index].two = e.detail.value
    vm.setData({ staffList: staffList })
  },
  //输入其他
  inputThree: function (e) {
    var index = e.target.dataset.index
    var staffList = vm.data.staffList
    staffList[index].three = e.detail.value
    vm.setData({ staffList: staffList })
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