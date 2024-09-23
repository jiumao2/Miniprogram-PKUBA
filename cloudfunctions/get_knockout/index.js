// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  db = cloud.database({
    env: cloud.DYNAMIC_CURRENT_ENV
  })
  var tempname = []
  var tempscore = []
  var final = 0
  if (event.group == "男篮"){
    tempname = [["F1","F8","F2","F7","F3","F6","F4","F5"],Array(4),Array(2),Array(1)]
    tempscore = [Array(8),Array(4),Array(2)]
    final = 3
  }
  if (event.group == "女篮"){
    tempname = [["G1","G8","G2","G7","G3","G6","G4","G5"],Array(4),Array(2),Array(1)]
    tempscore = [Array(8),Array(4),Array(2)]
    final = 3
  }
  for(_=0;_ <final;_++){
    var l = tempname[_].length
    for( i=0 ; i<l ; i+=2){
      let game = await db.collection('Schedule').where({
        home_team: tempname[_][i],
        away_team: tempname[_][i+1],
        description: _==final-1?"决赛":"淘汰赛",
        group: event.group
      }).get()
      if (game.data.length>0){
        tempscore[_][i] = game.data[0].home_team_score
        tempscore[_][i+1] = game.data[0].away_team_score
      }
      if (tempscore[_][i] > tempscore[_][i + 1]) {
        tempname[_ + 1][i / 2] = tempname[_][i]
      }
      if (tempscore[_][i] < tempscore[_][i + 1]) {
        tempname[_ + 1][i / 2] = tempname[_][i + 1]
      }
      if (tempscore[_][i] == tempscore[_][i + 1]) {
        tempname[_ + 1][i / 2] = " "
        if (tempscore[_][i]==null | tempscore[_][i]==-1){
          tempscore[_][i] = ""
          tempscore[_][i+1] = ""
        }
      }
    }
  }
  return {
    name: tempname,
    score: tempscore
  }
}