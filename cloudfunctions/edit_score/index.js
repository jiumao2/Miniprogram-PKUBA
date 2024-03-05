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
  
  return await db.collection('Schedule').where({
    home_team: event.home_team_raw,
    away_team: event.away_team_raw,
    group: event.group_raw
  }
  ).update(
    {
      data:{
        home_team_score: event.home_team_score,
        away_team_score: event.away_team_score,
        home_team_point: event.home_team_score<event.away_team_score?(event.is_given_up?0:1):2,
        away_team_point: event.home_team_score>event.away_team_score?(event.is_given_up?0:1):2,
        place: event.place,
        time: new Date(event.time),
        home_team: event.home_team,
        away_team: event.away_team,
        group:event.group,
        is_given_up: event.is_given_up,
        update_time: new Date()
      }
    }
  )
}