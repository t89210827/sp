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
    taskList: [],            //店长获取本月任务

    monthTask: false,        //本月任务开关
  },

  onLoad: function (options) {
    vm = this
    vm.getAudit()             //店长下的员工列表
    vm.getShopManagerTask()   //店长获取本月剩余任务
  },

  // 本月任务开关
  onOff: function () {
    vm.setData({ monthTask: !vm.data.monthTask })
  },

  //店长获取本月任务
  getShopManagerTask: function () {
    var param = {
      stmt_date: util.getMonth(),
      shop_id: getApp().globalData.userInfo.shop_id,
    }
    util.getShopManagerTask(param, function (res) {
      if (res.data.result) {
        console.log("--------------" + JSON.stringify(res))
        var taskList = res.data.ret.task
        vm.setData({ taskList: taskList })
      }
    })
  },

  //发布成功提示
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

  //展开收起
  openTarget: function (e) {
    var idx = e.currentTarget.dataset.index // 获取当前下标
    var staffList = vm.data.staffList
    staffList[idx].check = !staffList[idx].check
    vm.setData({ staffList: staffList });
  },

  //获取生效产品数组
  getProductList: function () {
    var param = {
      page: 1
    }
    util.getProductList(param, function (res) {
      var productList = res.data.ret.data         //生效产品数组
      productList.splice(0, 1);

      var staffList = vm.data.staffList           //员工数组
      for (var i = 0; i < staffList.length; i++) {
        var product = []                          //每个员工下产品数组
        for (var j = 0; j < productList.length; j++) {
          if (productList[j].id != 3) {           //不要大额订单
            var productIndex = {}
            productIndex.productid = productList[j].id
            productIndex.value = ""
            product.push(productIndex)
          }
        }
        staffList[i].product = product
      }
      console.log("生效产品数组" + JSON.stringify(staffList))
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
        console.log("员工列表" + JSON.stringify(staffList))
        vm.setData({ staffList: staffList, shop_id: shop_id })
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
    // var product_id = e.currentTarget.id        //员工id
    var index = e.currentTarget.dataset.index     //员工索引
    var staff = vm.data.staffList[index]          //员工信息

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
    param.shopManager.push({
      audit_id: staff.id,
      shop_id: vm.data.shop_id,
      stmt_date: util.getToday(),
      product_id: 3,
      performance_request: 0,
      shop_manager_id: getApp().globalData.userInfo.id
    })
    util.shopManagerReleaseTask(param, function (res) {
      if (res.data.result) {
        vm.getAudit()
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