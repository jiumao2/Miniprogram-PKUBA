// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: "pkuba-9gkc109xc039fc34"
})


// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  db = cloud.database({
    env: "pkuba-9gkc109xc039fc34"
  })
  const _ = db.command
  const MAX_LIMIT = 100
  db.collection('Request').add({
    data: {
      "place_new": event.place_new,
      "request_time": new Date(),
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
    }
  )
  db.collection('Schedule').doc(event.game._id).update({
    data:{
      adjustable: false
    }
  })

}