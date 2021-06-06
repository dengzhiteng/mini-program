const {request} = require('../http/request.js')
module.exports = {
  // 商品列表搜索
  goodList:function (data) {
    return request({url:'/public/v1/goods/search',data:data});
  },
   // 商品详情
   goodDetail:function (data) {
    return request({url:'/public/v1/goods/detail',data:data});
  },
  // 商品搜索
  goodSearch:function (data) {
    return request({url:'/public/v1/goods/qsearch',data:data});
  }
}