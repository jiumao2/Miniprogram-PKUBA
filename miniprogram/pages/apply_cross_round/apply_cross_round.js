// miniprogram/pages/apply/apply.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
    data: {
        array1: [],
        array2: [],
        array3: [],
        value1: 0,
        value2: 0,
        value3: 0,
        games: [],
        hideLoading: false,
        loading: false,
    },

    bindPicker1Change: function(e) {
        this.setData({
            value1: e.detail.value
        })
        this.refresh_available_date()
    },

    bindPicker2Change: function(e) {
        this.setData({
            value2: e.detail.value
        })
        this.setData({
          value3: 0,
          array3: this.data.new_time[e.detail.value]
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
    if (this.data.time_place_rawdata.length == 0){
      app.globalData.errInfo = "该比赛没有可以调整的时间"
      wx.navigateTo({
        url: '../error_page/error_page',
      })
      return
    }
    wx.cloud.callFunction({
      name: "check_request",
      data:{
        new_time: this.data.time_place_rawdata[this.data.value2][this.data.value3],
      },
      success: res => {
        if (res.result.state){
          const place_all = app.globalData.PLACE_NAMES
          var place_available = []
          for (var i=0;i<place_all.length;i++){
            var flag = 0
            for (var j=0;j<res.result.place_not_available.length;j++){
              if (place_all[i] == res.result.place_not_available[j]){
                flag = 1
              }
            }
            if (flag == 0) place_available.push(place_all[i])
          }
          var place_new = place_available[0]
          wx.cloud.callFunction({
            name: "make_request",
            data:{
              new_time: this.data.time_place_rawdata[this.data.value2][this.data.value3],
              game: this.data.games[this.data.value1],
              requester: app.globalData.leader_info.team,
              place_new: place_new,
              type: 3
            },
            success: res => {
              wx.navigateBack({
                delta: 0,
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
        }
        else{
          app.globalData.errInfo = "该时间段场次已满"
          wx.navigateTo({
            url: '../error_page/error_page',
          })
        }
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
    const apply_date = new Date()
    const game_date = this.data.games[this.data.value1].time
    var date0 = new Date(
      apply_date.getFullYear(),
      apply_date.getMonth(),
      apply_date.getDate()+3)
    {
    let game_day=game_date.getDay()
    if (game_date.getDay()==0) game_day=7

    var date1 = new Date(
      apply_date.getFullYear(),
      apply_date.getMonth(),
      apply_date.getDate()+24)
    // var date2 = new Date(
    //   game_date.getFullYear(),
    //   game_date.getMonth(),
    //   game_date.getDate()-game_day+app.globalData.ROUND_START_DAY)  
    
    // if (date2.getTime()>date0.getTime()) date0 = date2
    }
    var available_date = [date0]
    var available_time = []
    var temp_date1 = new Date(
      date1.getFullYear(),
      date1.getMonth(),
      date1.getDate())    
    while(true){  
      var temp_date = new Date(
        available_date[available_date.length-1].getFullYear(),
        available_date[available_date.length-1].getMonth(),
        available_date[available_date.length-1].getDate()+1)
      if (temp_date.getTime() <= temp_date1.getTime()){
        available_date.push(temp_date)
      }
      else{
        break
      }
    }
    for(var i=0;i<available_date.length;i++){
      var temp = app.globalData.MAX_GAMES_NUM[available_date[i].getDay()]// [{hour:10,minute:50},{hour:12,minute:50},{hour:14,minute:20},{hour:15,minute:50}] 
      var temp_time_place = []
      for (var j=0;j<temp.length;j++){
        temp_time_place.push({
          time: new Date(
            available_date[i].getFullYear(),
            available_date[i].getMonth(),
            available_date[i].getDate(),
            temp[j].hour,temp[j].minute,0
          ),
          place_available: app.globalData.PLACE_NAMES,
          max_game_raw: temp[j].max_game,
          max_game: temp[j].max_game         
        })
      }
      available_time.push({
        date: available_date[i],
        time_and_place: temp_time_place
      })          
    }
    console.log(available_date)
    console.log(available_time)
    wx.cloud.callFunction({
      name:"search_available_date",
      data:{
        date0:date0,
        date1:date1,
      },
      success: res => {
        console.log(res.result)
        var time_not_available = res.result
        for (var i=0;i<time_not_available.length;i++){
          var time = new Date(time_not_available[i].time)
          time_not_available[i].time = time
          time_not_available[i].year = time.getFullYear()
          time_not_available[i].month = time.getMonth()
          time_not_available[i].date = time.getDate()
          time_not_available[i].full_date = new Date(time.getFullYear(),time.getMonth(),time.getDate())
          time_not_available[i].hour = time.getHours()
          time_not_available[i].minute = time.getMinutes()
          time_not_available[i].day = time.getDay()
        }
        for (var i0=0;i0<time_not_available.length;i0++){
          for (var i=0;i<available_time.length;i++){
            if (time_not_available[i0].full_date.getTime() == available_time[i].date.getTime()){
              for (var j=0; j<available_time[i].time_and_place.length;j++){
                if (time_not_available[i0].time.getTime() == available_time[i].time_and_place[j].time.getTime()){
                  available_time[i].time_and_place[j].max_game--
                  var temp_place_new = []
                  for(var i1=0;i1<available_time[i].time_and_place[j].place_available.length;i1++){
                    if (!available_time[i].time_and_place[j].place_available[i1] == time_not_available[i0].place){
                      temp_place_new.push(available_time[i].time_and_place[j].place_available[i1])
                    }
                  }
                  available_time[i].time_and_place[j].place_available = temp_place_new
                }
              }
            }
          }
        }
        this.setData({
          available_time: available_time
        })
        var new_date = []
        var new_time = []
        var new_place = []
        var time_place_rawdata = []
        var flag = false
        for (var i=0;i<available_time.length;i++){
          flag = false
          for (var j=0;j<available_time[i].time_and_place.length;j++){
            if (available_time[i].time_and_place[j].max_game > 0) flag = true
          }
          if (flag){
            new_date.push((available_time[i].date.getMonth()+1).toString() + '.' + available_time[i].date.getDate())
            var temp_new_time = []
            var temp_new_place = []
            var temp_time_place = []
            for (var j=0;j<available_time[i].time_and_place.length;j++){
              if (available_time[i].time_and_place[j].max_game>0){
                var temp_minute = available_time[i].time_and_place[j].time.getMinutes()
                if (temp_minute<10) temp_minute = '0' + temp_minute
                temp_new_time.push(available_time[i].time_and_place[j].time.getHours()+':'+ temp_minute)
                temp_new_place.push(available_time[i].time_and_place[j].place_available)
                temp_time_place.push(available_time[i].time_and_place[j])
              }
            }
            new_time.push(temp_new_time)
            new_place.push(temp_new_place)
            time_place_rawdata.push(temp_time_place)
          }
        }
        console.log(new_date)
        console.log(new_time)
        this.setData({
          array2: new_date,
          array3: new_time[0],
          value2: 0,
          value3: 0,
          new_time: new_time,
          new_date: new_date,
          new_place: new_place,
          time_place_rawdata: time_place_rawdata,
        })

      },
      fail: err => {
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
          if (a.time >= b.time) return 1
          else return -1
        })
        console.log(games)
        for (var i=0;i<games.length;i++){
          array1.push(games[i].month+"."+games[i].date+" "+games[i].home_team+"VS"+games[i].away_team+" "
          +games[i].hour+":"+games[i].minute)
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
    this.setData({
      loading:false
    })
    this.onLoad()
  }
})