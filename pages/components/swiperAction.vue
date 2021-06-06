<template>
	<view class="swiperAction" @touchstart="handleTouchstare" @touchend="handleTouchend">
		<slot></slot>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				startTime:0,
				startClientX:0,
				startClientY:0,
			}
		},
		methods:{
			handleTouchstare(e){
				this.startTime= (new Date()).getTime();
				this.startClientX= e.changedTouches[0].clientX;
				this.startClientY=e.changedTouches[0].clientY;
			},
			handleTouchend(e){
				const endTime= (new Date()).getTime()
				let direction='';// 滑动方向
				const  endClientX = e.changedTouches[0].clientX;
				const  endClientY = e.changedTouches[0].clientY;
				if(endTime-this.startTime>2000)return false;
				if(Math.abs(endClientX-this.startClientX)<10||Math.abs(endClientY-this.startClientY)>10)return false;
				direction=endClientX-this.startClientX>0?'right':'left';
				this.$emit("swiperAction",direction)
			}
		}
	}
</script>

<style scoped lang="scss">
	
</style>
