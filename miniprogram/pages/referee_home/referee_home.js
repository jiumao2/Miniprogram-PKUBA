var app = getApp()

function normalizeName(value) {
  return (value || '').trim()
}

function formatScheduleByDate(rawSchedule, refereeName) {
  var schedule = Array.isArray(rawSchedule) ? rawSchedule : []
  var nowPrecise = new Date()
  var now = new Date(nowPrecise.getFullYear(), nowPrecise.getMonth(), nowPrecise.getDate())
  var dayName = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
  var futureSchedule = []
  var oldSchedule = []

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
    schedule[i].day = dayName[time.getDay()].toString()

    var role = []
    if (normalizeName(schedule[i].CC) === refereeName) role.push('CC')
    if (normalizeName(schedule[i].U1) === refereeName) role.push('U1')
    if (normalizeName(schedule[i].U2) === refereeName) role.push('U2')
    if (normalizeName(schedule[i].Recorder) === refereeName) role.push('\u8bb0\u5f55')
    if (normalizeName(schedule[i].Timer) === refereeName) role.push('\u8ba1\u65f6')
    if (normalizeName(schedule[i].ShotClock24) === refereeName) role.push('24\u79d2')
    schedule[i].my_role = role.join('/')
    schedule[i].referee_text =
      'CC:' + (schedule[i].CC || '-') +
      '  U1:' + (schedule[i].U1 || '-') +
      '  U2:' + (schedule[i].U2 || '-')
    schedule[i].staff_text =
      '\u8bb0\u5f55:' + (schedule[i].Recorder || '-') +
      '  \u8ba1\u65f6:' + (schedule[i].Timer || '-') +
      '  24\u79d2:' + (schedule[i].ShotClock24 || '-')
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
    loading: true,
    name: '',
    schedule: [],
    future_date: [],
    future_game: [],
    old_date: [],
    old_game: []
  },

  onLoad: function() {
    wx.setNavigationBarTitle({
      title: '裁判安排'
    })
    this.loadMySchedule()
  },

  loadMySchedule: function() {
    var refereeName = normalizeName(app.globalData.referee_info && app.globalData.referee_info.name)
    if (!refereeName) {
      app.globalData.errInfo = '裁判信息缺失，请重新登录'
      wx.navigateTo({
        url: '../error_page/error_page'
      })
      return
    }

    this.setData({
      loading: true,
      name: refereeName
    })

    wx.cloud.callFunction({
      name: 'search_referee_schedule',
      data: {
        name: refereeName
      },
      success: (res) => {
        var result = formatScheduleByDate(res.result, refereeName)
        this.setData({
          loading: false,
          schedule: result.schedule,
          future_date: result.future_date,
          future_game: result.future_game,
          old_date: result.old_date,
          old_game: result.old_game
        })
      },
      fail: (err) => {
        console.log(err)
        this.setData({
          loading: false
        })
        app.globalData.errInfo = '裁判安排加载失败'
        wx.navigateTo({
          url: '../error_page/error_page'
        })
      }
    })
  },

  onShow: function() {
    this.loadMySchedule()
  },

  onReady: function() {
    setTimeout(function() {
      wx.pageScrollTo({
        duration: 300,
        selector: '#text'
      })
    }, 600)
  }
})
