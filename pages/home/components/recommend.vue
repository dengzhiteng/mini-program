<template>
	<scroll-view scroll-y="true" show-scrollbar="true"  lower-threshold="100" class="recommend" @scrolltolower="handleScrolltolower" >
		<view v-for="(item1,index1) in homepage" :key="index1">
			<view class="moneths_wrap" v-if="index1!=0">
				<view class="months_title_info">
					<view class="moneths_info">
						<text>{{{time:item1.atime,type:'DD'}|FormatDate}}</text>/
						{{{time:item1.atime,type:'MM'}|FormatDate}}月
					</view>
					<text class="moneths_text">{{item1.title}}</text>
				</view>
				<view class="moneths_title_more">更多 </view>
			</view>

			<view class="warp" v-if="index1!=0">
				<view class="item" v-for="(item2,index2) in item1['items']">
					<go-Detail v-if="item2.rule" :list="item1['items']" :index="index2">
						<image  :src="item2.thumb+item2.rule.replace('$<Height>',360)" mode="widthFix" ></image>
					</go-Detail>
					<go-Detail v-else :list="item1['items']" :index="index2"  >
						<image :src="item2.thumb" mode="aspectFill" ></image>
					</go-Detail>
				</view>
			</view>
		</view>
		<view class="title">热门</view>
		<view class="warpHot">
			<view class="item" v-for="(item,index4) in recommend" :key="index4">
				<go-Detail :list="recommend" :index="index4">
					<image :src="item.thumb" mode="widthFix"></image>
				</go-Detail>
			</view>
		</view>
	</scroll-view>
</template>

<script>
	import moment from 'moment'
	import goDetail from '@/pages/components/goDetail.vue'
	export default {
		components:{
			goDetail
		},
		data() {
			return {
				recommend: [],
				homepage: [],
				moment:{},
				params:{
					limt:10, // 要获取多少条
					skip:0,// 要跳过多少条
					order:'news',// 关键字
				},
				hasMore:true// 是否还有数据
			}
		},
		filters: {
		  FormatDate: function (value) {
			return moment(value.time).format(value.type)
		  }
		},
		mounted() {
			this.getVerticalHomepage();
			uni.setNavigationBarTitle({
				title:'推荐'
			})
		},
		methods:{
			getVerticalHomepage(){
				this.request({
					url: '/v3/homepage/vertical',
					data:this.params
				}).then(res => {
					this.recommend = [...this.recommend,...res.res.vertical];
					this.homepage = [...this.homepage,...res.res.homepage];
					this.params.skip+=this.params.limt;
					// 处理无数据的场景
					if(this.params.limt>res.res.vertical.length){
						this.hasMore = false;
					}
				})
			},
			previewImageHomepage(urls,index){
				let images = urls.map(item=>{
					return item.rule?item.thumb+item.rule.replace('$<Height>',360):item.thumb
				})
				uni.previewImage({
					urls:images,
					current:index,
					loop:true,
					indicator:'number'
				})
			},
			previewImageVertical(urls,index){
				let images = urls.map(item=>{
					return item.thumb
				})
				uni.previewImage({
					urls:images,
					current:index,
					loop:true,
					indicator:'number'
				})
			},
			handleScrolltolower(){
				if(this.hasMore){
					this.getVerticalHomepage();
				}else{
					uni.showToast({
						title:"没有数据了",
						icon:'none'
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.recommend{
		height: 100vh
	}
	.warp,
	.warpHot {
		display: flex;
		flex-wrap: wrap;
	}
	.warp .item,
	.warpHot .item {
		width: 33.3333%;
		border: 3px solid #fff;
	}
	.title{
		font-size: 40upx;
		line-height: 60upx;
		font-weight: bold;
		color: #000;
		padding-left: 10upx;
	}

	.moneths_wrap {
		display: flex;
		justify-content: space-between;
		margin-top: 10upx;
	}

	.months_title_info {
		display: flex;
		font-size: 40upx;
		line-height: 60upx;
		font-weight: bold;
		color: #000;
	}

	.months_title_info .moneths_info {
		color:rgb(217, 61, 138);
	}
	.months_title_info .moneths_info text{
		
	}
	.moneths_text {
		padding-left: 10upx;
	}
	.moneths_title_more {
		padding-right: 20upx;
	}
</style>
