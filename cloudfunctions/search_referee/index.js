const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

exports.main = async () => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database({
    env: cloud.DYNAMIC_CURRENT_ENV
  })

  return await db.collection('Referee').where({
    openID: wxContext.OPENID
  }).get()
}
