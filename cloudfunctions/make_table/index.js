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
  var names = new Array()
  let len = list.data.length
  for (var i=0; i<len;i++){
    names.push(list.data[i].name)
  }
  let arr = new Array(len)
  for (var i=0;i<len;i++){
    arr[i] = new Array(len)
    for (var j=0;j<len;j++){
      arr[i][j] = new Array(2)
    }
  }
  var cnt = 0
  for (var i=0;i<len;i++){
    for (var j=0;j<len;j++){
      var team1 = names[i]
      var team2 = names[j]
      let game = await db.collection('Schedule').where({
        home_team:team1,
        away_team:team2
      }).get()
      if (game.data.length == 0){
        continue
      }
      arr[i][j][0] = game.data[0].home_team_score
      arr[i][j][1] = game.data[0].away_team_score
      arr[j][i][0] = game.data[0].away_team_score
      arr[j][i][1] = game.data[0].home_team_score
    }
  }
  return {
    list:list ,
    names:names,
    arr: arr,
  }
}