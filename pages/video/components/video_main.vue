<template>
	<view class="videoMain">
		<view class="item">
			<image src="" mode=""></image>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			urlObj: Object
		},
		watch: {
			urlObj(newName, oldName) {
				this.getList()
			}
		},
		data() {
			return {
				list: [],
				hasMore: true
			}
		},
		mounted() {
			this.getList()
		},
		methods: {
			getList() {
				this.request({
					url: this.urlObj.url,
					data: this.urlObj.params
				}).then(res => {
					console.log(res)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.videoMain {}
</style>
