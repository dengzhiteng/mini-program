const { baseUrl } = require('./env.js').dev;
// 同时发送异步代码的次数
let ajaxTimes=0;
var request =   function (params) {
  wx.showLoading({
    title: '加载中',
  });
  ajaxTimes++;
  return new Promise(function(reslove,reject){
    let header={...params.header};
    if(params.url.includes("/my/")){
      // 拼接header 带上token
      header["Authorization"]=wx.getStorageSync("token");
    }
    wx.request({
      ...params,
      header:header,
      url: baseUrl+params.url,
      method:params.method||'GET',
      success:function(res){
        if(res.data.meta&&res.data.meta.status==200){
          reslove(res.data.message);
        }else{
          wx.showToast({
            title: res.data.msg||res.data.meta&&res.data.meta.msg,
          })
          reject(res.data.msg||res.data.meta&&res.data.meta.msg);
        }
      },
      fail:function(err){
        wx.showToast({
          title: '数据接口有问题'
        })
        reject('数据接口有问题')
      },
      complete:function(rest){
        ajaxTimes--;
        if(ajaxTimes==0){
          wx.hideLoading()
        }
      }
    })
  })
}
module.exports = {
  request: request
}