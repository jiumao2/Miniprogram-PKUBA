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

  const date0 = new Date(event.date0)
  const temp_date1 = new Date(event.date1)
  const date1 = new Date(temp_date1.getFullYear(),temp_date1.getMonth(),temp_date1.getDate(),24,0,0)
  let time_not_available1 = await db.collection('Schedule').where({
    time: _.gte(date0).and(_.lte(date1))
  }).get()
  let time_not_available2 = await db.collection('Request').where({
    time_new: _.gte(date0).and(_.lte(date1)),
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