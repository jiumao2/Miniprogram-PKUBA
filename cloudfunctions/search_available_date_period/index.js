// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

async function getAllData(collectionName, query) {
  const db = cloud.database({
    env: cloud.DYNAMIC_CURRENT_ENV
  })
  const _ = db.command
  const MAX_LIMIT = 100 // 每次最多获取 100 条
  let data = []
  let skip = 0
  let hasMore = true

  while (hasMore) {
    const res = await db.collection(collectionName)
      .where(query)
      .skip(skip)
      .limit(MAX_LIMIT)
      .get()

    data = data.concat(res.data) // 合并数据
    skip += MAX_LIMIT
    hasMore = res.data.length === MAX_LIMIT // 如果返回的数据少于 MAX_LIMIT，说明没有更多数据了
  }

  return data
}

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  db = cloud.database({
    env: cloud.DYNAMIC_CURRENT_ENV
  })
  const _ = db.command
  const nowyear = new Date().getFullYear()
  const date0 = event.date0
  const date1 = event.date1
  const allGames = await getAllData('Schedule', {
    date: _.and(_.gte(date0), _.lte(date1))
  })

  const allRequests = await getAllData('Request', {
    date_new: _.and(_.gte(date0), _.lte(date1)),
    state: _.neq(2)
  })

  const maxGameMap = {
    weekday: [0, 1, 0, 0, 0, 0, 1],
    weekend: [0, 3, 3, 3, 2, 2, 0]
  }

  const available_time = []
  var nowday = new Date(nowyear, 0, date0).getDay()
  
  for (let i = date0; i <= date1; ++i) {
    let max_game = (1 <= nowday && nowday <= 5) ? maxGameMap.weekday : maxGameMap.weekend
    let temp_available_time = []
    let flag = false
    for (let j = 1; j <= 6; ++j) {
      let existed_game_number = allGames.filter(game => game.date === i && game.period === j).length
      let requested_game_number = allRequests.filter(request => request.date_new === i && request.period_new === j).length
      if (existed_game_number + requested_game_number < max_game[j]) {
        temp_available_time.push(j)
        flag = true
      }
    }
    if (flag) available_time.push([i,temp_available_time])
    nowday = (nowday+1)%7
  }

  return {
    available_time: available_time
  }
}