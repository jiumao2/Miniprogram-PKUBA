// miniprogram/pages/view_apply_details/view_apply_details.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading:false
  },
  accept(){
    if(this.data.loading) return
    this.setData({
      loading: true
    })
    var now = new Date()
    var time_ddl = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()+3
    )
    if (time_ddl.getTime()>this.data.request_detail.time_new.getTime()){
    wx.cloud.callFunction({
      name: "update_request",
      data:{
        request:this.data.request_detail,
        new_state: 2
      },
      success: res => {
        app.globalData.request_detail.state = 2
        wx.navigateTo({
          url: '../leader_home/leader_home',
        })
      },
      fail: err =>{
        console.log(err)
      }
    })
    }
    else{
      wx.cloud.callFunction({
        name: "update_request",
        data:{
          request:this.data.request_detail,
          new_state: 0
        },
        success: res => {
          app.globalData.request_detail.state = 0
          var temp_request = this.data.request_detail
          temp_request.state = 0
          this.setData({
            request_detail:temp_request
          })
          app.globalData.errInfo = "此申请已过期"
          wx.navigateBack({
            delta: 0,
          })
        },
        fail: err =>{
          console.log(err)
        }
      })      
    }
  },

  reject(){
    if(this.data.loading) return
    this.setData({
      loading: true
    })
    app.globalData.request_detail.state = 0
    wx.cloud.callFunction({
      name: "update_request",
      data:{
        request:this.data.request_detail,
        new_state: 0
      },
      success: res => {
        wx.navigateBack({
          delta: 0,
        })
      },
      fail: err =>{
        console.log(err)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.request_detail)
    var request_detail = app.globalData.request_detail
    var time = new Date(request_detail.time_new)
    request_detail.time_new = time
    request_detail.month_new = (time.getMonth()+1).toString()
    request_detail.date_new = time.getDate().toString()
    request_detail.hour_new = time.getHours().toString()
    var temp = time.getMinutes()
    if (temp<10){
      temp = "0" + temp
    }
    request_detail.minute_new = temp.toString()

    var time = new Date(request_detail.request_time)
    request_detail.time_req = time
    request_detail.month_req = (time.getMonth()+1).toString()
    request_detail.date_req = time.getDate().toString()
    request_detail.hour_req = time.getHours().toString()
    var temp = time.getMinutes()
    if (temp<10){
      temp = "0" + temp
    }
    request_detail.minute_req = temp.toString()

    if (request_detail.state == 1){
      request_detail.stateInfo = "等待确认"
    }
    else if (request_detail.state == 2){
      request_detail.stateInfo = "通过"
    }
    else{
      request_detail.stateInfo = "拒绝"
    }
    this.setData({
      request_detail: request_detail
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
    this.onLoad()
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