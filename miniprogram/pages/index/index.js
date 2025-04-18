// miniprogram/pages/index/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    loading:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  to_schedule(){
    if (this.data.loading) return
    this.setData({
      loading: true
    })
    wx.navigateTo({
      url: '../schedule/schedule',
    })
  },
  to_scoretable(){
    if (this.data.loading) return
    this.setData({
      loading: true
    })
    wx.navigateTo({
      url: '../scoretable/scoretable?group=0&littlegroup=0',
    })
  },
  to_knockout(){
    if (this.data.loading) return
    this.setData({
      loading: true
    })
    wx.navigateTo({
      url: '../knockout/knockout?group=0',
    })
  },
  login_manager(){
    if (this.data.loading) return
    this.setData({
      loading: true
    })
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        // app.globalData.openid = res.result.openid
        console.log(res.result.openid)
        wx.cloud.callFunction({
          name: 'search_manager',
          success: res => {
            console.log(res)
            if (res.result.data.length>0){
              console.log(res.result.data[0])
              getApp().globalData.manager_info = res.result.data[0]
              console.log(getApp().globalData.manager_info)
              wx.navigateTo({
                url: '../manager_home/manager_home?name='+res.result.data[0].name,
              })
            }
            else{
              wx.navigateTo({
                url: '../manager_login/manager_login',
              })
            }
          }
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateBack({
          delta: 0,
        })
      }
    })
  },

  login_leader(){
    if (this.data.loading) return
    this.setData({
      loading: true
    })
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        // app.globalData.openid = res.result.openid
        console.log(res.result.openid)
        wx.cloud.callFunction({
          name: 'search_leader',
          data: {openid: res.result.openid},
          success: res => {
            console.log(res)
            if (res.result.data.length>0){
              console.log(res.result.data[0])
              getApp().globalData.leader_info = res.result.data[0]
              console.log(getApp().globalData.leader_info)
              wx.navigateTo({
                url: '../leader_home/leader_home',
              })
            }
            else{
              wx.navigateTo({
                url: '../leader_register/leader_register',
              })
            }
          }
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateBack({
          delta: 0,
        })
      }
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
    this.setData({
      loading: false
    })
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
    return {
      title: '北大篮协小程序',
      desc:"2024年北大杯赛事信息查询！"
    }
  }
})