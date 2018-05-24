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

    shopName: "全部店铺",         //店铺名字
    shopsIndex: 0,               //店铺索引
    brandName: "全部品牌",        //品牌名字
    brandIndex: 0,               //品牌索引
    staffList: [],               //员工数组
    NewstaffList: [],            //picker展示的员工数组
    staffIndex: 0,               //员工索引
    shop_id: "",                 //选择的店铺id

    audit_id: "",                 //员工id
    brand_id: "",                 //品牌id
  },

  onLoad: function (options) {
    vm = this
    var start_time = util.getToday()
    var end_time = util.getTodayAddOne()
    var shop_id = getApp().globalData.userInfo.shop_id
    vm.setData({ start_time: start_time, end_time: end_time, shop_id: shop_id })
    vm.init()             //首页数据初始化
    vm.indexRefresh()     //首页刷新
  },

  //跳转到修改资料页
  alterUserInfo: function () {
    wx.navigateTo({
      url: '/pages/alterUserInfo/alterUserInfo',
    })
  },

  //首页数据初始化
  init: function () {
    vm.getUserInfo()    //用户数据
    vm.getBrandList()   //全部品牌
    vm.getShop()        //主管下的店铺列表        
  },

  //首页刷新
  indexRefresh: function () {
    vm.getUserInfo()    //用户数据    
    vm.getManagerIndexData()                              //主管首页数据
    vm.getShop()        //主管下的店铺列表    
    // vm.getManagerIndexBoutiqueDailyMessage()              //竞品信息   
  },

  //主管首页数据
  getManagerIndexData: function () {
    var param = {
      start_time: vm.data.start_time,
      end_time: vm.data.end_time,
      shop_id: vm.data.shop_id,
      brand_id: vm.data.brand_id,
      audit_id: vm.data.audit_id,
    }
    util.getManagerIndexData(param, function (res) {
      if (res.data.result) {
        var indexData = res.data.ret
        console.log("主管首页数据 ==" + JSON.stringify(indexData))
        vm.setData({ indexData: indexData })
      }
    })
  },

  //开始时间
  bindBeginDate: function (e) {
    this.setData({
      start_time: e.detail.value
    })
  },
  //结束时间
  bindEndDate: function (e) {
    this.setData({
      end_time: e.detail.value
    })
  },

  //获取缓存中用户信息
  getUserInfo: function () {
    var userInfo = getApp().globalData.userInfo
    vm.setData({ userInfo: userInfo })
  },

  //查询
  confirm: function () {
    vm.indexRefresh()     //首页刷新

    // vm.getManagerIndexKeyMessage()              //主要
    // vm.getManagerIndexMinorMessage()            //相关
    // vm.getManagerIndexBoutiqueDailyMessage()    //竞品
  },

  //获取所有的生效品牌信息
  getBrandList: function () {
    util.getBrandList({}, function (res) {
      if (res.data.result) {
        var brandList = res.data.ret
        brandList.unshift({ "name": "全部品牌" })
        vm.setData({ brandList: brandList })
      }
    })
  },

  // 品牌选择
  brandNames: function (e) {
    var brandIndex = e.detail.value
    if (brandIndex == 0) {
      vm.setData({ brand_id: "" })
    } else {
      var brandList = vm.data.brandList
      vm.setData({ brand_id: brandList[brandIndex].id })
    }
    vm.setData({
      brandIndex: brandIndex
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
      shops.unshift({ "name": "全部店铺" })
      console.log("店铺列表" + JSON.stringify(shops))
      vm.setData({ shops: shops })
      // vm.indexRefresh()     //首页刷新
    })
  },

  // 店铺选择
  shopNames: function (e) {
    var shopsIndex = e.detail.value

    vm.setData({
      shopsIndex: shopsIndex,
      audit_id: ""              //无论选择什么店铺  staff_id都置为空
    })
    if (shopsIndex != 0) {
      var shops = vm.data.shops
      var shop_id = shops[shopsIndex].id
      console.log("店铺选择" + JSON.stringify(shops[shopsIndex]))

      vm.setData({ shop_id: shop_id, staffIndex: 0})
      vm.getAuditListByShopId()       // 根据shop_id获取员工列表
    } else {
      vm.setData({ NewstaffList: [], staffIndex: 0, shop_id: getApp().globalData.userInfo.shop_id })
    }
  },

  // 根据shop_id获取员工列表
  getAuditListByShopId: function () {
    var shops = vm.data.shops
    var shopsIndex = vm.data.shopsIndex
    var shop_id = vm.data.shops[shopsIndex].id
    var param = {
      shop_id: shop_id
    }
    util.getAuditListByShopId(param, function (res) {
      if (res.data.result) {
        var staffList = res.data.ret.userRole.data
        if (staffList.length == 0) {
          vm.setData({ NewstaffList: [], staffIndex: 0 })
        } else {
          var NewstaffList = [{ "name": "全部员工" }]
          for (var index in staffList) {
            NewstaffList.push({ name: staffList[index].user.name })
          }
          console.log("员工列表" + JSON.stringify(NewstaffList))
          vm.setData({ staffList: staffList, NewstaffList: NewstaffList })
        }
      }
    })
  },

  // 员工选择
  selectStaff: function (e) {
    var staffList = vm.data.staffList
    var staffIndex = e.detail.value

    if (staffIndex != 0) {
      var audit_id = vm.data.staffList[staffIndex - 1].user.id
      vm.setData({ audit_id: audit_id })
    } else {
      vm.setData({ audit_id: "" })
    }


    vm.setData({
      staffIndex: staffIndex
    })
  },

  //提示先选择店铺
  showToastSelectShop: function () {
    util.showToast("请先选择有店员的店铺")
  },



  //主管首页竞品信息
  getManagerIndexBoutiqueDailyMessage: function () {
    var param = {
      user_id: getApp().globalData.userInfo.id,
      // shop_id: getApp().globalData.userInfo.shop_id,
      shop_id: vm.data.shop_id,
      start_time: vm.data.start_time,
      end_time: vm.data.end_time,
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
  //跳转到我的店铺
  jumpSelectShops: function () {
    wx.navigateTo({
      url: '/pages/selectShop/selectShop',
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