// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  db = cloud.database({
    env: cloud.DYNAMIC_CURRENT_ENV
  })
  db.collection('Schedule').where({
    home_team_score: -1
  }
  ).update(
    {
      data:{
        home_team_point: 0,
        away_team_point: 0
      }
    }
  )
}