// pages/addDeal/addDeal.js
var vm = null
var util = require('../../utils/util.js')
Page({
  data: {
    clientName: '',          //顾客姓名
    image: '',               //头像
    gender: "男",            //性别
    birthDate: "2016-09-01", //生日
    day: "",                 //接待时间

    num: 1,                  //产品数量
    productList: [],         //所有产品数组
    dealData: [],            //提交交易参数

    productArr: [],          //产品类型默认值
    clientId: "",            //上一个页面传过来的客户id
  },

  onLoad: function (options) {
    vm = this
    var clientId = options.clientId
    var day = util.getToday()
    vm.setData({ day: day, clientId: clientId })
    vm.getProductList()
    // vm.init()       //初始化参数
  },

  //获取生效的产品信息
  getProductList: function () {
    var param = {
      page: 1
    }
    util.getProductList(param, function (res) {
      var productList = res.data.ret.data
      vm.setData({ productList: productList })
      vm.initItemList()
    })
  },

  //初始化
  init: function (id) {
    var arr = []
    arr.push({
      "user_id": getApp().globalData.userInfo.id,
      "shop_id": getApp().globalData.userInfo.shop_id,
      "client_id": vm.data.clientId,
      "product_id": id,
      "product_name": "",
      "budget": "0-5000",
      "isbuy": 1,
      "money": "",
      "isearnest": 1,
      "isearnest_money": "",
      "purpose": "",
      "purpose_time": "2018-04-10",
      "remind_time": "",
      "remark": "",
      "num": ""
    })
    var itemListIndex = vm.data.itemList[0]
    var productArr = [itemListIndex]
    console.log("7771" + JSON.stringify(arr))
    vm.setData({ dealData: arr, productArr: productArr })
  },
  //笔数选择
  onChangeNumber(e) {
    var num = e.detail.number
    var arr = []
    var productArr = []
    for (var i = 0; i < num; i++) {
      arr.push({
        "user_id": getApp().globalData.userInfo.id,
        "shop_id": getApp().globalData.userInfo.shop_id,
        "client_id": vm.data.clientId,
        "product_id": vm.data.productList[0].id,
        "product_name": "",
        "budget": "0-5000",
        "isbuy": 1,
        "money": "",
        "isearnest": 1,
        "isearnest_money": "",
        "purpose": "",
        "purpose_time": "2018-04-10",
        "remind_time": "",
        "remark": "",
        "num": ""
      })
      var itemListIndex = vm.data.itemList[0]
      productArr.push(itemListIndex)
    }
    console.log("777" + JSON.stringify(arr))
    vm.setData({ num: num, dealData: arr, productArr: productArr })
  },

  //产品名字数组
  initItemList: function () {
    var itemList = []
    var productList = vm.data.productList
    for (var i = 0; i < productList.length; i++) {
      itemList.push(productList[i].name)
    }
    vm.setData({ itemList: itemList })
    vm.init(vm.data.productList[0].id)       //初始化参数          
  },

  //添加交易信息
  addDeal: function () {
    var deal = vm.data.dealData
    for (var i = 0; i < deal.length; i++) {
      if (deal[i].product_name == "") {
        util.showToast("货号不能为空")
        return
      }

      if (deal[i].product_id == 3) {
        if (deal[i].num < 3) {
          util.showToast("件数必须大于2")
          return
        }
      }

      if (deal[i].product_id == 1) {
        if (deal[i].money > 70000) {
          util.showToast("金额超过70000 必须录入到大额销售中")
          return
        }
      }
    }

    wx.showModal({
      title: '确认',
      content: '确定提交？',
      success: function (res) {
        if (res.confirm) {
          var param = {
            deal: deal
          }
          util.addDeal(param, function (res) {
            if (res.data.result) {
              wx.navigateTo({
                url: '/pages/hint/addClient/addClient',
              })
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  //货号
  inputName: function (e) {
    var productindex = e.currentTarget.dataset.productindex
    var dealData = vm.data.dealData

    dealData[productindex].product_name = e.detail.value
    vm.setData({ dealData: dealData })
    console.log("---" + JSON.stringify(dealData))
  },

  //选择产品类型
  productType: function (e) {
    var productindex = e.currentTarget.dataset.productindex

    var dealData = vm.data.dealData             //交易参数数组
    var productList = vm.data.productList       //产品数组
    var itemList = vm.data.itemList             //产品数组
    var productArr = vm.data.productArr         //产品数组

    // console.log("11111" + JSON.stringify(itemList))
    wx.showActionSheet({
      itemList: itemList,
      success: function (res) {
        if (!res.cancel) {
          console.log(res.tapIndex)
          dealData[productindex].product_id = productList[res.tapIndex].id
          productArr[productindex] = itemList[res.tapIndex]
          vm.setData({
            dealData: dealData,
            productArr: productArr,
          })
          console.log("---" + JSON.stringify(dealData))
        }
      }
    });
  },

  //选择预算
  budget: function (e) {
    var productindex = e.currentTarget.dataset.productindex
    var dealData = vm.data.dealData
    var budget = ['0-5000', '5000-10000', '10000-15000', '15000-20000']
    wx.showActionSheet({
      itemList: ['0-5000', '5000-10000', '10000-15000', '15000-20000'],
      success: function (res) {
        if (!res.cancel) {
          console.log(res.tapIndex)
          dealData[productindex].budget = budget[res.tapIndex]
          vm.setData({
            dealData: dealData
          })
        }
      }
    });
  },

  switchBuy: function (e) {
    var isBuy = e.detail.value
    var dealData = vm.data.dealData
    var productindex = e.currentTarget.dataset.productindex
    if (isBuy) {
      dealData[productindex].isbuy = 0
    } else {
      dealData[productindex].isbuy = 1
      // 如果为flase清空件数和购买金额
      dealData[productindex].money = ""
      dealData[productindex].num = ""
    }
    console.log("---" + JSON.stringify(dealData))
    vm.setData({ isBuy: e.detail.value, dealData: dealData })
  },
  switchReservation: function (e) {
    // console.log('携带值为', e.detail.value)
    var isReservation = e.detail.value
    var dealData = vm.data.dealData
    var productindex = e.currentTarget.dataset.productindex
    if (isReservation) {
      dealData[productindex].isearnest = 0
    } else {
      dealData[productindex].isearnest = 1

      // 如果为flase清空定金
      dealData[productindex].isearnest_money = ""
    }
    console.log("---" + JSON.stringify(dealData))
    vm.setData({ isReservation: e.detail.value, dealData: dealData })
  },

  //购买金额
  inputMoney: function (e) {
    var productindex = e.currentTarget.dataset.productindex
    var dealData = vm.data.dealData

    dealData[productindex].money = e.detail.value
    vm.setData({ dealData: dealData })
    console.log("---" + JSON.stringify(dealData))
  },

  //购买件数
  inputNum: function (e) {
    var productindex = e.currentTarget.dataset.productindex
    var dealData = vm.data.dealData

    dealData[productindex].num = e.detail.value
    vm.setData({ dealData: dealData })
    console.log("---" + JSON.stringify(dealData))
  },

  //定金金额
  inputIsearnestMoney: function (e) {
    var productindex = e.currentTarget.dataset.productindex
    var dealData = vm.data.dealData

    dealData[productindex].isearnest_money = e.detail.value
    vm.setData({ dealData: dealData })
    console.log("---" + JSON.stringify(dealData))
  },

  //定金金额
  inputPurpose: function (e) {
    var productindex = e.currentTarget.dataset.productindex
    var dealData = vm.data.dealData

    dealData[productindex].purpose = e.detail.value
    vm.setData({ dealData: dealData })
    console.log("---" + JSON.stringify(dealData))
  },

  //提醒时间
  bindDateChange: function (e) {
    var productindex = e.currentTarget.dataset.productindex
    var dealData = vm.data.dealData

    dealData[productindex].purpose_time = e.detail.value
    vm.setData({
      dealData: dealData
    })
    console.log("---" + JSON.stringify(dealData))
  },

  //备注
  textAreaEventListener: function (e) {
    var productindex = e.currentTarget.dataset.productindex
    var dealData = vm.data.dealData

    dealData[productindex].remark = e.detail.value
    vm.setData({
      dealData: dealData
    })
    console.log("---" + JSON.stringify(dealData))
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