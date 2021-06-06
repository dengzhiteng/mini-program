import {
  homeSwiperdata,
  homeCatitems,
  homeFloordata
} from '../../api/home'
require('../../lib/runtime/runtime')
import {
  navigator
} from "../../utils/util.js";

Page({
  data: {
    swiperData: [],
    catitemsData: [],
    floorData: []
  },
  onShow: function () {  
  },
  onLoad:function(){
    this.init();
  },
  handleNavigator:function(event){
    const url = event.currentTarget.dataset['url'];
    wx.navigateTo({
      url: url
    })
  },
  async init(){
    const swiperData = await  homeSwiperdata();
    const catitemsData = await  homeCatitems();
    const floorData = await  homeFloordata();
    this.setData({
      swiperData,
      catitemsData,
      floorData
    })
  },
  handleNavigator(event){
      const url = event.currentTarget.dataset['url'];
      console.log(url,event);
      wx.navigateTo({
        url: url
      })
  }
})
