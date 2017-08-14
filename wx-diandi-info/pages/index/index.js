//index.js
//获取应用实例
var app = getApp()
const tops = require('./tops');

Page({
  data: {
    motto: 'Hello World',
    tops: tops,
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  navTo: function(event) {
    
    wx.navigateTo({
      url: '../detail/index?cover=' + event.currentTarget.dataset.icon
    });
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      console.log(userInfo);
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
