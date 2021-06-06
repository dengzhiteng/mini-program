import {
  allOrders
} from '../../api/orders'
require('../../lib/runtime/runtime')
Page({
  data: {
    tabs: [{
        name: '全部',
        index: 0
      },
      {
        name: '待付款',
        index: 1
      },
      {
        name: '待发货',
        index: 2
      },
      {
        name: '退款/退货',
        index: 3
      }
    ],
    currentIndex: 0
  },
  onLoad:async function (options) {
    this.setData({
      currentIndex: options.index
    })
     const res = await allOrders({type:options.type});
  },
  handleTapTab: function (e) {
    const {
      index
    } = e.detail;
    this.setData({
      currentIndex: index
    })
  }
})