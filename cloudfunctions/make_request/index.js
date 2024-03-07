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
        "game_id": event.game._id
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
        "game_id": event.game._id
      }      
      })
  }

  await db.collection('Schedule').doc(event.game._id).update({
    data:{
      adjustable: false
    }
  })

}