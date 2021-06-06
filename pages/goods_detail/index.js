import { goodDetail} from '../../api/goods'
require('../../lib/runtime/runtime')
Page({
  data: {
    goods:{},
    cart:[]
  },
  onLoad: async function (options) {
   let goods =await goodDetail({
      goods_id:options.goods_id
   })
   goods.goods_introduce.replace(/\.webp/g,'.jpg')
   this.setData({
    goods
   })
  },
  // 预览图片
  handlePreviewImage(e){
    const {index} = e.currentTarget.dataset
    const pics = this.data.goods.pics.map(v=>v.pics_mid)
    wx.previewImage({
      urls:pics,
      current:pics[index]
    })
  },
  // 加入购物车
  handleCartAdd(e){
    // 1 获取缓存中的购物车数据
    let cart = wx.getStorageSync('cart')||[];
    // 2 判断商品是否在 cart 中，若无，push;若有 商品num+1;
    let goods = this.data.goods
    const index = cart.findIndex(v=>v.goods_id ==goods.goods_id);
    if(index==-1){
      goods.num=1;
      goods.isChecked=false;
      cart.push(goods);
    }else{
      cart[index]['num']++;
    }
    wx.setStorageSync('cart', cart)
    wx.showToast({
      title: '成功加入购物车',
    })
  },
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
})