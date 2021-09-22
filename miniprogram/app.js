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
        ['信科', '元培', '光经', '化学', '医学', '国关', '外院', '心哲', '政管', '数地', '新城', '法社', '物理', '环科', '生历','工学','中艺'],
        ['中文', '信科', '信管', '元培', '化学', '医学', '国关', '地空', '城环', '外院', '心理', '政管', '新传', '法学', '物理', '生历', '社会', '艺哲']],
      PLACE_NAMES: ['五四东一','五四东二','五四东三'],
      GROUP_NAMES: ['男篮','女篮'],
      MAX_GAMES_NUM: [
        [{hour:12,minute:50,max_game:3},{hour:14,minute:20,max_game:3},{hour:15,minute:50,max_game:3},{hour:18,minute:20,max_game:2},{hour:19,minute:50,max_game:2}],
        [{hour:12,minute:50,max_game:1},{hour:20,minute:20,max_game:1}],
        [{hour:12,minute:50,max_game:1},{hour:20,minute:20,max_game:1}],
        [{hour:12,minute:50,max_game:1},{hour:20,minute:20,max_game:1}],
        [{hour:12,minute:50,max_game:1},{hour:20,minute:20,max_game:1}],
        [{hour:12,minute:50,max_game:1},{hour:20,minute:20,max_game:1}],
        [{hour:12,minute:50,max_game:3},{hour:14,minute:20,max_game:3},{hour:15,minute:50,max_game:3},{hour:18,minute:20,max_game:2},{hour:19,minute:50,max_game:2}],
      ],
      ROUND_START_DAY: 1,
      ROUND_END_DAY: 1,
      TYPES: ['普通调整','抽签','跨轮次调整'],
      STATE: ['拒绝','等待确认','通过','抽签申请中','审核中']
    }
  }
})
