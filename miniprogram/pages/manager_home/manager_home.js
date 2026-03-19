// pages/manager_home/manager_home.js
var app = getApp()
Page({

  /**
   * 椤甸潰鐨勫垵濮嬫暟鎹?
   */
  data: {
    loading:false,
  },

  /**
   * 鐢熷懡鍛ㄦ湡鍑芥暟--鐩戝惉椤甸潰鍔犺浇
   */
  onLoad(options) {
    console.log(options)
    this.setData({
      name: options.name
    })
  },

  to_schedule_edit(){
    if (this.data.loading) return
    this.setData({
      loading: true
    })

    if (app.globalData.manager_info.type == 0){
      wx.navigateTo({
        url: '../schedule_edit/schedule_edit',
      })
    }
    else{
      app.globalData.errInfo = "No permission, please contact admin"
      wx.navigateTo({
        url: '../error_page/error_page',
      })
    }
  },

  to_scoresheet_edit(){
    if (this.data.loading) return
    this.setData({
      loading: true
    })
    wx.navigateTo({
      url: '../schedule_scoresheet/schedule_scoresheet',
    })
  },

  to_referee_edit(){
    if (this.data.loading) return
    this.setData({
      loading: true
    })
    if (app.globalData.manager_info.type == 0){
      wx.navigateTo({
        url: '../schedule_referee/schedule_referee',
      })
    }
    else{
      app.globalData.errInfo = "No permission, please contact admin"
      wx.navigateTo({
        url: '../error_page/error_page',
      })
    }
  },

  to_referee_schedule_view(){
    if (this.data.loading) return
    this.setData({
      loading: true
    })
    if (app.globalData.manager_info.type == 0){
      wx.navigateTo({
        url: '../referee_schedule/referee_schedule',
      })
    }
    else{
      app.globalData.errInfo = "No permission, please contact admin"
      wx.navigateTo({
        url: '../error_page/error_page',
      })
    }
  },

  to_manager_view_apply(){
    if (this.data.loading) return
    this.setData({
      loading: true
    })
    wx.navigateTo({
      url: '../manager_view_apply/manager_view_apply',
    })
  },

  /**
   * 鐢熷懡鍛ㄦ湡鍑芥暟--鐩戝惉椤甸潰鍒濇娓叉煋瀹屾垚
   */
  onReady() {

  },

  /**
   * 鐢熷懡鍛ㄦ湡鍑芥暟--鐩戝惉椤甸潰鏄剧ず
   */
  onShow() {
    this.setData({
      loading: false
    })
  },

  /**
   * 鐢熷懡鍛ㄦ湡鍑芥暟--鐩戝惉椤甸潰闅愯棌
   */
  onHide() {

  },

  /**
   * 鐢熷懡鍛ㄦ湡鍑芥暟--鐩戝惉椤甸潰鍗歌浇
   */
  onUnload() {

  },

  /**
   * 椤甸潰鐩稿叧浜嬩欢澶勭悊鍑芥暟--鐩戝惉鐢ㄦ埛涓嬫媺鍔ㄤ綔
   */
  onPullDownRefresh() {

  },

  /**
   * 椤甸潰涓婃媺瑙﹀簳浜嬩欢鐨勫鐞嗗嚱鏁?
   */
  onReachBottom() {

  },

  /**
   * 鐢ㄦ埛鐐瑰嚮鍙充笂瑙掑垎浜?
   */
  onShareAppMessage() {

  }
})

