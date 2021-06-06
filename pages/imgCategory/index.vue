<template>
	<view class="imageCategory">
		<uni-segmented-control :current="currentIndex" lower-threshold="100" :values="items.map(v=>v.title)" @clickItem="onClickItem"
			style-type="text" activeColor="#d93d8a"></uni-segmented-control>
		<scroll-view scroll-y="true" class="category_tab_warp"  @scrolltolower="handleScrolltolower">
			<view class="content category_tab">
				<view class="cate_item" v-for="item in vertical" :key="item.id">
					<image :src="item.thumb" mode="widthFix"></image>
				</view>
			</view>
		</scroll-view>
	</view>
</template>
<script>
	import {
		uSegmentedControl
	} from '@dcloudio/uni-ui'
	export default {
		data() {
			return {
				id: '',
				items: [{
					title: '最新',
					order: 'new'
				}, {
					title: '热门',
					order: 'hot'
				}],
				currentIndex: 0,
				hasMore: true,
				parames: {
					limit: 30,
					skip: 0,
					order: 'new'
				},
				vertical: []
			}
		},
		onLoad(options) {
			this.id = options.id
			this.getImagesDetails()
		},
		methods: {
			onClickItem(e) {
				if (this.currentIndex !== e.currentIndex) {
					this.currentIndex = e.currentIndex;
					this.parames.order = this.items[e.currentIndex]['order'];
					this.parames.skip=0;
					this.vertical=[];
					this.getImagesDetails()
				}else{
					return false;
				}
				
			},
			getImagesDetails() {
				this.request({
					url: `/v1/vertical/category/${this.id}/vertical`,
					data: this.parames
				}).then(res => {
					this.vertical =[...this.vertical,... res.res.vertical];
					this.parames.skip += this.parames.limit;
					if (this.vertical.length < this.parames.limit) {
						this.hasMore = false;
					}
				})
			}
			,handleScrolltolower(){
				if(this.hasMore){
					this.getImagesDetails();
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
	.category_tab_warp{
		height: 100vh;
	}
	.category_tab {
		display: flex;
		flex-wrap: wrap;
		.cate_item {
			width: 33.3333%;
			border: 3rpx solid #fff;
		}
	}
</style>
