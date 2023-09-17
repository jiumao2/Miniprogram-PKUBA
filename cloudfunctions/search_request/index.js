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
  const _ = db.command
  
  return db.collection('Request').where(_.and([{
    group: event.group
  },
  _.or([{
    home_team:event.team
  },{
    away_team:event.team
  }])])).get()

}