<script>
import gainEnv from '@/common/request/env.js'
	export default {
		globalData: {
			env: gainEnv(),
			success_code: 200
		},
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	/* @import "uview-ui/index.scss"; */
	@import './styles/reset.scss';
	@import './styles/icon.scss';
	@import './styles/common.scss';
</style>
