var app = getApp()

function formatGameTime(game) {
  if (!game || !game.time) return ''
  var time = new Date(game.time)
  if (isNaN(time.getTime())) return ''
  var month = (time.getMonth() + 1).toString().padStart(2, '0')
  var date = time.getDate().toString().padStart(2, '0')
  var hour = time.getHours().toString().padStart(2, '0')
  var minute = time.getMinutes().toString().padStart(2, '0')
  return month + '-' + date + ' ' + hour + ':' + minute
}

function formatDateTime(value) {
  if (!value) return ''
  var time = new Date(value)
  if (isNaN(time.getTime())) return ''
  var year = time.getFullYear().toString()
  var month = (time.getMonth() + 1).toString().padStart(2, '0')
  var date = time.getDate().toString().padStart(2, '0')
  var hour = time.getHours().toString().padStart(2, '0')
  var minute = time.getMinutes().toString().padStart(2, '0')
  var second = time.getSeconds().toString().padStart(2, '0')
  return year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second
}

function getRefereeUpdateText(game) {
  if (!game) return '\u6682\u65e0\u88c1\u5224\u4fee\u6539\u8bb0\u5f55'
  var name = game.referee_updated_by || game.updated_by || ''
  var timeText = formatDateTime(game.referee_update_time || game.update_time)
  if (!name || !timeText) {
    return '\u6682\u65e0\u88c1\u5224\u4fee\u6539\u8bb0\u5f55'
  }
  return '\u6700\u8fd1\u7531' + name + '\u4e8e' + timeText + '\u4fee\u6539'
}

Page({
  data: {
    loading: false,
    game_raw: null,
    game_info: '',
    referee_update_text: '',
    CC: '',
    U1: '',
    U2: '',
    Recorder: '',
    Timer: '',
    ShotClock24: ''
  },

  bind_input_change: function(e) {
    var field = e.currentTarget.dataset.field
    this.setData({
      [field]: e.detail.value
    })
  },

  save_referee: function() {
    if (this.data.loading) return
    if (!this.data.game_raw || !this.data.game_raw._id) {
      app.globalData.errInfo = '比赛信息缺失'
      wx.navigateTo({
        url: '../error_page/error_page'
      })
      return
    }

    this.setData({
      loading: true
    })

    wx.cloud.callFunction({
      name: 'update_referee',
      data: {
        game_id: this.data.game_raw._id,
        CC: (this.data.CC || '').trim(),
        U1: (this.data.U1 || '').trim(),
        U2: (this.data.U2 || '').trim(),
        Recorder: (this.data.Recorder || '').trim(),
        Timer: (this.data.Timer || '').trim(),
        ShotClock24: (this.data.ShotClock24 || '').trim(),
        updated_by: app.globalData.manager_info ? app.globalData.manager_info.name : ''
      },
      success: () => {
        wx.showToast({
          title: '保存成功',
          icon: 'success'
        })
        setTimeout(function() {
          wx.navigateBack()
        }, 300)
      },
      fail: (err) => {
        console.log(err)
        this.setData({
          loading: false
        })
        app.globalData.errInfo = '裁判安排保存失败'
        wx.navigateTo({
          url: '../error_page/error_page'
        })
      }
    })
  },

  onLoad: function() {
    var gameRaw = app.globalData.game_on_referee || null
    if (!gameRaw) {
      app.globalData.errInfo = '比赛信息缺失'
      wx.navigateTo({
        url: '../error_page/error_page'
      })
      return
    }

    this.setData({
      game_raw: gameRaw,
      game_info: formatGameTime(gameRaw) + '  ' + gameRaw.home_team + ' VS ' + gameRaw.away_team,
      referee_update_text: getRefereeUpdateText(gameRaw),
      CC: gameRaw.CC || '',
      U1: gameRaw.U1 || '',
      U2: gameRaw.U2 || '',
      Recorder: gameRaw.Recorder || '',
      Timer: gameRaw.Timer || '',
      ShotClock24: gameRaw.ShotClock24 || ''
    })
  },

  onShow: function() {
    this.setData({
      loading: false
    })
  }
})
