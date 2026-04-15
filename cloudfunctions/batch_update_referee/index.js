const cloud = require('wx-server-sdk')
const defaultUpdates = require('./default_updates_20260328_20260329.json')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

function normalizeTime(value) {
  if (!value) return null
  if (value instanceof Date) return value
  if (typeof value === 'number') return new Date(value)
  if (typeof value === 'string') {
    var parsed = new Date(value)
    if (!isNaN(parsed.getTime())) return parsed
  }
  return null
}

exports.main = async (event) => {
  const db = cloud.database({
    env: cloud.DYNAMIC_CURRENT_ENV
  })

  const updates = Array.isArray(event.updates) && event.updates.length > 0
    ? event.updates
    : defaultUpdates
  const updatedBy = (event.updated_by || '').trim()
  const result = {
    ok: true,
    updated: 0,
    skipped: 0,
    conflicts: [],
    missing: []
  }

  for (var i = 0; i < updates.length; i++) {
    const item = updates[i] || {}
    const time = normalizeTime(item.time)
    const homeTeam = (item.home_team || '').trim()
    const awayTeam = (item.away_team || '').trim()
    const place = (item.place || '').trim()

    if (!time || !homeTeam || !awayTeam || !place) {
      result.missing.push({
        index: i,
        reason: 'missing time/home_team/away_team/place',
        item: item
      })
      result.skipped += 1
      continue
    }

    const query = {
      home_team: homeTeam,
      away_team: awayTeam,
      place: place,
      time: time
    }

    const found = await db.collection('Schedule').where(query).get()
    if (!found.data || found.data.length !== 1) {
      result.conflicts.push({
        index: i,
        count: found.data ? found.data.length : 0,
        query: query
      })
      result.skipped += 1
      continue
    }

    const game = found.data[0]
    const updateData = {
      CC: (item.CC || '').trim(),
      U1: (item.U1 || '').trim(),
      U2: (item.U2 || '').trim(),
      Recorder: (item.Recorder || '').trim(),
      Timer: (item.Timer || '').trim(),
      ShotClock24: (item.ShotClock24 || '').trim(),
      referee_update_time: new Date(),
      referee_updated_by: (item.updated_by || updatedBy || '').trim()
    }

    const res = await db.collection('Schedule').doc(game._id).update({
      data: updateData
    })

    if (res && res.stats && res.stats.updated) {
      result.updated += res.stats.updated
    }
  }

  return result
}
