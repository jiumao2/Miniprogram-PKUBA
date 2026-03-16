//app.js
// 定义一个等待函数，在App创建之前，使其能被加入到App定义中
const createWaitForDataHandler = () => {
  // 存储数据就绪后的回调函数队列
  const callbacks = [];
  // 数据就绪标志
  let isReady = false;
  // 存储的数据
  let privateData = null;

  return {
    // 供外部（如onLaunch成功回调）调用来标记数据就绪
    setReady: (data) => {
      privateData = data;
      isReady = true;
      // 执行所有已注册的回调
      while (callbacks.length) {
        const cb = callbacks.shift();
        cb(privateData);
      }
    },
    // 供页面或组件调用的等待方法，返回一个Promise
    waitForData: () => {
      return new Promise((resolve) => {
        if (isReady) {
          // 如果已经就绪，直接返回数据
          resolve(privateData);
        } else {
          // 否则，将resolve函数加入等待队列
          callbacks.push(resolve);
        }
      });
    },
    // 直接获取数据（不推荐，仅用于不依赖此数据的场景），如果未就绪则返回null
    getDataIfReady: () => {
      return privateData;
    },
    // 检查是否就绪
    getIsReady: () => {
      return isReady;
    }
  };
};

// 创建等待处理器实例
const dataHandler = createWaitForDataHandler();

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
        const metaData = res.result.data[0];
        this.globalData = metaData;
        console.log(this.globalData)

        // 标记数据就绪，并通知所有等待者
        dataHandler.setReady(metaData);
      }
    })
  },

  // 将globalData初始化为空对象，避免未定义错误
  globalData: {},

  // 暴露给全局的等待方法
  waitForGlobalData: dataHandler.waitForData,

  date_to_time(date, hour, minute){
    const year = new Date().getFullYear(); // 获取当前年份
    const datetime = new Date(year, 0, date, hour, minute); // 生成日期对象
    return datetime;
  },
  period_to_time(period){
    let hour = Number(this.globalData.PERIOD_TO_TIME[period][0])
    let minute = Number(this.globalData.PERIOD_TO_TIME[period][1])
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
