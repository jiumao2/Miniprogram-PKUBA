//app.js
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      })
    }

    this.globalData = {
      TEAMS: [
        ["生科","化学","法学","信科"],
        ["医学","中文","元培","光华"]],
      PLACE_NAMES: ['五四东一','五四东二','五四东三'],
      GROUP_NAMES: ['男篮','女篮'],
      MAX_GAMES_NUM: [
        [{hour:10,minute:50,max_game:2},{hour:12,minute:50,max_game:3},{hour:12,minute:50,max_game:3},{hour:12,minute:50,max_game:3}],
        [{hour:12,minute:50,max_game:2}],
        [{hour:12,minute:50,max_game:2}],
        [{hour:12,minute:50,max_game:2}],
        [{hour:12,minute:50,max_game:2}],
        [{hour:12,minute:50,max_game:2}],
        [{hour:10,minute:50,max_game:2},{hour:12,minute:50,max_game:3},{hour:12,minute:50,max_game:3},{hour:12,minute:50,max_game:3}],
      ],
      ROUND_START_DAY: 1,
      ROUND_END_DAY: 1,
    }
  }
})
