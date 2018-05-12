// pages/staff/alterClient/alterClient.js
var vm = null
var util = require('../../../utils/util.js')

const qiniuUploader = require('../../../utils/qiniuUploader.js')
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
    // remark: '',              //备注
    // isBuy: false,            //是否购买
    // isReservation: false,    //是否交定金
    // date: '2018-04-10',      //提醒时间

    clientName: '',          //顾客姓名
    image: '',               //头像
    city: '',                //城市
    gender: "男",            //性别
    birthDate: "2016-09-01", //生日
    day: "",                 //接待时间

    num: 0,                  //产品数量
    productList: [],         //所有产品数组
    dealData: [],            //提交交易参数
    // productType: "黄铂",  //产品类型默认值

    productArr: [],         //产品类型默认值
  },

  onLoad: function (options) {
    vm = this
    var day = util.getToday()
    vm.getUppage()       //获取上一个页面顾客数据
  },

  //获取上一个页面顾客数据
  getUppage: function () {
    var pages = getCurrentPages();//获取当前页面信息栈
    var prevPage = pages[pages.length - 2]//获取上一个页面信息栈
    var clientDetail = prevPage.data.clientDetail
    vm.setData({ clientDetail: clientDetail })
    console.log("上一个页面顾客数据" + JSON.stringify(clientDetail))
  },

  // 更新顾客信息
  alterClient: function () {
    var day = util.getToday()
    var clientDetail = vm.data.clientDetail
    var param = {
      id: clientDetail.id,
      name: clientDetail.name,
      tel: clientDetail.tel,
      birthday: clientDetail.birthday,
      city: clientDetail.city,
      gender: clientDetail.gender,
      age: clientDetail.age,
      avatar: clientDetail.avatar,
      reception_time: clientDetail.reception_time,
      user_id: clientDetail.user_id
    }
    util.addClient(param, function (res) {
      if (res.data.result) {
        var pages = getCurrentPages();//获取当前页面信息栈
        var prevPage = pages[pages.length - 2]//获取上一个页面信息栈
        prevPage.setData({ clientDetail: clientDetail })
        prevPage.showToast("修改成功")
        vm.back()
      }
    })
  },

  // 添加顾客信息并添加交易信息
  addClient: function () {

    if (vm.data.clientDetail.name == "") {
      util.showToast("客户姓名不能为空")
      return
    }
    if (vm.data.clientDetail.city == "") {
      util.showToast("客户所在城市不能为空")
      return
    }
    wx.showModal({
      title: '确认',
      content: '确定修改吗？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          vm.alterClient()          //更新用户信息
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  //顾客姓名
  inputClientName: function (e) {
    var name = e.detail.value
    var clientDetail = vm.data.clientDetail
    clientDetail.name = name
    vm.setData({ clientDetail: clientDetail })
    console.log("顾客姓名" + JSON.stringify(name))
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
                  'clientDetail.avatar': picture
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
  gender: function () {
    var gender = ['男', '女']
    wx.showActionSheet({
      itemList: ['男', '女'],
      success: function (res) {
        if (!res.cancel) {
          vm.setData({
            'clientDetail.gender': gender[res.tapIndex]
          })
          console.log("顾客性别" + JSON.stringify(gender[res.tapIndex]))
        }
      }
    });
  },

  //顾客年龄
  inputAge: function (e) {
    vm.setData({
      'clientDetail.age': e.detail.value,
    })
    console.log("顾客年龄" + JSON.stringify(e.detail.value))
  },

  //顾客手机
  inputPhone: function (e) {
    vm.setData({
      'clientDetail.tel': e.detail.value,
    })
    console.log("顾客手机" + JSON.stringify(e.detail.value))
  },


  //生日
  bindBirthDate: function (e) {
    this.setData({
      'clientDetail.birthday': e.detail.value
    })
    console.log("顾客生日" + JSON.stringify(e.detail.value))
  },

  //顾客城市
  inputCity: function (e) {
    vm.setData({
      'clientDetail.city': e.detail.value,
    })
    console.log("顾客城市" + JSON.stringify(e.detail.value))
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