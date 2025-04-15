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
        array4: ['普通调整','跨周调整'],
        value1: 0,
        value2: 0,
        value3: 0,
        value4: 0,
        hideLoading: false,
        loading: true,
    },

    bindPicker1Change: function(e) {
        this.setData({
            value1: e.detail.value,
            value2: 0,
            value3: 0,
        })
        this.get_available_time(this.data.games[this.data.value1].time,this.data.value4)
    },
    bindPicker4Change: function(e){
      this.setData({
        value4: e.detail.value,
        value2: 0,
        value3: 0,
      })
      this.get_available_time(this.data.games[this.data.value1].time,this.data.value4)
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
  send_email(game, time_new, place_new){
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
    var date_new = this.data.now_available_date_period[this.data.value2][0]
    var period_new = this.data.now_available_date_period[this.data.value2][1][this.data.value3]
    var place_new = '无'
    console.log(date_new)
    console.log(period_new)
    wx.cloud.callFunction({
      name: "search_available_place",
      data:{
        date_new: date_new,
        period_new: period_new
      },
      success: res => {
        console.log(res.result)
        console.log(this.data.games)
        place_new = res.result.available_place[0]
        const hour_minute_new = app.period_to_time(period_new)
        console.log(hour_minute_new)
        var time_new = app.date_to_time(date_new, hour_minute_new.hour, hour_minute_new.minute)
        console.log(time_new)
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
            type: this.data.value4==0? 1: 3
            },
          success: res => {
            app.globalData.errInfo = "调整成功"
            wx.redirectTo({
              url: '../success_page/success_page',
            })
            this.send_email(game, time_new, place_new)
          },
          fail: err => {
            console.log(err)
            app.globalData.errInfo = "该时间段场次已满"
            wx.navigateTo({
              url: '../error_page/error_page',
            })
          },
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
  search_future_games(){
    return new Promise( (resolve,reject)=> {
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
            resolve()
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
          resolve()
          },
        fail: err => {
          console.log(err)
          reject(err)
        }
      })
    })
  },
  search_all_available_time: function () {
    return new Promise((resolve, reject) => {
      this.setData({ loading: true })
      const apply_time = new Date()
      const apply_date = app.get_date_period(apply_time).date
      var date0 = apply_date + 3
      var date1 = app.globalData.GAME_END_DATE
      console.log(date0)
      console.log(date1)
      wx.cloud.callFunction({
        name: "search_available_date_period",
        data: {
          date0: date0,
          date1: date1,
        },
        success: res => {
          console.log(res.result)
          this.setData({
            available_date_period: res.result.available_time
          })
          resolve() // 成功时调用 resolve
        },
        fail: err => {
          console.log(err)
          reject(err) // 失败时调用 reject
        }
      })
    })
  },
  get_available_time (game_time,request_type) {
    this.setData({loading:true})
    const game_date = app.get_date_period(game_time).date
    let game_day = game_time.getDay()
    if (game_day==0) game_day = 7
    console.log(game_date)
    const date1 = game_date - game_day + app.globalData.ROUND_START_DAY
    const date2 = game_date - game_day + app.globalData.ROUND_END_DAY
    console.log(date1)
    console.log(date2)
    console.log(this.data.available_date_period)
    if (request_type==0){
      var available_date_period = this.data.available_date_period.filter(item=> (item[0]>=date1&&item[0]<=date2))
    }
    else {
      var available_date_period = this.data.available_date_period.filter(item=> !(item[0]>=date1&&item[0]<=date2))
    }
    const p_to_t = app.globalData.PERIOD_TO_TIME
    var available_date = []
    var available_period = []
    for(let i=0;i<available_date_period.length;++i){
      const nowdate = available_date_period[i][0]
      const nowdate_to_time = app.date_to_time(nowdate,0,0)
      const nowdate_month = nowdate_to_time.getMonth()+1
      const nowdate_date = nowdate_to_time.getDate()
      available_date.push(nowdate_month+"."+nowdate_date)
      const temp_period = available_date_period[i][1].map(item => p_to_t[item][0]+":"+p_to_t[item][1])
      available_period.push(temp_period)
      }
      console.log(available_date)
      console.log(available_period)
      this.setData({
        now_available_date_period: available_date_period,
        available_date: available_date,
        available_period: available_period,
        array2: available_date,
        array3: available_period[0],
        loading: false
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    console.log(app.period_to_time(4))
    console.log(app.period_to_time(3))
    await this.search_future_games()
    await this.search_all_available_time()
    this.get_available_time(this.data.games[0].time,0)
  },
  onShow: function (options) {
  }
})