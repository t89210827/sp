//测试标识
var TESTMODE = false;
//服务器地址
var SERVER_URL = "https://waibao.isart.me";
var DEBUG_URL = "http://localhost/zyhc/public";
var SERVER_URL = (TESTMODE) ? DEBUG_URL : SERVER_URL;

//获取七牛URL，进行图片剪裁
function qiniuUrlTool(img_url, type) {
  if ((img_url == undefined || img_url == null) && type == "head_icon") {
    return "../../images/jiazai.png";
  }
  if (img_url == undefined || img_url == null) {
    return "";
  }
  var pos = img_url.indexOf("?");
  //alert(pos);
  if (pos != -1) {
    img_url = img_url.substr(0, pos);
  }
  var qn_img_url;
  switch (type) {
    case "farm_img":      //广告图片
      qn_img_url = img_url + "?imageView2/2/w/650/h/300/interlace/1";
      break;
  }
  return qn_img_url;
}

//////接口相关//////////////////////////////////////////
//进行接口调用的基本方法
function wxRequest(url, param, method, successCallback, errorCallback) {
  showLoading()
  console.log("wxRequest url:" + JSON.stringify(url) + " medhot:" + method + " param:" + JSON.stringify(param))
  if (!judgeIsAnyNullStr(getApp().globalData.userInfo)) {
    //user_id未设置
    if (judgeIsAnyNullStr(param.user_id)) {
      param.user_id = getApp().globalData.userInfo.id
    }
    param.token = getApp().globalData.userInfo.token
  }
  console.log("param：" + JSON.stringify(param))
  wx.request({
    url: url,
    data: param,
    header: { "content-Type": "application/json" },
    // header: { 'content-type': 'application/x-www-form-urlencoded' },
    method: method,
    success: function (ret) {
      console.log("ret:" + JSON.stringify(ret))
      successCallback(ret)
    },
    fail: function (err) {
      console.log("wxRequest fail:" + JSON.stringify(err))

    },
    complete: function () {
      hideLoading()
      wx.stopPullDownRefresh()    //停止下拉刷新      
    }
  });
}

/*以上    By XJ*/
//获取七牛token
function getQiniuToken(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/user/getQiniuToken', param, "GET", successCallback, errorCallback)
}

// http://localhost/waibaoSrv/public/api/sp/user/getXCXOpenId

//获取用户的OpenId
function getOpenId(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/sp/user/getXCXOpenId', param, "GET", successCallback, errorCallback)
}

// 获取用户UnionId
function getUnionId(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/user/getUnionId', param, "GET", successCallback, errorCallback)
}

//登录
function loginServer(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/sp/user/login', param, "POST", successCallback, errorCallback)
}

//注册
function register(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/user/register', param, "POST", successCallback, errorCallback)
}

//获取用户信息
function getByIdWithToken(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/user/getByIdWithToken', param, "GET", successCallback, errorCallback)

}


//首页提交申请接口
function apply(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/sp/audit/apply', param, "POST", successCallback, errorCallback)
}

//获取所有生效的店铺信息
function getShopList(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/sp/shop/getShopList', param, "GET", successCallback, errorCallback)
}

//获取所有生效的店铺信息
function addClient(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/sp/audit/addClient', param, "POST", successCallback, errorCallback)
}

//获取七牛token
function getQiniuToken(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/sp/user/getQiniuToken', param, "GET", successCallback, errorCallback)
}

//根据顾客电话查询顾客信息
function getClientByTel(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/sp/audit/getClientByTel', param, "POST", successCallback, errorCallback)
}

//获取所有顾客信息
function getClient(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/sp/audit/getClient', param, "GET", successCallback, errorCallback)
}

// 根据id获取顾客信息
function getClientById(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/sp/audit/getClientById', param, "GET", successCallback, errorCallback)
}

// 添加交易记录
function addDeal(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/sp/deal/addDeal', param, "POST", successCallback, errorCallback)
}

// 员工添加顾客信息
function addClient(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/sp/audit/addClient', param, "POST", successCallback, errorCallback)
}

// 根据用户id和顾客id查看交易记录信息
function getDeals(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/sp/deal/getDeals', param, "GET", successCallback, errorCallback)
}

// 店员客户维护搜索
function search(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/sp/audit/search', param, "POST", successCallback, errorCallback)
}

// 获取所有生效的店铺信息
function getShopList(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/sp/shop/getShopList', param, "GET", successCallback, errorCallback)
}

// 店长下的员工列表
function getAudit(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/sp/shopManager/getAudit', param, "GET", successCallback, errorCallback)
}

// 根据店长id查询员工信息及员工录入顾客数量（对应原型：查看员工录入客户数量）
function getAuditCount(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/sp/shopManager/getAuditCount', param, "GET", successCallback, errorCallback)
}

// 店长添加客流量
function addPassengerFlow(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/sp/shopManager/addPassengerFlow', param, "POST", successCallback, errorCallback)
}

// 店长审核入职人员
function reviewAudit(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/sp/shopManager/reviewAudit', param, "POST", successCallback, errorCallback)
}

// 根据店长shop_manager_id获取需要审核的员工列表
function getReviewAudit(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/sp/shopManager/getReviewAudit', param, "GET", successCallback, errorCallback)
}

// 日报——店长审核日报
function shopManagerReviewDailyPaper(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/sp/shopManager/shopManagerReviewDailyPaper', param, "POST", successCallback, errorCallback)
}

// 店长查看日报列表(对应原型审核日报)
function dailyList(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/sp/shopManager/dailyList', param, "GET", successCallback, errorCallback)
}

// 店长发任务
function shopManagerReleaseTask(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/sp/shopManager/shopManagerReleaseTask', param, "POST", successCallback, errorCallback)
}

// 根据员工id获取交易记录
function getDeal(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/sp/audit/getDeal', param, "GET", successCallback, errorCallback)
}

// 获取生效的产品信息
function getProductList(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/sp/product/getProductList', param, "GET", successCallback, errorCallback)
}

// 获取任务信息剩余目标金额
function getReleaseTask(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/sp/shopManager/getReleaseTask', param, "GET", successCallback, errorCallback)
}

// 根据店员id和时间查询日报信息
function getAuditDailyPaperData(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/sp/audit/getAuditDailyPaperData', param, "GET", successCallback, errorCallback)
}

// 主管审核入职人员
function managerReviewAudit(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/sp/manager/managerReviewAudit', param, "POST", successCallback, errorCallback)
}

// 根据主管id获取主管下未审核店长和店员的信息
function getShopManager(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/sp/manager/getShopManager', param, "GET", successCallback, errorCallback)
}

// 根据user_id获取员工入职信息
function getAuditByUserId(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/sp/audit/getAuditByUserId', param, "GET", successCallback, errorCallback)
}

// 主管下的店铺列表
function getShop(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/sp/manager/getShop', param, "GET", successCallback, errorCallback)
}

// 主管发布任务
function releaseTask(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/sp/manager/releaseTask', param, "POST", successCallback, errorCallback)
}

// 根据员工id获取客户信息
function getClientByUserId(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/sp/audit/getClientByUserId', param, "GET", successCallback, errorCallback)
}

// 根据顾客id获取所有交易记录
function getDealByClientId(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/sp/deal/getDealByClientId', param, "GET", successCallback, errorCallback)
}

// 主管查看发布任务
function getManagerTask(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/sp/manager/getManagerTask', param, "GET", successCallback, errorCallback)
}

// 根据产品id获取产品信息
function getProductById(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/sp/product/getProductById', param, "GET", successCallback, errorCallback)
}

// 获取所有生效的店铺信息
function getShopList(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/sp/shop/getShopList', param, "GET", successCallback, errorCallback)
}

// 根据id获取用户信息（不带token）
function getById(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/sp/user/getById', param, "GET", successCallback, errorCallback)
}

// 根据id获取用户信息（带token）
function getByIdWithToken(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/sp/user/getByIdWithToken', param, "GET", successCallback, errorCallback)
}

// 店长获取本月任务
function getShopManagerTask(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/sp/shopManager/getShopManagerTask', param, "GET", successCallback, errorCallback)
}

// 员工获取今日任务
function getAuditTask(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/sp/audit/getAuditTask', param, "GET", successCallback, errorCallback)
}

//查看员工是否提交过日报
function getAuditDailyPaper(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/sp/audit/getAuditDailyPaper', param, "GET", successCallback, errorCallback)
}

//员工提交日报
function addAuditDailyPaper(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/sp/audit/addAuditDailyPaper', param, "POST", successCallback, errorCallback)
}

//本店员工排名
function getAuditRanking(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/sp/audit/getAuditRanking', param, "GET", successCallback, errorCallback)
}

//添加订货信息
function addOrderGoods(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/sp/orderGoods/addOrderGoods', param, "POST", successCallback, errorCallback)
}

//获取生效的竞品信息
function getBoutique(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/sp/boutique/getBoutique', param, "GET", successCallback, errorCallback)
}

//提交竞品日报
function addBoutique(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/sp/shopManager/addBoutique', param, "POST", successCallback, errorCallback)
}

//店长查看日报信息
function getShopManagerDailyPaperData(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/sp/shopManager/getShopManagerDailyPaperData', param, "GET", successCallback, errorCallback)
}

//员工首页主要信息
function getAuditIndexKeyMessage(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/sp/audit/getAuditIndexKeyMessage', param, "GET", successCallback, errorCallback)
}

//根据日报店员clerk_id查看日报详情
function dailyPaper(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/sp/shopManager/dailyPaper', param, "GET", successCallback, errorCallback)
}

//员工首页次要信息
function getAuditIndexMinorMessage(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/sp/audit/getAuditIndexMinorMessage', param, "GET", successCallback, errorCallback)
}

//店长首页关键信息
function getShopManagerIndexKeyMessage(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/sp/shopManager/getShopManagerIndexKeyMessage', param, "GET", successCallback, errorCallback)
}

//店长首页次要信息
function getShopManagerIndexMinorMessage(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/sp/shopManager/getShopManagerIndexMinorMessage', param, "GET", successCallback, errorCallback)
}

//主管查看未审核的竞品日报
function getBoutiqueDaily(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/sp/manager/getBoutiqueDaily', param, "GET", successCallback, errorCallback)
}

//根据shop_id获取员工列表
function getAuditListByShopId(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/sp/audit/getAuditListByShopId', param, "GET", successCallback, errorCallback)
}

//主管审核竞品日报(审核全部)
function managerReviewBoutiqueDaily(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/sp/manager/managerReviewBoutiqueDaily', param, "POST", successCallback, errorCallback)
}

//店长提交日报
function addShopManagerDailyPaper(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/sp/shopManager/addShopManagerDailyPaper', param, "POST", successCallback, errorCallback)
}

//查询店长今日是否已提交过日报
function getShopManagerDailyPaper(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/sp/shopManager/getShopManagerDailyPaper', param, "GET", successCallback, errorCallback)
}

//主管首页关键信息
function getManagerIndexKeyMessage(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/sp/manager/getManagerIndexKeyMessage', param, "GET", successCallback, errorCallback)
}

//主管首页次要信息
function getManagerIndexMinorMessage(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/sp/manager/getManagerIndexMinorMessage', param, "GET", successCallback, errorCallback)
}

//主管查看未审核店长日报
function getUnauditedShopManagerDailyPaper(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/sp/manager/getUnauditedShopManagerDailyPaper', param, "GET", successCallback, errorCallback)
}

//员工转店
function auditChangeShop(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/sp/shopManager/auditChangeShop', param, "POST", successCallback, errorCallback)
}

//主管首页竞品信息
function getManagerIndexBoutiqueDailyMessage(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/sp/manager/getManagerIndexBoutiqueDailyMessage', param, "GET", successCallback, errorCallback)
}

//查询今天店长是否提交过竞品日报
function shopManagerGetBoutiqueDaily(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/sp/shopManager/getBoutiqueDaily', param, "GET", successCallback, errorCallback)
}

//主管审核日报
function managerReviewDailyPaper(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/api/sp/manager/managerReviewDailyPaper', param, "GET", successCallback, errorCallback)
}

//http://localhost/waibaoSrv/public/api/sp/manager/managerReviewDailyPaper
///////////////////////////////////////////////

function imageUtil(e) {

  return imageSize;
}

//小数点后两位百分比
function Percentage(number1, number2) {
  return (Math.round(number1 / number2 * 10000) / 100.00 + "%");// 小数点后两位百分比
}



//日期时间转换
/*
 * 将2017-11-08 10:57:11转换为11月8日 10:57
 *
 */
function convertDateFormateM(date_str) {

  var date_arr = date_str.split(' ');
  //consoledebug.log("data_arr:" + JSON.stringify(date_arr))
  // return convertDateFormate(date_arr[0], 1) + " " + date_arr[1].substring(0, 5);
  return convertDateFormate(date_arr[0], 2);
}

function date(date_str) {

  var date_arr = date_str.split(' ');
  //consoledebug.log("data_arr:" + JSON.stringify(date_arr))
  // return convertDateFormate(date_arr[0], 1) + " " + date_arr[1].substring(0, 5);
  return date_arr[0];
}

//日期形式转换
/*
 * 将2017-11-08
 *
 * 根据type不同转换成不同形式
 *
 * type == 1:2017-10-30转换为10月30日
 *
 */
function convertDateFormate(date_str, type) {
  var date_arr = date_str.split('-');
  switch (type) {
    case 1:
      return date_arr[1] + "月" + date_arr[2] + "日";
    case 2:
      return date_arr[0] + "年" + date_arr[1] + "月" + date_arr[2] + "日";
  }
  return date_str;
}

// 转换真实地址
function getImgRealUrl(key) {
  return 'http://dsyy.isart.me/' + key
}


const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//判断是否有空字符串
function judgeIsAnyNullStr() {
  if (arguments.length > 0) {
    for (var i = 0; i < arguments.length; i++) {
      if (arguments[i] == null || arguments[i] == "" || arguments[i] == undefined || arguments[i] == "undefined" || arguments[i] == "未设置") {
        return true;
      }
    }
  }
  return false;
}

//是否为手机号
function isPoneAvailable(str) {
  var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
  if (!myreg.test(str)) {
    return false
  } else {
    return true
  }
}

//展示空toast
function showToast(msg, img) {
  console.log(img);
  if (judgeIsAnyNullStr(img)) {
    wx.showToast({
      title: msg,
      icon: 'none',
      duration: 1500,
    })
  } else {
    wx.showToast({
      title: msg,
      icon: 'none',
      duration: 1500,
      image: img
    })
  }
}


//展示toast
// function showToast(msg, img) {
//   console.log(img);
//   if (judgeIsAnyNullStr(img)) {
//     wx.showToast({
//       title: msg,
//       icon: 'success',
//       duration: 1500,
//     })
//   } else {
//     wx.showToast({
//       title: msg,
//       icon: 'success',
//       duration: 1500,
//       image: img
//     })
//   }
// }

//展示modal
function showModal(title, content, confirmCallBack, cancelCallBack) {
  wx.showModal({
    title: title,
    content: content,
    success: function (res) {
      if (res.confirm) {
        console.log('用户点击确定')
        confirmCallBack(res)
      } else if (res.cancel) {
        console.log('用户点击取消')
        cancelCallBack(res)
      }
    }
  })
}

//错误modal
function showErrorModal(msg) {
  wx.showModal({
    title: '调用失败',
    content: msg,
    success: function (res) {
      if (res.confirm) {
        console.log('用户点击确定')
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    }
  })
}

//展示loadding
function showLoading(msg) {
  if (!wx.canIUse('showLoading')) {
    return;
  }
  if (judgeIsAnyNullStr(msg)) {
    msg = "加载中";
  }
  wx.showLoading({
    title: msg,
  })
}

//隐藏loadding
function hideLoading() {
  if (!wx.canIUse('hideLoading')) {
    return;
  }
  wx.hideLoading();
}

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

//优化字符串输出，如果str为空，则返回r_str
function conStr(str, r_str) {
  if (judgeIsAnyNullStr(str)) {
    return r_str;
  }
  return str;
}

//返回
function navigateBack(delta) {
  wx.navigateBack({
    delta: delta
  })
}

//跳转到主页
function navigateToIndex(param) {
  console.log("navigateToIndex param:" + JSON.stringify(param));
  wx.navigateTo({
    url: '/pages/index/index?jsonStr=' + JSON.stringify(param),
  })

}

//跳转到注册页面
function navigateToRegister(param) {
  console.log("navigateToRegister param:" + JSON.stringify(param))
  wx.navigateTo({
    url: '/pages/register/register?jsonStr=' + JSON.stringify(param)
  })
}


//---------------------------------------------------  
// 日期格式化  
// 格式 YYYY/yyyy/YY/yy 表示年份  
// MM/M 月份  
// W/w 星期  
// dd/DD/d/D 日期  
// hh/HH/h/H 时间  
// mm/m 分钟  
// ss/SS/s/S 秒  
//---------------------------------------------------  
Date.prototype.Format = function (formatStr) {
  var str = formatStr
  var Week = ['日', '一', '二', '三', '四', '五', '六']

  str = str.replace(/yyyy|YYYY/, this.getFullYear());
  str = str.replace(/yy|YY/, (this.getYear() % 100) > 9 ? (this.getYear() % 100).toString() : '0' + (this.getYear() % 100))

  str = str.replace(/MM/, this.getMonth() > 9 ? this.getMonth().toString() : '0' + this.getMonth())
  str = str.replace(/M/g, this.getMonth())

  str = str.replace(/w|W/g, Week[this.getDay()])

  str = str.replace(/dd|DD/, this.getDate() > 9 ? this.getDate().toString() : '0' + this.getDate())
  str = str.replace(/d|D/g, this.getDate())

  str = str.replace(/hh|HH/, this.getHours() > 9 ? this.getHours().toString() : '0' + this.getHours())
  str = str.replace(/h|H/g, this.getHours());
  str = str.replace(/mm/, this.getMinutes() > 9 ? this.getMinutes().toString() : '0' + this.getMinutes())
  str = str.replace(/m/g, this.getMinutes())

  str = str.replace(/ss|SS/, this.getSeconds() > 9 ? this.getSeconds().toString() : '0' + this.getSeconds())
  str = str.replace(/s|S/g, this.getSeconds())

  return str
}

//+---------------------------------------------------  
//| 求两个时间的天数差 日期格式为 YYYY-MM-dd   
//+---------------------------------------------------  
function daysBetween(DateOne, DateTwo) {
  var OneMonth = DateOne.substring(5, DateOne.lastIndexOf('-'))
  var OneDay = DateOne.substring(DateOne.length, DateOne.lastIndexOf('-') + 1)
  var OneYear = DateOne.substring(0, DateOne.indexOf('-'))

  var TwoMonth = DateTwo.substring(5, DateTwo.lastIndexOf('-'))
  var TwoDay = DateTwo.substring(DateTwo.length, DateTwo.lastIndexOf('-') + 1)
  var TwoYear = DateTwo.substring(0, DateTwo.indexOf('-'))

  var cha = ((Date.parse(OneMonth + '/' + OneDay + '/' + OneYear) - Date.parse(TwoMonth + '/' + TwoDay + '/' + TwoYear)) / 86400000)
  return Math.abs(cha)
}


//+---------------------------------------------------  
//| 日期计算  
//+---------------------------------------------------  
Date.prototype.DateAdd = function (strInterval, Number) {
  var dtTmp = this
  switch (strInterval) {
    case 's': return new Date(Date.parse(dtTmp) + (1000 * Number))
    case 'n': return new Date(Date.parse(dtTmp) + (60000 * Number))
    case 'h': return new Date(Date.parse(dtTmp) + (3600000 * Number))
    case 'd': return new Date(Date.parse(dtTmp) + (86400000 * Number))
    case 'w': return new Date(Date.parse(dtTmp) + ((86400000 * 7) * Number))
    case 'q': return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number * 3, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds())
    case 'm': return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds())
    case 'y': return new Date((dtTmp.getFullYear() + Number), dtTmp.getMonth(), dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds())
  }
}

//+---------------------------------------------------  
//| 比较日期差 dtEnd 格式为日期型或者有效日期格式字符串  
//+---------------------------------------------------  
Date.prototype.DateDiff = function (strInterval, dtEnd) {
  var dtStart = this
  if (typeof dtEnd == 'string')//如果是字符串转换为日期型  
  {
    dtEnd = StringToDate(dtEnd)
  }
  switch (strInterval) {
    case 's': return parseInt((dtEnd - dtStart) / 1000)
    case 'n': return parseInt((dtEnd - dtStart) / 60000)
    case 'h': return parseInt((dtEnd - dtStart) / 3600000)
    case 'd': return parseInt((dtEnd - dtStart) / 86400000)
    case 'w': return parseInt((dtEnd - dtStart) / (86400000 * 7))
    case 'm': return (dtEnd.getMonth() + 1) + ((dtEnd.getFullYear() - dtStart.getFullYear()) * 12) - (dtStart.getMonth() + 1)
    case 'y': return dtEnd.getFullYear() - dtStart.getFullYear()
  }
}

//+---------------------------------------------------  
//| 日期输出字符串，重载了系统的toString方法  
//+---------------------------------------------------  
Date.prototype.toString = function (showWeek) {
  var myDate = this;
  var str = myDate.toLocaleDateString()
  if (showWeek) {
    var Week = ['日', '一', '二', '三', '四', '五', '六']
    str += ' 星期' + Week[myDate.getDay()]
  }
  return str;
}

//+---------------------------------------------------  
//| 日期合法性验证  
//| 格式为：YYYY-MM-DD或YYYY/MM/DD  
//+---------------------------------------------------  
function IsValidDate(DateStr) {
  var sDate = DateStr.replace(/(^\s+|\s+$)/g, ''); //去两边空格;   
  if (sDate == '') return true
  //如果格式满足YYYY-(/)MM-(/)DD或YYYY-(/)M-(/)DD或YYYY-(/)M-(/)D或YYYY-(/)MM-(/)D就替换为''   
  //数据库中，合法日期可以是:YYYY-MM/DD(2003-3/21),数据库会自动转换为YYYY-MM-DD格式   
  var s = sDate.replace(/[\d]{ 4,4 }[\-/]{ 1 }[\d]{ 1,2 }[\-/]{ 1 }[\d]{ 1,2 }/g, '')
  if (s == '') //说明格式满足YYYY-MM-DD或YYYY-M-DD或YYYY-M-D或YYYY-MM-D   
  {
    var t = new Date(sDate.replace(/\-/g, '/'))
    var ar = sDate.split(/[-/:]/)
    if (ar[0] != t.getYear() || ar[1] != t.getMonth() + 1 || ar[2] != t.getDate()) {
      //alert('错误的日期格式！格式为：YYYY-MM-DD或YYYY/MM/DD。注意闰年。') 
      return false;
    }
  }
  else {
    //alert('错误的日期格式！格式为：YYYY-MM-DD或YYYY/MM/DD。注意闰年。') 
    return false;
  }
  return true;
}

//+---------------------------------------------------  
//| 日期时间检查  
//| 格式为：YYYY-MM-DD HH:MM:SS  
//+---------------------------------------------------  
function CheckDateTime(str) {
  var reg = /^(\d+)-(\d{ 1,2 })-(\d{ 1,2 }) (\d{ 1,2 }):(\d{ 1,2 }):(\d{ 1,2 })$/
  var r = str.match(reg)
  if (r == null) return false
  r[2] = r[2] - 1
  var d = new Date(r[1], r[2], r[3], r[4], r[5], r[6])
  if (d.getFullYear() != r[1]) return false
  if (d.getMonth() != r[2]) return false
  if (d.getDate() != r[3]) return false
  if (d.getHours() != r[4]) return false
  if (d.getMinutes() != r[5]) return false
  if (d.getSeconds() != r[6]) return false
  return true
}

//+---------------------------------------------------  
//| 把日期分割成数组  
//+---------------------------------------------------  
Date.prototype.toArray = function () {
  var myDate = this
  var myArray = Array()
  myArray[0] = myDate.getFullYear()
  myArray[1] = myDate.getMonth()
  myArray[2] = myDate.getDate()
  myArray[3] = myDate.getHours()
  myArray[4] = myDate.getMinutes()
  myArray[5] = myDate.getSeconds()
  return myArray
}

//+---------------------------------------------------  
//| 取得日期数据信息  
//| 参数 interval 表示数据类型  
//| y 年 m月 d日 w星期 ww周 h时 n分 s秒  
//+---------------------------------------------------  
Date.prototype.DatePart = function (interval) {
  var myDate = this
  var partStr = ''
  var Week = ['日', '一', '二', '三', '四', '五', '六']
  switch (interval) {
    case 'y': partStr = myDate.getFullYear()
      break
    case 'm': partStr = myDate.getMonth() + 1
      break
    case 'd': partStr = myDate.getDate()
      break
    case 'w': partStr = Week[myDate.getDay()]
      break
    case 'ww': partStr = myDate.WeekNumOfYear()
      break
    case 'h': partStr = myDate.getHours()
      break
    case 'n': partStr = myDate.getMinutes()
      break
    case 's': partStr = myDate.getSeconds()
      break
  }
  return partStr
}

//+---------------------------------------------------  
//| 取得当前日期所在月的最大天数  
//+---------------------------------------------------  
Date.prototype.MaxDayOfDate = function () {
  var myDate = this
  var ary = myDate.toArray()
  var date1 = (new Date(ary[0], ary[1] + 1, 1))
  var date2 = date1.dateAdd(1, 'm', 1)
  var result = dateDiff(date1.Format('yyyy-MM-dd'), date2.Format('yyyy-MM-dd'))
  return result
}


//+---------------------------------------------------  
//| 字符串转成日期类型   
//| 格式 MM/dd/YYYY MM-dd-YYYY YYYY/MM/dd YYYY-MM-dd  
//+---------------------------------------------------  
function StringToDate(DateStr) {
  var converted = Date.parse(DateStr)
  var myDate = new Date(converted)
  if (isNaN(myDate)) {
    //var delimCahar = DateStr.indexOf('/')!=-1?'/':'-'
    var arys = DateStr.split('-')
    myDate = new Date(arys[0], --arys[1], arys[2])
  }
  return myDate
}


// 获取今天日期
function getToday() {
  var now = new Date()
  var today = ""
  var year = now.getFullYear()       //年
  today += year + "-"
  var month = now.getMonth() + 1     //月
  if (month < 10) {
    month = "0" + month
  }
  // today += month + "-"
  var day = now.getDate()            //日
  if (day < 10) {
    day = "0" + day
  }
  return year + "-" + month + "-" + day
}

function getTodayAddOne() {
  var now = new Date()
  now.setDate(now.getDate() + 1);

  var today = ""
  var year = now.getFullYear()       //年
  today += year + "-"
  var month = now.getMonth() + 1     //月
  if (month < 10) {
    month = "0" + month
  }
  // today += month + "-"
  var day = now.getDate()            //日
  if (day < 10) {
    day = "0" + day
  }
  return year + "-" + month + "-" + day
}

function getTodayAddThree() {
  var now = new Date()
  now.setDate(now.getDate() + 3);

  var today = ""
  var year = now.getFullYear()       //年
  today += year + "-"
  var month = now.getMonth() + 1     //月
  if (month < 10) {
    month = "0" + month
  }
  // today += month + "-"
  var day = now.getDate()            //日
  if (day < 10) {
    day = "0" + day
  }
  return year + "-" + month + "-" + day
}

// 获取当前月份
function getMonth() {
  var now = new Date()
  var today = ""
  var year = now.getFullYear()       //年
  today += year + "-"
  var month = now.getMonth() + 1     //月
  if (month < 10) {
    month = "0" + month
    // month += "0"
  }
  today += month + "-"
  var day = now.getDate()            //日
  if (day < 10)
    today += "0"
  return year + "-" + month
}

/**
 * 获取指定时间的友好时间字符串。
 * @param str 指定的时间字符串，如yyyy-MM-dd HH:mm:ss
 * @param now 当前时间，允许时间戳，GMT时间，如果该参数为undefined，则使用浏览器时间。
 */
function getDiffentTime(str, now) {

  console.log('getDiffentTime str is : ' + str)
  console.log('getDiffentTime now is : ' + now)

  var currentTime = new Date(now)
  var arr = str.split(/\s+/gi)
  var temp = 0, arr1, arr2, oldTime, delta
  var getIntValue = function (ss, defaultValue) {
    try {
      return parseInt(ss, 10)
    } catch (e) {
      return defaultValue
    }
  }
  var getWidthString = function (num) {
    return num < 10 ? ("0" + num) : num
  }
  if (arr.length >= 2) {
    arr1 = arr[0].split(/[\/\-]/gi)
    arr2 = arr[1].split(":")
    oldTime = new Date()
    oldTime.setYear(getIntValue(arr1[0], currentTime.getFullYear()))
    oldTime.setMonth(getIntValue(arr1[1], currentTime.getMonth() + 1) - 1)
    oldTime.setDate(getIntValue(arr1[2], currentTime.getDate()))
    oldTime.setHours(getIntValue(arr2[0], currentTime.getHours()))
    oldTime.setMinutes(getIntValue(arr2[1], currentTime.getMinutes()))
    oldTime.setSeconds(getIntValue(arr2[2], currentTime.getSeconds()))
    delta = currentTime.getTime() - oldTime.getTime()
    if (delta <= 6000) {
      return "1分钟内"
    }
    else if (delta < 60 * 60 * 1000) {
      return Math.floor(delta / (60 * 1000)) + "分钟前"
    }
    else if (delta < 24 * 60 * 60 * 1000) {
      return Math.floor(delta / (60 * 60 * 1000)) + "小时前"
    }
    else if (delta < 3 * 24 * 60 * 60 * 1000) {
      return Math.floor(delta / (24 * 60 * 60 * 1000)) + "天前"
    }
    else if (currentTime.getFullYear() != oldTime.getFullYear()) {
      return [getWidthString(oldTime.getFullYear()), getWidthString(oldTime.getMonth() + 1), getWidthString(oldTime.getDate())].join("-")
    }
    else {
      return [getWidthString(oldTime.getMonth() + 1), getWidthString(oldTime.getDate())].join("-")
    }
  }
  return ""
}

var x_PI = 3.14159265358979324 * 3000.0 / 180.0;
var PI = 3.1415926535897932384626;
var a = 6378245.0;
var ee = 0.00669342162296594323;

function transformlat(lng, lat) {
  var ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng));
  ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
  ret += (20.0 * Math.sin(lat * PI) + 40.0 * Math.sin(lat / 3.0 * PI)) * 2.0 / 3.0;
  ret += (160.0 * Math.sin(lat / 12.0 * PI) + 320 * Math.sin(lat * PI / 30.0)) * 2.0 / 3.0;
  return ret
}

function transformlng(lng, lat) {
  var ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng));
  ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
  ret += (20.0 * Math.sin(lng * PI) + 40.0 * Math.sin(lng / 3.0 * PI)) * 2.0 / 3.0;
  ret += (150.0 * Math.sin(lng / 12.0 * PI) + 300.0 * Math.sin(lng / 30.0 * PI)) * 2.0 / 3.0;
  return ret
}

//wgs84坐标转gcj02坐标
function gcj02towgs84(lng, lat) {
  var dlat = transformlat(lng - 105.0, lat - 35.0);
  var dlng = transformlng(lng - 105.0, lat - 35.0);
  var radlat = lat / 180.0 * PI;
  var magic = Math.sin(radlat);
  magic = 1 - ee * magic * magic;
  var sqrtmagic = Math.sqrt(magic);
  dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI);
  dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI);
  var mglat = lat + dlat;
  var mglng = lng + dlng;

  var location = {
    lat: mglat,
    lon: mglng
  }
  return location
}

//判断是否需要跳转到设置信息页面
function isNeedNavigateToSetMyInfoPage() {
  var userInfo = getApp().globalData.userInfo;
  if (judgeIsAnyNullStr(userInfo.phonenum, userInfo.real_name)) {
    return true;
  } else {
    return false;
  }
}

//返回首页
function backIndex() {
  var userType = getApp().globalData.userInfo.type;
  console.log("返回首页")
  if (userType == 1) {
    wx.redirectTo({
      url: '/pages/staff/staff',
    })
  } else if (userType == 2) {
    wx.redirectTo({
      url: '/pages/shopManager/index/index',
    })
  } else if (userType == 3) {
    wx.redirectTo({
      url: '/pages/manager/index/index',
    })
  }
}


module.exports = {
  //http request function
  getQiniuToken: getQiniuToken,
  getOpenId: getOpenId,
  getUnionId: getUnionId,
  loginServer: loginServer,
  register: register,
  //normal function
  getByIdWithToken: getByIdWithToken,
  getImgRealUrl: getImgRealUrl,
  formatTime: formatTime,
  showLoading: showLoading,
  hideLoading: hideLoading,
  showToast: showToast,
  showModal: showModal,
  judgeIsAnyNullStr: judgeIsAnyNullStr,
  getToday: getToday,
  isPoneAvailable: isPoneAvailable,
  isNeedNavigateToSetMyInfoPage: isNeedNavigateToSetMyInfoPage,
  //navigation function
  navigateBack: navigateBack,   //进行页面跳回
  navigateToRegister: navigateToRegister,  //跳转到注册页面
  navigateToIndex: navigateToIndex,	//跳转到首页
  //other function
  getDiffentTime: getDiffentTime,
  gcj02towgs84: gcj02towgs84,
  qiniuUrlTool: qiniuUrlTool,
  convertDateFormateM: convertDateFormateM,
  date: date,                 //转换成2018-10-07类型的时间
  getMonth: getMonth,         //获取当前月份
  Percentage: Percentage,     //两个数的百分比
  getTodayAddOne: getTodayAddOne,   //时间加一
  getTodayAddThree: getTodayAddThree,   //时间加三
  backIndex: backIndex,             //返回首页


  showToast: showToast,           //展示空toast
  getQiniuToken: getQiniuToken,   //获取七牛token
  apply: apply,                   //首页提交申请接口
  getShopList: getShopList,       //获取所有生效的店铺信息
  addClient: addClient,           //员工添加顾客信息
  getAuditByUserId: getAuditByUserId,   //根据user_id获取员工入职信息
  getClientByTel: getClientByTel,       //根据顾客电话查询顾客信息
  getClient: getClient,           //获取所有顾客信息
  getClientById: getClientById,   //根据id获取顾客信息
  addDeal: addDeal,               //添加交易记录
  addClient: addClient,           //员工添加顾客信息
  getDeals: getDeals,             //根据用户id和顾客id查看交易记录信息
  search: search,                 //客户维护搜索
  getShopList: getShopList,         //获取所有生效的店铺信息
  getAudit: getAudit,               //店长下的员工列表
  getAuditCount: getAuditCount,     //根据店长id查询员工信息及员工录入顾客数量（对应原型：查看员工录入客户数量）
  addPassengerFlow: addPassengerFlow,  //店长添加客流量
  reviewAudit: reviewAudit,           //店长审核入职人员
  getReviewAudit: getReviewAudit,     //根据店长shop_manager_id获取需要审核的员工列表
  shopManagerReviewDailyPaper: shopManagerReviewDailyPaper,//日报——店长审核日报
  dailyList: dailyList,               //店长查看日报列表(对应原型审核日报)
  shopManagerReleaseTask: shopManagerReleaseTask,    //店长发任务
  getDeal: getDeal,                     //根据员工id获取交易记录
  getProductList: getProductList,       //获取生效的产品信息
  getReleaseTask: getReleaseTask,       //获取任务信息剩余目标金额
  getAuditDailyPaperData: getAuditDailyPaperData,   //根据店员id和时间查询日报信息
  managerReviewAudit: managerReviewAudit,     //主管审核入职人员
  getShopManager: getShopManager,         //根据主管id获取主管下未审核店长和店员的信息
  getShop: getShop,                         //主管下的店铺列表
  releaseTask: releaseTask,                  //主管发布任务
  getClientByUserId: getClientByUserId,    //根据员工id获取客户信息
  getDealByClientId: getDealByClientId,    //根据顾客id获取所有交易记录
  getManagerTask: getManagerTask,          //主管查看发布任务
  getProductById: getProductById,           //根据产品id获取产品信息
  getShopList: getShopList,                 //获取所有生效的店铺信息
  getById: getById,                         //根据id获取用户信息（不带token）
  getByIdWithToken: getByIdWithToken,       //根据id获取用户信息（带token）
  getShopManagerTask: getShopManagerTask,   //店长获取本月任务
  getAuditTask: getAuditTask,               //员工获取今日任务
  getAuditDailyPaper: getAuditDailyPaper,   //查看员工是否提交过日报
  addAuditDailyPaper: addAuditDailyPaper,   //员工提交日报
  getAuditRanking: getAuditRanking,         //本店员工排名
  addOrderGoods: addOrderGoods,             //添加订货信息
  getBoutique: getBoutique,                 //获取生效的竞品信息
  addBoutique: addBoutique,                 //提交竞品日报
  getShopManagerDailyPaperData: getShopManagerDailyPaperData,     //店长查看日报信息
  getAuditIndexKeyMessage: getAuditIndexKeyMessage,   //员工首页主要信息
  dailyPaper: dailyPaper,                   //根据日报店员clerk_id查看日报详情
  getAuditIndexMinorMessage: getAuditIndexMinorMessage, //员工首页次要信息
  getShopManagerIndexKeyMessage: getShopManagerIndexKeyMessage, //店长首页关键信息
  getShopManagerIndexMinorMessage: getShopManagerIndexMinorMessage, //店长首页次要信息
  getBoutiqueDaily: getBoutiqueDaily,           //主管查看未审核的竞品日报
  getAuditListByShopId: getAuditListByShopId,   //根据shop_id获取员工列表
  managerReviewBoutiqueDaily: managerReviewBoutiqueDaily,   //主管审核竞品日报(审核全部)
  addShopManagerDailyPaper: addShopManagerDailyPaper,       //店长提交日报
  getShopManagerDailyPaper: getShopManagerDailyPaper,       //查询店长今日是否已提交过日报
  getManagerIndexKeyMessage: getManagerIndexKeyMessage,     //主管首页关键信息
  getManagerIndexMinorMessage: getManagerIndexMinorMessage, //主管首页次要信息
  getUnauditedShopManagerDailyPaper: getUnauditedShopManagerDailyPaper,   //主管查看未审核店长日报
  auditChangeShop: auditChangeShop,               //员工转店
  getManagerIndexBoutiqueDailyMessage: getManagerIndexBoutiqueDailyMessage,   //主管首页竞品信息
  shopManagerGetBoutiqueDaily: shopManagerGetBoutiqueDaily,     //查询今天店长是否提交过竞品日报
  managerReviewDailyPaper: managerReviewDailyPaper,   //主管审核日报
}
