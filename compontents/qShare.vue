<template>
	<view class="content" @click="viewclick">
		<image class="content-image" src="../static/share.png" mode="aspectFit"></image>
		<text class="content-title">{{shareMsg}}</text>
	</view>
</template>

<script>
	/* 
		本组件接受以下参数:
		
		~ :shareMsg 分享按钮上面的标题
		~ @shareClick 分享按钮被点击后的回调事件.注意本组件不能被其他透明组件覆盖,否则无法响应点击事件,请自行解决点击穿透.
	 */
	export default {
		props: {
			shareMsg: {
				default: "分享"
			}
		},
		data() {
			return {

			};
		},
		created() {

		},
		methods: {
			viewclick() {
				this.$emit('shareClick', {

				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		box-shadow: 0 0 10rpx #fff;
		height: 60rpx;
		border-radius: 40rpx 0 0 40rpx;
		padding: 5rpx 20rpx;
		background-color: rgba(0, 0, 0, .8);

		display: flex;
		align-items: center;

		.content-image {
			width: 45rpx;
			height: 45rpx;
		}

		.content-title {
			margin-left: 10rpx;
			font-size: 23rpx;
			flex: 1;
			color: #fff;
		}
	}
</style>
