// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})


// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  db = cloud.database({
    env: cloud.DYNAMIC_CURRENT_ENV
  })
  const _ = db.command
  date_period_new = await cloud.callFunction({
    name: "get_date_period",
    data: {time:event.request.time_new}
  })
  const date_new = date_period_new.result.date
  const period_new = date_period_new.result.period
  if (event.to_delete){
    await db.collection('Request').doc(event.request._id).remove()
  }
  else{
    await db.collection('Request').doc(event.request._id).update({
      data:{
        state: event.new_state,
        is_reviewed: event.is_reviewed,
        reviewed_by: event.reviewed_by,
        reviewed_time: new Date(),
        notes: event.notes,
        to_vote_in_same_group: event.to_vote_in_same_group,
        teams_to_vote: event.teams_to_vote,
        voted_accept: event.voted_accept,
        voted_reject: event.voted_reject
      }
    })    
  }

  if (event.new_state==2){
    await db.collection('Schedule').doc(event.request.game_id).update({
      data:{
        time: new Date(event.request.time_new),
        place: event.request.place_new,
        adjustable: true,
        period: period_new,
        date: date_new
      }
    })
  }
  else{
    await db.collection('Schedule').doc(event.request.game_id).update({
      data:{
        adjustable: true      
      }
    })    
  }

}