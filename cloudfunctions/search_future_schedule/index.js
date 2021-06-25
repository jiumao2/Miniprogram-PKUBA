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
  const MAX_LIMIT = 100
  
  let count = await db.collection('Schedule').count()
  let len = count.total
  let all = []
  for (var i = 0; i<len; i+=MAX_LIMIT){
    let list = await db.collection("Schedule").skip(i).limit(MAX_LIMIT).get()
    all = all.concat(list.data)
  }
  return all

}