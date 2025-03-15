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
  const hour = nowtime.getUTCHours()+8
  const minutes = nowtime.getMinutes()
  const totalminutes = 60*hour+8 + minutes
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
  const date_new = getdate(event.new_time.time)
  const period_new = getperiod(event.new_time.time)

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
  for (var i =0;i<count1.data.length;i++){
    place_not_available.push(count1.data[i].place)
  }
  for (var i =0;i<count2.data.length;i++){
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