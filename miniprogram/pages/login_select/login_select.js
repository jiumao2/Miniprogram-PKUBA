var app = getApp()

Page({
  data: {
    loading: false
  },

  onLoad: function() {
    wx.setNavigationBarTitle({
      title: '\u767b\u5f55\u9009\u62e9'
    })
  },

  login_manager() {
    if (this.data.loading) return
    this.setData({ loading: true })
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log(res.result.openid)
        wx.cloud.callFunction({
          name: 'search_manager',
          success: mgrRes => {
            if (mgrRes.result.data.length > 0) {
              app.globalData.manager_info = mgrRes.result.data[0]
              wx.navigateTo({
                url: '../manager_home/manager_home?name=' + mgrRes.result.data[0].name
              })
            } else {
              wx.navigateTo({ url: '../manager_login/manager_login' })
            }
          },
          fail: err => {
            console.log(err)
            app.globalData.errInfo = '\u7ba1\u7406\u5458\u767b\u5f55\u5931\u8d25'
            wx.navigateTo({ url: '../error_page/error_page' })
          }
        })
      },
      fail: err => {
        console.log(err)
        app.globalData.errInfo = '\u7ba1\u7406\u5458\u767b\u5f55\u5931\u8d25'
        wx.navigateTo({ url: '../error_page/error_page' })
      }
    })
  },

  login_leader() {
    if (this.data.loading) return
    this.setData({ loading: true })
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log(res.result.openid)
        wx.cloud.callFunction({
          name: 'search_leader',
          data: { openid: res.result.openid },
          success: leaderRes => {
            if (leaderRes.result.data.length > 0) {
              app.globalData.leader_info = leaderRes.result.data[0]
              wx.navigateTo({ url: '../leader_home/leader_home' })
            } else {
              wx.navigateTo({ url: '../leader_register/leader_register' })
            }
          },
          fail: err => {
            console.log(err)
            app.globalData.errInfo = '\u9886\u961f\u767b\u5f55\u5931\u8d25'
            wx.navigateTo({ url: '../error_page/error_page' })
          }
        })
      },
      fail: err => {
        console.log(err)
        app.globalData.errInfo = '\u9886\u961f\u767b\u5f55\u5931\u8d25'
        wx.navigateTo({ url: '../error_page/error_page' })
      }
    })
  },

  login_referee() {
    if (this.data.loading) return
    this.setData({ loading: true })
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: () => {
        wx.cloud.callFunction({
          name: 'search_referee',
          data: {},
          success: refRes => {
            if (refRes.result && refRes.result.data && refRes.result.data.length > 0) {
              app.globalData.referee_info = refRes.result.data[0]
              wx.navigateTo({ url: '../referee_home/referee_home' })
            } else {
              wx.navigateTo({ url: '../referee_register/referee_register' })
            }
          },
          fail: err => {
            console.log(err)
            app.globalData.errInfo = '\u88c1\u5224\u767b\u5f55\u5931\u8d25'
            wx.navigateTo({ url: '../error_page/error_page' })
          }
        })
      },
      fail: err => {
        console.log(err)
        app.globalData.errInfo = '\u88c1\u5224\u767b\u5f55\u5931\u8d25'
        wx.navigateTo({ url: '../error_page/error_page' })
      }
    })
  },

  onShow: function() {
    this.setData({
      loading: false
    })
  }
})
