// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })

const KNOCKOUT_DESCRIPTIONS = ['决赛', '半决赛', '淘汰赛']

const GROUP_BRACKETS = {
  男甲: ['', '', '', ''],
  女甲: ['', ''],
  男乙: ['光华', '计算机', '环科', '法学', '新传', '地集', '国关', '电子'],
  女乙: ['城环', '国关', '生历', '中文', '工材', '光经', '心理', '地空']
}

function createKnockoutTree(teams) {
  const name = [teams.slice()]
  const score = []
  let currentSize = teams.length

  while (currentSize > 1) {
    score.push(Array(currentSize))
    currentSize /= 2
    name.push(Array(currentSize))
  }

  return { name, score }
}

function normalizeScorePair(scores, index) {
  if (scores[index] == null || scores[index] === -1) {
    scores[index] = ''
    scores[index + 1] = ''
    return false
  }

  return true
}

function resolveWinner(names, scores, index) {
  if (!normalizeScorePair(scores, index)) {
    return ' '
  }

  if (scores[index] > scores[index + 1]) {
    return names[index]
  }

  if (scores[index] < scores[index + 1]) {
    return names[index + 1]
  }

  return ' '
}

// 云函数入口函数
exports.main = async (event) => {
  const db = cloud.database({
    env: cloud.DYNAMIC_CURRENT_ENV
  })
  const teams = GROUP_BRACKETS[event.group]

  if (!teams) {
    return {
      name: [],
      score: []
    }
  }

  const { name, score } = createKnockoutTree(teams)

  for (let roundIndex = 0; roundIndex < score.length; roundIndex += 1) {
    const roundTeams = name[roundIndex]

    for (let teamIndex = 0; teamIndex < roundTeams.length; teamIndex += 2) {
      const homeTeam = roundTeams[teamIndex]
      const awayTeam = roundTeams[teamIndex + 1]
      const game = await db.collection('Schedule').where({
        home_team: homeTeam,
        away_team: awayTeam,
        description: db.command.in(KNOCKOUT_DESCRIPTIONS),
        group: event.group
      }).get()

      if (game.data.length > 0) {
        score[roundIndex][teamIndex] = game.data[0].home_team_score
        score[roundIndex][teamIndex + 1] = game.data[0].away_team_score
      }

      name[roundIndex + 1][teamIndex / 2] = resolveWinner(
        roundTeams,
        score[roundIndex],
        teamIndex
      )
    }
  }

  return {
    name,
    score
  }
}
