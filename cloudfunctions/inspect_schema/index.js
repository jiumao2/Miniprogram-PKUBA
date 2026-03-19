// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const DEFAULT_COLLECTIONS = [
  'Schedule',
  'Request',
  'Team',
  'Leader',
  'Manager',
  'Photo',
  'Private'
]

function getType(value) {
  if (value === null) {
    return 'null'
  }
  if (Array.isArray(value)) {
    return 'array'
  }
  if (value instanceof Date) {
    return 'date'
  }

  return typeof value
}

function formatExample(value, type) {
  if (type === 'date') {
    return value.toISOString()
  }
  if (type === 'array') {
    return `[length=${value.length}]`
  }
  if (type === 'object') {
    return '{...}'
  }

  return value
}

function collectFieldInfo(schema, value, prefix = '') {
  const type = getType(value)

  if (!schema[prefix]) {
    schema[prefix] = {
      types: {},
      example: formatExample(value, type)
    }
  }

  schema[prefix].types[type] = (schema[prefix].types[type] || 0) + 1

  if (type === 'object') {
    const keys = Object.keys(value)
    for (const key of keys) {
      const childPath = prefix ? `${prefix}.${key}` : key
      collectFieldInfo(schema, value[key], childPath)
    }
  }

  if (type === 'array' && value.length > 0) {
    const childPath = `${prefix}[]`
    collectFieldInfo(schema, value[0], childPath)
  }
}

async function inspectCollection(db, collectionName, limit) {
  const collection = db.collection(collectionName)
  const countRes = await collection.count()
  const sampleSize = Math.min(limit, countRes.total)
  const schema = {}
  let samples = []

  if (sampleSize > 0) {
    const sampleRes = await collection.limit(sampleSize).get()
    samples = sampleRes.data

    for (const item of samples) {
      const keys = Object.keys(item)
      for (const key of keys) {
        collectFieldInfo(schema, item[key], key)
      }
    }
  }

  return {
    collection: collectionName,
    count: countRes.total,
    sampleSize,
    schema
  }
}

// 云函数入口函数
exports.main = async (event) => {
  const db = cloud.database({
    env: cloud.DYNAMIC_CURRENT_ENV
  })
  const collections = Array.isArray(event.collections) && event.collections.length
    ? event.collections
    : DEFAULT_COLLECTIONS
  const limit = Math.max(1, Math.min(Number(event.limit) || 5, 20))
  const results = []

  for (const collectionName of collections) {
    try {
      const info = await inspectCollection(db, collectionName, limit)
      results.push(info)
    } catch (error) {
      results.push({
        collection: collectionName,
        error: error.message
      })
    }
  }

  return {
    collections,
    limit,
    results
  }
}
