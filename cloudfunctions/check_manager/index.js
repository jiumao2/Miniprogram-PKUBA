// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  if (!event.name){
    return {
      total: 2,
      info: "wrong info",
    }
  }

  db = cloud.database({
    env: cloud.DYNAMIC_CURRENT_ENV
  })
  
  const _ = db.command

  return db.collection('Manager').where(
  {
    openID: wxContext.OPENID
  }).count()
}