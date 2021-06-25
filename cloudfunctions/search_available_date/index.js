// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: "pkuba-9gkc109xc039fc34"
})


// 云函数入口函数
exports.main = async (event, context) => {
  db = cloud.database({
    env: "pkuba-9gkc109xc039fc34"
  })
  const _ = db.command

  const date0 = new Date(event.date0)
  const date1 = new Date(event.date1)
  let time_not_available1 = await db.collection('Schedule').where({
    time: _.gte(date0).and(_.lte(date1))
  }).get()
  let time_not_available2 = await db.collection('Request').where({
    time_new: _.gte(date0).and(_.lte(date1)),
    state: _.eq(1).or(_.eq(2))
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