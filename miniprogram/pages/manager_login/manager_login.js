// miniprogram/pages/manager_login/manager_login.js

var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    loading:false, 
    password: null,
    name: null 
  },

  nameInput: function(e){
    this.setData({
      name:e.detail.value
    })
  },

  passwordInput: function(e){
    this.setData({
      password:e.detail.value
    })
  },

  confirmation: function(){
    // 判断密码是否正确
    if (this.data.loading) return
    this.setData({
      loading:true
    })
    wx.cloud.callFunction({
      name:'get_private',
      data:{
        needed:'PASSWORD'
      },
      success: res => {
        console.log(res)
        if (this.data.name == res.result.data[0].LoginPassword || this.data.name.includes("九毛")){
          app.globalData.errInfo = "昵称错误"
          wx.navigateTo({
            url: '../error_page/error_page',
          })          
          return
        }
        if (this.data.password == res.result.data[0].LoginPassword){
          // 检查是否已经注册
          wx.cloud.callFunction({
            name: "check_manager",
            data: {
              name: this.data.name,
            },
            success: res => {
              if (res.result.total<=0){
                // 注册
                wx.cloud.callFunction({
                  name:'manager_register',
                  data:{
                    name:this.data.name
                  },
                  success: res => {
                    console.log(res)
                    console.log('Manager register succeed!')
                    wx.cloud.callFunction({
                      name: 'search_manager',
                      success: res =>{
                        console.log(res)
                        if (res.result.data.length>0){
                          console.log(res.result.data[0])
                          getApp().globalData.manager_info = res.result.data[0]
                          console.log(getApp().globalData.manager_info)
                        }
                      }
                    })
                  },
                  fail: err => {
                    console.log('Fail to register a manager!', err)
                    app.globalData.errInfo = "管理员注册失败"
                    wx.navigateTo({
                      url: '../error_page/error_page',
                    })
                  }
                })

                wx.navigateTo({
                  url: '../manager_home/manager_home',
                })
              }
              else{
                app.globalData.errInfo = "表单不完整或已被注册"
                wx.navigateTo({
                  url: '../error_page/error_page',
                })
              }
              },
            fail: err =>{
              console.log('failed!!!',err.info)
              console.log(err)
              app.globalData.errInfo = "检查错误"
              wx.navigateTo({
                url: '../error_page/error_page',
              })
            }})        
        }
        else{
          app.globalData.errInfo = "密码错误"
          wx.navigateTo({
            url: '../error_page/error_page',
          })
        }
      },
      fail: err => {
        console.log('failed!!!',err)
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