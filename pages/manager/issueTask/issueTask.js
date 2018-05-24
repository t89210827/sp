// pages/manager/issueTask/issueTask.js
var vm = null
var util = require('../../../utils/util.js')
// 在 Page 中混入 Tab 里面声明的方法
Page({

  data: {
    showLeftPopup: false,
    date: "2016-09-01",
    productList: [],         //产品数组
    dailyList: [],           //审核员工列表
    shop_id: '',             //店铺id
    staffIndex: '',          //用户当前操作的员工id
    open: [],        //展开收起数组
    shops: [],        //主管下店铺列表

    toast: { show: false }
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

  onLoad: function (options) {
    vm = this
    // vm.getShop()           //主管下的店铺列表
    // vm.getManagerTask()    //主管查看发布任务

    vm.managerObtainTask()      //主管查看发布本月任务
  },

  //修改该店铺任务
  alterShopTask: function (e) {
    var index = e.currentTarget.dataset.index        //员工索引
    var task = vm.data.shops[index].task                  //店铺信息
    vm.setData({ task: task })
    // console.log("店铺id:" + JSON.stringify(shop))
    wx.navigateTo({
      url: '/pages/manager/alterShopTask/alterShopTask',
    })
  },

  //主管查看发布本月任务
  managerObtainTask: function () {
    var param = {
      shop_id: getApp().globalData.userInfo.shop_id,
      stmt_date: util.getMonth()
    }
    util.managerObtainTask(param, function (res) {
      if (res.data.result) {
        var shops = res.data.ret

        for (var i = 0; i < shops.length; i++) {
          shops[i].check = false
        }

        vm.setData({ shops: shops })
        console.log('主管查看发布本月任务' + JSON.stringify(res.data.ret))
      }
    })
  },

  //展开收起
  openTarget: function (e) {
    // var idx = e.currentTarget.id // 获取当前下标
    var idx = e.currentTarget.dataset.index  // 获取当前下标
    var shops = vm.data.shops
    // shops[idx].check = !shops[idx].check
    for (var i = 0; i < shops.length; i++) {
      if (i != idx) {
        shops[i].check = false
      } else if (i == idx) {
        shops[i].check = !shops[i].check
      }
    }
    vm.setData({ shops: shops });
  },

  // 主管查看发布任务
  getManagerTask: function () {
    var param = {
      stmt_date: util.getMonth()
    }
    util.getManagerTask(param, function (res) {
      if (res.data.result) {
        var issue = res.data.ret
        console.log("主管查看发布任务" + JSON.stringify(res.data.ret))
      }
    })
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

  //输入任务
  inputTask: function (e) {
    console.log("inputTask:" + JSON.stringify(e))
    var productid = e.target.dataset.productid      //商品id
    var shopIndex = e.target.dataset.shopindex      //员工索引
    var value = e.detail.value                      //目标金额

    var shops = vm.data.shops                       //店铺列表
    if (productid == 2) {
      shops[shopIndex].yellowTask = value           //输入黄铂任务
    } else if (productid == 1) {
      shops[shopIndex].no_yellowTask = value        //输入非黄铂任务
    }
    console.log("输入数据:" + JSON.stringify(shops))
    vm.setData({ shops: shops })
  },

  //主管发任务
  confirm: function (e) {
    vm.openTarget(e)
    var index = e.currentTarget.dataset.index        //员工索引
    var shop = vm.data.shops[index]                  //店铺信息
    var param = {
      manager: [
        {
          "user_id": getApp().globalData.userInfo.id,
          "shop_id": shop.id,
          "stmt_date": util.getMonth(),
          "product_id": "1",
          "product_request": shop.no_yellowTask,
          // "product_finish": shop.no_yellowTask
        },
        {
          "user_id": getApp().globalData.userInfo.id,
          "shop_id": shop.id,
          "stmt_date": util.getMonth(),
          "product_id": "2",
          "product_request": shop.yellowTask,
          // "product_finish": shop.yellowTask
        },
        {
          "user_id": getApp().globalData.userInfo.id,
          "shop_id": shop.id,
          "stmt_date": util.getMonth(),
          "product_id": "3",
          "product_request": 0,
          // "product_finish": 0
        },
      ]
    }
    util.releaseTask(param, function (res) {
      if (res.data.result) {
        vm.managerObtainTask()    //刷新列表
        vm.showToast()            //提示
      }
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