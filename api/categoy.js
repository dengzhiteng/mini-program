const {request} = require('../http/request.js')
module.exports = {
  // 商品分类
  homeCatitems:function () {
    return request({url:'/public/v1/categories'});
  }
}