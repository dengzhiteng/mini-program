import {
  homeCatitems
} from '../../api/categoy'
require('../../lib/runtime/runtime')
Page({
  data: {
    list: [],
    leftMenu: [],
    rightContent: [],
    currentIndex: 0
  },
  onLoad: async function () {
    let list = [];
    const categoryList = wx.getStorageSync('categoryList');
    // 缓存中无数据或者缓存时间超过1 hour，则重新发起请求
    if (!categoryList || Date.now() - categoryList.time > 1000 * 60*60) {
      // 获取分类数据
      list = await homeCatitems()
    } else {
      list = categoryList.data
    }
    const leftMenu = list.map(v => v.cat_name)
    const rightContent = list[this.data.currentIndex]['children']
    this.setData({
      list,
      leftMenu,
      rightContent
    })
    wx.setStorageSync('categoryList', {
      time: Date.now(),
      data: list
    })


  },
  handleCategory: function (e) {
    const {
      index
    } = e.currentTarget.dataset;
    if (index == this.data.currentIndex) return false;
    const rightContent = this.data.list[index]['children']
    this.setData({
      currentIndex: index,
      rightContent
    })
  }
})