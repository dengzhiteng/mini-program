<template>
	<view class="category" v-if="category.length">
		<view class="item" v-for="item in category" :key="item.id">
			<navigator :url="`/pages/imgCategory/index?id=${item.id}`">
				<image :src="item.cover" mode="aspectFill"></image>
				<text>{{item.name}}</text>
			</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				category:[]
			}
		},
		mounted() {
			uni.setNavigationBarTitle({
				title:'分类'
			})
			this.getList();
		},
		methods: {
			getList(){
				this.request({
					url: '/v1/vertical/category'
				}).then(res => {
					this.category = res.res.category;
				})
			}
		},
	}
</script>

<style scoped lang="scss">
.category{
	display: flex;
	flex-wrap: wrap;
}
.category .item{
	position: relative;
	width: 33.333%;
	border: 5rpx solid #fff;
}
.category image{
	height: 200rpx;
}
.category text{
	height: 40rpx;
	position: absolute;
	left: 20rpx;
	bottom: 10rpx;
	color: #fff;
	font-size: 28rpx;
	background-image: linear-gradient(to right top,rgba(0,0,0,0));
}

</style>
