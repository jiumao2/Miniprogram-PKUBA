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
  db.collection('Leader').add({
    data: {
      name: event.name,
      sex:event.sex,
      group:event.group,
      register_date: new Date(),
      team: event.team,
      openID: wxContext.OPENID,
    }
  })

}