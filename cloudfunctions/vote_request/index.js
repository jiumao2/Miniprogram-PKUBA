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


  await db.collection('Request').doc(event.request._id).update({
    data:{
      voted_accept: event.voted_accept,
      voted_reject: event.voted_reject,
      is_reviewed: false
    }
  })    

  if (event.voted_reject.length > 0){
    await db.collection('Request').doc(event.request._id).update({
      data:{
        state: 0
      }
    })    
  }

  if (event.voted_accept.length == event.request.teams_to_vote){
    await db.collection('Request').doc(event.request._id).update({
      data:{
        state: 4
      }
    })    
  }

}