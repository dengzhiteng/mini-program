<template>
	<view class="details">
		<view class="imageDetails">
			<view class="top">
				<view class="avatar">
					<image :src="imageDetails['thumb']"></image>
				</view>
				<view class="desc">
					<text class="name">{{imageDetails.tag|FilterName}}</text>
					<view class="date">{{imageDetails.atime*1000|FilterDate}}</view>
				</view>
			</view>
			<swiper-action @swiperAction="handlSwiperAction">
				<image :src="imageDetails['thumb']" mode="aspectFill" ></image>
			</swiper-action>
			<view class="user_rank">
				<view class="rank">
					<text class="iconfont icondianzan">{{imageDetails.rank}}</text>
				</view>
				<view class="collect">
					<text class="iconfont iconshoucang">收藏</text>
				</view>
			</view>
		</view>
		<!-- 专辑数据 -->
		<view class="album_list list"  v-if="album&&album.length">
			<text class="title">相关</text>
			<view class="item" v-for="(item,index) in album" :key="index">
				<view class="left">
					<image :src="item.user.avatar" mode="widthFix" ></image>
				</view>
				<view class="right">
					<button type="default" class="btn">专辑</button>
					<view class="name">{{item.content}}</view>
				</view>
			</view>
		</view>
		<!-- 热门评论 -->
		<view class="hot_list list" v-if="hot&&hot.length">
			<text class="title"> 热门评论</text>
			<view class="item" v-for="(item,index) in hot" :key="index">
				<view class="left">
					<image :src="item.user.avatar" mode="widthFix" ></image>
				</view>
				<view class="right">
					<view class="name">{{item.content}}</view>
					<view class="time">{{item.atime*1000|FilterDate}}</view>
				</view>
				<view class="dianzan">
					<text class="iconfont icondianzan">{{item.size}}</text>
				</view>
			</view>
		</view>
		<!-- 最新评论 -->
		<view class="comment_list list" v-if="comment&&comment.length">
			<text class="title">最新评论 </text>
			<view class="item" v-for="(item,index) in comment" :key="index">
				<view class="left">
					<image :src="item.user.avatar" mode="widthFix" ></image>
				</view>
				<view class="right">
					<view class="name">{{item.content}}</view>
					<view class="time">{{item.atime*1000|FilterDate}}</view>
				</view>
				<view class="dianzan">
					<text class="iconfont icondianzan">{{item.size}}</text>
				</view>·
			</view>
		</view>
		  <!-- #ifdef MP-WEIXIN -->
		<button type="default" class="downloadFile" @click="downloadFile">下载</button>
		<!-- #endif -->
	</view>
</template>

<script>
	import moment from 'moment'
	import swiperAction from '@/pages/components/swiperAction.vue'
	moment.locale('zh-cn')
	export default {
		components:{
			swiperAction
		},
		filters: {
		  FilterName: function (tags) {
				return tags&&tags.length?tags.join(','):'张杰伦'
		  },
		  FilterDate:function(val){
			  return  moment(val).fromNow();
		  }
		},
		data() {
			return {
				imageDetails:{
					cnTime:''
				},
				album: [], //专辑数据
				comment: [], // 最新评论
				hot: [] ,// 热门评论
				imgIndex:0,
				imgList:[],
			}
		},
		created() {
			const app = getApp();
			this.imgIndex =  app.globalData.index;
			this.imgList = app.globalData.list;
			this.imageDetails = this.imgList[this.imgIndex];
			this.getComment(this.imageDetails.id);
		},
		methods: {
			getComment(id) {
				this.request({
					url: `/v2/wallpaper/wallpaper/${id}/comment`
				}).then(res => {
					const data = res.res;
					this.album = data.album;
					this.comment =data.comment
					this.hot = data.hot;
				})
			},
			handlSwiperAction(direction){
				if(direction=='right'&&this.imgIndex>0){
					this.imgIndex--
				}
				
				if(direction=='left'&&this.imgIndex<this.imgList.length-1){
					this.imgIndex++
				}
				if(this.imgIndex<=0||this.imgIndex>=this.imgList.length-1){
				  return uni.showToast({
						title:'没有数据了'
					})
				}
				this.imageDetails = this.imgList[this.imgIndex];
				this.getComment(this.imageDetails.id);
			},
			// #ifdef MP-WEIXIN 
				async downloadFile(){ 
					uni.showLoading({
						title:"下载中"
					})
					 const result1=await uni.downloadFile({
						url:this.imageDetails.thumb
					});
					console.log(result1);
					if(result1.errMsg){
						return uni.showToast({
							title:"下载出错了"
						})
					}
					const { tempFilePath } = result1[1];
					const result2 = await uni.saveImageToPhotosAlbum({
						filePath:tempFilePath
					})
					uni.showToast({
						title:"下载成功"
					})
					uni.hideLoading()
				}
			// #endif 
		}
	}
</script>

<style scoped>
	.details {}

	.imageDetails .top {
		display: flex;
		padding: 15rpx 0;
	}

	.imageDetails .avatar image {
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
	}

	.imageDetails .top .avatar {
		margin: 0 10rpx;
	}

	.imageDetails .top .desc {
		flex: 1;
	}

	.imageDetails .top .desc .name {
		color: #000;
		font-weight: bold;
	}

	
	.user_rank{
		display: flex;
		text-align: center;
		line-height: 80rpx;
		border-bottom: 1px solid #eee;
	}
	 .rank{
		flex: 1;
	}
	.user_rank .collect{
		flex: 1;
	}
	
	.list{
		/* margin-top: 40rpx; */
		border-top: 10rpx solid #dcdcdc;
	}
	.list .title{
		font-size: 36rpx;
		color: #000;
		padding-left: 30rpx;
		position: relative;
	}
	.list .title::before{
		/* content: ''; */
		position: absolute;
		width: 4px;
		height: 25px;
		background-color: #d93d8a;
		    left: 5px;
		top: 0;
	}
	
	.list .item{
		display: flex;
		margin-top: 20rpx;
		border-bottom: 1px solid #dcdcdc;
		padding: 10rpx;
	}
	.list .item:first-of-type{
		margin-top: 0;
	}
	.list .item .left{
		margin-right: 10rpx;
		width: 120rpx;
	}
	.list .item .right{
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}
		.list .item .dianzan{
			width: 60rpx;
		}
	.list .item .right .btn{
		margin: 0;
		padding: 0;
		color: #fff;
		font-weight: bold;
		width: 80rpx;
		height: 50rpx;
		line-height: 50rpx;
		font-size: 28rpx;
		background-color: #d93d8a;
	}
	/* #ifdef MP-WEIXIN */
	.downloadFile{
		background-color: #d93d8a;
		color: #fff;
		font-size: 28rpx;
		width: 60%;
		margin: 100rpx auto;
	}
	/* #endif */
</style>
