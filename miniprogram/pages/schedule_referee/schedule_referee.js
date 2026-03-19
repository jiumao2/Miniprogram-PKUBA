var app = getApp()

function splitScheduleByDate(schedule) {
  var nowPrecise = new Date()
  var now = new Date(nowPrecise.getFullYear(), nowPrecise.getMonth(), nowPrecise.getDate())
  var futureSchedule = []
  var oldSchedule = []
  var dayNames = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']

  for (var i = 0; i < schedule.length; i++) {
    var time = new Date(schedule[i].time)
    schedule[i].time = time
    schedule[i].year = time.getFullYear().toString()
    schedule[i].month = (time.getMonth() + 1).toString()
    schedule[i].date = time.getDate().toString()
    schedule[i].hour = time.getHours().toString()
    var minute = time.getMinutes()
    if (minute < 10) {
      minute = '0' + minute
    }
    schedule[i].minute = minute.toString()
    schedule[i].day = dayNames[time.getDay()]
  }

  schedule.sort(function(a, b) {
    return a.time.getTime() - b.time.getTime()
  })

  for (var j = 0; j < schedule.length; j++) {
    if (now.getTime() < schedule[j].time.getTime()) {
      futureSchedule = schedule.slice(j)
      if (j > 0) {
        oldSchedule = schedule.slice(0, j)
      }
      break
    }
    if (j === schedule.length - 1) {
      oldSchedule = schedule
    }
  }

  var futureDate = []
  var oldDate = []
  var futureGame = []
  var oldGame = []

  for (var k = 0; k < futureSchedule.length; k++) {
    if (
      futureDate.length === 0 ||
      futureSchedule[k].date !== futureDate[futureDate.length - 1].date ||
      futureSchedule[k].month !== futureDate[futureDate.length - 1].month
    ) {
      futureDate.push(futureSchedule[k])
      futureGame.push([futureSchedule[k]])
    } else {
      futureGame[futureGame.length - 1].push(futureSchedule[k])
    }
  }

  for (var m = 0; m < oldSchedule.length; m++) {
    if (
      oldDate.length === 0 ||
      oldSchedule[m].date !== oldDate[oldDate.length - 1].date ||
      oldSchedule[m].month !== oldDate[oldDate.length - 1].month
    ) {
      oldDate.push(oldSchedule[m])
      oldGame.push([oldSchedule[m]])
    } else {
      oldGame[oldGame.length - 1].push(oldSchedule[m])
    }
  }

  return {
    schedule: schedule,
    future_date: futureDate,
    future_game: futureGame,
    old_date: oldDate,
    old_game: oldGame
  }
}

Page({
  data: {
    schedule: [],
    future_date: [],
    future_game: [],
    old_date: [],
    old_game: []
  },

  onLoad: function() {
    wx.setNavigationBarTitle({
      title: (app.globalData.GAME_NAME || '') + '赛程'
    })
  },

  loadSchedule: function() {
    wx.cloud.callFunction({
      name: 'search_future_schedule',
      data: {},
      success: (res) => {
        var raw = Array.isArray(res.result) ? res.result : []
        this.setData(splitScheduleByDate(raw))
      },
      fail: (err) => {
        console.log(err)
        app.globalData.errInfo = '赛程加载失败'
        wx.navigateTo({
          url: '../error_page/error_page'
        })
      }
    })
  },

  edit_this_game: function(e) {
    var game = e.currentTarget.dataset.game
    app.globalData.game_on_referee = game
    wx.navigateTo({
      url: '../edit_referee/edit_referee'
    })
  },

  onReady: function() {
    setTimeout(function() {
      wx.pageScrollTo({
        duration: 300,
        selector: '#text'
      })
    }, 800)
  },

  onShow: function() {
    this.loadSchedule()
  }
})
