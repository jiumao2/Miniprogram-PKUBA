const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

exports.main = async (event) => {
  const db = cloud.database({
    env: cloud.DYNAMIC_CURRENT_ENV
  })

  if (!event.game_id) {
    return {
      ok: false,
      error: 'missing game_id'
    }
  }

  const result = await db.collection('Schedule').doc(event.game_id).update({
    data: {
      CC: event.CC || '',
      U1: event.U1 || '',
      U2: event.U2 || '',
      Recorder: event.Recorder || '',
      Timer: event.Timer || '',
      ShotClock24: event.ShotClock24 || '',
      referee_update_time: new Date(),
      referee_updated_by: event.updated_by || ''
    }
  })

  return {
    ok: true,
    updated: result.stats ? result.stats.updated : 0
  }
}
