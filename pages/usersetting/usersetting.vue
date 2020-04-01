<template>
	<view class="content">
		<view class="sex" @click="switchsex">
			<text>阅读偏好:</text>
			<text>{{(userInfo.sex === 133) ? '女性' : '男性'}}</text>
		</view>
		<view class="setBottom">
			<div>秋城落叶©2020.4.1</div>
			<div>看漫画第三方开源小程序</div>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {

			}
		},
		onLoad(e) {
			if (e.type === '1') {
				uni.showToast({
					icon: 'none',
					title: '请先选择漫画阅读偏好!'
				})
			}
		},
		computed: {
			...mapState(['userInfo']),
		},
		methods: {
			...mapMutations(['setUserSexType']),
			switchsex() {
				this.setUserSexType((this.userInfo.sex === 132) ? 2 : 1)
			}
		}
	}
</script>

<style scoped>
	.content {
		background-color: rgba(0, 0, 0, .08);
		height: 100%;
		width: 100%;
		padding-top: 20rpx;
	}

	.sex {
		padding: 20rpx;
		font-size: 28rpx;
		height: 45rpx;
		line-height: 45rpx;
		width: calc(100%-40rpx);
		background-color: white;
		margin-bottom: 20rpx;
	}

	.setBottom {
		padding: 10rpx 0;
		font-size: 24rpx;
		width: 100%;
		text-align: center;
		background-color: white;
		margin-bottom: 20rpx;
	}
</style>
