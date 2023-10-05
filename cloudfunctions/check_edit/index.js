// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: "pkuba-1ghnzk0hcbc1edeb"
})

// 云函数入口函数
exports.main = async (event, context) => {
  db = cloud.database({
    env: "pkuba-1ghnzk0hcbc1edeb"
  })
  if (event.score1==event.score2){
    return false
  }
  if (event.giveup){
    if ((event.score1==0&&event.score2==20)|(event.score1==20&&event.score2==0)){
      return true
    }
    else {
      return false
    }
  }
  let game = await db.collection('Schedule').where({
    home_team: event.team1,
    away_team: event.team2
  }).get()
  if (game.data.length==0){
    return false
  }
  else {
    return true
  }
  
}