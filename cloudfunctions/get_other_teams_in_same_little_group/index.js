// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  db = cloud.database({
    env: cloud.DYNAMIC_CURRENT_ENV
  })
  const _ = db.command

  // 得到自己所在的小组
  let out = await db.collection('Team').where(_.and([
    {group: event.group},
    {name: event.teamA}
  ])).get()

  var little_groups = new Array(out.length)
  var other_teams = new Array(out.length)

  for (var i = 0; i<out.data.length; i++){
    little_groups[i] = out.data[i].littlegroup
    let other_teams_this = []
    let little_group_out = await db.collection('Team').where(
      _.and([
        {'littlegroup': little_groups[i]},
        {'group': event.group},
      ])
    ).get()
    for (var j = 0; j<little_group_out.data.length; j++){
      if (!(little_group_out.data[j].name === event.teamA || little_group_out.data[j].name === event.teamB)){
        other_teams_this.push(little_group_out.data[j].name)
      } 
    }
    other_teams[i] = other_teams_this
  }


  return {
    little_groups: little_groups,
    other_teams: other_teams
  }
}