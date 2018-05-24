// pages/shopList/shopList.js
var vm = null
var util = require('../../utils/util.js')
var Zan = require('../../bower_components/zanui-weapp/dist/index');

Page(Object.assign({}, Zan.Select, Zan.TopTips, {

  /**
   * 页面的初始数据
   */
  data: {
    value: '',                //zanui高亮显示值
    activeColor: '#4b0',

    checkboxItems: [
      { name: '店铺一', value: '0', checked: true },
      { name: '店铺二', value: '1' }
    ],

    statusType: '',      //用户选择的类型
  },
  onLoad: function (options) {
    vm = this
    vm.getStatusType()    //获取用户身份

    // vm.getShopList()        //店铺列表
    vm.getShops()        //店铺列表
  },

  //获取上一个页面
  getShops: function () {
    var pages = getCurrentPages();//获取当前页面信息栈
    var prevPage = pages[pages.length - 2]//获取上一个页面信息栈
    var shops = prevPage.data.brandShops[prevPage.data.brandIndex].shop

    var arr = []
    for (var i = 0; i < shops.length; i++) {
      var index = {
        padding: 0,
        value: '' + i,
        name: shops[i].name,
      }
      arr.push(index)
    }

    vm.setData({ shops: shops, arr: arr })
    console.log("品牌下所有店铺" + JSON.stringify(shops))
  },

  //获取店铺列表
  getShopList: function () {
    util.getShopList({}, function (res) {
      if (res.data.result) {
        var shopList = res.data.ret
        var arr = []
        for (var i = 0; i < shopList.length; i++) {
          var index = {
            padding: 0,
            value: '' + i,
            name: shopList[i].name,
          }
          arr.push(index)
        }
        console.log("店铺数组:" + JSON.stringify(arr))
        vm.setData({ shopList: res.data.ret, arr: arr })
      }
    })
  },

  //单选
  handleZanSelectChange({ componentId, value }) {
    this.setData({
      value: value
    });
    vm.getCurrentPages(value)
    // console.log("---" + JSON.stringify(value))
  },

  //获取上一个页面
  getCurrentPages: function (value) {
    var pages = getCurrentPages();//获取当前页面信息栈
    var prevPage = pages[pages.length - 2]//获取上一个页面信息栈
    prevPage.setData({ shop_id: vm.data.shops[value].id, shop: vm.data.shops[value].name })
    // console.log("一条交易信息" + JSON.stringify(deal))
  },

  //weui多选
  checkboxChange: function (e) {
    console.log('携带value值为：', JSON.stringify(e.detail.value));

    var arr = this.data.arr, values = e.detail.value;
    for (var i = 0, lenI = arr.length; i < lenI; ++i) {
      arr[i].checked = false;

      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (arr[i].value == values[j]) {
          arr[i].checked = true;
          break;
        }
      }
    }
    this.setData({
      arr: arr
    });

    var pages = getCurrentPages();//获取当前页面信息栈
    var prevPage = pages[pages.length - 2]//获取上一个页面信息栈
    var shop_id = ""
    var shops = vm.data.shops
    for (var k = 0; k < values.length; k++) {
      shop_id = shop_id + shops[values[k]].id + ","
    }
    console.log("-------" + shop_id)
    prevPage.setData({ shop_id: shop_id, shop: "点击重新选择" })
  },

  //获取上一个页面的身份类型
  getStatusType: function () {
    var pages = getCurrentPages();//获取当前页面信息栈
    var prevPage = pages[pages.length - 2]//获取上一个页面信息栈
    var statusType = prevPage.data.statusIndex
    vm.setData({ statusType: statusType })
    console.log("身份类型：" + JSON.stringify(statusType))
  },

  //返回审核页面
  confirm: function () {
    if (vm.data.value === '') {
      util.showToast("请选择一个店铺")
    }
    wx.navigateBack({
      delta: 1
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