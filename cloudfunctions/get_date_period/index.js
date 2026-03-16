// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const nowtime = new Date(event.time)
  
  const yearStart = new Date(nowtime.getFullYear(), 0, 1)  // 创建当年1月1日的Date对象
  const timeDiff = nowtime.getTime() - yearStart.getTime() // 计算时间差（毫秒）
  const dayOfYear = Math.floor(timeDiff / (1000 * 3600 * 24)) + 1 // 转换为天数并加1

  const hour = nowtime.getUTCHours() + 8
  const minutes = nowtime.getMinutes()
  const totalminutes = 60 * hour + minutes
  let period = 0
  switch(true){
    case (totalminutes <= 60 * 13 + 20):
      period = 1;
      break;
    case (totalminutes >= 60 * 13 + 50 && totalminutes <= 60 * 14 + 50):
      period = 2;
      break;
    case (totalminutes >= 60 * 15 + 20 && totalminutes <= 60 * 16 + 20):
      period = 3;
      break;
    case (totalminutes >= 60 * 17 + 50 && totalminutes <= 60 * 18 + 50):
      period = 4;
      break;
    case (totalminutes >= 60 * 19 + 20 && totalminutes <= 60 * 20 + 20):
      period = 5;
      break;
    case (totalminutes >= 60 * 20 + 30):
      period = 6;
      break;
    default:
      break;
  }
  return {
    date: dayOfYear,
    period: period
  }
}