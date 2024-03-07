// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()

  await db.collection('Photo').add({
    data:{
      creator: event.creator,
      create_time: new Date(),
      fileID: event.fileID,
      home_team: event.home_team,
      away_team: event.away_team,
      group: event.group,
      time: new Date(event.time)
    }
  })

}