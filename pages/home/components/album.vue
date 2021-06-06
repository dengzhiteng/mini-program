<template>
	<scroll-view scroll-y="true" show-scrollbar="true" lower-threshold="100" class="album"
		@scrolltolower="handleScrolltolower">
		<view class="banner">
			<swiper class="swiper" indicator-dots="true" autoplay="true" interval="2000" duration="true">
				<swiper-item v-for="(item,index) in banner" :key="index">
					<image :src="item.thumb"></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="list">
			<template v-for="(item,index) in album" >
				<navigator :url="'/pages/album/index?id='+item.id"class="item" :key="index">
					<view class="img">
						<image :src="item.cover" mode="widthFix"></image>
					</view>
					<view class="info">
						<view class="name">{{item.name}}</view>
						<view class="desc">{{item.desc}}</view>
						<view class="btn">
							<button type="default">关注</button>
						</view>
					</view>
				</navigator>
			</template>
		</view>
	</scroll-view>
</template>

<script>
	export default {
		data() {
			return {
				hasMore: true,
				params: {
					limt: 10, // 要获取多少条
					skip: 0, // 要跳过多少条
					order: 'news', // 关键字
				},
				banner: [], // 轮播图
				album: [] // 专辑
			}
		},
		mounted() {
			uni.setNavigationBarTitle({
				title: '专辑'
			})
			this.getWallpaperAlbum();
		},
		methods: {
			getWallpaperAlbum() {
				this.request({
					url: '/v1/wallpaper/album',
					data: this.params
				}).then(res => {
					if (this.params.limt > res.res.album.length) {
						this.hasMore = false;
					}
					if (this.banner.length == 0) {
						this.banner = res.res.banner;
					}
					this.album = res.res.album;
					this.params.skip += this.params.limt;
				})
			},
			handleScrolltolower() {
				if (this.hasMore) {
					this.getWallpaperAlbum();
				}
			}
		}
	}
</script>
<style lang="scss" scoped>
	.album {
		height: 100vh
	}

	.banner image {
		height: calc(750rpx/2.3);
	}

	.list .item {
		display: flex;
		justify-content: space-between;
		margin-top: 20rpx;
	}

	.list .item image {
		width: 300rpx;
	}

	.list .item .info {
		padding: 0 20rpx;
		flex: 1;
		position: relative;
		color: #333;
		overflow: hidden;
	}

	.list .item .info .name {
		font-size: 36rpx;
		font-weight: bold;
		line-height: 60rpx;
	}

	.list .item .info .desc {
		font-size: 28rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.list .item .info .btn {
		width: 80rpx;
		position: absolute;
		right: 20rpx;
		bottom: 0;
		text-align: center;
	}

	.list .item .info .btn button {
		height: 50rpx;
		line-height: 50rpx;
		font-size: 24rpx;
		color: rgb(217, 61, 138);
		border: 1px solid rgb(217, 61, 138);
		padding: 0;
	}
</style>
