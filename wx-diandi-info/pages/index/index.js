//index.js
//获取应用实例
var app = getApp()
const tops = require('./tops');
var util = require('../../utils/util.js')

Page({
  data: {
    motto: 'Hello World',
    tops: [],
    title: '点滴第21届大众收藏拍卖会预展资讯',
    total: 0,
    start: '',
    loading: true,
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
      url: '../detail/index?aid=' + event.currentTarget.dataset.aid
    });
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this;

    wx.request({
          url: 'http://apps.qudiandi.com/place.html',
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          complete: function(res) {
            that.setData({
              loading: false,
              title: res.data.name,
              total: res.data.number,
              start: util.formatTime(new Date(res.data.start_time*1000)),
              tops: res.data.auction
            });
          }
    });

    
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
