// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  db = cloud.database({
    env: cloud.DYNAMIC_CURRENT_ENV
  })
  const _ = db.command
  const date_new = event.date_new
  const period_new = event.period_new
  const all_place_names = (await db.collection('Private').doc('META').get()).data.PLACE_NAMES
  const existed_place1 = (await db.collection('Schedule').where({
    date: date_new,
    period: period_new
  }).get()).data.map(item => item.place)
  const existed_place2 = (await db.collection('Request').where({
    date: date_new,
    period: period_new,
    state: _.neq(2)
  }).get()).data.map(item => item.place_new)
  const available_place = all_place_names.filter(item => (!existed_place1.includes(item)) && (!existed_place2.includes(item)))
  return {
    available_place: available_place,
  }
}