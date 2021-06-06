<template>
	<view class="index">
		<view class="title">
			<view class="title_tabs">
				<uni-segmented-control :current="currentIndex" :values="items" @clickItem="onClickItem" styleType="text"
					activeColor="#d93d8a"></uni-segmented-control>
			</view>
			<view class="iconfont iconsearch">
			</view>
		</view>
		<view class="content">
			<view v-if="currentIndex === 0">
				<recommend ></recommend>
			</view>
			<view v-if="currentIndex === 1">
				<category></category>
			</view>
			<view v-if="currentIndex === 2">
				<news></news>
			</view>
			<view v-if="currentIndex === 3">
				<album ></album>
			</view>
		</view>
	</view>
</template>

<script>
	import album from './components/album.vue'
	import category from './components/category.vue'
	import news from './components/new.vue'
	import recommend from './components/recommend.vue'
	import {uSegmentedControl} from '@dcloudio/uni-ui'
	
	export default {
		components: {
			album,
			category,
			news,
			recommend
		},
		data() {
			return {
				items: ['推荐', '分类', '最新', '专辑'],
				currentIndex:1
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
