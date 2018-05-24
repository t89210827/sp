// pages/indexSelectShops/indexSelectShops.js
var vm = null
var util = require('../../utils/util.js')
Page({
  data: {

  },

  onClick: function (e) {
    console.log(`ComponentId:${e.detail.componentId},you selected:${e.detail.key}`);
  },

  onLoad: function (options) {
    vm = this
    vm.getBrandShops()           //获取所有品牌的对应店铺信息
  },
  //获取所有品牌的对应店铺信息
  getBrandShops: function () {
    util.getBrandShops({}, function (res) {
      if (res.data.result) {
        var brandShops = res.data.ret

        for (var index in brandShops) {
          var shops = brandShops[index].shop
          var arr = []
          for (var i = 0; i < shops.length; i++) {
            var shopsIndex = {
              padding: 0,
              value: shops[i].id,
              name: shops[i].name,
            }
            arr.push(shopsIndex)
          }
          brandShops[index].check = true
          brandShops[index].arr = arr
        }
        console.log("获取所有品牌的对应店铺信息" + JSON.stringify(brandShops))
        vm.setData({ brandShops: brandShops })
      }
    })
  },

  //品牌展开与收取
  targetSwitch: function (e) {
    console.log("获取所有品牌的对应店铺信息" + JSON.stringify(e))
    var index = e.currentTarget.id     //品牌id    
    var brandShops = vm.data.brandShops
    brandShops[index].check = !brandShops[index].check
    vm.setData({ brandShops: brandShops })
  },

  //weui多选
  checkboxChange: function (e) {
    var index = e.currentTarget.id     //品牌id    

    console.log('携带value值为：', JSON.stringify(e.detail.value));
    var brandShops = vm.data.brandShops

    var arr = brandShops[index].arr,
      values = e.detail.value;
    for (var i = 0, lenI = arr.length; i < lenI; ++i) {
      arr[i].checked = false;

      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (arr[i].value == values[j]) {
          arr[i].checked = true;
          break;
        }
      }
    }
    // console.log('------', JSON.stringify(brandShops[index].arr));    
    this.setData({
      brandShops: brandShops
    });
  },

  //选择的店铺数组
  selectShops: function () {
    var shop_id = ""
    var shopsName = []
    var brandShops = vm.data.brandShops
    for (var index in brandShops) {
      var arr = brandShops[index].arr
      for (var i in arr) {
        if (arr[i].checked) {
          shop_id = shop_id + arr[i].value + ","
          shopsName.push(arr[i].name)
        }
      }
    }
    if (shop_id === "") {
      util.showToast("店铺不能为空")
      return
    }
    console.log("店铺名字数组" + JSON.stringify(shopsName))

    var pages = getCurrentPages();//获取当前页面信息栈
    var prevPage = pages[pages.length - 2]//获取上一个页面信息栈
    prevPage.setData({ shop_id: shop_id, shopsName: shopsName, shop: "点击重新选择" })
    vm.back()
  },

  //获取上一个页面顾客数据
  getUppage: function (shop_id, ) {

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