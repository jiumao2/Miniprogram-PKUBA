//app.js
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      })
    }

    //从数据库中读取元信息
    wx.cloud.callFunction({
      "name": "get_private",
      "data":{
        "needed": "META"
      },
      success : res =>{
        this.globalData = res.result.data[0]
        console.log(this.globalData)
      }
    })
  },
  date_to_time(date, hour, minute){
    const year = new Date().getFullYear(); // 获取当前年份
    const datetime = new Date(year, 0, date, hour, minute); // 生成日期对象
    return datetime;
  },
  period_to_time(period){
    var hour = 0;
    var minute = 0;
    switch(period){
      case 1:
        hour = 12;
        minute = 50;
        break;
      case 2:
        hour = 14;
        minute = 20;
        break;
      case 3:
        hour = 15;
        minute = 50;
        break;
      case 4:
        hour = 18;
        minute = 20;
        break;
      case 5:
        hour = 19;
        minute = 50;
        break;
      case 6:
        hour = 20;
        minute = 40;
        break;
      default:
        break;
    }
    return {
      hour: hour,
      minute: minute
    }
  },
  get_date_period(time){
    const nowtime = new Date(time)
    
    const yearStart = new Date(nowtime.getFullYear(), 0, 1)  // 创建当年1月1日的Date对象
    const timeDiff = nowtime.getTime() - yearStart.getTime() // 计算时间差（毫秒）
    const dayOfYear = Math.floor(timeDiff / (1000 * 3600 * 24))+1 // 转换为天数

    const hour = nowtime.getUTCHours()+8;
    const minutes = nowtime.getMinutes();
    const totalminutes = 60*hour + minutes;
    let period = 0;
    switch(true){
      case (totalminutes <= 60*13+20):
        period = 1;
        break;
      case (totalminutes >= 60*13+50 && totalminutes <= 60*14+50):
        period = 2;
        break;
      case (totalminutes >= 60*15+20 && totalminutes <= 60*16+20):
        period = 3;
        break;
      case (totalminutes >= 60*17+50 && totalminutes <= 60*18+50):
        period = 4;
        break;
      case (totalminutes >= 60*19+20 && totalminutes <= 60*20+20):
        period = 5;
        break;
      case (totalminutes >= 60*20+30):
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
})
