<template>
	<!-- 底部占位图 -->
	<view class="bottom">
		<image class="logo" src="https://resource.mhxk.com/kanman_pc/static/images/comm/logo-kmh.png" mode="aspectFit"></image>
		<text class="tit">数据来源: 看漫画网站</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		}
	}
</script>

<style lang="less" scoped>
	.bottom {
		margin-top: 50rpx;
		border-top: 1rpx solid rgba(192, 192, 192, .4);
		// background-color: #007AFF;
		height: 200rpx;
		font-size: 25rpx;
		position: relative;

		.logo {
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
			bottom: 50%;
			width: 25%;
			height: 25%;
		}

		.tit {
			// background-color: #4CD964;
			position: absolute;
			bottom: 30rpx;
			left: 50%;
			transform: translateX(-50%);
		}
	}
</style>
