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
  const totalminutes = 60*hour + minutes
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
  const wxContext = cloud.getWXContext()
  db = cloud.database({
    env: cloud.DYNAMIC_CURRENT_ENV
  })
  const _ = db.command

  if (event.to_delete){
    await db.collection('Request').doc(event.request._id).remove()
  }
  else{
    await db.collection('Request').doc(event.request._id).update({
      data:{
        state: event.new_state
      }
    })    
  }
  date_new = getdate(event.request.time_new)
  period_new = getperiod(event.request.time_new)
  if (event.new_state==2){
    await db.collection('Schedule').doc(event.request.game_id).update({
      data:{
        time: new Date(event.request.time_new),
        place: event.request.place_new,
        adjustable: true,
        date: date_new,
        period: period_new
      }
    })
  }
  else if (event.new_state == 0){
    await db.collection('Schedule').doc(event.request.game_id).update({
      data:{
        adjustable: true      
      }
    })    
  }

}