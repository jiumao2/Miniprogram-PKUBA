// miniprogram/pages/leader_register/leader_register.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading:false,
    hideLoading:false,
    is_given_up: false,
    score1: -1,
    score2: -1,
    picker_range: ["否", "是"],
    picker_value: 0
  },

  bind_input_change(e){
    console.log(e);
    var field = e.currentTarget.dataset.field
    this.data[field] = e.detail.value
    console.log(this.data[field])
  },

  bind_picker_change(e){
    console.log(e)
    this.setData({
      picker_value: e.detail.value
    })

    if (e.detail.value==0){
      this.setData({
        is_given_up:false
      })
    }
    else{
      this.setData({
        is_given_up:true
      })
    }
  },

  bind_date_change(e){
    console.log(e)
    this.setData(
      {date:e.detail.value}
    )
  },

  bind_time_change(e){
    console.log(e)
    this.setData(
      {time:e.detail.value}
    )
  },

  toedit: function(){
    // 得到时间
    var year = this.data.date.slice(0,4)
    var month = this.data.date.slice(5,7)
    var date = this.data.date.slice(8)
    var hour = this.data.time.slice(0,2)
    var minute = this.data.time.slice(3)
    var second = '00'
    var timestr = year+'/'+month+'/'+date+' '+hour+':'+minute+':'+second
    var time_new = new Date(timestr)
    console.log(timestr)
    console.log(time_new)

    // 检查存在性并修改比分
    if (this.data.loading) return
    this.setData({
      loading:true
    })

    wx.cloud.callFunction({
      name: "check_edit",
      data: {
        home_team_raw:this.data.game_raw.home_team,
        away_team_raw:this.data.game_raw.away_team,
        group_raw:this.data.game_raw.group,
        home_team: this.data.home_team,
        away_team: this.data.away_team,
        group: this.data.group,
        is_given_up: this.data.is_given_up,
        home_team_score: this.data.home_team_score,
        away_team_score: this.data.away_team_score,
        place:this.data.place,
        time:time_new,
        is_given_up:this.data.is_given_up
      },
      success: res => {
        console.log(res)
        if (res.result){
          wx.cloud.callFunction({
            name: "edit_score",
            data: {
              home_team_raw:this.data.game_raw.home_team,
              away_team_raw:this.data.game_raw.away_team,
              group_raw:this.data.game_raw.group,
              home_team: this.data.home_team,
              away_team: this.data.away_team,
              group: this.data.group,
              is_given_up: this.data.is_given_up,
              home_team_score: this.data.home_team_score,
              away_team_score: this.data.away_team_score,
              place:this.data.place,
              time:time_new,
              is_given_up:this.data.is_given_up
            },
            success: res =>{
              console.log(res)
              wx.navigateTo({
                url: '../schedule_edit/schedule_edit',
              })
            }
          })
        }
        else{
          app.globalData.errInfo = "对阵信息有误"
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
    let game_raw = app.globalData.game_on_editting
    this.setData({
      game_raw:game_raw,
      time:game_raw.hour.padStart(2,"0")+":"+game_raw.minute.padStart(2,"0"),
      date:game_raw.year.padStart(4,"0")+"-"+game_raw.month.padStart(2,"0")+"-"+game_raw.date.padStart(2,"0"),
      place:game_raw.place,
      group:game_raw.group,
      home_team:game_raw.home_team,
      away_team:game_raw.away_team,
      home_team_score:game_raw.home_team_score,
      away_team_score:game_raw.away_team_score
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