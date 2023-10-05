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
      GAME_NAME: '新生杯',
      TEAMS: [
        ['城环','地空','法学','工学','光华','国关','化学','环科','经济','历哲','生科','数学','外院','物理','信管','信科','医学','元培','政管','中新'],
        ['城环','地空','法学','光经','国关','化学','环科','马院','社会','生历','外院','心理','新传','信管','信科','医学','艺哲','元培','政管','中文','物理']
      ],
      PLACE_NAMES: ['五四东一','五四东二','五四东三'],
      GROUP_NAMES: ['男篮','女篮'],
      LITTLEGROUPS: ['A','B','C','D'],
      GROUP_SEX: [true,false],
      MAX_GAMES_NUM: [
        [{hour:12,minute:50,max_game:3},{hour:14,minute:20,max_game:3},{hour:15,minute:50,max_game:3},{hour:18,minute:20,max_game:2},{hour:19,minute:50,max_game:2}],
        [{hour:12,minute:50,max_game:1},{hour:20,minute:40,max_game:1}],
        [{hour:12,minute:50,max_game:1},{hour:20,minute:40,max_game:1}],
        [{hour:12,minute:50,max_game:1},{hour:20,minute:40,max_game:1}],
        [{hour:12,minute:50,max_game:1},{hour:20,minute:40,max_game:1}],
        [{hour:12,minute:50,max_game:1},{hour:20,minute:40,max_game:1}],
        [{hour:12,minute:50,max_game:3},{hour:14,minute:20,max_game:3},{hour:15,minute:50,max_game:3},{hour:18,minute:20,max_game:2},{hour:19,minute:50,max_game:2}],
      ],
      ROUND_START_DAY: 1,
      ROUND_END_DAY: 7,
      TYPES: ['普通调整','抽签','跨周调整'],
      STATE: ['拒绝','等待领队确认','通过','抽签申请中','审核中']
    }
  }
})
