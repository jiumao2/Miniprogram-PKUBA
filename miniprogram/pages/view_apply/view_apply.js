// miniprogram/pages/view_apply/view_apply.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    request_out: [],
    request_in: [],
  },

  view_detail: function (e){
    app.globalData.request_detail = e.currentTarget.dataset.message
    console.log(app.globalData.request_detail)
    console.log(e.currentTarget.dataset.message)
    wx.navigateTo({
      url: '../view_apply_details/view_apply_details',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.callFunction({
      "name": "search_request",
      "data":{
        team: app.globalData.leader_info.team
      },
      success: res =>{
        console.log(res.result.data)
        var request = res.result.data
        var request_out = []
        var request_in = []
        for (var i=0;i<request.length;i++){
          if (request[i].requester == app.globalData.leader_info.team){
            request[i].from_myself = true
            request_out.push(request[i])
          }
          else{
            request[i].from_myself = false
            request_in.push(request[i])
          }
        }
        for (var i=0;i<request_out.length;i++){
          var time = new Date(request_out[i].time)
          request_out[i].time = time
          request_out[i].month = (time.getMonth()+1).toString()
          request_out[i].date = time.getDate().toString()
          request_out[i].hour = time.getHours().toString()
          var temp = time.getMinutes()
          if (temp<10){
            temp = "0" + temp
          }
          request_out[i].minute = temp.toString()
        }
        for (var i=0;i<request_in.length;i++){
          var time = new Date(request_in[i].time)
          request_in[i].time = time
          request_in[i].month = (time.getMonth()+1).toString()
          request_in[i].date = time.getDate().toString()
          request_in[i].hour = time.getHours().toString()
          var temp = time.getMinutes()
          if (temp<10){
            temp = "0" + temp
          }
          request_in[i].minute = temp.toString()
        }
        console.log(request_out)
        console.log(request_in)
        this.setData({
          request_out: request_out,
          request_in:request_in
        })
      },
      fail: err=>{
        console.log(err)
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