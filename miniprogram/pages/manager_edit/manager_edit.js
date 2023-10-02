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
    array1: app.globalData.GROUP_NAMES,
    value1: 0,
    array2: app.globalData.TEAMS[0],
    value2: 0,
    array3: app.globalData.TEAMS[0],
    value3: 1,
    score1:null,
    score2:null,
    sex: app.globalData.GROUP_SEX[0],
    group: app.globalData.GROUP_NAMES[0],
    team1: app.globalData.TEAMS[0][0],
    team2: app.globalData.TEAMS[0][1],
    to_error_page: true,
  },
  bindPickerChange1: function(e) {
    var value_old = this.data.value1
    this.setData({
        group: this.data.array1[e.detail.value],
        value1: e.detail.value,
        array2: this.data.array_total[e.detail.value],
        array3: this.data.array_total[e.detail.value]
    })
    if(e.detail.value!=value_old){
      this.setData({
        value2:0,
        team1:this.data.array2[0],
        value3:1,
        team2:this.data.array2[1],
        sex: app.globalData.GROUP_SEX[e.detail.value]
      })
    }
    console.log(this.data.team)
    console.log(this.data.group)
    console.log(this.data.sex)
  },
  bindPickerChange2: function(e) {
    this.setData({
        team1: this.data.array2[e.detail.value],
        value2: e.detail.value
    })
    console.log(this.data.team)
  },

  bindPickerChange3: function(e) {
    this.setData({
        team2: this.data.array3[e.detail.value],
        value3: e.detail.value
    })
    console.log(this.data.team)
  },

  
  score1Input: function(e){
    this.setData({
      score1:e.detail.value
    })
  },
  score2Input: function(e){
    this.setData({
      score2:e.detail.value
    })
  },

  toedit: function(){
    // 检查存在性并修改比分
    if (this.data.loading) return
    this.setData({
      loading:true
    })
    var that = this
    console.log(this.data)
    wx.cloud.callFunction({
      name: "check_edit",
      data: {
        team1: this.data.team1,
        team2: this.data.team2
      },
      success: res => {
        console.log(res)
        if (res.result.total<=0){
          that.setData({to_error_page: true})
          wx.cloud.callFunction({
            name: "leader_register",
            data: {
              name: this.data.name,
              email: this.data.email,
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
        console.log('failed!!!',err)
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