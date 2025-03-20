// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  db = cloud.database({
    env: cloud.DYNAMIC_CURRENT_ENV
  })
  const batchsize = 50
  let skip = 0
  let hasmore = true
  while (hasmore){
    const schedules = (await db.collection("Schedule").skip(skip).limit(batchsize).get()).data
    var lst = []
    var l = schedules.length
    for (let i=0; i<l; ++i){
      lst.push([schedules[i].home_team,schedules[i].away_team])
      var res = (await cloud.callFunction({
        name: "get_date_period",
        data: {time:schedules[i].time}
      })).result
      let date = res.date
      let period = res.period
      db.collection("Schedule").doc(schedules[i]._id).update({
        data:{
        date:date,
        period:period,
        }
      })
    }
    skip += batchsize
    hasmore = (l == batchsize)
  }
  return {lst:lst,l:skip}
}