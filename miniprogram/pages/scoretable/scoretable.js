// pages/scoretable/scoretable.js
var app = getApp()
function rerank(t,arr) {
  var len = t.length
  if (len==1){
    return t
  }
  var tempteam = new Array(len)
  for (var _=0;_<len;_++){
    tempteam[_]={
      id: t[_].id,
      name: t[_].name,
      point: 0,
      netscore: 0,
      totalscore: 0,
      grouppoint: t[_].grouppoint,
      groupnetscore: t[_].groupnetscore,
      grouptotalscore: t[_].grouptotalscore
    }
  }
  for (var _=0;_<len;_++){
    var ii = tempteam[_].id
    for (var __=0;__<len;__++){
      var jj = tempteam[__].id
      tempteam[_].point+= (arr[ii][jj][2]>=0?arr[ii][jj][2]:0)
      tempteam[_].netscore+= (arr[ii][jj][0]>=0?(arr[ii][jj][0]-arr[ii][jj][1]):0)
      tempteam[_].totalscore+= (arr[ii][jj][0]>=0?arr[ii][jj][0]:0)
    }
  }
  tempteam.sort((a,b)=>{
    if (a.point!=b.point){
      return b.point-a.point
    }
    if (a.netscore!=b.netscore){
      return b.netscore-a.netscore
    }
    if (a.totalscore!=b.totalscore){
      return b.totalscore-a.totalscore
    }
    if (b.groupnetscore!=a.groupnetscore){
      return b.groupnetscore-a.groupnetscore
    }
    if (b.grouptotalscore!=a.grouptotalscore){
      return b.grouptotalscore-a.grouptotalscore
    }
  })
  console.log(tempteam)
  for(var i=0;i<len-1;i++){
    if (tempteam[i].point==tempteam[i+1].point){
      var j = i+2;
      for(;j<len&&tempteam[j].point==tempteam[i].point;j++){}
      if (i==0&&j==len) return tempteam
      var temptemp = rerank(tempteam.slice(i,j), arr);
      for (var _=0;_<j-i;_++){
        tempteam[_+i] = temptemp[_]
      }
      i = j-1;
    }
  }
  return tempteam
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    group: 0,
    littlegroup: 0,
    names: [],
    loading: true,
    teams: null,
    score: null,
    nonzero: 0,
    array1: [],
    value1: 0,
    array2: [],
    value2: 0,
  },
  bindPickerChange1: function(e) {
    this.setData({
        group: this.data.array1[e.detail.value],
        value1: e.detail.value,
        array2: app.globalData.LITTLEGROUPS[e.detail.value],
        value2: 0,
        littlegroup: this.data.array2[0],
        loading: true
    })
    wx.cloud.callFunction({
      name:"make_table",
      data:{
        group: this.data.group,
        littlegroup: this.data.littlegroup
      },
      success: res =>{
        console.log(res.result)
        this.setData({
          score:res.result.arr,
          names:res.result.names
        })
        var temp = rerank(res.result.teams,res.result.arr)
        console.log(temp)
        var cnt = 0
        for(var i=0;i<temp.length;i++){
          if (temp[i].grouppoint>0){
            cnt++
          }
        }
        console.log(this.data.teams)
        console.log(temp)
        console.log(cnt)
        this.setData({
          teams: temp,
          nonzero: cnt,
          loading: false
        })
      },
      fail: err =>{
        console.log(err)
        app.globalData.errInfo = "检查错误"
        wx.navigateTo({
          url: '../error_page/error_page',
        })
      }
    })
  },
  bindPickerChange2: function(e) {
    this.setData({
        littlegroup: this.data.array2[e.detail.value],
        value2: e.detail.value,
        loading:true
    })
    console.log(this.data.littlegroup)
    wx.cloud.callFunction({
      name:"make_table",
      data:{
        group: this.data.group,
        littlegroup: this.data.littlegroup
      },
      success: res =>{
        console.log(res.result)
        this.setData({
          score:res.result.arr,
          names:res.result.names
        })
        var temp = rerank(res.result.teams,res.result.arr)
        console.log(temp)
        var cnt = 0
        for(var i=0;i<temp.length;i++){
          if (temp[i].grouppoint>0){
            cnt++
          }
        }
        console.log(this.data.teams)
        console.log(temp)
        console.log(cnt)
        this.setData({
          teams: temp,
          nonzero: cnt,
          loading: false
        })
      },
      fail: err =>{
        console.log(err)
        app.globalData.errInfo = "检查错误"
        wx.navigateTo({
          url: '../error_page/error_page',
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */

   

  onLoad(options) {
  this.setData({
    group: app.globalData.GROUP_NAMES[parseInt(options.group)],
    littlegroup: app.globalData.LITTLEGROUPS[parseInt(options.group)][parseInt(options.littlegroup)],
    array1: app.globalData.GROUP_NAMES,
    array2: app.globalData.LITTLEGROUPS[0],
  })
  wx.cloud.callFunction({
    name:"make_table",
    data:{
      group: this.data.group,
      littlegroup: this.data.littlegroup
    },
    success: res =>{
      console.log(res.result)
      this.setData({
        score:res.result.arr,
        names:res.result.names
      })
      var temp = rerank(res.result.teams,res.result.arr)
      console.log(temp)
      var cnt = 0
      for(var i=0;i<temp.length;i++){
        if (temp[i].grouppoint>0){
          cnt++
        }
      }
      console.log(this.data.teams)
      console.log(temp)
      console.log(cnt)
      this.setData({
        teams: temp,
        nonzero: cnt,
        loading: false
      })
    },
    fail: err =>{
      console.log(err)
      app.globalData.errInfo = "检查错误"
      wx.navigateTo({
        url: '../error_page/error_page',
      })
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