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
        var request = res.result.data
        request.sort((a,b) => {
          return new Date(b.request_time).getTime() - new Date(a.request_time).getTime()
        })
        console.log(request)
        for (var i=0;i<request.length;i++){
          var time = new Date(request[i].time)
          request[i].time = time.toISOString()
          request[i].year = time.getFullYear().toString()
          request[i].month = (time.getMonth()+1).toString()
          request[i].date = time.getDate().toString()
          request[i].hour = time.getHours().toString().padStart(2,"0")
          request[i].minute = time.getMinutes().toString().padStart(2,"0")
        }
        const nowdate = app.get_date_period(new Date()).date
        const request_passed = request.filter(item => item.state==2 || item.state==0)
        const request_normal = request.filter(item => item.type==1&&item.state!=2&&item.state!=0&&item.date_new >= nowdate)
        const request_across = request.filter(item => item.type==3&&item.state!=2&&item.state!=0&&item.date_new >= nowdate)
        console.log(request_passed)
        console.log(request_normal)
        console.log(request_across)

        this.setData({
          request_passed: request_passed,
          request_normal: request_normal,
          request_across: request_across
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