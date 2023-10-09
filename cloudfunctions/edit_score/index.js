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
  
  return await db.collection('Schedule').where({
    home_team: event.team1,
    away_team: event.team2
  }
  ).update(
    {
      data:{
        home_team_score: event.score1,
        away_team_score: event.score2,
        home_team_point: event.score1<event.score2?(event.giveup?0:1):2,
        away_team_point: event.score1>event.score2?(event.giveup?0:1):2
      }
    }
  )
}