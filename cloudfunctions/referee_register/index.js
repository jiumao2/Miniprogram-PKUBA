const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

exports.main = async (event) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database({
    env: cloud.DYNAMIC_CURRENT_ENV
  })
  const name = (event.name || '').trim()

  if (!name) {
    return {
      ok: false,
      err: 'name is required'
    }
  }

  const existed = await db.collection('Referee').where({
    openID: wxContext.OPENID
  }).count()

  if (existed.total > 0) {
    return {
      ok: true,
      existed: true
    }
  }

  await db.collection('Referee').add({
    data: {
      name: name,
      register_date: new Date(),
      openID: wxContext.OPENID
    }
  })

  return {
    ok: true,
    existed: false
  }
}
