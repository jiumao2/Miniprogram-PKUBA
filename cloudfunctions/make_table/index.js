// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  db = cloud.database({
    env: cloud.DYNAMIC_CURRENT_ENV
  })
  let list = await db.collection('Team').where({
    group: event.group,
    littlegroup: event.littlegroup
  }).get()

  let len = list.data.length
  let teams = list.data.map((team, i) => ({
    name: team.name,
    grouppoint: 0,
    grouptotalscore: 0,
    groupnetscore: 0,
    id: i
  }))
  let names = list.data.map(team => team.name)

  let arr = Array.from({ length: len }, () =>
    Array.from({ length: len }, () => Array(3).fill(0))
  )

  let allGames = await db.collection('Schedule').where({
    group: event.group,
    littlegroup: event.littlegroup
  }).get()

  let gameMap = new Map()
  allGames.data.forEach(game => {
    gameMap.set(`${game.home_team}-${game.away_team}`, game)
  })

  for (var i = 0; i < len; i++) {
    for (var j = 0; j < len; j++) {
      if (i == j) continue
      let key = `${teams[i].name}-${teams[j].name}`
      let game = gameMap.get(key)
      if (!game) continue

      arr[i][j][0] = game.home_team_score
      arr[i][j][1] = game.away_team_score
      arr[i][j][2] = game.home_team_point
      arr[j][i][0] = game.away_team_score
      arr[j][i][1] = game.home_team_score
      arr[j][i][2] = game.away_team_point
    }
  }

  for (var i = 0; i < len; i++) {
    for (var j = 0; j < len; j++) {
      let score0 = arr[i][j][0]
      let score1 = arr[i][j][1]
      let point = arr[i][j][2]

      teams[i].grouppoint += point >= 0 ? point : 0
      teams[i].groupnetscore += score0 >= 0 ? (score0 - score1) : 0
      teams[i].grouptotalscore += score0 >= 0 ? score0 : 0
    }
  }

  const nameMap = {
    '未来-现代': '未现',
    '地空-政管': '地政',
    '考古-艺术': '考艺',
    '考古-政管': '考管',
    '生科-历史': '生历',
    '光华-经济': '光经',
    '环科-哲学': '环哲',
    '教育-历史': '教历',
    '集电-体教': '集体'
  }

  for (var i = 0; i < len; i++) {
    if (nameMap[names[i]]) {
      teams[i].name = nameMap[names[i]]
      names[i] = nameMap[names[i]]
    }
  }

  return {
    teams: teams,
    arr: arr,
    names: names
  }
}