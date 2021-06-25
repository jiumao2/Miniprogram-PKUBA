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

  return db.collection('Leader').where(
  {
    openID: wxContext.OPENID
  }
  ).get()
}