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
  var date0 = new Date(event.now)
  if (event.for_request){
    date0 = new Date(
      date0.getFullYear(),
      date0.getMonth(),
      date0.getDate()+3
    )
  }
  if (event.for_request){
    return db.collection('Schedule').where(_.and([{
      group: event.group,
      time: _.gt(date0),
      adjustable: true
    },
    _.or([{
      home_team:event.team
    },{
      away_team:event.team
    }])])).get()  
  }
  else{
    return db.collection('Schedule').where(_.and([{
      group: event.group,
      time: _.gt(date0)
    },
    _.or([{
      home_team:event.team
    },{
      away_team:event.team
    }])])).get()    
  }

}