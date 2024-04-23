// pages/knockout_choose/knockout_choose.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },
  bindPickerChange1: function(e) {
    this.setData({
        group: this.data.array1[e.detail.value],
        value1: e.detail.value,
    })
  },

  confirmation: function(){
    // 进入下一个页面
    if (this.data.loading) return
    this.setData({
      loading:true
    })
    console.log(this.data.group)
    wx.navigateTo({
      url: '../knockout/knockout?group='+this.data.value1,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      loading:false,
      hideLoading:false,
      array1: app.globalData.GROUP_NAMES,
      value1: 0,
      group: app.globalData.GROUP_NAMES[0]
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
      loading:false
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