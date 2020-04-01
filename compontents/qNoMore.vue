<template>
	<view class="nomore">
		<span v-if='!hasMore'>😢~没有更多🌶!</span>
		<span v-else>😁~别叫🌶!正在加载...</span>
	</view>
</template>

<script>
	export default {
		props: {
			hasMore: {
				default: true
			}
		},
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style scoped>
	.nomore {
		text-align: center;
		padding: 35rpx 0;
		font-size: 28rpx;
	}
</style>
