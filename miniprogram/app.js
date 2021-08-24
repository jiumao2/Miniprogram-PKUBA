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
        ["化院","生中","环科","工学","政管","城环","法学","外院","新传","数学","历史","信管","经济","社哲","医学","心理","元培","国关","物理","信科","光华"],
        ["信科","艺哲","元培","新传","城环","政管","法学","社会","化院","外院","心理","国关","物理","地空","中文","医学","光经","信管"]],
      PLACE_NAMES: ['五四东一','五四东二','五四东三'],
      GROUP_NAMES: ['男篮','女篮'],
      MAX_GAMES_NUM: [
        [{hour:10,minute:50,max_game:2},{hour:12,minute:50,max_game:3},{hour:14,minute:20,max_game:3},{hour:15,minute:50,max_game:3}],
        [{hour:12,minute:50,max_game:2}],
        [{hour:12,minute:50,max_game:2}],
        [{hour:12,minute:50,max_game:2}],
        [{hour:12,minute:50,max_game:2}],
        [{hour:12,minute:50,max_game:2}],
        [{hour:10,minute:50,max_game:2},{hour:12,minute:50,max_game:3},{hour:14,minute:20,max_game:3},{hour:15,minute:50,max_game:3}],
      ],
      ROUND_START_DAY: 1,
      ROUND_END_DAY: 1,
      TYPES: ['普通调整','抽签','跨轮次调整'],
      STATE: ['拒绝','等待确认','通过','抽签申请中','审核中']
    }
  }
})
