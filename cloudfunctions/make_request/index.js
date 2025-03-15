// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
function getdate(time){
  const nowtime = new Date(time)
  const month = nowtime.getMonth()
  const day = nowtime.getDate()
  return 10000*month+day
}
function getperiod(time){
  const nowtime = new Date(time)
  const hour = nowtime.getUTCHours()+8
  const minutes = nowtime.getMinutes()
  const totalminutes = 60*hour + minutes
  if (totalminutes >= 60*12+20 && totalminutes <= 60*13+20){
    return 1
  }
  if (totalminutes >= 60*13+50 && totalminutes <= 60*14+50){
    return 2
  }
  if (totalminutes >= 60*15+20 && totalminutes <= 60*16+20){
    return 3
  }
  if (totalminutes >= 60*17+50 && totalminutes <= 60*18+50){
    return 4
  }
  if (totalminutes >= 60*19+20 && totalminutes <= 60*20+20){
    return 5
  }
  if (totalminutes >= 60*20+30){
    return 6
  }
  return 0
}

// 云函数入口函数
exports.main = async (event, context) => {
  db = cloud.database({
    env: cloud.DYNAMIC_CURRENT_ENV
  })
  const _ = db.command
  const date = getdate(event.game.time)
  const period = getperiod(event.game.time)
  const date_new = getdate(event.new_time.time)
  const period_new = getperiod(event.new_time.time)
  if (event.type == 1 || event.type == 3){
    await db.collection('Request').add({
      data: {
        "place_new": event.place_new,
        "request_time": new Date(),
        "type": event.type,
        "group":event.game.group,
        "home_team":event.game.home_team,
        "requester": event.requester,
        "sex":event.game.sex,
        "state": 1,
        "time": new Date(event.game.time),
        "time_new": new Date(event.new_time.time),
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
        "period": period,
        "period_new": period_new,
        "date": date,
        "date_new": date_new
      }      
      })
  }
  else if (event.type == 2){
    await db.collection('Request').add({
      data: {
        "place_new": '无',
        "request_time": new Date(),
        "type": event.type,
        "group":event.game.group,
        "home_team":event.game.home_team,
        "requester": event.requester,
        "sex":event.game.sex,
        "state": 3,
        "time": new Date(event.game.time),
        "time_new": '无',
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
        "period": period,
        "period_new": '无',
        "date": date,
        "date_new": '无'
      }      
      })
  }

  await db.collection('Schedule').doc(event.game._id).update({
    data:{
      adjustable: false
    }
  })

}