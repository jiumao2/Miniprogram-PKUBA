// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  db = cloud.database({
    env: cloud.DYNAMIC_CURRENT_ENV
  })
  // if (event.score1==event.score2){
  //   return false
  // }
  if (event.is_given_up){
    if ((event.home_team_score==0&&event.away_team_score==20)|(event.home_team_score==20&&event.away_team_score==0)){
      return true
    }
    else {
      return false
    }
  }
  let game = await db.collection('Schedule').where({
    home_team: event.home_team_raw,
    away_team: event.away_team_raw,
    group: event.group_raw
  }).get()
  if (game.data.length==0){
    return false
  }
  else {
    return true
  }
  
}