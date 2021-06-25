// miniprogram/pages/leader_home/leader_home.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData(
      {
        name: app.globalData.leader_info.name,
        team: app.globalData.leader_info.team,
        group: app.globalData.leader_info.group,
      }
    )
    wx.cloud.callFunction({
      name:"search_future_games",
      data:{
        team: this.data.team,
        group:this.data.group,
        for_request: false,
        now: new Date()
      },
      success: res =>{
        console.log(res.result)
        var length = res.result.data.length
        var games = res.result.data

        for (var i=0;i<length;i++){
          // var time = games[i].time
          // games[i].month = time.substring(5,7)
          // games[i].day = time.substring(8,10)
          // games[i].hour = time.substring(11,13)
          // games[i].minute = time.substring(14,16)
          var time = new Date(games[i].time)
          games[i].time = time
          games[i].month = (time.getMonth()+1).toString()
          games[i].day = time.getDate().toString()
          games[i].hour = time.getHours().toString()
          var temp = time.getMinutes()
          if (temp<10){
            temp = "0" + temp
          }
          games[i].minute = temp.toString()
        }

        games.sort((a,b)=>{
          if (a.time.getTime() >= b.time.getTime()) return 1
          else return -1
        })
        console.log(games)

        this.setData({
          length: res.result.data.length,
          games: games
        })
        },
      fail: err => {
        console.log(err)
      }
    })
  },

  view_apply(){
    if (this.data.loading) return
    this.setData({
      loading: true
    })
    wx.navigateTo({
      url: '../view_apply/view_apply',
    })
  },
  apply(){
    if (this.data.loading) return
    this.setData({
      loading: true
    })
    wx.navigateTo({
      url: '../apply/apply',
    })
  },
  drawing(){
    wx.navigateTo({
      url: '../drawing/drawing',
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