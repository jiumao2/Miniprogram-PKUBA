// pages/edit_scoresheet/edit_scoresheet.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: true, 
    img_src: []
  },

  choose_images(){
    var img_count = this.data.img_src.length
    wx.chooseMedia({
      count: 9,
      mediaType: 'image',
      sourceType: ['album', 'camera'],
      success: res => {
        var file_length = res.tempFiles.length
        if (file_length>0){
          this.setData({
            loading: true
          })
        }
        
        for (var i = 0; i < res.tempFiles.length; i++){
          console.log(res.tempFiles[i].tempFilePath)
          // save to cloud storage
          let suffix = res.tempFiles[i].tempFilePath.substring(res.tempFiles[i].tempFilePath.lastIndexOf("."));
          let game_date = app.globalData.game_on_scoresheet.year.padStart(4,"0")+app.globalData.game_on_scoresheet.month.padStart(2,"0")+app.globalData.game_on_scoresheet.date.padStart(2,"0")
          let filename = game_date + "_" + app.globalData.game_on_scoresheet.group + "_" +
          app.globalData.game_on_scoresheet.home_team+
          "_VS_"+
          app.globalData.game_on_scoresheet.away_team+"_"+(img_count+i+1).toString()+suffix
          wx.cloud.uploadFile({
            cloudPath: filename, // 上传至云端的路径
            filePath: res.tempFiles[i].tempFilePath, // 小程序临时文件路径
            success: res => {
              // 返回文件 ID
              console.log(res)
              console.log(app.globalData.game_on_scoresheet.time)
              var year = app.globalData.game_on_scoresheet.year.padStart(4,"0")
              var month = app.globalData.game_on_scoresheet.month.padStart(2,"0")
              var date = app.globalData.game_on_scoresheet.date.padStart(2,"0")
              var hour = app.globalData.game_on_scoresheet.hour.padStart(2,"0")
              var minute = app.globalData.game_on_scoresheet.minute.padStart(2,"0")
              var second = '00'
              var timestr = year+'/'+month+'/'+date+' '+hour+':'+minute+':'+second
              var time = new Date(timestr)
              console.log(time)
              // 将照片信息存储到数据库中
              wx.cloud.callFunction({
                name: "add_photo_manager",
                data: {
                  creator: app.globalData.manager_info.name,
                  fileID: res.fileID,
                  home_team: app.globalData.game_on_scoresheet.home_team,
                  away_team: app.globalData.game_on_scoresheet.away_team,
                  group: app.globalData.game_on_scoresheet.group,
                  time: time
                },
                success: res =>{
                  console.log('Successfully uploaded!')
                  if (i==file_length-1){
                    this.setData({
                      loading: false
                    })
                  }
                  wx.navigateBack()
                  app.globalData.errInfo = '上传成功！'
                  wx.navigateTo({
                    url: '../success_page/success_page',
                  })
                },
                fail: err => {
                  console.log(err)
                }
              })
            },
            fail: console.error
          })
        }
      }
    })
  },

  open_image(e){
    console.log(e)
    var imgUrl = e.currentTarget.dataset.src;
    wx.previewImage({
      urls: [imgUrl], //需要预览的图片http链接列表，注意是数组
      current: '', // 当前显示图片的http链接，默认是第一个
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.cloud.callFunction({
      name: "search_photos",
      data: {
        home_team: app.globalData.game_on_scoresheet.home_team,
        away_team: app.globalData.game_on_scoresheet.away_team,
        group: app.globalData.game_on_scoresheet.group
      },

      success: res =>{
        console.log(res)
        var data = res.result.data
        if (data.length == 0){
          console.log('No photos found!')
          this.setData({
            img_src: [],
            loading: false
          })
        }
        else{
          var fileID = [];
          for (var i=0; i<data.length; i++){
            fileID.push(data[i].fileID)
          }

          console.log(fileID)
          wx.cloud.getTempFileURL({
            fileList: fileID,
            success: res => {
              console.log(res)
              var img_src= [];
              for (var i=0; i<res.fileList.length; i++){
                img_src.push(res.fileList[i].tempFileURL)
              }
              this.setData({
                img_src: img_src,
                loading: false
              })
              console.log(this.data.img_src)
            }
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})