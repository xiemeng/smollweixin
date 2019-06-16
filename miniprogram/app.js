// 初始化数据  状态管理
const mpState = require('./utils/store/mpredux.js');
const userInfo = require('./utils/store/modul/userinfo.js');
const logs = require('./utils/store/modul/logs.js');
mpState.createStore({
  logs,
  userInfo
}, 'onShow')

//app.js
App({
  onLaunch: function () {
  }
})
//app.js
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }
    this.globalData = {}
    // 调用云函数
    if (!this.globalData.openid){
      wx.cloud.callFunction({
        name: 'login',
        data: {},
        success: res => {
          console.log('[云函数] [login] user openid: ', res.result.openid)
          this.globalData.openid = res.result.openid
        },
        fail: err => {
          console.error('[云函数] [login] 调用失败', err)
        }
      })
    }
  }
})
