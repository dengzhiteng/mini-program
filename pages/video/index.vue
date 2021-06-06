<template>
	<view class="index">
		<view class="title">
			<view class="title_tabs">
				<uni-segmented-control :current="currentIndex" :values="items.map(v=>v.title)" @clickItem="onClickItem"
					styleType="text" activeColor="#d93d8a"></uni-segmented-control>
			</view>
			<view class="iconfont iconsearch">
			</view>
		</view>
		<view class="content">
			<video-main v-if="currentIndex!=4"
				:urlObj="{url:items[currentIndex].url,params:items[currentIndex].params}"></video-main>
			<video-category v-if="currentIndex===4"></video-category>
		</view>
	</view>
</template>

<script>
	import {
		uSegmentedControl
	} from '@dcloudio/uni-ui'
	import videoCategory from './components/video_category.vue'
	import videoMain from './components/video_main.vue'
	export default {
		components: {
			videoMain,
			videoCategory
		},
		data() {
			return {
				currentIndex: 0,
				items: [{
						title: '推荐',
						url: '/videoimg/v1/videowp/featured',
						params: {
							limt: 10,
							skip: 0,
							order: 'hot',
						}
					},
					{
						title: '娱乐',
						url: '/videoimg/v1/videowp/category/59b25abbe7bce76bc834198a',
						params: {
							limt: 10,
							skip: 0,
							order: 'new',
						}
					}, {
						title: '最新',
						url: '/videoimg/v1/videowp/videowp',
						params: {
							limt: 10,
							skip: 0,
							order: 'hot',
						}
					}, {
						title: '热门',
						url: '/videoimg/v1/videowp/videowp',
						params: {
							limt: 10,
							skip: 0,
							order: 'hot',
						}
					}, {
						title: '分类',
						url: '/videoimg/v1/videowp/category/${id}',
						params: {
							limt: 10,
							skip: 0,
							order: 'hot new',
						}
					}
				],
			}
		},
		methods: {
			onClickItem(e) {
				if (this.currentIndex !== e.currentIndex) {
					this.currentIndex = e.currentIndex;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.title_tabs {
		width: 60%;
		margin: 0 auto;
		position: relative;
	}

	.iconfont {
		width: 20%;
		position: absolute;
		top: 0;
		right: 0;
		text-align: center;
		transform: translateY(50%);
	}
</style>
