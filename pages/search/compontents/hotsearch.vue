<template>
	<view>
		<div class="hotKey">
			<div class='hotTitle'>
				<text class="tit">热门搜索</text>
				<div class="line"></div>
			</div>
		</div>
		<qHotTag @HotTagClick='goDetail' :list='list' class='tagCls'></qHotTag>
	</view>
</template>

<script>
	import qHotTag from '../../../compontents/qHotTag.vue'
	export default {
		props: {
			list: {}
		},
		data() {
			return {

			};
		},
		components: {
			qHotTag
		},
		mounted() {
		
		},
		methods: {
			goDetail(id) {
				uni.navigateTo({
					url: '/pages/comicDetails/comicDetails?id=' + id
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.hotKey {
		.hotTitle {
			.tit {
				color: rgba($color: #000000, $alpha: .3);
				font-weight: bolder;
				margin: 10rpx 20rpx;
				font-size: 27rpx;
			}

			.line {
				margin-top: 10rpx;
				border-bottom: 1rpx solid rgba($color: #ccc, $alpha: .8);
			}
		}
	}

	.tagCls {
		margin-left: 20rpx;
		margin-right: 20rpx;
		display: block;
	}
</style>
