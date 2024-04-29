// pages/scoretable/scoretable.js
var app = getApp()
function rerank(t,arr,teams) {
  var templen = t.length
  if (templen==1){
    return t
  }
  var tempteam = new Array(templen)
  for (var _=0;_<templen;_++){
    tempteam[_]={
      id: t[_].id,
      point: 0,
      netscore: 0,
      totalscore: 0,
    }
  }
  for (var _=0;_<templen;_++){
    var ii = tempteam[_].id
    for (var __=0;__<templen;__++){
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
    if (teams[a.id].netscore!=teams[b.id].netscore){
      return teams[b.id].netscore - teams[a.id].netscore
    }
    if (teams[a.id].totalscore!=teams[b.id].totalscore){
      return teams[b.id].totalscore - teams[a.id].totalscore
    }
  })
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
        var teams = Object.assign([],res.result.teams)
        var temp = Object.assign([],res.result.teams)
        
        temp.sort((a,b)=>{
          return b.point-a.point
        })
        var len = temp.length
        console.log(temp)
        for(var i=0;i<len-1;i++){
          if (temp[i].point==temp[i+1].point){
            var j = i+2;
            for(;j<len&&temp[j].point==temp[i].point;j++){}
            var temptemp = rerank(temp.slice(i,j),this.data.score,teams);
            for (var _=0;_<j-i;_++){
              temp[_+i] = temptemp[_]
            }
            i = j-1;
          }
        }
        console.log(temp)
        var tt = Object.assign([],teams);
        var cnt = 0
        for(var i=0;i<len;i++){
          teams[i] = tt[temp[i].id]
          if (teams[i].totalpoint>0){
            cnt++
          }
        }
        console.log(this.data.teams)
        console.log(teams)
        console.log(cnt)
        this.setData({
          teams: teams,
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
        var teams = Object.assign([],res.result.teams)
        var temp = Object.assign([],res.result.teams)
        
        temp.sort((a,b)=>{
          return b.point-a.point
        })
        var len = temp.length
        console.log(temp)
        for(var i=0;i<len-1;i++){
          if (temp[i].point==temp[i+1].point){
            var j = i+2;
            for(;j<len&&temp[j].point==temp[i].point;j++){}
            var temptemp = rerank(temp.slice(i,j),this.data.score,teams);
            for (var _=0;_<j-i;_++){
              temp[_+i] = temptemp[_]
            }
            i = j-1;
          }
        }
        console.log(temp)
        var tt = Object.assign([],teams);
        var cnt = 0
        for(var i=0;i<len;i++){
          teams[i] = tt[temp[i].id]
          if (teams[i].totalpoint>0){
            cnt++
          }
        }
        console.log(this.data.teams)
        console.log(teams)
        console.log(cnt)
        this.setData({
          teams: teams,
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
      var teams = Object.assign([],res.result.teams)
      var temp = Object.assign([],res.result.teams)
      
      temp.sort((a,b)=>{
        return b.point-a.point
      })
      var len = temp.length
      console.log(temp)
      for(var i=0;i<len-1;i++){
        if (temp[i].point==temp[i+1].point){
          var j = i+2;
          for(;j<len&&temp[j].point==temp[i].point;j++){}
          var temptemp = rerank(temp.slice(i,j),this.data.score,teams);
          for (var _=0;_<j-i;_++){
            temp[_+i] = temptemp[_]
          }
          i = j-1;
        }
      }
      console.log(temp)
      var tt = Object.assign([],teams);
      var cnt = 0
      for(var i=0;i<len;i++){
        teams[i] = tt[temp[i].id]
        if (teams[i].totalpoint>0){
          cnt++
        }
      }
      console.log(this.data.teams)
      console.log(teams)
      console.log(cnt)
      this.setData({
        teams: teams,
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