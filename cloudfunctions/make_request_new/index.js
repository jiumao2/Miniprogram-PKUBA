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
  if (event.type == 1 || event.type == 3){
    await db.collection('Request').add({
      data: {
        "time": new Date(event.game.time),
        "date": event.game.date,
        "period": event.game.period,
        "time_new": new Date(event.time_new),
        "date_new": event.date_new,
        "period_new": event.period_new,
        "place_new": event.place_new,
        "request_time": new Date(),
        "type": event.type,
        "group":event.game.group,
        "home_team":event.game.home_team,
        "requester": event.requester,
        "sex":event.game.sex,
        "state": 1,
        "away_team": event.game.away_team,
        "place": event.game.place,
        "game_id": event.game._id,
        "notes": '',
        "is_reviewed": false,
        "reviewed_by": '',
        "reviewed_time": new Date(),
        "to_vote_in_same_group": false,
        "teams_to_vote": [],
        "voted_accept": [],
        "voted_reject": [],
      }      
      })
  }
  else if (event.type == 2){
    await db.collection('Request').add({
      data: {
        "time": new Date(event.game.time),
        "date": event.game.date,
        "period": event.game.period,
        "time_new": '无',
        "date_new": '无',
        "period_new": '无',
        "place_new": '无',
        "request_time": new Date(),
        "type": event.type,
        "group":event.game.group,
        "home_team":event.game.home_team,
        "requester": event.requester,
        "sex":event.game.sex,
        "state": 3,
        "away_team": event.game.away_team,
        "place": event.game.place,
        "game_id": event.game._id,
        "notes": '',
        "is_reviewed": false,
        "reviewed_by": '',
        "reviewed_time": new Date(),
        "to_vote_in_same_group": false,
        "teams_to_vote": [],
        "voted_accept": [],
        "voted_reject": [],
      }      
      })
  }

  await db.collection('Schedule').doc(event.game._id).update({
    data:{
      adjustable: false
    }
  })
  return 
}