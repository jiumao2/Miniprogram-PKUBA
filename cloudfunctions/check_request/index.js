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
  const date_period_new = await cloud.callFunction({
    name: "get_date_period",
    data: {time:event.new_time.time}
  })
  const date_new = date_period_new.result.date
  const period_new = date_period_new.result.period

  let count1 = await db.collection('Schedule').where({
    date: date_new,
    period: period_new
  }).get()
  let len1 = count1.data.length

  let count2 = await db.collection('Request').where({
    date: date_new,
    period: period_new,
    state: _.eq(1).or(_.gte(3))
  }).get()
  let len2 = count2.data.length
  var place_not_available = []
  for (var i=0;i<count1.data.length;i++){
    place_not_available.push(count1.data[i].place)
  }
  for (var i=0;i<count2.data.length;i++){
    place_not_available.push(count2.data[i].place_new)
  }
  if (len1+len2<event.new_time.max_game_raw) return{
    state: true,
    place_not_available: place_not_available
  }
  else return {
    state: false,
    place_not_available: place_not_available
  }

}