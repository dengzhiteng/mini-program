import { goodList} from '../../api/goods'
require('../../lib/runtime/runtime')
Page({
  data: {
    tabs: [{
        id: 0,
        name: '综合'
      },
      {
        id: 1,
        name: '销量'
      },
      {
        id: 2,
        name: '价格'
      }
    ],
    goodsList: [],
    pageNumTotal:0,
    currentIndex:0,
    parames: {
      query: '',
      cid: '',
      pagenum: 0,
      pagesize: 10
    }
  },
  onLoad: function (options) {
    this.setData({
      ['parames.cid']: options.cat_id
    })
    this.goodList()
  },
  goodList: async function () {
    const rest = await goodList({
      data: this.data.parames
    });
    // 计算总页数 pageNumTotal
    const pageNumTotal = Math.ceil(rest.total/this.data.parames.pagesize);
    const goodsList=[...this.data.goodsList,...rest.goods]
    this.setData({
      goodsList,
      pageNumTotal
    });
    const pagenum =  this.data.parames.pagenum+1
    this.setData({
      ['parames.pagenum']:pagenum
    })
  },
  handleTapTab: function (e) {
    const {
      index
    } = e.detail;
    this.setData({
      currentIndex:index
    });
  },
  onReachBottom: function (e) {
    if(this.data.parames.pagenum<this.data.pageNumTotal){
      this.goodList()
    }
  },
  onPullDownRefresh: function(e) {
    this.setData({
      ['parames.pagenum']:0,
      pageNumTotal:0,
      goodsList:[]
    })
    this.goodList();
    wx.stopPullDownRefresh()
  }
})