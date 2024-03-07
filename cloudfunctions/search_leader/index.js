// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  db = cloud.database({
    env: cloud.DYNAMIC_CURRENT_ENV
  })
  
  const _ = db.command

  return await db.collection('Leader').where(
  {
    openID: wxContext.OPENID
  }
  ).get()
}