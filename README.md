# WeChatShop
原生开发的小程序商店

链接：https://pan.baidu.com/s/17y6r44hrocXVjnPBVgJd5g 
提取码：fk83 配套资料

接口档案
https://www.showdoc.cc/128719739414963?page_id=2612486239891213
链接里的代码需要在
request/index.js中修改为
const baseUrl=https://api-hmugo-web.itheima.net/api/public/v1;

技术问题
1 方法如何挂载到全局

### 技术问题
- less 如何快速生成wsxx
- async awite 在小程序中的使用
- 样式中使用 calc  height:~'calc(100vh-10rpx)'

- vscode 中快速创建文件
- vscode 中快速修改code
- vscode 中快速书写code

- request 封装中参数使用解构...,baseUrl 提取，重新赋参数可以实现覆盖

- 大数据，使用缓存，缓存下来，小程序的数据缓存与web的数据缓存有什么区别
1. 写法上的区别 
2. 存储上的区别，web 中存储会使用toString方法，小程序中存储数据类型不会改变


- 小程序中的事件绑定
- webp图片格式 在部分iPhone 手机中不显示

- 小程序中样式间的相互污染问题



- 微信登录流程 
- 微信支付流程
- 获取微信收货地址流程
- 获取微信卡券流程
- 获取微信个人信息流程

- 分享小程序
- 分享商品
``` 
<button open-type="share"></button>
<!-- 如此同时会触发 onShareAppMessage 钩子 -->
 onShareAppMessage: function (res) {
    return {
      title: this.data.goods.goods_name,
      path: '/pages/goods_detail/index?goods_id='+this.data.goods.goods_id,
      success: function(res) {
        console.log(res)
      },
      fail: function(err) {
        console.log(err)
      }
    }
  }
```

1. 后台处理 
2  goods_introduce.replace(/\.webp/g,'.jpg') 前端进行替换，
- 小程序中 AppData 数据不宜过多，否则性能会下降，渲染会减慢
```
<view bindtap="viewTap">click me</view>

 viewTap() {
    console.log('click me!')
  }
```
- asyncWx

#### 支付流程
1. 创建订单，获取订单编号 order_number
2. 准备预支付  获取支付参数 pay
3. 发起微信支付 提交pay参数
4. 查询订单






