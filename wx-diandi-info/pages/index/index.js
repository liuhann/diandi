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

  toggleFuture: function(event) {
    const ftime = event.currentTarget.dataset.ftime;
    const currentData  = this.data;
    
    const setted = {
      otherplace: []
    };
    for(const future of this.data.otherplace) {
      if (future.start === ftime) {
        setted.name = future.name;
        setted.number = future.number;
        setted.start = future.start;
        setted.auction  = future.auction || [];
      } else {
        setted.otherplace.push(future);
      }
    }
    setted.otherplace.push({
      name: this.data.name,
      number: this.data.number,
      start: this.data.start,
      auction: this.data.auction
    });

    console.log(setted);

    this.setData(setted);

  },
  onLoad: function () {
    console.log('onLoad')
    var that = this;

    wx.request({
          url: 'https://apps.qudiandi.com/place.html',
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          complete: function(res) {
            for(const place of res.data.otherplace) {
              place.start = util.formatTime(new Date(place.start_time * 1000));
            }
            that.setData({
              loading: false,
              name: res.data.name,
              number: res.data.number,
              start: util.formatTime(new Date(res.data.start_time*1000)),
              auction: res.data.auction,
              otherplace: res.data.otherplace,
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
