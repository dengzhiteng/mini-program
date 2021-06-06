Page({
  data: {
    receiveInfo: {},
    cart: [],
    totalPrice: 0,
    isCheckedAll: false
  },
  onShow() {
    const cart = wx.getStorageSync('cart')||[]
    const receiveInfo = wx.getStorageSync('receiveInfo')
    const totalPrice = this.handeleTotalPrice(cart)
    this.handleCheckedAll()
    this.setData({
      cart,
      receiveInfo,
      totalPrice
    })
  },
  onHide() {
    // 数据存储
    wx.setStorageSync('cart', this.data.cart)
  },
  // 收货地址
  handleChooseAddress() {
    const _this = this;
    wx.chooseAddress({
      success: (res) => {
        let receiveInfo = res;
        receiveInfo.addressAll = res.provinceName + res.cityName + res.countyName + res.detailInfo;
        _this.setData({
          receiveInfo
        })
        wx.setStorageSync('receiveInfo', receiveInfo)
      },
      fail: (err) => {
        console.log(err);
      }
    })
  },
  // 减数量
  handeleReduceNum(e) {
    // 数量为1 减到0 时候提醒
    const _this = this
    let cart = this.data.cart
    const minNum = 0;
    const {
      index,
      num
    } = e.currentTarget.dataset;
    if (num == 1) {
      wx.showModal({
        title: '提示',
        content: '确认删除？',
        success(res) {
          if (res.confirm) {
            cart.splice(index, 1)
            const totalPrice = _this.handeleTotalPrice(cart);
            _this.setData({
              cart,
              totalPrice
            })
          }
        }
      })
    } else {
      cart[index].num = num - 1;
      const totalPrice = this.handeleTotalPrice(cart);
      this.setData({
        cart,
        totalPrice
      })
    }
  },
  // 加数量
  handeleAddNum(e) {
    // 数量加到最大（库存）时候提醒
    const _this = this
    let cart = this.data.cart
    const maxNum = 10;
    const {
      index,
      num
    } = e.currentTarget.dataset;
    if (num == maxNum) {
      wx.showToast({
        title: '最多购买' + maxNum + '个',
        icon: 'error'
      })
    } else {
      cart[index].num = num + 1;
      const totalPrice = this.handeleTotalPrice(cart);
      this.setData({
        cart,
        totalPrice
      })
    }
  },
  // 单个勾选
  handleChecked(e) {
    let {
      cart
    } = this.data
    const {
      index
    } = e.currentTarget.dataset;
    cart[index].isChecked = !cart[index].isChecked;
    const totalPrice = this.handeleTotalPrice(cart);
    const isCheckedAll = cart.every(v => {
      return v.isChecked == true
    })
    this.setData({
      cart,
      isCheckedAll,
      totalPrice
    });
  },
  // 全选 全不选
  handleCheckedAll() {
    let {
      isCheckedAll,
      cart
    } = this.data;
    isCheckedAll = !isCheckedAll;
    cart.map(v => {
      v.isChecked = isCheckedAll;
    })
    const totalPrice = this.handeleTotalPrice(cart);
    this.setData({
      cart,
      isCheckedAll,
      totalPrice
    });
  },
  // 计算总价
  handeleTotalPrice(cart) {
    let totalPrice = 0;
    cart.map(v => {
      if (v.isChecked)
        totalPrice += v.num * v.goods_price;
    })
    return totalPrice
  },
  // 结算
  handleSettlement() {
    const {
      receiveInfo,
      totalPrice
    } = this.data;
    if (!receiveInfo.userName) {
      return wx.showToast({
        title: '请选择收货地址',
      })
    }
    if (totalPrice == 0) {
      return wx.showToast({
        title: '请选择要结算的商品',
      })
    }
    // 1 获取token，无token,重新获取
    // 2 token 是否过时，过时：重新获取
    // 3 有token且未过时:进入支付页面
    const token = wx.getStorageSync('token');
    if(!token){
     return wx.navigateTo({
        url: '/pages/auth/index'
      })
    }
    wx.checkSession({
      success (res) {
        wx.navigateTo({
          url: '/pages/pay/index?totalPrice=' + totalPrice,
        })
      },
      fail (err) {
        wx.navigateTo({
          url: '/pages/auth/index'
        })
      }
    })
  }
})