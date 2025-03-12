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
    group:event.group,
    littlegroup:event.littlegroup
  }).get()
  let len = list.data.length
  var teams = new Array(len)
  let names = new Array(len)
  for (var i=0; i<len;i++){
    teams[i]={
      name:list.data[i].name,
      grouppoint: 0, 
      grouptotalscore: 0,
      groupnetscore: 0,
      id : i
    }
    names[i] = list.data[i].name
  }
  let arr = new Array(len)
  for (var i=0;i<len;i++){
    arr[i] = new Array(len)
    for (var j=0;j<len;j++){
      arr[i][j] = new Array(3)
    }
  }
  var cnt = 0
  for (var i=0;i<len;i++){
    for (var j=0;j<len;j++){
      var team1 = teams[i].name
      var team2 = teams[j].name
      let game = await db.collection('Schedule').where({
        group:event.group,
        littlegroup:event.littlegroup,
        home_team:team1,
        away_team:team2
      }).get()
      if (game.data.length == 0){
        continue
      }
      arr[i][j][0] = game.data[0].home_team_score
      arr[i][j][1] = game.data[0].away_team_score
      arr[i][j][2] = game.data[0].home_team_point
      arr[j][i][0] = game.data[0].away_team_score
      arr[j][i][1] = game.data[0].home_team_score
      arr[j][i][2] = game.data[0].away_team_point
    }
  }
  for (var i=0;i<len;i++){
    for (var j=0;j<len;j++){
      teams[i].grouppoint += arr[i][j][2]>=0?arr[i][j][2]:0
      teams[i].groupnetscore += arr[i][j][0]>=0?(arr[i][j][0]-arr[i][j][1]):0
      teams[i].grouptotalscore += arr[i][j][0]>=0?arr[i][j][0]:0
    }
  }
  for(var i=0;i<len;i++){
    if (names[i]=='未来-现代'){
      teams[i].name = '未现'
      names[i] = '未现'
    }
    if (names[i]=='地空-政管'){
      teams[i].name = '地政'
      names[i] = '地政'
    }
    if (names[i]=='考古-艺术'){
      teams[i].name = '考艺'
      names[i] = '考艺'
    }
    if (names[i]=='考古-政管'){
      teams[i].name = '考管'
      names[i] = '考管'
    }
    if (names[i]=='生科-历史'){
      teams[i].name = '生历'
      names[i] = '生历'
    }
    if (names[i]=='光华-经济'){
      teams[i].name = '光经'
      names[i] = '光经'
    }
    if (names[i]=='环科-哲学'){
      teams[i].name = '环哲'
      names[i] = '环哲'
    }
    if (names[i]=='教育-历史'){
      teams[i].name = '教历'
      names[i] = '教历'
    }
    if (names[i]=='集电-体教'){
      teams[i].name = '集体'
      names[i] = '集体'
    }
  }
  return {
    teams: teams,
    arr: arr,
    names: names
  }
}