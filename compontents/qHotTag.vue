<template>
	<view class="content">
		<text v-for="(item,index) in list" :key='index' @click="click(item.comic_id)" class="tag">{{item.comic_name}}</text>
	</view>
</template>

<script>
	/**
	 * 接受一个事件
	 * @HotTagClick(item) 参数为传入的item其中被点击的一项
	 */
	
	/**
	 * 接收一个参数list数组
	 * :list []
	 */
	export default {
		props: {
			list: {

			}
		},
		data() {
			return {

			};
		},
		methods: {
			click(item) {
				this.$emit('HotTagClick', item);
			}
		}
	}
</script>

<style lang="scss">
	.content {
		display: flex;
		flex-wrap: wrap;

		.tag {
			background-color: rgba($color: #ccc, $alpha: .5);
			padding: 10rpx 20rpx;
			border-radius: 100rpx;
			font-size: 27rpx;
			margin-top: 20rpx;
			margin-right: 20rpx;
		}
	}
</style>
