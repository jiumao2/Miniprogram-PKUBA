// miniprogram/pages/apply/apply.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
    data: {
        array1: [], // 场次
        array2: [], // 新的日期
        array3: [], // 新的时间
        value1: 0,
        value2: 0,
        value3: 0,
        hideLoading: false,
        loading: true,
    },

    bindPicker1Change: function(e) {
        this.setData({
            value1: e.detail.value,
            value2: 0,
            value3: 0
        })
        this.refresh_available_date()
    },

    bindPicker2Change: function(e) {
        this.setData({
            value2: e.detail.value,
            value3: 0,
            array3: this.data.available_period[e.detail.value]
        })
    },

    bindPicker3Change: function(e) {
      this.setData({
          value3: e.detail.value
      })
    },

  make_request(){
    if (this.data.loading) return
    this.setData({
      loading: true,
    })
    if (this.data.available_date_period.length == 0){
      app.globalData.errInfo = "该比赛没有可以调整的时间"
      wx.navigateTo({
        url: '../error_page/error_page',
      })
      return
    }
    var date_new = this.data.available_date_period[this.data.value2][0]
    var period_new = this.data.available_date_period[this.data.value2][1][this.data.value3]
    wx.cloud.callFunction({
      name: "search_available_place",
      data:{
        date_new: date_new,
        period_new: period_new
      },
      success: res => {
        console.log(res.result)
        console.log(this.data.games)
        var place_new = res.result.available_place[0]
        const hour_minute_new = app.period_to_time(period_new)
        var time_new = app.date_to_time(date_new, hour_minute_new[0], hour_minute_new[1])
        var game = this.data.games[this.data.value1]
        wx.cloud.callFunction({
          name: "make_request_new",
          data:{
            time_new: time_new,
            date_new: date_new,
            period_new: period_new,
            place_new: place_new,
            game: game,
            requester: app.globalData.leader_info.team,
            type: 1
          },
          success: res => {
            wx.navigateBack({
              delta: 0,
            })
            var now = new Date()
            var text_email = "原比赛: " + game.month+'月'+game.date+'日 ' 
            + game.hour+':'+game.minute + " "
            + game.home_team + " VS "+ game.away_team
            + ' ' + game.place + '\n' 
            + "调整后比赛: "+ (time_new.getMonth()+1).toString()+'月'+time_new.getDate().toString()+'日 ' 
            + time_new.getHours().toString()+':'+time_new.getMinutes().toString() + " "
            + game.home_team + " VS "+ game.away_team
            + ' ' + place_new + '\n'
            + "申请日期: "+(now.getMonth()+1).toString()+'月'+now.getDate().toString()+'日 ' 
            + now.getHours().toString()+':'+now.getMinutes().toString() + '\n'
            + "申请方: "+app.globalData.leader_info.team +'\n'
            + "申请类型: "+app.globalData.TYPES[0] + '\n'
            + "组别: " + game.group + '\n'
            console.log(text_email)
            wx.cloud.callFunction({
              name: 'send_email',
              data:{
                text: text_email,
                attachment: 0,
                subject: app.globalData.TYPES[0]+'申请（协商中）'+ game.home_team + " VS "+ game.away_team
              },
              success: res =>{
                console.log(res)
              },
              fail: err =>{
                console.log(err)
              }
            })
          },
          fail: err => {
            console.log(err)
            app.globalData.errInfo = "该时间段场次已满"
            wx.navigateTo({
              url: '../error_page/error_page',
            })
          }
        })
      },
      fail: err => {
        console.log(err)
        app.globalData.errInfo = "出现错误"
        wx.navigateTo({
          url: '../error_page/error_page',
        })
      }
    })
  },

  refresh_available_date(){
    this.setData({loading:true})
    const apply_time = new Date()
    const apply_date = app.get_date_period(apply_time).date
    const game_time = this.data.games[this.data.value1].time
    const game_date = app.get_date_period(game_time).date
    // date0 为三天之后的日期，需要提前三天申请调整赛程
    console.log(apply_date)
    var date0 = apply_date + 3
    console.log(date0)
    let game_day = game_time.getDay()
    if (game_day==0) game_day = 7 // 周天默认为0，改为7
    console.log(game_day)
    // 仅允许在当周内调整赛程
    // date1 为本周日，date2为本周一
    var date1 = game_date - game_day + app.globalData.ROUND_END_DAY   
    var date2 = game_date - game_day + app.globalData.ROUND_START_DAY 
    
    // 找出date0与date2靠后者，date0-date1为可调整的日期段
    if (date2>date0) date0 = date2

    console.log(date0)
    console.log(date1)
    console.log(date2)
    wx.cloud.callFunction({
      name: "search_available_date_period",
      data:{date0:date0,
            date1:date1
            },
      success: res=>{
        const available_date_period = res.result.available_time
        console.log(available_date_period)
        console.log(res.result.requests)
        const p_to_t = app.globalData.PERIOD_TO_TIME
        var available_date = []
        var available_period = []
        for(let i=0;i<available_date_period.length;++i){
          const nowdate = available_date_period[i][0]
          const nowdate_to_time = app.date_to_time(nowdate,0,0)
          const nowdate_month = nowdate_to_time.getMonth()+1
          const nowdate_date = nowdate_to_time.getDate()
          available_date.push(nowdate_month+"."+nowdate_date)
          let temp_period = []
          for(let j=0;j<available_date_period[i][1].length;++j){
            const nowperiod = available_date_period[i][1][j]
            temp_period.push(p_to_t[nowperiod][0]+":"+p_to_t[nowperiod][1])
          }
          available_period.push(temp_period)
          }
        console.log(available_date)
        console.log(available_period)
        this.setData({
          available_date_period: available_date_period,
          available_date: available_date,
          available_period: available_period,
          array2: available_date,
          array3: available_period[0],
          loading: false
        })
      },
      fail: err=>{
        console.log(err)
      }
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.callFunction({
      name:"search_future_games",
      data:{
        team: app.globalData.leader_info.team,
        group: app.globalData.leader_info.group,
        for_request: true,
        now: new Date(),
      },
      success: res =>{
        console.log(res.result)
        var array1 = []
        var games = res.result.data
        if (games.length == 0){
          wx.navigateBack({
            delta: 0,
          })
          app.globalData.errInfo = "没有可调整的赛程"
          wx.navigateTo({
            url: '../error_page/error_page',
          })
          return
        }
        for (var i=0;i<games.length;i++){
          var time = new Date(games[i].time)
          games[i].time = time
          games[i].month = (time.getMonth()+1).toString()
          games[i].date = time.getDate().toString()
          games[i].hour = time.getHours().toString()
          var temp = time.getMinutes()
          if (temp<10){
            temp = "0" + temp
          }
          games[i].minute = temp.toString()
        }

        games.sort((a,b)=>{
          return a.time - b.time
        })
        console.log(games)
        for (var i=0;i<games.length;i++){
          array1.push(games[i].month+"."+games[i].date+" "+games[i].hour+":"+games[i].minute+" "+games[i].home_team+"VS"+games[i].away_team)
        }
        this.setData({
          array1:array1,
          games: games
        })
        this.refresh_available_date()
        },
      fail: err => {
        console.log(err)
      }
    })
  },
  onShow: function (options) {
  }
})