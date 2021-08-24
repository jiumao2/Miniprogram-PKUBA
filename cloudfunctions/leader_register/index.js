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
  db.collection('Leader').add({
    data: {
      name: event.name,
      email:event.email,
      sex:event.sex,
      group:event.group,
      register_date: new Date(),
      team: event.team,
      openID: wxContext.OPENID,
    }
  })

}