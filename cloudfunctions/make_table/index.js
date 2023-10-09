// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  db = cloud.database({
    env: "pkuba-1ghnzk0hcbc1edeb"
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
      point: 0,
      totalscore: 0,
      netscore: 0,
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
      teams[i].point += arr[i][j][2]>=0?arr[i][j][2]:0
      teams[i].netscore += arr[i][j][0]>=0?(arr[i][j][0]-arr[i][j][1]):0
      teams[i].totalscore += arr[i][j][0]>=0?arr[i][j][2]:0
    }
  }
  return {
    teams: teams,
    arr: arr,
    names: names
  }
}