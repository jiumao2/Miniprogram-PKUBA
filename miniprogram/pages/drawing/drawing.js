// miniprogram/pages/apply/apply.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
    data: {
        array1: [],
        array2: [],
        array3: [],
        value1: 0,
        value2: 0,
        value3: 0,
        games: [],
        hideLoading: false,
        loading: false,
        files: [],
        reason: "",
    },

    reason: function(e){
      this.setData({
        reason: e.detail.value
      })
      console.log(this.data.reason)
    },

    chooseImage: function (e) {
      var that = this;
      wx.chooseImage({
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
              // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
              that.setData({
                  files: that.data.files.concat(res.tempFilePaths)
              });
          }
      })
  },
  previewImage: function(e){
      wx.previewImage({
          current: e.currentTarget.id, // 当前显示图片的http链接
          urls: this.data.files // 需要预览的图片http链接列表
      })
  },

    bindPicker1Change: function(e) {
        this.setData({
            value1: e.detail.value
        })
    },


  make_request(){
    if (this.data.loading) return
    this.setData({
      loading: true,
    })
    if (this.data.files.length==0){
      app.globalData.errInfo = "未选择图片"
      wx.navigateTo({
        url: '../error_page/error_page',
      })   
      return      
    }
    if(this.data.reason.length==0){
      app.globalData.errInfo = "请输入申请理由"
      wx.navigateTo({
        url: '../error_page/error_page',
      })   
      return       
    }
    const cloud_path = (new Date()).valueOf()+'.png'
    wx.cloud.uploadFile({
      cloudPath: cloud_path, // 文件名
      filePath: this.data.files[0], // 文件路径
      success: res => {
        // get resource ID
        console.log(res.fileID)
        const fileID = res.fileID
        wx.cloud.callFunction({
          name: "make_request",
          data:{
            game: this.data.games[this.data.value1],
            requester: app.globalData.leader_info.team,
            type: 2,
            fileID: fileID,
            cloudPath: cloud_path,
            reason: this.data.reason
          },
          success: res => {
            var text_time = new Date(this.data.games[this.data.value1].time)
            var now_time = new Date()

            var text = "原比赛: " + (text_time.getMonth()+1).toString()+'月'+text_time.getDate()+'日 ' 
            + text_time.getHours()+':'+text_time.getMinutes() + " "
            + this.data.games[this.data.value1].home_team + " VS "+ this.data.games[this.data.value1].away_team
            + ' ' + this.data.games[this.data.value1].place + '\n' 
            + "申请日期: "+(now_time.getMonth()+1).toString()+'月'+now_time.getDate()+'日 ' 
            + now_time.getHours()+':'+now_time.getMinutes() + '\n'
            + "申请方: "+app.globalData.leader_info.team +'\n'
            + "申请理由: "+ this.data.reason + '\n'
            + "组别: " + this.data.games[this.data.value1].group + '\n'
            console.log(text)
            wx.cloud.callFunction({
              name: 'send_email',
              data:{
                subject: '申请抽签 '+ this.data.games[this.data.value1].home_team + " VS "+ this.data.games[this.data.value1].away_team,
                text: text,
                attachment: '申请材料.png',
                fileID: fileID
              }
            })
            wx.navigateBack({
              delta: 0,
            })
          },
          fail: err => {
            console.log(err)
            app.globalData.errInfo = "该时间段场次已满"
            wx.navigateTo({
              url: '../error_page/error_page',
            })
          }
        })
      },
      fail: err => {
        console.log(err)
        app.globalData.errInfo = "图片上传失败"
        wx.navigateTo({
          url: '../error_page/error_page',
        })       
      }
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.callFunction({
      name:"search_future_games",
      data:{
        team: app.globalData.leader_info.team,
        group: app.globalData.leader_info.group,
        for_request: true,
        now: new Date(),
      },
      success: res =>{
        console.log(res.result)
        var array1 = []
        var games = res.result.data
        if (games.length == 0){
          wx.navigateBack({
            delta: 0,
          })
          app.globalData.errInfo = "没有可调整的赛程"
          wx.navigateTo({
            url: '../error_page/error_page',
          })
          return
        }
        for (var i=0;i<games.length;i++){
          var time = new Date(games[i].time)
          games[i].time = time
          games[i].month = (time.getMonth()+1).toString()
          games[i].date = time.getDate().toString()
          games[i].hour = time.getHours().toString()
          var temp = time.getMinutes()
          if (temp<10){
            temp = "0" + temp
          }
          games[i].minute = temp.toString()
        }

        games.sort((a,b)=>{
          if (a.time >= b.time) return 1
          else return -1
        })
        console.log(games)
        for (var i=0;i<games.length;i++){
          array1.push(games[i].month+"."+games[i].date+" "+games[i].home_team+"VS"+games[i].away_team+" "
          +games[i].hour+":"+games[i].minute)
        }

        this.setData({
          array1:array1,
          games: games
        })

        },
      fail: err => {
        console.log(err)
      }
    })
  },
  onShow: function (options) {
    this.setData({
      loading:false
    })

  }
})