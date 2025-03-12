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
    tempname = [["考信","元培","医学","法学","化学","环科","物理","光经"],Array(4),Array(2),Array(1)]
    tempscore = [Array(8),Array(4),Array(2)]
    final = 3
  }
  if (event.group == "女篮"){
    tempname = [["外院","法学","新传","化学","中文","医学","心理","信科"],Array(4),Array(2),Array(1)]
    tempscore = [Array(8),Array(4),Array(2)]
    final = 3
  }
  for(_=0;_ <final;_++){
    var l = tempname[_].length
    for( i=0 ; i<l ; i+=2){
      let game = await db.collection('Schedule').where({
        home_team: tempname[_][i]=="考信"?"考古-信管":tempname[_][i],
        away_team: tempname[_][i+1],
        description: _==final-1?event.group+"决赛":"淘汰赛",
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