Page({
  data: {
    userInfo: {},
    phoneNum: 18682151431,
  },
  onShow: function () {
    const userInfo = wx.getStorageSync('userInfo')
    this.setData({
      userInfo
    });
  },
  handleMakePhoneCall: function () {
    // 长按号码响应函数
    const _this = this;
    // 提示呼叫号码还是将号码添加到手机通讯录
    wx.showActionSheet({
      itemList: ['呼叫', '添加联系人'],
      success: function (res) {
        if (res.tapIndex === 0) {
          // 呼叫号码
          wx.makePhoneCall({
            phoneNumber: _this.data.phoneNum,
          })
        } else if (res.tapIndex == 1) {
          // 添加到手机通讯录
          wx.addPhoneContact({
            nickName: '小小晴天',
            lastName: '邓',
            middleName: '志腾',
            firstName: '邓志腾',
            mobilePhoneNumber: that.data.phoneNum,
            hostNumber: that.data.phoneNum,
            weChatNumber: that.data.phoneNum,
            organization: '桃源小店',
            title: '店主',
            addressCountry: '中国',
            addressState: '湖南省',
            addressCity: '郴州市',
            addressStreet: '下湄桥福城桃源',
            addressPostalCode: '423000',
            remark: '用心做好每一顿饭，服务好每一个顾客。',
            url: 'http:www.baidu.com'
          })
        }
      }
    })
  },
  handleNavigator:function(event){
    const url = event.currentTarget.dataset['url'];
    wx.navigateTo({
      url: url
    })
  },
  onShareAppMessage: function (res) {
    return {
      title: '小解馋',
      path: '/pages/index/index',
      imageUrl:'../../lib/images/shareBg.jpg',
      success: function(res) {
        console.log(res)
      },
      fail: function(err) {
        console.log(err)
      }
    }
  }
})