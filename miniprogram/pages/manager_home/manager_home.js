// pages/manager_home/manager_home.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options)
    this.setData({
      name: options.name
    })
  },

  to_schedule_edit(){
    if (this.data.loading) return
    this.setData({
      loading: true
    })

    if (app.globalData.manager_info.type == 0){
      wx.navigateTo({
        url: '../schedule_edit/schedule_edit',
      })
    }
    else{
      app.globalData.errInfo = "当前无权限，请联系管理员"
      wx.navigateTo({
        url: '../error_page/error_page',
      })
    }
  },

  to_scoresheet_edit(){
    if (this.data.loading) return
    this.setData({
      loading: true
    })
    wx.navigateTo({
      url: '../schedule_scoresheet/schedule_scoresheet',
    })
  },

  to_manager_view_apply(){
    if (this.data.loading) return
    this.setData({
      loading: true
    })
    wx.navigateTo({
      url: '../manager_view_apply/manager_view_apply',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.setData({
      loading: false
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})