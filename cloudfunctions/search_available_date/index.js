// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
// 云函数入口函数
exports.main = async (event, context) => {
  db = cloud.database({
    env: cloud.DYNAMIC_CURRENT_ENV
  })
  const _ = db.command
  console.log('1')
  date_period_0 = await cloud.callFunction({
    name: "get_date_period",
    data: {time:event.date0}
  })
  console.log('1')
  date_period_1 = await cloud.callFunction({
    name: "get_date_period",
    data: {time:event.date1}
  })
  const date0 = date_period_0.result.date
  const date1 = date_period_1.result.date
  let time_not_available1 = await db.collection('Schedule').where({
    date: _.gte(date0).and(_.lte(date1))
  }).get()
  let time_not_available2 = await db.collection('Request').where({
    date_new: _.gte(date0).and(_.lte(date1)),
    state: _.eq(1).or(_.gte(3))
  }).get()

  var all = []
  for (var i=0;i<time_not_available1.data.length;i++){
    all.push({
      time: new Date(time_not_available1.data[i].time),
      place: time_not_available1.data[i].place,
    })
  }
  for (var i=0;i<time_not_available2.data.length;i++){
    all.push({
      time: new Date(time_not_available2.data[i].time_new),
      place: time_not_available2.data[i].place_new
    })
  }
  return all

}