<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		onLaunch: function() {
			console.log('App Launch')

			// 初始化本地存储数据
		},
		onShow: function() {
			let e = uni.getSystemInfoSync();
			// this.compareVersion(e.SDKVersion, '2.5.0')
			let statusBar = 0
			let customBar = 0


			// #ifdef MP
			statusBar = e.statusBarHeight
			customBar = e.statusBarHeight + 45
			if (e.platform === 'android') {
				this.$store.commit('SET_SYSTEM_IOSANDROID', false)
				customBar = e.statusBarHeight + 50
			}
			// #endif


			// #ifdef MP-WEIXIN
			statusBar = e.statusBarHeight
			// @ts-ignore
			const custom = wx.getMenuButtonBoundingClientRect()
			customBar = custom.bottom + custom.top - e.statusBarHeight
			// #endif


			// #ifdef MP-ALIPAY
			statusBar = e.statusBarHeight
			customBar = e.statusBarHeight + e.titleBarHeight
			// #endif


			// #ifdef APP-PLUS
			console.log('app-plus', e)
			statusBar = e.statusBarHeight
			customBar = e.statusBarHeight + 45
			// #endif


			// #ifdef H5
			statusBar = 0
			customBar = e.statusBarHeight + 45
			// #endif

			// 这里你可以自己决定存放方式，建议放在store中，因为store是实时变化的
			uni.setStorageSync('SET_STATUS_BAR', statusBar)
			uni.setStorageSync('SET_CUSTOM_BAR', customBar)
			// uni.setStorageSync('SET_SYSTEM_INFO', JSON.stringify(e))

			console.log('App Show')



			this.loadData(function() {
				console.log('first')
				uni.navigateTo({
					url: '/pages/usersetting/usersetting?type=1',
					success() {
						console.log('first succ')
					},
					fail(e) {
						console.log('first fail', e)
					}
				})
			});
		},
		methods: {
			...mapMutations(['loadData'])
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
