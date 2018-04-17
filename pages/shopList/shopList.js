// pages/shopList/shopList.js
var vm = null
var Zan = require('../../bower_components/zanui-weapp/dist/index');

Page(Object.assign({}, Zan.Select, Zan.TopTips, {

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      {
        padding: 0,
        value: '1',
        name: '店铺一',
      },
      {
        padding: 0,
        value: '2',
        name: '店铺二',
      },
      {
        padding: 0,
        value: '3',
        name: '店铺三',
      },
      {
        padding: 0,
        value: '4',
        name: '店铺四',
      },
      {
        padding: 0,
        value: '5',
        name: '店铺五',
      },
      {
        padding: 0,
        value: '6',
        name: '店铺六',
      },
    ],

    checked: {
      base: -1,
      color: -1,
      form: -1
    },

    activeColor: '#4b0',

    checkboxItems: [
      { name: '店铺一', value: '0', checked: true },
      { name: '店铺二', value: '1' }
    ],
    statusType: '',      //用户选择的类型
  },

  //单选
  handleZanSelectChange({ componentId, value }) {
    this.setData({
      [`checked.${componentId}`]: value
    });
  },

  //weui多选
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value);

    var checkboxItems = this.data.checkboxItems, values = e.detail.value;
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
      checkboxItems[i].checked = false;

      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (checkboxItems[i].value == values[j]) {
          checkboxItems[i].checked = true;
          break;
        }
      }
    }

    this.setData({
      checkboxItems: checkboxItems
    });
  },

  onLoad: function (options) {
    vm = this
    vm.getCurrentPages()
  },
  //获取上一个页面
  getCurrentPages: function () {
    var pages = getCurrentPages();//获取当前页面信息栈
    var prevPage = pages[pages.length - 2]//获取上一个页面信息栈
    var statusType = prevPage.data.statusIndex
    vm.setData({ statusType: statusType })
    console.log("身份类型：" + JSON.stringify(statusType))
  },
  //返回审核页面
  confirm: function () {
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