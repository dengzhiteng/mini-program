import {
  goodSearch
} from '../../api/goods'
require('../../lib/runtime/runtime')
Page({
  data: {
    goods: [],
    // 取消 按钮 是否显示
    isFocus: false,
    // 输入框的值
    inpValue: "",
  },
     // 用于input 防抖
     tiemID:'',
  handleInput(e) {
    const {
      value
    } = e.detail;
    // 输入值校验不通过
    if (!value.trim()) {
      return this.setData({
        goods: [],
        isFocus: false
      })
    }
    this.setData({
      isFocus: true
    })
    clearTimeout(this.tiemID)
     this.tiemID = setTimeout(() => {
      this.getGoodSearch(value)
    }, 1500)
  },
  handCancel(e){
    this.setData({
      goods: [],
      isFocus: false,
      inpValue:''
    })
  },
  async getGoodSearch(query) {
    const goods = await goodSearch({query});
    this.setData({
      goods
    })
  },
})