const {request} = require('../http/request.js')
module.exports = {
  // 获取用户token
  usersWxlogin:function (data) {
    return request({url:'/public/v1/users/wxlogin',method:'POST',data});
  }
}