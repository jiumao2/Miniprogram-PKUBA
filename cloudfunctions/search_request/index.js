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
  const _ = db.command
  
  return await db.collection('Request').where(_.and([
    {group: event.group},
     _.or([
      {home_team: event.team},
      {away_team: event.team},
      _.and([
        {to_vote_in_same_group: true},
        {teams_to_vote: event.team}
      ])
      ])
    ])).get()

}