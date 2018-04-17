// pages/addDeal/addDeal.js
var vm = null
var util = require('../../utils/util.js')

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
    image: '',       //头像
    num: 1,         //产品数量
    remark: '',      //备注
    isBuy: false,     //是否购买
    isReservation: false,    //是否交定金
    date: '2018-04-10',      //提醒时间

    gender: "男",         //性别
    birthDate: "2016-09-01",               //生日
    date: "2016-09-01",                    //接待时间
    productType: "黄铂",          //产品类型
  },

  //添加顾客信息
  addClient: function () {
    wx.navigateTo({
      url: '/pages/hint/addClient/addClient',
    })

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

  //提醒时间
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },

  //生日
  bindBirthDate: function (e) {
    this.setData({
      birthDate: e.detail.value
    })
  },

  //返回上一层
  back: function () {
    wx.navigateBack({
      delta: 1
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

  //选择产品类型
  productType: function () {
    var productType = ['黄铂', '非黄铂', '其他']
    wx.showActionSheet({
      itemList: ['黄铂', '非黄铂', '其他'],
      success: function (res) {
        // console.log("11111" + JSON.stringify(res))
        if (!res.cancel) {
          console.log(res.tapIndex)
          vm.setData({
            productType: productType[res.tapIndex]
            // 'userInfo.gender': res.tapIndex + 1
          })
          // console.log("11111" + JSON.stringify(vm.data.userInfo.gender))
        }
      }
    });
  },

  onChangeNumber(e) {
    var num = e.detail.number
    vm.setData({ num: num })
  },

  textAreaEventListener: function (e) {
    // console.log("55555" + JSON.stringify(e.detail.value))
    vm.setData({
      remark: e.detail.value,
    })
  },

  switchBuy: function (e) {
    // console.log('携带值为', e.detail.value)
    vm.setData({ isBuy: e.detail.value })
  },
  switchReservation: function (e) {
    // console.log('携带值为', e.detail.value)
    vm.setData({ isReservation: e.detail.value })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    vm = this
    var day = util.getToday()
    vm.setData({ day: day })
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