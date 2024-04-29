// pages/knockout/knockout.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    group: null,
    name: null,
    loading: false,
    score: null,
    final : 0,
    showselector: false,
    allgroups: [],
    value : 0
  },
  selectGroup:  function(e){
    if (this.data.loading) return
    this.setData({
      group: this.data.allgroups[e.detail.value],
      value: e.detail.value,
      name:[],
      score:[],
      loading: true
    })
    console.log(e.detail)
    wx.cloud.callFunction({
        name: "get_knockout",
        data: {
          group: this.data.group
        },
        success: res => {
          console.log(res.result)
          this.setData({
            name: res.result.name,
            score: res.result.score,
            loading: false
          })
        },
        fail: err => {
          console.log(err)
          wx.navigateTo({
            url: '../error_page/error_page',
          })
        }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      value: parseInt(options.group),
      group: app.globalData.GROUP_NAMES[parseInt(options.group)],
      allgroups: app.globalData.GROUP_NAMES,
      loading: true
    })
    wx.cloud.callFunction({
      name: "get_knockout",
      data: {
        group: this.data.group
      },
      success: res => {
        console.log(res.result)
        this.setData({
          name: res.result.name,
          score: res.result.score,
          loading: false
        })
      },
      fail: err => {
        console.log(err)
        wx.navigateTo({
          url: '../error_page/error_page',
        })
      }
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