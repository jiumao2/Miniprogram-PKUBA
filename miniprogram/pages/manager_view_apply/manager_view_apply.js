// pages/manager_view_apply/manager_view_apply.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    request_to_review: [],
    request_reviewed: [],
  },

  view_detail: function (e){
    app.globalData.manager_request_detail = e.currentTarget.dataset.message
    console.log(app.globalData.manager_request_detail)
    wx.navigateTo({
      url: '../manager_view_apply_details/manager_view_apply_details',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.cloud.callFunction({
      "name": "get_all_requests",
      success: res =>{
        console.log(res.result.data)
        var request = res.result.data
        var request_to_review = []
        var request_reviewed = []
        // sort by time
        for (var i=0; i<request.length; i++){
          for (var j=i+1; j<request.length; j++){
            if (request[j].time > request[i].time){
              let temp = request[j]
              request[j] = request[i]
              request[i] = temp
            }
          }
        }

        for (var i=0;i<request.length;i++){
          if (request[i].is_reviewed){
            request_reviewed.push(request[i])
          }
          else{
            request_to_review.push(request[i])
          }
        }

        for (var i=0;i<request_to_review.length;i++){
          var time = new Date(request_to_review[i].time)
          request_to_review[i].time = time.toISOString()
          request_to_review[i].year = time.getFullYear().toString()
          request_to_review[i].month = (time.getMonth()+1).toString()
          request_to_review[i].date = time.getDate().toString()
          request_to_review[i].hour = time.getHours().toString().padStart(2,"0")
          request_to_review[i].minute = time.getMinutes().toString().padStart(2,"0")
        }
        for (var i=0;i<request_reviewed.length;i++){
          var time = new Date(request_reviewed[i].time)
          request_reviewed[i].time = time.toISOString()
          request_reviewed[i].year = time.getFullYear().toString()
          request_reviewed[i].month = (time.getMonth()+1).toString()
          request_reviewed[i].date = time.getDate().toString()
          request_reviewed[i].hour = time.getHours().toString().padStart(2,"0")
          request_reviewed[i].minute = time.getMinutes().toString().padStart(2,"0")
        }

        console.log(request_to_review)
        console.log(request_reviewed)
        this.setData({
          request_to_review: request_to_review,
          request_reviewed: request_reviewed
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