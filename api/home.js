const {request} = require('../http/request.js')
module.exports = {
  // 首页轮播
  homeSwiperdata:function () {
    return request({url:'/public/v1/home/swiperdata'});
  },
  // 首页导航
  homeCatitems:function () {
    return request({url:'/public/v1/home/catitems'});
  },
  // 首页楼层
  homeFloordata:function () {
    return request({url:'/public/v1/home/floordata'});
  }
}