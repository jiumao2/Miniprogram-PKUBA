// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: "pkuba-1ghnzk0hcbc1edeb"
})


// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  db = cloud.database({
    env: "pkuba-1ghnzk0hcbc1edeb"
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