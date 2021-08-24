// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: "pkuba-9gkc109xc039fc34"
})

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  if (!event.name || !event.team || !event.group || !event.email){
    return {
      total: 2,
      info: "wrong info",
    }
  }
  db = cloud.database({
    env: "pkuba-9gkc109xc039fc34"
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