// pages/manager/issueTask/issueTask.js
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

    productList: [],         //产品数组
    dailyList: [],           //审核员工列表
    shop_id: '',             //店铺id
    staffIndex: '',          //用户当前操作的员工id

    open: [],        //展开收起数组

    shops: [],        //主管下店铺列表
  },

  onLoad: function (options) {
    vm = this
    // vm.getAudit()       //店长下的员工列表

    vm.getShop()           //主管下的店铺列表
  },

  //主管下的店铺列表
  getShop: function () {
    var param = {
      manager_id: getApp().globalData.userInfo.id,
      page: 1,
    }
    util.getShop(param, function (res) {
      var shops = res.data.ret.shop.data

      for (var i = 0; i < shops.length; i++) {
        shops[i].check = false
      }
      // console.log("员工列表" + JSON.stringify(staffList))
      vm.setData({ shops: shops })

      vm.getProductList() //获取生效产品数组
    })
  },

  //展开收起
  openTarget: function (e) {
    var idx = e.currentTarget.id // 获取当前下标
    var shops = vm.data.shops
    shops[idx].check = !shops[idx].check
    vm.setData({ shops: shops });
  },

  //获取生效产品数组
  getProductList: function () {
    var param = {
      page: 1
    }
    util.getProductList(param, function (res) {
      var productList = res.data.ret.data
      var shops = vm.data.shops
      for (var i = 0; i < shops.length; i++) {
        var product = []
        for (var j = 0; j < productList.length; j++) {
          var productIndex = {}
          productIndex.productid = productList[j].id
          productIndex.value = ""
          product.push(productIndex)
        }
        shops[i].product = product
      }
      console.log("店铺列表" + JSON.stringify(shops))
      vm.setData({ productList: productList, shops: shops })
    })
  },

  //输入非黄
  inputOne: function (e) {
    console.log("inputOne:" + JSON.stringify(e))
    var productIndex = e.target.dataset.productindex    //商品索引
    var shopIndex = e.target.dataset.shopindex      //员工索引
    var value = e.detail.value                      //目标金额

    var shops = vm.data.shops                       //员工列表

    shops[shopIndex].product[productIndex].value = value
    vm.setData({ shops: shops })
  },

  //主管发任务
  confirm: function (e) {
    // console.log("index:" + JSON.stringify(e))
    // var product_id = e.currentTarget.id         //员工id
    var index = e.currentTarget.dataset.index      //员工索引
    var shop = vm.data.shops[index]                //店铺信息

    var performance = shop.product                  //店铺业绩要求
    console.log("222:" + JSON.stringify(performance))
    var param = { manager: [] }
    for (var i = 0; i < performance.length; i++) {
      var paramIndex = {
        shop_id: shop.id,
        stmt_date: util.getToday(),
        product_id: performance[i].productid,
        performance_request: performance[i].value,
      }
      param.manager.push(paramIndex)
    }
    util.releaseTask(param, function (res) {

    })
  },

  //用户当前操作的员工id
  staff: function (e) {
    console.log("999" + JSON.stringify(e))
    var staffIndex = e.currentTarget.dataset.staffid
    vm.setData({ staffIndex: staffIndex })
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