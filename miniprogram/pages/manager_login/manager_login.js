// miniprogram/pages/manager_login/manager_login.js

var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    loading:false, 
    password: null 
  },

  passwordInput: function(e){
    this.setData({
      password:e.detail.value
    })
  },

  confirmation: function(){
    // 判断密码是否正确
    if (this.data.loading) return
    this.setData({
      loading:true
    })
    if (this.data.password == 'PKUBA1997'){
      wx.navigateTo({
        url: '../manager_edit/manager_edit',
      })
    }
    else{
      app.globalData.errInfo = "密码错误"
      wx.navigateTo({
        url: '../error_page/error_page',
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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

  }
})