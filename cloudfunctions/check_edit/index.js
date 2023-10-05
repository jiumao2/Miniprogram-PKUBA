// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: "pkuba-1ghnzk0hcbc1edeb"
})

// 云函数入口函数
<<<<<<< Updated upstream
=======
var sb = 1
>>>>>>> Stashed changes
exports.main = async (event, context) => {
  db = cloud.database({
    env: "pkuba-1ghnzk0hcbc1edeb"
  })
  return await db.collection('Schedule').where({
    home_team: event.team1,
    away_team: event.team2
  }).get()
}