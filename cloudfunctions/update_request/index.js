// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: "pkuba-9gkc109xc039fc34"
})


// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  db = cloud.database({
    env: "pkuba-9gkc109xc039fc34"
  })
  const _ = db.command

  db.collection('Request').doc(event.request._id).update({
    data:{
      state: event.new_state
    }
  })
  if (event.new_state==2){
    db.collection('Schedule').doc(event.request.game_id).update({
      data:{
        time: new Date(event.request.time_new),
        place: event.request.place_new,
        adjustable: false       
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