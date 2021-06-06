const {request} = require('../http/request.js');
module.exports = {
  // 获取支付参数
  req_unifiedorder: function (data) {
    return request({url:'/public/v1/my/orders/req_unifiedorder',method:'POST',data});
  },
  // 创建订单
  createOrder: function (data) {
    return request({url:'/public/v1/my/orders/create',method:'POST',data});
  },
  // 查看订单支付状态
  chkOrder: function (data) {
    return request({url:'/public/v1/my/orders/chkOrder',method:'POST',data});
  },
  // 历史订单查询
  allOrders: function (data) {
    return request({url:'/public/v1/my/orders/all',method:'POST',data});
  }
}