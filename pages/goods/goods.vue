<template>
  <view class="goods">
    <view class="category">
      <scroll-view class="tab" scroll-y="true">
        <view class="item">精品湘菜</view>
        <view class="item active">时令蔬菜</view>
        <view class="item">美味靓汤</view>
        <view class="item">凉菜</view>
        <view class="item">米面点心</view>
      </scroll-view>
      <scroll-view class="content" scroll-y="true">
        <view class="item">
          <view>
            <image src="../../static/icon/cart-active.png" mode=""></image>
          </view>
          <view class="goodsDesc">
            <text class="name">辣椒炒肉</text>
            <text class="sellNum">销量40</text>
            <text class="price">￥98.00</text>
          </view>
          <view class="addCart">
            <button type="default" class="reduceOne">-</button>
            <input
              class="addnum"
              maxlength="10"
              type="number"
              disabled
              value="11"
            />
            <button type="default" class="addOne">+</button>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.goods {
  height: 100%;
}

.category {
  display: flex;
  height: 100%;
  color: #333;
  scroll-view.tab {
    width: 200rpx;
    height: 100%;
    overflow: auto;
    background-color: #f8f8f8;
    border-right: 1px solid #f8f8f8;
    .item {
      height: 90rpx;
      line-height: 90rpx;
      text-align: center;
    }

    .item.active {
      background-color: #fff;
    }
  }

  scroll-view.content {
    flex: 1;
    height: 100%;
    overflow: auto;
    color: #333;

    .item {
      display: flex;
      justify-content: space-around;
      padding: 10rpx;
      border-bottom: 1px solid #dcdcdc;
      image {
        width: 140rpx;
        height: 140rpx;
      }
      .goodsDesc {
        font-size: 28rpx;
        flex: 6;
        margin: 0 20rpx;
        text {
          display: block;
        }
        .name {
          color: #000;
          font-size: 32rpx;
        }
        .sellNum {
          color: #dcdcdc;
          font-size: 24rpx;
        }
        .price {
          color: red;
          font-size: 30rpx;
        }
      }
      .addCart {
        flex: 4;
        display: flex;
        position: relative;
        color: #333;
        .addnum,
        button {
          width: 40rpx;
          height: 40rpx;
          line-height: 40rpx;
          padding: 0;
          border-radius: 0;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
        }
        .addnum {
          right: 60rpx;
          font-size: 24rpx;
          text-align: center;
        }
        .addOne {
          right: 10rpx;
        }
        .reduceOne {
          left: 0;
        }
      }
    }
  }
}
</style>
