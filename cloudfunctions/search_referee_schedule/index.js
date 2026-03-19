const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

exports.main = async (event) => {
  const db = cloud.database({
    env: cloud.DYNAMIC_CURRENT_ENV
  })
  const _ = db.command
  const name = (event.name || '').trim()
  const MAX_LIMIT = 100

  if (!name) {
    return []
  }

  const whereCond = _.or([
    { CC: name },
    { U1: name },
    { U2: name },
    { Recorder: name },
    { Timer: name },
    { ShotClock24: name }
  ])

  const countRes = await db.collection('Schedule').where(whereCond).count()
  const total = countRes.total || 0
  var all = []

  for (var i = 0; i < total; i += MAX_LIMIT) {
    var list = await db.collection('Schedule').where(whereCond).skip(i).limit(MAX_LIMIT).get()
    all = all.concat(list.data)
  }

  return all
}
