<template>
	<view class="member">
		<button class="contact" open-type="contact" show-message-card session-from send-message-path send-message-title>在线客服</button>
		<view class="contactUs" @click="makePhone('18682151435')">
			联系我们：18682151435
		</view>
		<view class="map">
			<text>地址:郴州市北湖区福成桃源13栋</text>
			<map :latitude="latitude" :longitude="longitude" :markers="markers" scale="14"></map>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				longitude: 113.030061,
				latitude: 25.829564,
				markers: [{
					content:"桃源小店",
					longitude: 113.030061,
					latitude: 25.829564,
					// iconPath:'../../static/icon/news-active.png',
					// width:16,
					// height:16
				}],
			}
		},
		methods: {
			makePhone(tel) {
				uni.makePhoneCall({
					phoneNumber: tel
				});
			}

		}
	}
</script>

<style lang="scss" scoped>
	.member {
		padding: 20rpx;
		line-height: 40rpx;
		font-size: 24rpx;
		color: #666;

		.contact {
			width: 200rpx;
			margin: 0 10rpx;
		}

		.contactUs {
			margin-top: 10rpx;
		}

		.map {
			text {}

			map {
				width: 750rpx;
				height: 600rpx;
				margin-top: 10rpx;
			}
		}
	}
</style>
