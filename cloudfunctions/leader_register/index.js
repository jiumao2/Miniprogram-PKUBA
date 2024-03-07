// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  await db.collection('Leader').add({
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