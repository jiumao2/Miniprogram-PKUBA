Page({
  data: {
    loading: false,
    error: '',
    limit: 5,
    collectionsInput: 'Schedule,Request,Team,Leader,Manager,Photo,Private',
    results: []
  },

  onLoad() {
    this.fetchSchema()
  },

  onCollectionsInput(e) {
    this.setData({
      collectionsInput: e.detail.value
    })
  },

  onLimitInput(e) {
    const value = Number.parseInt(e.detail.value, 10)
    this.setData({
      limit: Number.isNaN(value) ? 5 : value
    })
  },

  parseCollections(input) {
    return input
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)
  },

  formatExample(example) {
    if (typeof example === 'string') {
      return example
    }

    try {
      return JSON.stringify(example)
    } catch (error) {
      return String(example)
    }
  },

  normalizeResults(results) {
    return (results || []).map((item) => {
      if (item.error) {
        return {
          collection: item.collection,
          count: 0,
          sampleSize: 0,
          error: item.error,
          fields: []
        }
      }

      const fields = Object.keys(item.schema || {})
        .sort()
        .map((path) => {
          const field = item.schema[path]
          const types = Object.keys(field.types || {})
            .map((type) => `${type} x${field.types[type]}`)
            .join(', ')

          return {
            path,
            types,
            example: this.formatExample(field.example)
          }
        })

      return {
        collection: item.collection,
        count: item.count,
        sampleSize: item.sampleSize,
        error: '',
        fields
      }
    })
  },

  fetchSchema() {
    this.setData({
      loading: true,
      error: ''
    })

    wx.cloud.callFunction({
      name: 'inspect_schema',
      data: {
        collections: this.parseCollections(this.data.collectionsInput),
        limit: this.data.limit
      },
      success: (res) => {
        this.setData({
          results: this.normalizeResults(res.result.results),
          loading: false
        })
      },
      fail: (err) => {
        this.setData({
          error: err.errMsg || '调用 inspect_schema 失败',
          loading: false
        })
      }
    })
  }
})
