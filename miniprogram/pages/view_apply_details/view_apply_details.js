// miniprogram/pages/view_apply_details/view_apply_details.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading:false,
    new_time: '',
    type: '',
  },
  accept(){
    if(this.data.loading) return
    this.setData({
      loading: true
    })

    if (this.data.request_detail.is_vote){
      var team_this = app.globalData.leader_info.team
      var voted_accept = this.data.request_detail.voted_accept
      voted_accept.push(team_this)
      var voted_reject = this.data.request_detail.voted_reject

      wx.cloud.callFunction({
        name: "vote_request",
        data:{
          request: this.data.request_detail,
          voted_accept: voted_accept,
          voted_reject: voted_reject
        },
        success: res=>{
          console.log(res)
          wx.navigateBack()

          return
        },

        fail: err=>{
          console.log(res)
          return
        }
      })
    }

    var now = new Date()
    var time_ddl = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()+2 // 提前两天达成一致
    )

    if (time_ddl.getTime()<this.data.request_detail.time_new.getTime() 
    && time_ddl.getTime()<this.data.request_detail.time.getTime()){
      if(this.data.request_detail.type==3){
        var new_state = 4
      }
      else if(this.data.request_detail.type==1){
        var new_state = 2
      }
      wx.cloud.callFunction({
        name: "update_request",
        data:{
          request:this.data.request_detail,
          new_state: new_state,
          to_delete: false
        },
        success: res => {
          app.globalData.request_detail.state = 2

          var text_email = "原比赛: " + app.globalData.request_detail.month+'月'+app.globalData.request_detail.date+'日 ' 
          + app.globalData.request_detail.hour+':'+app.globalData.request_detail.minute + " "
          + app.globalData.request_detail.home_team + " VS "+ app.globalData.request_detail.away_team
          + ' ' + app.globalData.request_detail.place + '\n' 
          + "调整后比赛: "+ app.globalData.request_detail.month_new+'月'+app.globalData.request_detail.date_new+'日 ' 
          + app.globalData.request_detail.hour_new+':'+app.globalData.request_detail.minute_new + " "
          + app.globalData.request_detail.home_team + " VS "+ app.globalData.request_detail.away_team
          + ' ' + app.globalData.request_detail.place_new + '\n'
          + "申请日期: "+app.globalData.request_detail.month_req+'月'+app.globalData.request_detail.date_req+'日 ' 
          + app.globalData.request_detail.hour_req+':'+app.globalData.request_detail.minute_req + '\n'
          + "申请方: "+app.globalData.request_detail.requester +'\n'
          + "申请类型: "+app.globalData.TYPES[app.globalData.request_detail.type-1] + '\n'
          + "组别: " + app.globalData.request_detail.group + '\n'
          console.log(text_email)
          wx.cloud.callFunction({
            name: 'send_email',
            data:{
              text: text_email,
              attachment: 0,
              subject: app.globalData.TYPES[app.globalData.request_detail.type-1]+'申请 '+ app.globalData.request_detail.home_team + " VS "+ app.globalData.request_detail.away_team + " (协商成功)"
            },
            success: res =>{
              console.log(res)
              wx.navigateBack()
            },
            fail: err =>{
              console.log(err)
            }
          })
        },
        fail: err =>{
          console.log(err)
        }
      })
    }
    else{
      wx.cloud.callFunction({
        name: "update_request",
        data:{
          request:this.data.request_detail,
          new_state: 0,
          to_delete: false
        },
        success: res => {
          app.globalData.request_detail.state = 0
          var temp_request = this.data.request_detail
          temp_request.state = 0
          this.setData({
            request_detail:temp_request
          })
          app.globalData.errInfo = "此申请已过期"
          wx.navigateBack({
            delta: 0,
          })
        },
        fail: err =>{
          console.log(err)
        }
      })      
    }
  },

  recall(){
    if(this.data.loading) return
    this.setData({
      loading: true
    })
    app.globalData.request_detail.state = 0
    wx.cloud.callFunction({
      name: "update_request",
      data:{
        request:this.data.request_detail,
        new_state: 0,
        to_delete: true,
      },
      success: res => {
        wx.navigateBack({
          delta: 0,
        })
      },
      fail: err =>{
        console.log(err)
      }
    })
  },

  reject(){
    if(this.data.loading) return
    this.setData({
      loading: true
    })

    if (this.data.request_detail.is_vote){
      var team_this = app.globalData.leader_info.team
      var voted_accept = this.data.request_detail.voted_accept
      var voted_reject = this.data.request_detail.voted_reject
      voted_reject.push(team_this)

      wx.cloud.callFunction({
        name: "vote_request",
        data:{
          request: this.data.request_detail,
          voted_accept: voted_accept,
          voted_reject: voted_reject
        },
        success: res=>{
          console.log(res)
          wx.navigateBack()
        }
      })
    }

    app.globalData.request_detail.state = 0
    wx.cloud.callFunction({
      name: "update_request",
      data:{
        request:this.data.request_detail,
        new_state: 0,
        to_delete: false,
      },
      success: res => {
        wx.navigateBack({
          delta: 0,
        })
      },
      fail: err =>{
        console.log(err)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.request_detail)
    var request_detail = app.globalData.request_detail

    request_detail.time = new Date(request_detail.time)
    var time = new Date(request_detail.time_new)
    request_detail.time_new = time
    request_detail.month_new = (time.getMonth()+1).toString()
    request_detail.date_new = time.getDate().toString()
    request_detail.hour_new = time.getHours().toString().padStart(2,"0")
    request_detail.minute_new = time.getMinutes().toString().padStart(2,"0")

    var time = new Date(request_detail.request_time)
    request_detail.time_req = time
    request_detail.month_req = (time.getMonth()+1).toString()
    request_detail.date_req = time.getDate().toString()
    request_detail.hour_req = time.getHours().toString().padStart(2,"0")
    request_detail.minute_req = time.getMinutes().toString().padStart(2,"0")

    request_detail.stateInfo = app.globalData.STATE[request_detail.state]
    this.setData({
      type: app.globalData.TYPES[request_detail.type-1]
    })

    if (request_detail.state == 3){
      this.setData({
        new_time: '无'
      })}
    else{
      this.setData({
        new_time: request_detail.month_new+'.'+request_detail.date_new+' '+request_detail.hour_new+':'+request_detail.minute_new
      })
    }
    this.setData({
      request_detail: request_detail
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      loading: false
    })
    this.onLoad()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})