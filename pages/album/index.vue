<template>
	<scroll-view scroll-y="true"  class="album" lower-threshold="100" @scrolltolower="handleScrolltolower">
		<view class="info" v-if="album">
			<image :src="album.cover" mode="widthFix"></image>
			<view class="subhead">
				<view class="left">
					<text class="name">{{album.name}}</text>
					<text class="desc">{{album.desc}}</text>
				</view>
				<view class="right btn">关注专辑</view>
			</view>
		</view>
		<view class="user" v-if="album">
			<view class="avatarName">
				<image class="userAvatar" :src="album.user.avatar" mode="widthFix"></image>
				<text class="userName">{{album.user.name}}</text>
			</view>
			<view class="intro">
				uni-app在手，做啥都不愁。即使不跨端，uni-app也是更好的小程序开发框架（详见）、更好的App跨平台框架、更方便的H5开发框架。不管领导安排什么样的项目，你都可以快速交付，不需要转换开发思维、不需要更改开发习惯。
			</view>
		</view>
		<view class="list">
			<image :src="item" mode="widthFix" class="item" v-for="(item,index) in wallpaper" :key="index"></image>
		</view>
	</scroll-view>
</template>

<script>
	export default {
		data() {
			return {
				id:'',
				params: {
					limt: 10, // 要获取多少条
					skip: 0, // 要跳过多少条
					order: 'news', // 关键字
					first:1 //	“1” 表示第一次请求 “0”表示不是第一次请求
				},
				album:null,// 专辑信息
				wallpaper:[
					
				] //“专辑” 列表
			}
		},
		onLoad(option) {
			   this.id = option.id;
		},
		created() {
			this.getAlbumWallpaper()
		},
		methods: {
			getAlbumWallpaper(){
				this.request({
					url: `/v1/wallpaper/album/${this.id}/wallpaper`,
					data: this.params
				}).then(res => {
						if(this.params.first==1){
							this.params.first = 0;
							this.album = res.res.album;
						}
						var arr= [
							'http://img5.adesk.com/6008013de7bce7518cabc38b?imageView2/3/h/240',
							'http://img5.adesk.com/5f0eddcce7bce777c7227d86?imageView2/3/h/240',
							'http://img5.adesk.com/6008013de7bce7518cabc38b?imageView2/3/h/240',
							'http://img5.adesk.com/5f6460f9e7bce75eee0c845f?imageView2/3/h/240',
							'http://img5.adesk.com/6008013de7bce7518cabc38b?imageView2/3/h/240',
							'http://img5.adesk.com/5f0eddcce7bce777c7227d86?imageView2/3/h/240',
							'http://img5.adesk.com/6008013de7bce7518cabc38b?imageView2/3/h/240',
							'http://img5.adesk.com/5f6460f9e7bce75eee0c845f?imageView2/3/h/240',
							'http://img5.adesk.com/6008013de7bce7518cabc38b?imageView2/3/h/240',
							'http://img5.adesk.com/6008013de7bce7518cabc38b?imageView2/3/h/240',
							'http://img5.adesk.com/5f0eddcce7bce777c7227d86?imageView2/3/h/240',
							'http://img5.adesk.com/6008013de7bce7518cabc38b?imageView2/3/h/240',
							'http://img5.adesk.com/5f6460f9e7bce75eee0c845f?imageView2/3/h/240',
							'http://img5.adesk.com/6008013de7bce7518cabc38b?imageView2/3/h/240',
							'http://img5.adesk.com/5f0eddcce7bce777c7227d86?imageView2/3/h/240',
							'http://img5.adesk.com/6008013de7bce7518cabc38b?imageView2/3/h/240',
							'http://img5.adesk.com/5f6460f9e7bce75eee0c845f?imageView2/3/h/240',
							'http://img5.adesk.com/6008013de7bce7518cabc38b?imageView2/3/h/240',
						]
						this.wallpaper = [...this.wallpaper,...arr];
				})
			},
			handleScrolltolower(){
				this.getAlbumWallpaper()
			}
		}
	}
</script>

<style scoped>
	.album{
		height: 100vh;
	}
	.info{
		position: relative;
	}
	.subhead{
		display: flex;
		justify-content: space-around;
		position: absolute;
		bottom: 40rpx;
		width: 100%;
		color: #fff;
	}
	.subhead .left{
		flex: 1;
	}
	.subhead .right{
		width: 130rpx;
		line-height: 50rpx;
		height: 50rpx;
		margin-right: 10rpx;
		text-align: center;
		color: #fff;
		border-radius: 5rpx;
		background-color: rgb(217, 61, 138);
	}
	.subhead .left .name{
		font-weight: bold;
	    font-size: 36rpx;
	}
	.subhead .left .desc{
		font-size: 28rpx;
	}
	.user{
		padding: 10rpx;
	}
	.user .avatarName{
		display: flex;
	}
	.user .avatarName .userAvatar{
		width: 100rpx;
		border-radius: 10rpx;
		margin-right:15rpx;
	}
	.user .avatarName .userName{
		color: #333;
		font-weight: bold;
	}
	.user .intro{
		line-height: 40rpx;
		text-indent: 1em;
		margin-top: 10rpx;
	}
	
	.list {
		display: flex;
		flex-wrap: wrap;
	}
	.list .item {
		width: 33.3333%;
		border: 3px solid #fff;
	}

</style>
