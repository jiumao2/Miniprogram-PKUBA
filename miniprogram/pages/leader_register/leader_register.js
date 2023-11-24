// miniprogram/pages/leader_register/leader_register.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading:false,
    hideLoading:false,
    array_total: app.globalData.TEAMS,
    array2: app.globalData.TEAMS[0],
    value2: 0,
    array1: app.globalData.GROUP_NAMES,
    value1: 0,
    name: null,
    team: null,
    sex: app.globalData.GROUP_SEX[0],
    group: app.globalData.GROUP_NAMES[0],
    team: app.globalData.TEAMS[0][0],
  },

  bindPickerChange2: function(e) {

    this.setData({
        team: this.data.array2[e.detail.value],
        value2: e.detail.value
    })
    console.log(this.data.team)
  },

  bindPickerChange: function(e) {
    var value_old = this.data.value1
    this.setData({
        group: this.data.array1[e.detail.value],
        value1: e.detail.value,
        array2: this.data.array_total[e.detail.value],
    })
    if(e.detail.value!=value_old){
      this.setData({
        value2:0,
        team:this.data.array2[0],
        sex: app.globalData.GROUP_SEX[e.detail.value]
      })
    }
    console.log(this.data.team)
    console.log(this.data.group)
    console.log(this.data.sex)
  },
  teamInput: function(e){
    this.setData({
      team:e.detail.value
    })
  },
  nameInput: function(e){
    this.setData({
      name:e.detail.value
    })
  },

  register: function(){
    // 判断是否已存在队伍领队
    if (this.data.loading) return
    this.setData({
      loading:true
    })
    console.log(this.data)
    wx.cloud.callFunction({
      name: "check_leader",
      data: {
        name: this.data.name,
        team: this.data.team,
        group: this.data.group,
        sex: this.data.sex,
      },
      success: res => {
        console.log(res)
        if (res.result.total<=0){
          wx.cloud.callFunction({
            name: "leader_register",
            data: {
              name: this.data.name,
              team: this.data.team,
              group: this.data.group,
              sex: this.data.sex,
            },
            success: res =>{
              wx.navigateBack({
                delta: 0,
              })
            }
          })
        }
        else{
          app.globalData.errInfo = "表单不完整或已被注册"
          wx.navigateTo({
            url: '../error_page/error_page',
          })
        }
      },
      fail: err => {
        console.log('failed!!!',err.info)
        console.log(err)
        app.globalData.errInfo = "检查错误"
        wx.navigateTo({
          url: '../error_page/error_page',
        })
      }
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