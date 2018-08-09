//app.js
const util = require('./utils/util.js')
var mta = require('./utils/mta_analysis.js')
var vm = null
var code = null
App({
  onLaunch: function() {
    //获取vm
    vm = this
    //获取用户缓存数据
    var userInfo = wx.getStorageSync("userInfo");
    console.log("local storage userInfo:" + JSON.stringify(userInfo));
    //如果没有缓存
    if (userInfo == null || userInfo == undefined || userInfo == "") {
      //调用登录接口
      wx.redirectTo({
        url: '/pages/start/start',
      })
      // vm.getOpenid()
      // vm.login(null);
    } else {
      vm.globalData.userInfo = wx.getStorageSync("userInfo");
      console.log("vm.globalData.userInfo:" + JSON.stringify(vm.globalData.userInfo));
    }

    mta.App.init({
      "appID": "500629271",
      "eventID": "500629286", // 高级功能-自定义事件统计ID，配置开通后在初始化处填写
    });



  },

  //获取openid
  getOpenid: function() {
    wx.login({
      success: function(res) {
        var code = res.code
        //获取用户openid
        util.getOpenId({
          code: code
        }, function(ret) {
          if (ret.data.result) {
            var openId = ret.data.ret.openid
            // var unionid = ret.data.ret.unionid
            // console.log('获取openId : ' + JSON.stringify(openId))
            vm.loginServer(openId)
          }
        })
      }
    })
  },


  // getUnionId: function () {
  //   wx.login({
  //     success: function (res) {
  //       var code = res.code
  //       wx.getUserInfo({
  //         success: function (res) {
  //           var param = {
  //             code: code,
  //             encryptedData: res.encryptedData,
  //             iv: res.iv
  //           }
  //           util.getUnionId(param, function (res) {
  //             if (res.data.result) {
  //               console.log("返回getUnionId" + JSON.stringify(res))
  //               var openId = res.data.ret.openId
  //               var unionId = res.data.ret.unionId

  //             }
  //           })
  //         }
  //       })
  //     }
  //   })
  // },

  // vm.getAuditByUserId()

  // loginServer 登陆
  loginServer: function(openId) {
    var param = {
      account_type: "xcx",
      xcx_openid: openId,
      // unionid: unionid
    }
    util.loginServer(param, function(res) {
      if (res.data.result) {
        var userInfo = res.data.ret
        vm.storeUserInfo(userInfo)
        // wx.redirectTo({
        //   url: '/pages/start/start',
        // })
      }
    })
  },

  //微信登录
  login: function(callBack) {
    //微信登录获取code
    wx.login({
      success: function(res) {
        console.log("wx.login:" + JSON.stringify(res))
        //成功获取code
        if (res.code) {
          var code = res.code
          console.log('login code is : ' + JSON.stringify(code))
          //获取用户信息
          wx.getUserInfo({
            success: function(res) {
              console.log('getUserInfo res is : ' + JSON.stringify(res))
              var userInfo = res.userInfo;
              var getOpenIdParam = {
                code: code,
                encryptedData: res.encryptedData,
                iv: res.iv
              }
              console.log('getOpenIdParam is : ' + JSON.stringify(getOpenIdParam))
              //获取用户uniond_id
              util.getUnionId(getOpenIdParam, function(ret) {
                console.log('getOpenId ret is : ' + JSON.stringify(ret))
                var msgObj = ret.data.ret;
                var param = {
                  xcx_openid: msgObj.openId,
                  unionid: msgObj.unionId,
                  account_type: "xcx",
                  nick_name: userInfo.nickName,
                  avatar: userInfo.avatarUrl,
                  gender: userInfo.gender,
                  province: userInfo.province,
                  city: userInfo.city
                }
                console.log('param is : ' + JSON.stringify(param))
                //进行服务器的登录操作
                util.loginServer(param, function(ret) {
                  console.log("loginServer:" + JSON.stringify(ret));
                  //如果后台存在该用户数据，则代表已经注册，在本地建立缓存，下次无需二次登录校验
                  if (ret.data.code == "200" && ret.data.result == true) {
                    vm.storeUserInfo(ret.data.ret)

                    var status = ret.data.ret.status
                    // console.log("哈哈哈哈:" + JSON.stringify(status));
                    if (status == 0) {

                      wx.redirectTo({
                        url: '/pages/dimission/dimission',
                      })

                    } else if (status == 1) {
                      vm.getAuditByUserId() //根据user_id获取员工入职信息
                    }

                  } else {
                    //进行客户注册
                    util.showToast(ret.data.message);
                  }
                }, null);

              }, function(err) {
                console.log('getUnionId err is : ' + JSON.stringify(err))
              })
            },
            fail: function(res) {
              console.log('getUserInfo fail res is:' + JSON.stringify(res));
              vm.showModal();
            }
          })
        }
      }
    })
  },

  //监听小程序打开
  onShow: function() {

  },

  //进行本地缓存
  storeUserInfo: function(obj) {
    console.log("storeUserInfo :" + JSON.stringify(obj));
    wx.setStorage({
      key: "userInfo",
      data: obj
    });
    vm.globalData.userInfo = obj;
  },
  getUserInfo: function(cb) {
    typeof cb == "function" && cb(vm.globalData.userInfo)
  },
  getSystemInfo: function(cb) {
    if (vm.globalData.systemInfo) {
      typeof cb == "function" && cb(vm.globalData.systemInfo)
    } else {
      wx.getSystemInfo({
        success: function(res) {
          vm.globalData.systemInfo = res
          typeof cb == "function" && cb(vm.globalData.systemInfo)
        }
      })
    }
  },

  //引导用户授权
  showModal: function() {
    wx.showModal({
      title: '提示',
      content: '若不授权获取用户信息，饰品的部分重要功能将无法使用；请点击【重新授权】——选中【用户信息】方可使用。',
      showCancel: false,
      confirmText: "重新授权",
      success: function(res) {
        if (res.confirm) {
          vm.openSetting()
        }
      }
    })
  },

  //设置页面
  openSetting: function() {
    wx.openSetting({
      success: (res) => {
        console.log("Result" + JSON.stringify(res))
        if (!res.authSetting["scope.userInfo"]) {
          vm.showModal()
        } else {
          wx.getUserInfo({
            success: function(res) {
              // vm.getAuditByUserId()
              vm.getUnionId()
            }
          })
          // vm.login();
        }
      }
    })
  },

  //根据user_id获取员工入职信息
  getAuditByUserId: function() {
    util.getAuditByUserId({}, function(res) {
      if (res.data.result) {
        var position = res.data.ret
        vm.goToIndex(position)
      }
    })
  },

  goToIndex: function(position) {
    // var position = vm.data.position
    if (position.length == 0) {
      wx.redirectTo({
        url: '/pages/index/index',
      })
      return
    }
    var status = position[0].status
    var type = position[0].type

    console.log("------" + status)
    if (status == 1 && type == 1) {
      wx.redirectTo({
        url: '/pages/staff/staff',
      })
      return
      console.log("员工首页")
    } else if (status == 2 && type == 2) {
      wx.redirectTo({
        url: '/pages/shopManager/index/index',
      })
    } else if (status == 2 && type == 3) {
      wx.redirectTo({
        url: '/pages/manager/index/index',
      })
    } else {
      wx.navigateTo({
        url: '/pages/hint/audit/audit',
      })
      // util.showToast('用户身份不确定')
    }
  },

  //全局变量
  globalData: {
    userInfo: null,
    systemInfo: null,
  }
})