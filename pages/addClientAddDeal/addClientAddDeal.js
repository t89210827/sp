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
    image: '',               //头像
    num: 1,                  //产品数量
    remark: '',              //备注
    isBuy: false,            //是否购买
    isReservation: false,    //是否交定金
    date: '2018-04-10',      //提醒时间

    gender: "男",            //性别
    birthDate: "2016-09-01", //生日
    day: "",                 //接待时间

    productList: [],         //所有产品数组
    dealData: [],            //提交交易参数
    productType: "黄铂",     //产品类型
  },

  onLoad: function (options) {
    vm = this
    var day = util.getToday()
    vm.setData({ day: day })
    vm.getProductList()
    vm.init()
  },

  //初始化
  init: function () {
    var arr = []
    arr.push({
      "user_id": "",
      "shop_id": "",
      "client_id": "",
      "product_id": "",
      "product_name": "",
      "budget": "",
      "isbuy": "",
      "money": "",
      "isearnest": "",
      "isearnest_money": "",
      "purpose": "",
      "purpose_time": "2018-04-10",
      "remind_time": "",
      "remark": "",
      "num": ""
    })
    console.log("777" + JSON.stringify(arr))
    vm.setData({ dealData: arr })
  },

  //顾客姓名
  inputName: function (e) {
    // console.log("---" + JSON.stringify(e))
    var productindex = e.currentTarget.dataset.productindex
    var dealData = vm.data.dealData

    dealData[productindex].product_name = e.detail.value
    vm.setData({ dealData: dealData })
    console.log("---" + JSON.stringify(dealData))
    // vm.setData({
    //   name: e.detail.value,
    // })
  },

  //选择产品类型
  productType: function (e) {
    // console.log("00000" + JSON.stringify(e))
    var productindex = e.currentTarget.dataset.productindex

    var dealData = vm.data.dealData

    var productList = vm.data.productList
    var itemList = []
    for (var i = 0; i < productList.length; i++) {
      itemList.push(productList[i].name)
    }
    // console.log("11111" + JSON.stringify(itemList))
    wx.showActionSheet({
      itemList: itemList,
      success: function (res) {
        if (!res.cancel) {
          console.log(res.tapIndex)
          dealData[productindex].product_id = productList[res.tapIndex].id
          vm.setData({
            dealData: dealData,
            productType: itemList[res.tapIndex]
          })
          console.log("---" + JSON.stringify(dealData))
        }
      }
    });
  },

  switchBuy: function (e) {
    // console.log('携带值为', e.detail.value)
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

  //添加顾客信息
  addClient: function () {
    util.addClient(vm.data.dealData, function (res) {
      if (res.data.result) {
        // util.addDeal(param, function (res) {

        // })
      }
    })
  },


  //添加顾客信息
  // addClient: function () {
  //   wx.navigateTo({
  //     url: '/pages/hint/addClient/addClient',
  //   })

  //   if (vm.data.name == "") {
  //     util.showToast("姓名不能为空")
  //     return
  //   }
  //   if (vm.data.image == "") {
  //     util.showToast("请上传头像")
  //     return
  //   }
  //   if (vm.data.age == "") {
  //     util.showToast("年龄不能为空")
  //     return
  //   }
  //   if (vm.data.phone == "") {
  //     util.showToast("电话不能为空")
  //     return
  //   }
  //   if (vm.data.city == "") {
  //     util.showToast("客户所在城市不能为空")
  //     return
  //   }

  //   var day = util.getToday()
  //   var param = {
  //     name: vm.data.name,
  //     tel: vm.data.phone,
  //     birthday: vm.data.birthDate,
  //     city: vm.data.city,
  //     gender: vm.data.gender,
  //     age: vm.data.age,
  //     avatar: vm.data.image,
  //     reception_time: day,
  //   }
  //   util.addClient(param, function (res) {
  //     if (res.data.result) {
  //       var param = {
  //         dealData
  //       }
  //       util.addDeal(param, function (res) {

  //       })

  //       wx.navigateTo({
  //         url: '/pages/hint/addClient/addClient',
  //       })
  //     }
  //   })
  // },

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

  onChangeNumber(e) {
    var num = e.detail.number
    var arr = []
    for (var i = 0; i < num; i++) {
      arr.push({
        "user_id": "",
        "shop_id": "",
        "client_id": "",
        "product_id": "",
        "product_name": "",
        "budget": "",
        "isbuy": "",
        "money": "",
        "isearnest": "",
        "isearnest_money": "",
        "purpose": "",
        "purpose_time": "2018-04-10",
        "remind_time": "",
        "remark": "",
        "num": ""
      })
    }
    console.log("777" + JSON.stringify(arr))
    vm.setData({ num: num, dealData: arr })
  },

  //顾客年龄
  inputAge: function (e) {
    vm.setData({
      age: e.detail.value,
    })
  },

  //顾客电话
  inputPhone: function (e) {
    vm.setData({
      tel: e.detail.value,
    })
  },
  //顾客城市
  inputCity: function (e) {
    vm.setData({
      city: e.detail.value,
    })
  },

  // 添加客户和交易
  // addClient: function () {
  //   var param = {
  //     name: vm.data.name,
  //     avatar: vm.data.image,
  //     gender: vm.data.gender,
  //     age: vm.data.age,
  //     tel: vm.data.tel,
  //     birthday: vm.data.birthDate,
  //     city: vm.data.city,
  //     reception_time: vm.data.day
  //   }
  //   util.addClient(param, function (res) {
  //     if (res.data.result) {
  //       console.log("添加客户返回参数" + JSON.stringify(res))
  //       var param = {

  //       }
  //     }
  //   })
  // },

  //获取生效的产品信息
  getProductList: function () {
    var param = {
      page: 1
    }
    util.getProductList(param, function (res) {
      vm.setData({ productList: res.data.ret.data })
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