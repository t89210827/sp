//index.js
//获取应用实例
const app = getApp()
var vm = null

const util = require('../../utils/util.js')
const qiniuUploader = require('../../utils/qiniuUploader.js')
var qnToken = ''
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

    brands: ["DW", "千叶", "中国黄金"],
    brandIndex: 0,

    files: [],            //头像预览数组
    image: "",            //头像地址

    status: ["店员", "店长", "主管"],
    statusIndex: 0,
    shopList: [],         //店铺列表
    shopIndex: 0,         //选中店铺索引
    name: '',             //用户输入的名字
    phone: '',            //用户输入的电话
    date: "2016-09-01",   //入职时间
  },

  // 身份选择
  bindstatus: function (e) {
    console.log('身份选择 发生选择改变，携带值为', e.detail.value);

    this.setData({
      statusIndex: e.detail.value
    })
  },

  test: function (e) {
    console.log("---" + JSON.stringify(e))
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
        console.log("tempFilePaths:" + JSON.stringify(tempFilePaths))
        //获取七牛上传token
        util.getQiniuToken({}, function (res) {
          console.log(JSON.stringify(res));
          if (res.data.result) {
            qnToken = res.data.ret;
            console.log("qiniu upload token:" + qnToken)
            initQiniu();
            //获取token成功后上传图片
            for (var i = 0; i < tempFilePaths.length; i++) {
              var tempFilePath = tempFilePaths[i]
              qiniuUploader.upload(tempFilePath, (res) => {
                console.log("qiniuUploader upload res:" + JSON.stringify(res));
                var picture = util.getImgRealUrl(res.key)
                console.log("---" + JSON.stringify(picture))
                vm.setData({
                  image: picture
                })
              }, (error) => {
                console.error('error: ' + JSON.stringify(error));
              })
            }
          }
        }, null);
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
  //输入名字
  inputName: function (e) {
    // console.log("---" + JSON.stringify(e))
    vm.setData({ name: e.detail.value })
  },
  //输入电话
  inputPhone: function (e) {
    console.log("---" + JSON.stringify(e))
    vm.setData({ phone: e.detail.value })
  },

  getShopList: function () {
    util.getShopList({}, function (res) {
      vm.setData({ shopList: res.data.ret })
    })
  },

  submit: function () {
    // wx.navigateTo({
    //   url: '/pages/hint/audit/audit',
    // })
    wx.redirectTo({
      url: '/pages/hint/audit/audit',
    })
  },

  //首页提交申请
  apply: function () {
    if (vm.data.image == "") {
      util.showToast("请上传头像")
      return
    }
    if (vm.data.name == "") {
      util.showToast("姓名不能为空")
      return
    }
    if (vm.data.phone == "") {
      util.showToast("电话号码不能为空")
      return
    }
    var param = {
      shop_id: vm.data.shopList[vm.data.shopIndex].id,         //店铺id
      type: vm.data.statusIndex,          //用户身份 0.店员 1店长 2主管   
      name: vm.data.name,                           //申请人真实姓名 
      phonenum: vm.data.phone,                        //申请人电话
      entryDate: vm.data.date,                     //申请人入职时间
      avatar: vm.data.image,                        //申请人头像
    }
    util.apply(param, function (res) {

      wx.redirectTo({
        url: '/pages/hint/audit/audit',
      })
    })
  },

  onLoad: function () {
    vm = this
    vm.getShopList()           //获取所有生效的店铺信息
  },
})
