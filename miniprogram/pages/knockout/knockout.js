// pages/knockout/knockout.js
const app = getApp()

const LAYOUT_CONFIGS = {
  8: [
    {
      matches: [
        { round: 0, pair: 0, className: 'table-left' },
        { round: 0, pair: 1, className: 'table-right' }
      ]
    },
    {
      className: 'row-short',
      lines: [
        { className: 'line-v line-left-30 line-full' },
        { className: 'line-v line-right-30 line-full' }
      ]
    },
    {
      lines: [
        { className: 'line-v line-left-30 line-bottom-half' },
        { className: 'line-v line-right-30 line-bottom-half' },
        { className: 'line-h line-left-30 line-w-5' },
        { className: 'line-h line-right-30 line-w-5' }
      ],
      matches: [
        { round: 1, pair: 0, className: 'table-center' }
      ]
    },
    {
      lines: [
        { className: 'line-v line-mid-left line-bottom-half line-offset' },
        { className: 'line-h line-left-35 line-w-15 line-offset' },
        { className: 'line-v line-left-35 line-top-half line-offset' }
      ]
    },
    {
      matches: [
        { round: 2, pair: 0, className: 'table-final' }
      ]
    },
    {
      lines: [
        { className: 'line-v line-mid-left line-top-half line-offset' },
        { className: 'line-h line-right-35 line-w-15 line-offset' },
        { className: 'line-v line-right-35 line-bottom-half line-offset' }
      ]
    },
    {
      lines: [
        { className: 'line-v line-left-30 line-top-half' },
        { className: 'line-v line-right-30 line-top-half' },
        { className: 'line-h line-left-30 line-w-5' },
        { className: 'line-h line-right-30 line-w-5' }
      ],
      matches: [
        { round: 1, pair: 1, className: 'table-center' }
      ]
    },
    {
      className: 'row-short',
      lines: [
        { className: 'line-v line-left-30 line-full' },
        { className: 'line-v line-right-30 line-full' }
      ]
    },
    {
      matches: [
        { round: 0, pair: 2, className: 'table-left' },
        { round: 0, pair: 3, className: 'table-right' }
      ]
    }
  ],
  4: [
    {
      matches: [
        { round: 0, pair: 0, className: 'table-single' }
      ]
    },
    {
      lines: [
        { className: 'line-v line-mid-left line-bottom-half line-offset' },
        { className: 'line-h line-left-35 line-w-15 line-offset' },
        { className: 'line-v line-left-35 line-top-half line-offset' }
      ]
    },
    {
      matches: [
        { round: 1, pair: 0, className: 'table-final' }
      ]
    },
    {
      lines: [
        { className: 'line-v line-mid-left line-top-half line-offset' },
        { className: 'line-h line-right-35 line-w-15 line-offset' },
        { className: 'line-v line-right-35 line-bottom-half line-offset' }
      ]
    },
    {
      matches: [
        { round: 0, pair: 1, className: 'table-single' }
      ]
    }
  ],
  2: [
    {
      matches: [
        { round: 0, pair: 0, className: 'table-final' }
      ]
    }
  ]
}

function createMatch(name, score, roundIndex, pairIndex) {
  const start = pairIndex * 2

  return {
    homeName: name?.[roundIndex]?.[start] || '',
    awayName: name?.[roundIndex]?.[start + 1] || '',
    homeScore: score?.[roundIndex]?.[start] ?? '',
    awayScore: score?.[roundIndex]?.[start + 1] ?? ''
  }
}

function buildBracketRows(name, score) {
  const teamCount = name?.[0]?.length || 0
  const layout = LAYOUT_CONFIGS[teamCount] || []

  return layout.map((row) => ({
    className: row.className || '',
    lines: row.lines || [],
    matches: (row.matches || []).map((match) => ({
      className: match.className,
      ...createMatch(name, score, match.round, match.pair)
    }))
  }))
}

Page({
  data: {
    group: '',
    name: [],
    loading: false,
    score: [],
    allgroups: [],
    value: 0,
    bracketRows: []
  },

  selectGroup(e) {
    if (this.data.loading) {
      return
    }

    const value = Number(e.detail.value)
    const group = this.data.allgroups[value]

    this.setData({
      group,
      value,
      name: [],
      score: [],
      bracketRows: [],
      loading: true
    })

    this.fetchKnockout(group)
  },

  fetchKnockout(group) {
    wx.cloud.callFunction({
      name: 'get_knockout',
      data: { group },
      success: (res) => {
        const name = res.result?.name || []
        const score = res.result?.score || []

        this.setData({
          name,
          score,
          bracketRows: buildBracketRows(name, score),
          loading: false
        })
      },
      fail: (err) => {
        console.log(err)
        wx.navigateTo({
          url: '../error_page/error_page'
        })
      }
    })
  },

  async onLoad(options) {
    const value = Number.parseInt(options.group, 10) || 0
    let allgroups = app.globalData.GROUP_NAMES || []

    if (!allgroups.length && typeof app.waitForGlobalData === 'function') {
      const globalData = await app.waitForGlobalData()
      allgroups = globalData.GROUP_NAMES || []
    }

    const group = allgroups[value] || ''

    this.setData({
      value,
      group,
      allgroups,
      loading: true
    })

    this.fetchKnockout(group)
  }
})
