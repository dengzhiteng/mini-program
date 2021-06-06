Component({
  options: {
    styleIsolation: 'isolated',// 组件样式隔离
  },
  properties: {
    tabs: {
      type: Array,
      value: []
    },
    currentIndex: {
      type: Number,
      value: 0
    },
  },
  onLoad: function (options) {
    console.log(options);
  },
  methods: {
    handleTab(e) {
      const {
        index
      } = e.currentTarget.dataset;
      this.setData({
        currentIndex: index
      })
      this.triggerEvent('handleTapTab', {
        index,
        target: this.data.tabs[index]
      })
    }
  }
})