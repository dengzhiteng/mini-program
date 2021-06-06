<template>
	<view class="home">
		<swiper class="swiper" indicator-dots :autoplay="true">
			<swiper-item v-for="(item,index) in banner" :key="item.goods_id">
				<navigator :url="item.navigator_url" open-type="switchTab" hover-class="other-navigator-hover">
					<image :src="item.image_src" :mode="item.open_type"></image>
				</navigator>
			</swiper-item>
		</swiper>
		<view class="nav">
			<view class="nav_item" v-for="(item,index) in nav" :key="index">
				<image :src="item.image_src" mode="aspectFit"></image>
			</view>
		</view>

		<view class="hot_goods" v-for="(item,index) in goods" :key="index">
			<view class="floor_title">
				<image :src="item.floor_title.image_src" mode="aspectFit"></image>
			</view>
			<scroll-view class="scroll-view" scroll-x="true" scroll-left="120">
				<view class="scroll-view-item" v-for="(item1,index1) in item.product_list" :key="index1">
					<image :src="item1.image_src" :mode="item1.open_type"></image>
					<view class="text-box">
						<text class="name">{{item1.name}}</text>
						<text class="price">￥98</text>
					</view>
				</view>
			</scroll-view>
		</view>

	</view>
</template>
<script>
	export default {
		data() {
			return {
				banner: [],
				nav: [],
				goods: []
			}
		},
		onLoad() {
			// this.getSwiper();
			// this.getNav();
			// this.getHotGoods();
		},
		methods: {
			async getSwiper() {
				const res = await this.myRequest({
					url: "/home/swiperdata"
				})
				this.banner = res.message
			},
			async getNav() {
				const res = await this.myRequest({
					url: "/home/catitems"
				})
				this.nav = res.message
			},
			async getHotGoods() {
				const res = await this.myRequest({
					url: '/home/floordata'
				})
				this.goods = res.message
			},
		}
	}
</script>

<style lang="scss" scoped>
	.swiper {
		width: 100%;

		navigator,
		image {
			width: 100%;
			height: 100%;
		}
	}

	.nav {
		display: flex;

		.nav_item {
			width: 25%;
			text-align: center;

			image {
				width: 120rpx;
				height: 160rpx;
				border-radius: 50%;
				margin: 5px auto;
				background: $shop-color;
				color: #fff;
			}
		}
	}

	.hot_goods {
		padding: 10px;
		padding: 20rpx 10rpx;
		.floor_title{
			image{
				height: 60rpx;
			}
		}
		&:last-of-type {
			padding-bottom: 160rpx;
		}
}
		.scroll-view {
			white-space: nowrap;
			width: 100%;

			.scroll-view-item {
				display: inline-block;
				width: 50%;
				text-align: left;
				font-size: 36rpx;
				margin: 0 10rpx;
				position: relative;
				height: 400rpx;
				image {
					width: 100%;
					height: 300rpx;
				}

				.text-box {
					position: absolute;
					width: 100%;
					text-align: center;
					left: 0;
					bottom: 30rpx;
					.name {
						color: #000;
					}

					.price {
						color: rgb(181, 14, 3);
						padding-left: 10rpx;
					}
				}
			}
		}
</style>
