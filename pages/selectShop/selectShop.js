// pages/selectShop/selectShop.js
var vm = null
var util = require('../../utils/util.js')
Page({
  data: {
    favor: [], //用户喜好列表
    farmList: [], //农产品列表
    tabs: [{
        title: '选择店铺',
        content: '内容一'
      },
      {
        title: '我的店铺',
        content: '内容二'
      },
    ]
  },

  onClick: function(e) {
    console.log(`ComponentId:${e.detail.componentId},you selected:${e.detail.key}`);
  },

  checkChange: function(e) {
    console.log('radio发生change事件，携带value值为：', JSON.stringify(e))
    var checkArr = e.detail.value
    var index = e.currentTarget.dataset.goodsid //一级分类id
    var farmList = vm.data.farmList;
    console.log("一级菜单多选值：" + JSON.stringify(checkArr))
    // vm.setData({
    //   checkArr: checkArr
    // })
    var goods = farmList[index].goods
    for (var i = 0; i < goods.length; i++) {

      if (checkArr.indexOf(goods[i].id + "") != -1) {
        goods[i].checked = true;
      } else {
        goods[i].checked = false;
      }
    }
    vm.setData({
      farmList: farmList
    })
    // console.log("喜好数据" + JSON.stringify(farmList))
  },

  onLoad: function(options) {
    vm = this
    vm.getBrandShops() //获取所有品牌的对应店铺信息
    vm.getShop() //获取我的店铺
  },
  //获取所有品牌的对应店铺信息
  getBrandShops: function() {
    util.getBrandShops({}, function(res) {
      if (res.data.result) {
        var brandShops = res.data.ret

        for (var index in brandShops) {
          var shops = brandShops[index].shop
          var arr = []
          for (var i = 0; i < shops.length; i++) {
            var shopsIndex = {
              padding: 0,
              value: shops[i].id,
              name: shops[i].name,
            }
            arr.push(shopsIndex)
          }
          brandShops[index].check = true
          brandShops[index].arr = arr
        }
        console.log("获取所有品牌的对应店铺信息" + JSON.stringify(brandShops))
        vm.setData({
          brandShops: brandShops
        })
      }
    })
  },

  //品牌展开与收取
  targetSwitch: function(e) {
    console.log("获取所有品牌的对应店铺信息" + JSON.stringify(e))
    var index = e.currentTarget.id //品牌id    
    var brandShops = vm.data.brandShops
    brandShops[index].check = !brandShops[index].check
    vm.setData({
      brandShops: brandShops
    })
  },

  //weui多选
  checkboxChange: function(e) {
    var index = e.currentTarget.id //品牌id    

    console.log('携带value值为：', JSON.stringify(e.detail.value));
    var brandShops = vm.data.brandShops

    var arr = brandShops[index].arr,
      values = e.detail.value;
    for (var i = 0, lenI = arr.length; i < lenI; ++i) {
      arr[i].checked = false;

      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (arr[i].value == values[j]) {
          arr[i].checked = true;
          break;
        }
      }
    }
    // console.log('------', JSON.stringify(brandShops[index].arr));    
    this.setData({
      brandShops: brandShops
    });
  },

  //获取我的店铺
  getShop: function() {
    var param = {
      manager_id: getApp().globalData.userInfo.id,
      page: 1,
    }
    util.getShop(param, function(res) {
      // var shops = res.data.ret.shop.data
      var shops = res.data.ret.shop
      console.log("获取我的店铺" + JSON.stringify(shops))
      vm.setData({
        shops: shops
      })
    })
  },

  //选择的店铺数组
  selectShops: function() {
    var shop_id = ""
    var brandShops = vm.data.brandShops
    for (var index in brandShops) {
      var arr = brandShops[index].arr
      for (var i in arr) {
        if (arr[i].checked) {
          shop_id = shop_id + arr[i].value + ","
        }
      }
    }
    if (shop_id === "") {
      util.showToast("店铺不能为空")
      return
    }
    vm.managerUpdateShop(shop_id)
    // console.log("店铺数组" + JSON.stringify(shop_id))
  },

  managerUpdateShop: function(shop_id) {

    wx.showModal({
      title: '提示',
      content: '若更换店铺则小程序暂不可使用,需要后台审核之后才可使用。',
      confirmText: "确定",
      success: function(res) {
        if (res.confirm) {
          var param = {
            manager_id: getApp().globalData.userInfo.id,
            shop_id: shop_id
          }
          util.managerUpdateShop(param, function(res) {
            if (res.data.result) {
              var userInfo = res.data.ret.user
              getApp().storeUserInfo(userInfo)
              console.log("设置成功 " + JSON.stringify(userInfo))
              vm.showToast()
              vm.getShop()
              wx.navigateTo({
                url: '/pages/hint/audit/audit',
              })
            }
          })
        }
      }
    })

  },

  //返回上一层
  back: function() {
    wx.navigateBack({
      delta: 1
    })
  },

  //发布成功提示
  showToast() {
    vm.setData({
      toast: {
        show: true
      }
    })
    setTimeout(() => {
      vm.setData({
        toast: {
          show: false
        }
      })
    }, 1500)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})