// 浜戝嚱鏁板叆鍙ｆ枃浠?
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const SLOT_LOCK_COLLECTION = 'ScheduleSlotLock'
const SLOT_FULL_ERROR = 'TARGET_SLOT_FULL'
const MAX_GAME_MAP = {
  weekday: [0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
  weekend: [0, 3, 3, 3, 2, 2, 0, 0, 0, 0, 0],
}

function createError(code, message) {
  const error = new Error(message || code)
  error.code = code
  return error
}

function getdate(time) {
  const nowtime = new Date(time)
  const month = nowtime.getMonth()
  const day = nowtime.getDate()
  return 10000 * month + day
}

function getperiod(time) {
  const nowtime = new Date(time)
  const hour = nowtime.getUTCHours() + 8
  const minutes = nowtime.getMinutes()
  const totalminutes = 60 * hour + minutes
  if (totalminutes >= 60 * 12 + 20 && totalminutes <= 60 * 13 + 20) {
    return 1
  }
  if (totalminutes >= 60 * 13 + 50 && totalminutes <= 60 * 14 + 50) {
    return 2
  }
  if (totalminutes >= 60 * 15 + 20 && totalminutes <= 60 * 16 + 20) {
    return 3
  }
  if (totalminutes >= 60 * 17 + 50 && totalminutes <= 60 * 18 + 50) {
    return 4
  }
  if (totalminutes >= 60 * 19 + 20 && totalminutes <= 60 * 20 + 20) {
    return 5
  }
  if (totalminutes >= 60 * 20 + 30) {
    return 6
  }
  return 0
}

function getMaxGameCount(time, period) {
  const weekday = new Date(time).getDay()
  const maxGame = (1 <= weekday && weekday <= 5) ? MAX_GAME_MAP.weekday : MAX_GAME_MAP.weekend
  return maxGame[period] || 0
}

function getSlotLockId(time, date, period) {
  const year = new Date(time).getFullYear()
  return `${year}_${date}_${period}`
}

async function ensureSlotLockDoc(db, lockId) {
  try {
    await db.collection(SLOT_LOCK_COLLECTION).doc(lockId).get()
    return
  } catch (error) {
    const message = error && error.errMsg ? error.errMsg : ''
    if (
      !message.includes('does not exist') &&
      !message.includes('not exists') &&
      !message.includes('DOCUMENT_NOT_FOUND')
    ) {
      throw error
    }
  }

  try {
    await db.collection(SLOT_LOCK_COLLECTION).add({
      data: {
        _id: lockId,
        revision: 0,
        updatedAt: new Date()
      }
    })
  } catch (error) {
    const message = error && error.errMsg ? error.errMsg : ''
    if (!message.includes('already exists') && !message.includes('duplicate key')) {
      throw error
    }
  }
}

async function applyReviewedRequest(db, event, date_new, period_new) {
  const _ = db.command
  const request = event.request
  const sameSlot = request.date === date_new && request.period === period_new

  if (!sameSlot) {
    const maxGame = getMaxGameCount(request.time_new, period_new)
    if (maxGame <= 0) {
      throw createError(SLOT_FULL_ERROR)
    }

    const lockId = getSlotLockId(request.time_new, date_new, period_new)
    await ensureSlotLockDoc(db, lockId)

    let lastError = null
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        await db.runTransaction(async transaction => {
          const requestDoc = await transaction.collection('Request').doc(request._id).get()
          if (requestDoc.data.state === 2) {
            return
          }

          await transaction.collection(SLOT_LOCK_COLLECTION).doc(lockId).update({
            data: {
              revision: _.inc(1),
              updatedAt: new Date()
            }
          })

          const sameSlotGames = await transaction.collection('Schedule').where({
            date: date_new,
            period: period_new
          }).get()
          const occupiedGames = sameSlotGames.data.filter(item => item._id !== request.game_id).length
          if (occupiedGames >= maxGame) {
            throw createError(SLOT_FULL_ERROR)
          }

          await transaction.collection('Request').doc(request._id).update({
            data:{
              state: event.new_state,
              is_reviewed: event.is_reviewed,
              reviewed_by: event.reviewed_by,
              reviewed_time: new Date(),
              notes: event.notes,
              to_vote_in_same_group: event.to_vote_in_same_group,
              teams_to_vote: event.teams_to_vote,
              voted_accept: event.voted_accept,
              voted_reject: event.voted_reject
            }
          })

          await transaction.collection('Schedule').doc(request.game_id).update({
            data:{
              time: new Date(request.time_new),
              place: request.place_new,
              adjustable: true,
              period: period_new,
              date: date_new
            }
          })
        })
        return
      } catch (error) {
        if (error && error.code === SLOT_FULL_ERROR) {
          throw error
        }
        lastError = error
      }
    }

    throw lastError
  }

  await db.collection('Request').doc(request._id).update({
    data:{
      state: event.new_state,
      is_reviewed: event.is_reviewed,
      reviewed_by: event.reviewed_by,
      reviewed_time: new Date(),
      notes: event.notes,
      to_vote_in_same_group: event.to_vote_in_same_group,
      teams_to_vote: event.teams_to_vote,
      voted_accept: event.voted_accept,
      voted_reject: event.voted_reject
    }
  })

  await db.collection('Schedule').doc(request.game_id).update({
    data:{
      time: new Date(request.time_new),
      place: request.place_new,
      adjustable: true,
      period: period_new,
      date: date_new
    }
  })
}

async function closeRequestAsUnavailable(db, event) {
  const originalNotes = event.notes ? `${event.notes}\n` : ''
  await db.collection('Request').doc(event.request._id).update({
    data: {
      state: 0,
      is_reviewed: true,
      reviewed_by: event.reviewed_by,
      reviewed_time: new Date(),
      notes: `${originalNotes}\u76ee\u6807\u65f6\u6bb5\u5df2\u6ee1\uff0c\u7cfb\u7edf\u81ea\u52a8\u9a73\u56de\u8be5\u7533\u8bf7\u3002`
    }
  })

  await db.collection('Schedule').doc(event.request.game_id).update({
    data: {
      adjustable: true
    }
  })
}

async function cancelConflictingRequestsIfSlotFull(db, request, reviewedBy) {
  const _ = db.command
  const date_new = request.date_new || getdate(request.time_new)
  const period_new = request.period_new || getperiod(request.time_new)
  const maxGame = getMaxGameCount(request.time_new, period_new)
  const sameSlotGames = await db.collection('Schedule').where({
    date: date_new,
    period: period_new
  }).get()

  if (sameSlotGames.data.length < maxGame) {
    return
  }

  const conflictingRequests = (await db.collection('Request').where({
    date_new: date_new,
    period_new: period_new,
    state: _.eq(1).or(_.gte(3))
  }).get()).data.filter(item => item._id !== request._id)

  for (const item of conflictingRequests) {
    const originalNotes = item.notes ? `${item.notes}\n` : ''
    await db.collection('Request').doc(item._id).update({
      data: {
        state: 0,
        is_reviewed: true,
        reviewed_by: reviewedBy || '',
        reviewed_time: new Date(),
        notes: `${originalNotes}\u8be5\u65f6\u6bb5\u5df2\u88ab\u5176\u4ed6\u7533\u8bf7\u786e\u8ba4\uff0c\u7cfb\u7edf\u81ea\u52a8\u53d6\u6d88\u4e86\u672c\u7533\u8bf7\u3002`
      }
    })

    await db.collection('Schedule').doc(item.game_id).update({
      data: {
        adjustable: true
      }
    })
  }
}

// 浜戝嚱鏁板叆鍙ｅ嚱鏁?
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database({
    env: cloud.DYNAMIC_CURRENT_ENV
  })
  const date_new = event.request.date_new || getdate(event.request.time_new)
  const period_new = event.request.period_new || getperiod(event.request.time_new)

  if (event.to_delete){
    await db.collection('Request').doc(event.request._id).remove()
  }
  else if (event.new_state != 2){
    await db.collection('Request').doc(event.request._id).update({
      data:{
        state: event.new_state,
        is_reviewed: event.is_reviewed,
        reviewed_by: event.reviewed_by,
        reviewed_time: new Date(),
        notes: event.notes,
        to_vote_in_same_group: event.to_vote_in_same_group,
        teams_to_vote: event.teams_to_vote,
        voted_accept: event.voted_accept,
        voted_reject: event.voted_reject
      }
    })
  }

  if (event.new_state==2){
    try {
      await applyReviewedRequest(db, event, date_new, period_new)
      await cancelConflictingRequestsIfSlotFull(db, event.request, event.reviewed_by)
    } catch (error) {
      if (error && error.code === SLOT_FULL_ERROR) {
        await closeRequestAsUnavailable(db, event)
      }
      throw error
    }
  }
  else{
    await db.collection('Schedule').doc(event.request.game_id).update({
      data:{
        adjustable: true
      }
    })
  }
}
