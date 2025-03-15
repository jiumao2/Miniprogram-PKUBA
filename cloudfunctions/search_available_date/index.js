// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
function getdate(time){
  const nowtime = new Date(time)
  const month = nowtime.getMonth()
  const day = nowtime.getDate()
  return 10000*month+day
}
function getperiod(time){
  const nowtime = new Date(time)
  const hour = nowtime.getHours()
  const minutes = nowtime.getMinutes()
  const totalminutes = 60*(hour+8) + minutes
  if (totalminutes >= 60*12+20 && totalminutes <= 60*13+20){
    return 1
  }
  if (totalminutes >= 60*13+50 && totalminutes <= 60*14+50){
    return 2
  }
  if (totalminutes >= 60*15+20 && totalminutes <= 60*16+20){
    return 3
  }
  if (totalminutes >= 60*17+50 && totalminutes <= 60*18+50){
    return 4
  }
  if (totalminutes >= 60*19+20 && totalminutes <= 60*20+20){
    return 5
  }
  if (totalminutes >= 60*20+30){
    return 6
  }
  return 0
}

// 云函数入口函数
exports.main = async (event, context) => {
  db = cloud.database({
    env: cloud.DYNAMIC_CURRENT_ENV
  })
  const _ = db.command

  const date0 = getdate(event.date0)
  const period0 = getperiod(event.date0)
  const date1 = getdate(event.date1)
  const period1 = getperiod(event.date1)
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