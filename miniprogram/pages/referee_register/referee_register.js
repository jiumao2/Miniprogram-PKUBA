var app = getApp()

Page({
  data: {
    loading: false,
    name: ''
  },

  nameInput: function(e) {
    this.setData({
      name: e.detail.value
    })
  },

  register: function() {
    if (this.data.loading) return
    var name = (this.data.name || '').trim()
    if (!name) {
      wx.showToast({
        title: '请输入姓名',
        icon: 'none'
      })
      return
    }

    this.setData({
      loading: true
    })

    wx.cloud.callFunction({
      name: 'referee_register',
      data: {
        name: name
      },
      success: () => {
        wx.cloud.callFunction({
          name: 'search_referee',
          data: {},
          success: (res) => {
            if (res.result && res.result.data && res.result.data.length > 0) {
              app.globalData.referee_info = res.result.data[0]
              wx.redirectTo({
                url: '../referee_home/referee_home'
              })
            } else {
              app.globalData.errInfo = '裁判注册失败'
              wx.navigateTo({
                url: '../error_page/error_page'
              })
            }
          },
          fail: (err) => {
            console.log(err)
            app.globalData.errInfo = '裁判信息读取失败'
            wx.navigateTo({
              url: '../error_page/error_page'
            })
          }
        })
      },
      fail: (err) => {
        console.log(err)
        this.setData({
          loading: false
        })
        app.globalData.errInfo = '裁判注册失败'
        wx.navigateTo({
          url: '../error_page/error_page'
        })
      }
    })
  },

  onShow: function() {
    this.setData({
      loading: false
    })
  }
})
