// pages/manager/index/index.js
var vm = null
var util = require('../../../utils/util.js')
Page({
  data: {
    userInfo: {},
    beginDate: "",
    endDate: "",

    options: ["今日目标", "关键信息", "次要信息"],
    optionsIndex: 0,

    target: true,
    key: true,
    minor: true,

    shopName: "点击选择店铺",       //店铺名字
    staffName: "点击选择员工",       //店铺名字
    shop_id: null,                 //选择的店铺id
  },

  onLoad: function (options) {
    vm = this
    var today = util.getToday()
    var getTodayAddOne = util.getTodayAddOne()
    vm.setData({ beginDate: today, endDate: getTodayAddOne })
    var getTodayAddOne = util.getTodayAddOne()
    vm.getUserInfo()

    vm.getShop()        //主管下的店铺列表
  },

  //查询
  confirm: function () {
    vm.getManagerIndexKeyMessage()        //主要
    vm.getManagerIndexMinorMessage()      //相关
  },

  //主管下的店铺列表
  getShop: function () {
    var param = {
      manager_id: getApp().globalData.userInfo.id,
      page: 1,
    }
    util.getShop(param, function (res) {
      var shops = res.data.ret.shop.data
      vm.setData({
        shop_id: shops[0].id,
        shopName: shops[0].name
      })

      var shopNames = []
      for (var i = 0; i < shops.length; i++) {
        shopNames.push(shops[i].name)
      }
      console.log("店铺列表" + JSON.stringify(shopNames))
      vm.setData({ shopNames: shopNames, shops: shops })

      vm.getAuditListByShopId()
      vm.getManagerIndexKeyMessage()        //主要
      vm.getManagerIndexMinorMessage()      //相关
      vm.getManagerIndexBoutiqueDailyMessage()    //竞品
    })
  },

  // 根据shop_id获取员工列表
  getAuditListByShopId: function () {
    var param = {
      shop_id: vm.data.shop_id
    }
    util.getAuditListByShopId(param, function (res) {
      if (res.data.result) {
        var staffList = res.data.ret.userRole.data
        var staffNameList = []
        for (var i = 0; i < staffList.length; i++) {
          staffNameList.push(staffList[i].user.name)
        }
        console.log("员工列表" + JSON.stringify(staffList))
        vm.setData({ staffList: staffList, staffNameList: staffNameList })
      }
    })
  },

  //选择员工
  staffNames: function () {
    if (vm.data.shopName == "点击选择店铺") {
      util.showToast("请先选择店铺")
      return
    }
    wx.showActionSheet({
      itemList: vm.data.staffNameList,
      success: function (res) {
        if (!res.cancel) {
          vm.setData({
            staff_id: vm.data.staffList[res.tapIndex].id,
            staffName: vm.data.staffNameList[res.tapIndex]
          })
          console.log("员工" + JSON.stringify(vm.data.staffName))
        }
      }
    });
  },

  //选择店铺
  shopNames: function () {
    wx.showActionSheet({
      itemList: vm.data.shopNames,
      success: function (res) {
        if (!res.cancel) {
          vm.setData({
            shop_id: vm.data.shops[res.tapIndex].id,
            shopName: vm.data.shopNames[res.tapIndex]
          })
          vm.getAuditListByShopId()
          console.log("店铺" + JSON.stringify(vm.data.shopName))
        }
      }
    });
  },

  //主管首页竞品信息
  getManagerIndexBoutiqueDailyMessage: function () {
    var param = {
      user_id: getApp().globalData.userInfo.id,
      shop_id: vm.data.shop_id,
      start_time: vm.data.beginDate,
      end_time: vm.data.endDate,
    }
    util.getManagerIndexBoutiqueDailyMessage(param, function (res) {
      if (res.data.result) {
        console.log("竞品列表" + JSON.stringify(res))
        var boutique = res.data.ret[0].boutiqueDaily

        for (var i = 0; i < boutique.length; i++) {
          console.log("-----------" + JSON.stringify(boutique[i]))
        }
        vm.setData({ boutique: boutique })
      }
    })
  },

  //主管首页关键信息
  getManagerIndexKeyMessage: function () {
    console.log("店铺id" + JSON.stringify(vm.data.shop_id))
    var param = {
      user_id: getApp().globalData.userInfo.id,
      shop_id: vm.data.shop_id,
      start_time: vm.data.beginDate,
      end_time: vm.data.endDate,
    }
    util.getManagerIndexKeyMessage(param, function (res) {
      if (res.data.result) {
        var main = res.data.ret
        vm.setData({ main: main })
      }
    })
  },

  //主管首页相关信息
  getManagerIndexMinorMessage: function () {
    var param = {
      user_id: getApp().globalData.userInfo.id,
      shop_id: vm.data.shop_id,
      start_time: vm.data.beginDate,
      end_time: vm.data.endDate,
    }
    util.getManagerIndexMinorMessage(param, function (res) {
      if (res.data.result) {
        var minorMessage = res.data.ret
        vm.setData({ minorMessage: minorMessage })
      }
    })
  },

  //今日目标展开与收取
  targetSwitch: function () {
    vm.setData({ target: !vm.data.target })
  },

  //关键信息展开与收取
  KeySwitch: function () {
    vm.setData({ key: !vm.data.key })
  },

  //次要信息展开与收取
  minorSwitch: function () {
    vm.setData({ minor: !vm.data.minor })
  },

  //根据id获取用户信息（不带token）
  getByIdWithToken: function () {
    var param = {
      id: getApp().globalData.userInfo.id
    }
    util.getByIdWithToken(param, function (res) {
      var userInfo = res.data.ret
      vm.setData({ userInfo: userInfo })
    })
  },

  //获取缓存中用户信息
  getUserInfo: function () {
    var userInfo = getApp().globalData.userInfo

    if (userInfo == null) {
      wx.login({
        success: function (res) {
          wx.getUserInfo({
            success: function (res) {
              console.log("---" + JSON.stringify(res))
              var userInfo = {
                name: res.userInfo.nickName,
                avatar: res.userInfo.avatarUrl
              }
              vm.setData({ userInfo: userInfo })
              wx.stopPullDownRefresh()    //停止下拉刷新
            }
          })
        }
      })
    } else {
      vm.getByIdWithToken()
      // vm.setData({ userInfo: userInfo })
      wx.stopPullDownRefresh()    //停止下拉刷新
    }
    console.log("userInfo : " + JSON.stringify(userInfo))
  },


  //跳转到店员排名页面
  jumpRanking: function () {
    wx.navigateTo({
      url: '/pages/ranking/shop/shop',
    })
  },
  //跳转到添加客户页面
  jumpAddClient: function () {
    // wx.navigateTo({
    //   url: '/pages/addClient/addClient',
    // })
    wx.navigateTo({
      url: '/pages/queryClient/queryClient',
    })
  },
  //跳转到店员客户信息页面
  jumpStaffList: function () {
    wx.navigateTo({
      url: '/pages/manager/shopClientList/shopClientList',
    })
  },
  //跳转到提交日报页面
  jumpIssueList: function () {
    wx.navigateTo({
      url: '/pages/manager/issueTask/issueTask',
    })
  },
  //跳转到审批任务页面
  jumpAudit: function (e) {
    // console.log("---1111" + JSON.stringify())
    wx.navigateTo({
      url: '/pages/manager/auditList/auditList',
    })
  },
  //跳转到交易列表页面
  jumpDealList: function () {
    wx.navigateTo({
      url: '/pages/dealList/dealList',
    })
  },
  //开始时间
  bindBeginDate: function (e) {
    this.setData({
      beginDate: e.detail.value
    })
  },
  //结束时间
  bindEndDate: function (e) {
    this.setData({
      endDate: e.detail.value
    })
  },
  // 选项选择
  bindOption: function (e) {
    console.log('选项选择 发生选择改变，携带值为', e.detail.value);
    this.setData({
      optionsIndex: e.detail.value
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
    vm.getUserInfo()
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