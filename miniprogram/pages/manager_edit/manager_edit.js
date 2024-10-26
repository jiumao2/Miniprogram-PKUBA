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
    adjustable:false,
    picker_range_give_up: ["否", "是"],
    picker_value_give_up: 0,
    picker_range_adjust: ["否", "是"],
    picker_value_adjust: 0
  },

  bind_input_change(e){
    console.log(e);
    var field = e.currentTarget.dataset.field
    this.data[field] = e.detail.value
    console.log(this.data[field])
  },

  bind_picker_change_give_up(e){
    console.log(e)
    this.setData({
      picker_value_give_up: e.detail.value
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

  bind_picker_change_adjust(e){
    console.log(e)
    this.setData({
      picker_value_adjust: e.detail.value
    })

    if (e.detail.value==0){
      this.setData({
        adjustable:false
      })
    }
    else{
      this.setData({
        adjustable:true
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
    console.log(this.data)
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
        home_team_score: parseInt(this.data.home_team_score),
        away_team_score: parseInt(this.data.away_team_score),
        place:this.data.place,
        time:time_new,
        is_given_up:this.data.is_given_up,
        adjustable:this.data.adjustable,
        description:this.data.description,
        updated_by: app.globalData.manager_info.name
      },
      success: res => {
        console.log(res)
        if (res.result){
          wx.cloud.callFunction({
            name: "edit_score",
            data: {
              home_team_raw:this.data.game_raw.home_team,
              away_team_raw:this.data.game_raw.away_team,
              group_raw: this.data.game_raw.group,
              home_team: this.data.home_team,
              away_team: this.data.away_team,
              group: this.data.group,
              is_given_up: this.data.is_given_up,
              home_team_score: parseInt(this.data.home_team_score),
              away_team_score: parseInt(this.data.away_team_score),
              place:this.data.place,
              time:time_new,
              is_given_up:this.data.is_given_up,
              adjustable:this.data.adjustable,
              description:this.data.description,
              updated_by:app.globalData.manager_info.name
            },
            success: res =>{
              console.log(res)
              app.globalData.errInfo = '更新成功！'
              wx.navigateBack()
              wx.redirectTo({
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
      away_team_score:game_raw.away_team_score,
      description:game_raw.description,
      updated_by: game_raw.updated_by,
    })
    const date = new Date(game_raw.update_time);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // getMonth() 返回的月份是从0开始的
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    // 格式化月份、日期、小时、分钟、秒（如果需要，可以添加前导零）
    const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day} ${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    
    this.setData({
      update_time: formattedDate
    })
    console.log(this.data.update_time)
    if (this.data.game_raw.adjustable){
      this.setData({
        adjustable:true,
        picker_value_adjust:1
      })
    }
    else{
      this.setData({
        adjustable:false,
        picker_value_adjust:0
      })
    }

    if (this.data.game_raw.is_given_up){
      this.setData({
        is_given_up:true,
        picker_value_give_up:1
      })
    }
    else{
      this.setData({
        is_given_up:false,
        picker_value_give_up:0
      })
    }
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