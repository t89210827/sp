// pages/alterUserInfo/alterUserInfo.js
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
    userInfo: {},
  },

  onLoad: function (options) {
    vm = this
    var userInfo = getApp().globalData.userInfo
    vm.setData({ userInfo: userInfo })
  },

  alterAvatar: function (e) {
    // 上传图片
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        console.log("tempFilePaths:" + JSON.stringify(tempFilePaths))
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
                console.log("---" + JSON.stringify(picture))
                vm.setData({
                  'userInfo.avatar': picture
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

  //输入姓名
  inputName: function (e) {
    console.log('输入姓名' + JSON.stringify(e))
    var name = e.detail.value
    vm.setData({
      'userInfo.name': name
    })
  },

  updateById: function () {
    var userInfo = vm.data.userInfo
    var param = {
      user_id: userInfo.user_id,
      avatar: userInfo.avatar,
      name: userInfo.name,
    }
    util.updateById(param, function (res) {
      if (res.data.result) {
        var userInfo = res.data.ret
        console.log('修改返回' + JSON.stringify(userInfo))
        getApp().storeUserInfo(userInfo)
      }
    })
    vm.back()
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