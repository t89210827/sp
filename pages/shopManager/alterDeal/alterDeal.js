// pages/shopManager/alterDeal/alterDeal.js
var vm = null
var util = require('../../../utils/util.js')
Page({
  data: {
    budget: ['0-10000', '10000-20000', '20000-50000', '50000以上']
  },

  onLoad: function(options) {
    vm = this
    vm.getCurrentPages()
    vm.getProductById()
  },

  updateDealById: function() {
    var deal = vm.data.deal
    if (deal.isbuy == 0) {
      if (deal.money == "") {
        util.showToast("购买金额不能为空")
        return
      }
      if (deal.num == "") {
        util.showToast("件数不能为空")
        return
      }
    }

    if (deal.isearnest == 0) {
      if (deal.isearnest_money == "" && deal.isearnest_money == null) {
        util.showToast("定金金额不能为空")
        return
      }
    }

    if (deal.product_id == 3) {
      if (deal.isbuy == 0) {
        if (deal.money < 70000) {
          util.showToast("大单销售金额必须超过70000")
          return
        }
      }
    }

    if (deal.product_id == 1) {
      if (deal.money > 70000) {
        if (deal.num < 3) {
          util.showToast("金额超过70000 件数必须大于2 单件超7万必须录入在大单销售里面")
          return
        }
      }
    }


    wx.showModal({
      title: '提交',
      content: '确定修改本条交易吗？',
      confirmText: "确定修改",
      success: function(res) {
        if (res.confirm) {
          var param = {
            deal_id: deal.id,
            "shop_id": getApp().globalData.userInfo.shop_id,
            "client_id": deal.client_id,
            "product_id": deal.product_id,
            "product_name": deal.product_name,
            "budget": deal.budget,
            "isbuy": deal.isbuy,
            "money": deal.money,
            "isearnest": deal.isearnest,
            "isearnest_money": deal.isearnest_money,
            "purpose": deal.purpose,
            "purpose_time": deal.purpose_time,
            "remark": deal.remark,
            "num": deal.num
          }
          util.deal_update(param, function(res) {
            if (res.data.result) {
              console.log("修改交易详情返回json" + JSON.stringify(res))
              var pages = getCurrentPages(); //获取当前页面信息栈
              var prevPage = pages[pages.length - 3] //获取上一个页面信息栈
              prevPage.getDealByClientId()
              wx.navigateBack({
                delta: 2
              })
            } else {
              util.showToast(res.data.message)
            }

          })

        }
      }
    })


  },

  //选择产品类型
  productType: function(e) {
    var productindex = e.currentTarget.dataset.productindex

    var deal = vm.data.deal //交易参数数组

    // console.log("11111" + JSON.stringify(itemList))
    wx.showActionSheet({
      itemList: ['非黄铂', '黄铂', '大单'],
      success: function(res) {
        if (!res.cancel) {
          console.log(res.tapIndex)
          deal.product_id = res.tapIndex + 1
          vm.setData({
            deal: deal,
          })
        }
      }
    });
  },

  //选择预算
  budget: function() {
    var deal = vm.data.deal //交易参数数组
    var budget = vm.data.budget
    wx.showActionSheet({
      itemList: budget,
      success: function(res) {
        if (!res.cancel) {
          deal.budget = budget[res.tapIndex]
          vm.setData({
            deal: deal
          })
        }
      }
    });
  },

  switchReservation: function(e) {
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
    vm.setData({
      isReservation: e.detail.value,
      dealData: dealData
    })
  },


  //是否购买
  switchBuy: function(e) {
    var isBuy = e.detail.value
    var deal = vm.data.deal
    // var productindex = e.currentTarget.dataset.productindex
    if (isBuy) {
      deal.isbuy = 0
    } else {
      deal.isbuy = 1
      // 如果为flase清空件数和购买金额
      deal.money = ""
      deal.num = ""
    }
    console.log("---" + JSON.stringify(deal))
    vm.setData({
      deal: deal
    })
  },

  //定金金额
  inputIsearnestMoney: function(e) {
    var productindex = e.currentTarget.dataset.productindex
    var deal = vm.data.deal
    deal.isearnest_money = e.detail.value
    vm.setData({
      deal: deal
    })
  },


  //获取上一个页面
  getCurrentPages: function() {
    var pages = getCurrentPages(); //获取当前页面信息栈
    var prevPage = pages[pages.length - 2] //获取上一个页面信息栈
    var deal = prevPage.data.deal
    vm.setData({
      deal: deal
    })
    console.log("一条交易信息" + JSON.stringify(deal))
  },

  //购买金额
  inputMoney: function(e) {
    var deal = vm.data.deal
    deal.money = e.detail.value
    vm.setData({
      deal: deal
    })
  },

  //件数
  inputNum: function(e) {
    var deal = vm.data.deal
    deal.num = e.detail.value
    vm.setData({
      deal: deal
    })
    console.log("---" + JSON.stringify(deal))
  },

  //备注
  textAreaEventListener: function(e) {
    var deal = vm.data.deal
    deal.remark = e.detail.value
    vm.setData({
      deal: deal
    })
    console.log("---" + JSON.stringify(deal))
  },


  //是否交定金
  switchReservation: function(e) {
    var isReservation = e.detail.value
    var deal = vm.data.deal
    if (isReservation) {
      deal.isearnest = 0
    } else {
      deal.isearnest = 1
      // 如果为flase清空定金
      deal.isearnest_money = ""
    }
    console.log("-----" + JSON.stringify(isReservation))
    vm.setData({
      deal: deal
    })
  },

  //提醒时间
  bindDateChange: function(e) {
    var deal = vm.data.deal
    deal.purpose_time = e.detail.value
    vm.setData({
      deal: deal
    })
    console.log("---" + JSON.stringify(deal))
  },

  //根据产品id获取产品信息
  getProductById: function() {
    var pages = getCurrentPages(); //获取当前页面信息栈
    var prevPage = pages[pages.length - 2] //获取上一个页面信息栈
    var product_id = prevPage.data.deal.product_id
    var param = {
      id: product_id
    }
    util.getProductById(param, function(res) {
      if (res.data.result) {
        var productName = res.data.ret.name
        vm.setData({
          productName: productName
        })
      }
    })
  },

  //返回上一层
  back: function() {
    wx.navigateBack({
      delta: 1
    })
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