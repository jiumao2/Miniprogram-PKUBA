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
  const date_period = (await cloud.callFunction({
    name:"get_date_period",
    data:{time:event.time}
  })).result
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
        home_team_point: event.home_team_score<event.away_team_score?(event.is_given_up?0:1):((event.away_team_score<0)?0:2),
        away_team_point: event.home_team_score>event.away_team_score?(event.is_given_up?0:1):((event.home_team_score<0)?0:2),
        place: event.place,
        time: new Date(event.time),
        period: date_period.period,
        date: date_period.date,
        home_team: event.home_team,
        away_team: event.away_team,
        group:event.group,
        is_given_up: event.is_given_up,
        adjustable: event.adjustable,
        description: event.description,
        update_time: new Date(),
        updated_by: event.updated_by
      }
    }
  )
}