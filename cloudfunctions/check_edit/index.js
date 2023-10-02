// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: "pkuba-1ghnzk0hcbc1edeb"
})

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  if (event.team1==event.team2){
    return {
      total: 2,
      info: "wrong info",
    }
  }
  db = cloud.database({
    env: "pkuba-1ghnzk0hcbc1edeb"
  })
  
  const _ = db.command

  return db.collection('Leader').where(_.or([{
    team: event.team,
    sex: event.sex
  },
  {
    openID: wxContext.OPENID
  }
  ])).count()
}