// pages/shopManager/shopList/shopList.js
var vm = null
var util = require('../../../utils/util.js')
var Zan = require('../../../bower_components/zanui-weapp/dist/index');

Page(Object.assign({}, Zan.Select, Zan.TopTips, {

  data: {
    value: '',                //zanui高亮显示值
    activeColor: '#4b0',

    statusType: '',      //用户选择的类型
  },
  onLoad: function (options) {
    vm = this
    var audit_id = options.audit_id
    vm.setData({ audit_id: audit_id })

    vm.getShopList()        //店铺列表
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
    var shopList = vm.data.shopList
    var shop_id = shopList[value].id
    this.setData({
      value: value,
      shop_id: shop_id
    });
    // console.log("---" + JSON.stringify(value))
  },

  //返回审核页面
  confirm: function () {
    if (vm.data.value === '') {
      util.showToast("请选择一个店铺")
    }

    var shopList = vm.data.shopList
    var value = vm.data.value
    var shop_name = shopList[value].name

    wx.showModal({
      title: '确认',
      content: '确定把该员工转移到' + shop_name,
      success: function (res) {
        if (res.confirm) {
          var param = {
            audit_id: vm.data.audit_id,
            shop_id: vm.data.shop_id
          }
          util.auditChangeShop(param, function (res) {
            if (res.data.result) {
              wx.navigateBack({
                delta: 1
              })
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
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