// miniprogram/pages/schedule.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    future_schedule: [],
    old_schedule: [],
    future_date: [],
    future_game: [],
    old_date: [],
    old_game: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      　　　　title: app.globalData.GAME_NAME + '赛程' //页面切换，更换页面标题
      　　})
    wx.cloud.callFunction({
      name: "search_future_schedule",
      data: {},
      success: res =>{
        var now_precise = new Date()
        var now = new Date(now_precise.getFullYear(), now_precise.getMonth(), now_precise.getDate())

        var schedule = res.result
        let future_schedule = []
        let old_schedule = []
        const day_name = ["周日","周一","周二","周三","周四","周五","周六"]
        for (var i=0;i<schedule.length;i++){
          var time = new Date(schedule[i].time)
          schedule[i].time = time
          schedule[i].year = time.getFullYear().toString()
          schedule[i].month = (time.getMonth()+1).toString()
          schedule[i].date = time.getDate().toString()
          schedule[i].hour = time.getHours().toString()
          temp = time.getMinutes()
          if (temp<10){
            temp = "0" + temp
          }
          schedule[i].minute = temp.toString()
          schedule[i].day = day_name[time.getDay()].toString()
        }
        schedule.sort((a,b)=>{
          return a.time.getTime() - b.time.getTime()
        })
        this.setData({
          schedule: schedule
        })
        console.log(schedule)
        for (var i = 0; i<schedule.length; i++){
          if(now.getTime() < schedule[i].time.getTime()){
            future_schedule = schedule.slice(i)              
            if (i>0){
              var temp = schedule.slice(0,i)
              old_schedule = temp.reverse()            
            }
            break
          }
          if (i == schedule.length-1){
            old_schedule = schedule.reverse()
          }
        }
        console.log(future_schedule)
        console.log(old_schedule)
        var future_date = []
        var old_date = []
        var future_game = []
        var old_game = []
        for (var i=0;i<future_schedule.length;i++){
          if(future_date.length==0 ||(future_schedule[i].date!=future_date[future_date.length-1].date || future_schedule[i].month != future_date[future_date.length-1].month)){
            future_date.push(future_schedule[i])
            future_game.push([future_schedule[i]])
          }
          else{
            future_game[future_game.length-1].push(future_schedule[i])
          }
        }
        for (var i=0;i<old_schedule.length;i++){
          if(old_date.length==0 ||(old_schedule[i].date!=old_date[old_date.length-1].date || old_schedule[i].month != old_date[old_date.length-1].month)){
            old_date.push(old_schedule[i])
            old_game.push([old_schedule[i]])
          }
          else{
            old_game[old_game.length-1].push(old_schedule[i])
          }
        }
        console.log(future_date)
        console.log(future_game)
        this.setData({
          future_date: future_date,
          future_game: future_game,
          old_date: old_date,
          old_game: old_game
        })

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
    return {
      title: '北大篮协小程序',
      desc:"2024年北大杯赛事信息查询！"
    }
  }
})