// miniprogram/pages/scoretable_choose/scoretable_choose.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading:false,
    hideLoading:false,
    array1: app.globalData.GROUP_NAMES,
    value1: 0,
    array2: app.globalData.LITTLEGROUPS,
    value2: 0,
    group: app.globalData.GROUP_NAMES[0],
    littlegroup: app.globalData.LITTLEGROUPS[0],
    to_error_page: true,
  },
  bindPickerChange1: function(e) {
    var value_old = this.data.value1
    this.setData({
        group: this.data.array1[e.detail.value],
        value1: e.detail.value
    })
  },
  bindPickerChange2: function(e) {
    this.setData({
        littlegroup: this.data.array2[e.detail.value],
        value2: e.detail.value
    })
    console.log(this.data.littlegroup)
  },

  confirmation: function(){
    // 进入下一个页面
    if (this.data.loading) return
    this.setData({
      loading:true
    })
    console.log(this.data.group)
    console.log(this.data.littlegroup)
    wx.navigateTo({
      url: '../scoretable/scoretable?group='+this.data.value1+'&littlegroup='+this.data.value2,
    })
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