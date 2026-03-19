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
  let teams = list.data.map(team => ({
    name: team.name,
    grouppoint: 0,
    grouptotalscore: 0,
    groupnetscore: 0,
    id: team.id-1
  })).sort((a,b)=>(a.id-b.id))
  
  let names = teams.map(team => team.name)

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
    '光华-经济':'光经',
    '历史-哲学':'历哲',
    '心理-城环':'心城',
    '社会-信管':'社信',
    '生科-历史':'生历',
    '社会-政管':'社政',
    '工学-材料':'工材',
    '力工-先机':'力先',
    '中文-艺术':'中艺',
    '地空-集电':'地集',
    '环科-哲学':'环哲',
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