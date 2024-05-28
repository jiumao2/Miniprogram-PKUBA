// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database({
    env: cloud.DYNAMIC_CURRENT_ENV
  })
  const _ = db.command
  const MAX_LIMIT = 100

  let count = await db.collection('Photo').count()
  let len = count.total
  let all = []
  for (var i = 0; i<len; i+=MAX_LIMIT){
    let list = await db.collection("Photo").skip(i).limit(MAX_LIMIT).get()
    all = all.concat(list.data)
  }

  var fileIDs = []
  for (var i = 0; i<all.length; i++){
    fileIDs.push(all[i].fileID)
  }

  return fileIDs
}