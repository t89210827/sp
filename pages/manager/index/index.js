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

    shopName: "全部店铺",       //店铺名字
    brandName: "全部品牌",       //品牌名字
    staffName: "全部员工",        //员工名字
    shop_id: null,                 //选择的店铺id
  },

  onLoad: function (options) {
    vm = this
    var today = util.getToday()
    var getTodayAddOne = util.getTodayAddOne()
    var shop_id = getApp().globalData.userInfo.shop_id
    vm.setData({ beginDate: today, endDate: getTodayAddOne, shop_id: shop_id })
    vm.getUserInfo()
    vm.getShop()        //主管下的店铺列表
    vm.getBrandList()   //全部品牌

    vm.indexRefresh()     //首页刷新
  },

  //获取缓存中用户信息
  getUserInfo: function () {
    var userInfo = getApp().globalData.userInfo
    vm.setData({ userInfo: userInfo })
  },

  //查询
  confirm: function () {
    vm.getManagerIndexKeyMessage()              //主要
    vm.getManagerIndexMinorMessage()            //相关
    vm.getManagerIndexBoutiqueDailyMessage()    //竞品
  },

  //获取所有的生效品牌信息
  getBrandList: function () {
    util.getBrandList({}, function (res) {
      if (res.data.result) {
        var brandList = res.data.ret
        var brandNames = []
        for (var i = 0; i < brandList.length; i++) {
          brandNames.push(brandList[i].name)
        }
        brandNames.push("全部品牌")
        vm.setData({ brandList: brandList, brandNames: brandNames })
      }
    })
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
        // shop_id: shops[0].id,
        // shopName: shops[0].name
      })

      var shopNames = []
      for (var i = 0; i < shops.length; i++) {
        shopNames.push(shops[i].name)
      }
      shopNames.push("全部店铺")

      console.log("店铺列表" + JSON.stringify(shopNames))
      vm.setData({ shopNames: shopNames, shops: shops })

      vm.getAuditListByShopId()             // 根据shop_id获取员工列表
      vm.indexRefresh()     //首页刷新
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
    if (vm.data.shopName == "全部店铺") {
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
    var shopNames = vm.data.shopNames
    var last = shopNames.length - 1

    wx.showActionSheet({
      itemList: shopNames,
      success: function (res) {
        if (!res.cancel) {
          if (last == res.tapIndex) {
            vm.setData({
              shop_id: getApp().globalData.userInfo.shop_id,
              shopName: shopNames[res.tapIndex],
              staffName: "全部员工"
            })
          } else {
            vm.setData({
              shop_id: vm.data.shops[res.tapIndex].id,
              shopName: shopNames[res.tapIndex]
            })
          }

          vm.getAuditListByShopId()
          console.log("店铺" + JSON.stringify(vm.data.shopName))
        }
      }
    });
  },

  //选择品牌
  brandNames: function () {
    var brandNames = vm.data.brandNames
    var last = brandNames.length - 1

    wx.showActionSheet({
      itemList: brandNames,
      success: function (res) {
        if (!res.cancel) {
          if (last == res.tapIndex) {
            vm.setData({
              brand_id: "",
              brandName: "全部品牌"
            })
          } else {
            vm.setData({
              brand_id: vm.data.brandList[res.tapIndex].id,
              brandName: vm.data.brandNames[res.tapIndex]
            })
          }
          // vm.getAuditListByShopId()
          console.log("店铺" + JSON.stringify(vm.data.brand_id))
        }
      }
    });
  },

  //首页刷新
  indexRefresh: function () {
    vm.getManagerIndexBoutiqueDailyMessage()               //竞品信息   
    vm.getManagerIndexKeyMessage()                       //主要信息
    vm.getManagerIndexMinorMessage()                    //次要信息
  },

  //主管首页竞品信息
  getManagerIndexBoutiqueDailyMessage: function () {
    var param = {
      user_id: getApp().globalData.userInfo.id,
      // shop_id: getApp().globalData.userInfo.shop_id,
      shop_id: vm.data.shop_id,
      start_time: vm.data.beginDate,
      end_time: vm.data.endDate,
    }
    util.getManagerIndexBoutiqueDailyMessage(param, function (res) {
      if (res.data.result) {
        console.log("竞品列表" + JSON.stringify(res))
        if (res.data.ret.length == 0) {
          var boutiqueList = res.data.ret
          vm.setData({ boutiqueList: boutiqueList })
          return
        }
        var boutique = res.data.ret[0].boutiqueDaily
        var boutiqueList = []
        for (var index in boutique) {
          boutiqueList.push(boutique[index])
        }
        console.log("-----------" + JSON.stringify(boutiqueList))
        vm.setData({ boutiqueList: boutiqueList })
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
    vm.indexRefresh()     //首页刷新
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