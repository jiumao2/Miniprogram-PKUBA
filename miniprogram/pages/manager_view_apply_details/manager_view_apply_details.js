// pages/manager_view_apply_details/manager_view_apply_details.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading:false,
    show_choosing_little_group: false,
    new_time: '',
    type: '',
    notes: '',
    idx_little_group: -1,
    other_teams: [],
    little_group_labels: []
  },

  bindPickerChange(e){
    this.setData({
        idx_little_group: e.detail.value,
    })
  },

  getNotes(e){
    this.setData(
      {notes: e.detail.value}
    )
  },

  accept(){
    if(this.data.loading) return

    wx.showModal({
      title: '是否确认同意该申请？',
      content: '',
      complete: (res) => {
        if (res.confirm) {
          this.setData({
            loading: true
          })
          var new_state = 2

          wx.cloud.callFunction({
            name: "review_request",
            data:{
              request:this.data.request_detail,
              new_state: new_state,
              to_delete: false,
              is_reviewed: true,
              reviewed_by: app.globalData.manager_info.name,
              notes: this.data.notes,
              to_vote_in_same_group: this.data.request_detail.to_vote_in_same_group,
              teams_to_vote: this.data.request_detail.teams_to_vote,
              voted_accept: this.data.request_detail.voted_accept,
              voted_reject: this.data.request_detail.voted_reject
            },
            success: res => {
              app.globalData.request_detail.state = 2
              wx.navigateBack()
              wx.navigateBack()
              wx.navigateTo({
                url: '../manager_view_apply/manager_view_apply',
              })
            },
            fail: err =>{
              console.log(err)
            }
          })
        }
      }
    })
  },

  reject(){
    if(this.data.loading) return

    wx.showModal({
      title: '是否确认拒绝该申请？',
      content: '',
      complete: (res) => {
        if (res.confirm) {
          this.setData({
            loading: true
          })
          app.globalData.request_detail.state = 0
          wx.cloud.callFunction({
            name: "review_request",
            data:{
              request:this.data.request_detail,
              new_state: 0,
              to_delete: false,
              is_reviewed: true,
              reviewed_by: app.globalData.manager_info.name,
              notes: this.data.notes,
              to_vote_in_same_group: this.data.request_detail.to_vote_in_same_group,
              teams_to_vote: this.data.request_detail.teams_to_vote,
              voted_accept: this.data.request_detail.voted_accept,
              voted_reject: this.data.request_detail.voted_reject
            },
            success: res => {
              wx.navigateBack()
              wx.navigateBack()
              wx.navigateTo({
                url: '../manager_view_apply/manager_view_apply',
              })
            },
            fail: err =>{
              console.log(err)
            }
          })
        }
      }
    })
  },

  confirm(){
    if(this.data.loading) return

    wx.showModal({
      title: '是否已知悉该申请？',
      content: '',
      complete: (res) => {
        if (res.confirm) {
          this.setData({
            loading: true
          })

          wx.cloud.callFunction({
            name: "review_request",
            data:{
              request:this.data.request_detail,
              new_state: this.data.request_detail.state,
              to_delete: false,
              is_reviewed: true,
              reviewed_by: app.globalData.manager_info.name,
              notes: this.data.notes,
              to_vote_in_same_group: this.data.request_detail.to_vote_in_same_group,
              teams_to_vote: this.data.request_detail.teams_to_vote,
              voted_accept: this.data.request_detail.voted_accept,
              voted_reject: this.data.request_detail.voted_reject
            },
            success: res => {
              wx.navigateBack()
              wx.navigateBack()
              wx.navigateTo({
                url: '../manager_view_apply/manager_view_apply',
              })
            },
            fail: err =>{
              console.log(err)
            }
          })
        }
      }
    })
  },

  recall(){
    if(this.data.loading) return

    wx.showModal({
      title: '是否确定取消已审核状态？',
      content: '',
      complete: (res) => {
        if (res.confirm) {
          this.setData({
            loading: true
          })

          wx.cloud.callFunction({
            name: "review_request",
            data:{
              request:this.data.request_detail,
              new_state: this.data.request_detail.state,
              to_delete: false,
              is_reviewed: false,
              reviewed_by: app.globalData.manager_info.name,
              notes: this.data.notes,
              to_vote_in_same_group: this.data.request_detail.to_vote_in_same_group,
              teams_to_vote: this.data.request_detail.teams_to_vote,
              voted_accept: this.data.request_detail.voted_accept,
              voted_reject: this.data.request_detail.voted_reject
            },
            success: res => {
              wx.navigateBack()
              wx.navigateBack()
              wx.navigateTo({
                url: '../manager_view_apply/manager_view_apply',
              })
            },
            fail: err =>{
              console.log(err)
            }
          })
        }
      }
    })
  },

  vote_in_same_group(){
    if(this.data.loading) return

    if(!this.data.show_choosing_little_group){
      this.setData({
        show_choosing_little_group: true,
        loading: true
      })

      // 得到同组名单
      wx.cloud.callFunction({
        name: "get_other_teams_in_same_little_group",
        data:{
          group: this.data.request_detail.group,
          teamA: this.data.request_detail.home_team,
          teamB: this.data.request_detail.away_team
        },
        success: res =>{
          console.log(res)
          var little_groups = res.result.little_groups
          var other_teams = res.result.other_teams
          var little_group_labels = new Array(little_groups.length)
          for (var i = 0; i<little_groups.length; i++){
            var label = this.data.request_detail.group + little_groups[i] + "组 ("
            for (var j = 0; j<other_teams[i].length; j++){
              label = label+other_teams[i][j]
              if (j < other_teams[i].length-1){
                label = label+' '
              }
            }
            label = label+')'
            little_group_labels[i] = label
          }
          console.log(little_group_labels)
          this.setData({
            idx_little_group: 0,
            little_group_labels: little_group_labels,
            other_teams: other_teams,
            loading: false
          })
        },

        fail: err =>{
          console.log(err)
        }
      })

      return
    }

    wx.showModal({
      title: '是否确认需要同组同意？',
      content: '',
      complete: (res) => {
        if (res.confirm) {
          this.setData({
            loading: true
          })

          wx.cloud.callFunction({
            name: "review_request",
            data:{
              request:this.data.request_detail,
              new_state: this.data.request_detail.state,
              to_delete: false,
              is_reviewed: true,
              reviewed_by: app.globalData.manager_info.name,
              notes: this.data.notes,
              to_vote_in_same_group: true,
              teams_to_vote: this.data.other_teams[this.data.idx_little_group],
              voted_accept: [],
              voted_reject: []
            },
            success: res => {
              wx.navigateBack()
            },
            fail: err =>{
              console.log(err)
            }
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.request_detail)
    var request_detail = app.globalData.manager_request_detail

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