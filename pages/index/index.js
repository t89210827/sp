//index.js
//获取应用实例
const app = getApp()
const util = require('../../utils/util.js')
const qiniuUploader = require('../../utils/qiniuUploader.js')

// 初始化七牛相关参数
function initQiniu() {
  var options = {
    region: 'ECN', // 华东区
    uptoken: qnToken
  };
  console.log("initQiniu options:" + JSON.stringify(options))
  qiniuUploader.init(options);
}

Page({
  data: {
    status: ["店员", "店长", "主管"],
    statusIndex: 0,
    brands: ["DW", "千叶", "中国黄金"],
    brandIndex: 0,
    shop: ["中街店", "太原街店", "北行店"],
    shopIndex: 0,
    date: "2016-09-01",
    files: [],        //头像预览数组
    image: "",         //头像地址
  },

  // 身份选择
  bindstatus: function (e) {
    console.log('身份选择 发生选择改变，携带值为', e.detail.value);

    this.setData({
      statusIndex: e.detail.value
    })
  },
  // 品牌选择
  bindBrand: function (e) {
    console.log('品牌选择 发生选择改变，携带值为', e.detail.value);

    this.setData({
      brandIndex: e.detail.value
    })
  },
  // 店铺选择
  bindShop: function (e) {
    console.log('店铺选择 发生选择改变，携带值为', e.detail.value);

    this.setData({
      shopIndex: e.detail.value
    })
  },
  //入职时间
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  // 上传图片
  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片

        var tempFilePaths = res.tempFilePaths
        that.setData({
          image: tempFilePaths,
          files: that.data.files.concat(res.tempFilePaths)
        });
      }
    })
  },
  // 预览图片
  previewImage: function (e) {
    wx.previewImage({
      // current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },

  onLoad: function () {

  },
})
