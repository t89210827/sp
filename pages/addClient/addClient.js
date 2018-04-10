// pages/addClient/addClient.js
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
    status: ["店员", "店长", "主管"],
    statusIndex: 0,
    brands: ["DW", "千叶", "中国黄金"],
    brandIndex: 0,
    shop: ["中街店", "太原街店", "北行店"],
    shopIndex: 0,
    files: [],                             //头像预览数组

    image: "",                             //头像地址
    gender: "男",                          //用户性别
    name: "",                              //用户姓名
    age: '',                               //年龄
    phone: '',                             //电话
    city: '',                              //城市
    birthDate: "2016-09-01",               //生日
    date: "2016-09-01",                    //接待时间

  },

  //返回上一层
  back: function () {
    wx.navigateBack({
      delta: 1
    })
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
  // bindDateChange: function (e) {
  //   this.setData({
  //     date: e.detail.value
  //   })
  // },
  //生日
  bindBirthDate: function (e) {
    this.setData({
      birthDate: e.detail.value
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
        // that.setData({
        //   image: tempFilePaths,
        //   files: that.data.files.concat(res.tempFilePaths)
        // });

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
                // console.log("---" + JSON.stringify(picture))
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

  submit: function () {
    // wx.navigateTo({
    //   url: '/pages/hint/audit/audit',
    // })
    wx.redirectTo({
      url: '/pages/hint/audit/audit',
    })
  },

  //选择性别
  open: function () {
    var gender = ['男', '女']
    wx.showActionSheet({
      itemList: ['男', '女'],
      success: function (res) {
        // console.log("11111" + JSON.stringify(res))
        if (!res.cancel) {
          console.log(res.tapIndex)
          vm.setData({
            gender: gender[res.tapIndex]
            // 'userInfo.gender': res.tapIndex + 1
          })
          // console.log("11111" + JSON.stringify(vm.data.userInfo.gender))
        }
      }
    });
  },

  //输入名字
  inputName: function (e) {
    console.log("---" + JSON.stringify(e))
    vm.setData({ name: e.detail.value })
  },

  //输入年龄
  inputAge: function (e) {
    console.log("---" + JSON.stringify(e))
    vm.setData({ age: e.detail.value })
  },

  //输入电话
  inputPhone: function (e) {
    console.log("---" + JSON.stringify(e))
    vm.setData({ phone: e.detail.value })
  },

  //输入城市
  inputCity: function (e) {
    console.log("---" + JSON.stringify(e))
    vm.setData({ city: e.detail.value })
  },

  //添加顾客信息
  addClient: function () {
    if (vm.data.name == "") {
      util.showToast("姓名不能为空")
      return
    }
    if (vm.data.image == "") {
      util.showToast("请上传头像")
      return
    }
    if (vm.data.age == "") {
      util.showToast("年龄不能为空")
      return
    }
    if (vm.data.phone == "") {
      util.showToast("电话不能为空")
      return
    }
    if (vm.data.city == "") {
      util.showToast("客户所在城市不能为空")
      return
    }

    var day = util.getToday()
    // console.log("---" + JSON.stringify(day))
    var param = {
      name: vm.data.name,
      tel: vm.data.phone,
      birthday: vm.data.birthDate,
      city: vm.data.city,
      gender: vm.data.gender,
      age: vm.data.age,
      avatar: vm.data.image,
      reception_time: day,
    }
    util.addClient(param, function (res) {
      wx.navigateTo({
        url: '/pages/hint/addClient/addClient',
      })
    })
  },

  onLoad: function () {
    vm = this
    var day = util.getToday()
    vm.setData({ day: day })

    var pages = getCurrentPages()
    // console.log("页面栈 ：" + JSON.stringify(pages))

    var prePage = pages[pages.length - 2]
    var phone = prePage.data.phone;
    vm.setData({ phone: phone })
    console.log("页面栈 ：" + JSON.stringify(phone))
    // wx.navigateBack({
    //   delta: 1
    // })
  },
})
