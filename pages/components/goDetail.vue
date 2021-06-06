<template>
	<view @click="handleClick">
		<slot></slot>
	</view>
</template>

<script>
	export default {
		props:{
			list:Array,
			index:Number
		},
		mounted() {
		},
		methods:{
			handleClick(){
				// 数据缓存为全局
				const app = getApp()
				app.globalData.list = this.list;
				app.globalData.index = this.index;
				uni.navigateTo({
					url:"/pages/imageDetails/index"
				})
			}
		}
	}
</script>

