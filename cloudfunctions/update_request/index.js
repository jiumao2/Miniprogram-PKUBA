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

  if (event.to_delete){
    db.collection('Request').doc(event.request._id).remove()
  }
  else{
    db.collection('Request').doc(event.request._id).update({
      data:{
        state: event.new_state
      }
    })    
  }

  if (event.new_state==2){
    db.collection('Schedule').doc(event.request.game_id).update({
      data:{
        time: new Date(event.request.time_new),
        place: event.request.place_new,
        adjustable: true       
      }
    })
  }
  else{
    db.collection('Schedule').doc(event.request.game_id).update({
      data:{
        adjustable: true      
      }
    })    
  }

}