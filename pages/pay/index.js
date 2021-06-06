import {
  req_unifiedorder,
  createOrder,
  chkOrder
} from '../../api/orders'
require('../../lib/runtime/runtime')
import { getSetting, chooseAddress, openSetting, showModal, showToast, requestPayment } from "../../utils/asyncWx.js";

Page({
  data: {
    receiveInfo: {},
    cart: [],
    totalPrice: 0
  },
  onShow() {
    const cart = wx.getStorageSync('cart') || [];
    // 只取选中的商品
    const checkedCart = cart.filter(v => v.isChecked == true)
    const totalPrice = this.handeleTotalPrice(checkedCart);
    const receiveInfo = wx.getStorageSync('receiveInfo')
    this.setData({
      cart: checkedCart,
      receiveInfo,
      totalPrice
    })
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
  // 订单数组
  handeleGoods(cart) {
    let goods = []
    cart.map(v => {
      goods.push({
        goods_id: v.goods_id,
        goods_number: v.goods_number,
        goods_price: v.goods_price
      })
    })
    return goods
  },
  // 支付
  async handleOrderPay() {
    // 1 创建订单,获取orderNumber
    // 2 准备预支付
    // 3 发起微信支付
    // 4 查询后台 订单状态
    // 5 手动删除缓存中 已经支付了的商品
    // 6 支付成功了 跳转到订单页面
    try {
      const goods = this.handeleGoods(this.data.cart);
      const {
        order_number
      } = await createOrder({
        order_price: this.data.totalPrice,
        consignee_addr: this.data.receiveInfo,
        goods: goods
      });
      const {
        pay
      } = req_unifiedorder({
        order_number
      });
      await requestPayment(pay);
      const res = await request({order_number});
      await showToast({ title: "支付成功" });

       let newCart=wx.getStorageSync("cart");
       newCart=newCart.filter(v=>!v.checked);
       wx.setStorageSync("cart", newCart);
      
       wx.navigateTo({
        url: '/pages/order/index'
      });
    } catch (error) {
      console.log(error);
      await showToast({ title: "支付失败" })
    }
  }
})