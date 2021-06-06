<script>
	export default {
		onLaunch: function() {
		},
		onShow: function() {
		},
		onHide: function() {
		},
		onError:function(){
			console.log('出错了')
		},
		onPageNotFound:function(){
			console.log('NotFound')
			uni.showToast({
				title:'NotFound',
				icon:'none'
			})
		}
	}
</script>

<style>
@import './styles/base.wxss';
@import './styles/iconfont.wxss';
</style>
19958965052