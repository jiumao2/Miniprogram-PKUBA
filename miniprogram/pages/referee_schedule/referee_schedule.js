var app = getApp()

function normalizeName(value) {
  return (value || '').trim()
}

function decodeName(value) {
  var raw = normalizeName(value)
  if (!raw) return ''

  var candidates = [raw]
  if (raw.indexOf(',') >= 0) {
    // Some malformed query strings lose '%' and become ',E8%B0...'
    candidates.push(raw.replace(/,/g, '%'))
  }

  for (var i = 0; i < candidates.length; i++) {
    var current = candidates[i]
    try {
      var decoded = decodeURIComponent(current)
      // handle double-encoded cases
      try {
        var decodedAgain = decodeURIComponent(decoded)
        if (decodedAgain !== decoded) decoded = decodedAgain
      } catch (e2) {}
      return normalizeName(decoded)
    } catch (e) {
      // ignore and try next
    }
  }

  return raw
}

function formatScheduleByDate(rawSchedule, refereeName) {
  var schedule = Array.isArray(rawSchedule) ? rawSchedule : []
  var nowPrecise = new Date()
  var now = new Date(nowPrecise.getFullYear(), nowPrecise.getMonth(), nowPrecise.getDate())
  var dayName = [
    '\u5468\u65e5',
    '\u5468\u4e00',
    '\u5468\u4e8c',
    '\u5468\u4e09',
    '\u5468\u56db',
    '\u5468\u4e94',
    '\u5468\u516d'
  ]
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
    loading: false,
    queried: false,
    referee_name: '',
    schedule: [],
    future_date: [],
    future_game: [],
    old_date: [],
    old_game: []
  },

  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '\u88c1\u5224\u5b89\u6392\u67e5\u8be2'
    })
    var managerName = decodeName(app.globalData.manager_info && app.globalData.manager_info.name)
    var fromManagerName = decodeName(options && options.name)
    var cachedName = decodeName(wx.getStorageSync('referee_name'))
    var defaultName = managerName || fromManagerName || cachedName
    if (defaultName) {
      this.setData({
        referee_name: defaultName
      })
    }
  },

  bind_name_change: function(e) {
    this.setData({
      referee_name: e.detail.value
    })
  },

  search_my_games: function() {
    var refereeName = decodeName(this.data.referee_name)
    if (!refereeName) {
      wx.showToast({
        title: '\u8bf7\u8f93\u5165\u59d3\u540d',
        icon: 'none'
      })
      return
    }
    if (refereeName !== this.data.referee_name) {
      this.setData({
        referee_name: refereeName
      })
    }

    this.setData({
      loading: true
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
          queried: true,
          schedule: result.schedule,
          future_date: result.future_date,
          future_game: result.future_game,
          old_date: result.old_date,
          old_game: result.old_game
        })
        wx.setStorageSync('referee_name', refereeName)
      },
      fail: (err) => {
        console.log(err)
        this.setData({
          loading: false
        })
        app.globalData.errInfo = '\u88c1\u5224\u5b89\u6392\u52a0\u8f7d\u5931\u8d25'
        wx.navigateTo({
          url: '../error_page/error_page'
        })
      }
    })
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
