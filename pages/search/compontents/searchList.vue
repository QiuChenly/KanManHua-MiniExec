<template>
	<view class="content">
		<comicitem v-for="(item,index) in list" :key='index' :comicid='item.comic_id' @goDetail='goDetail'></comicitem>

		<view class="nomore" v-show='!hasMore'>
			😢~没有更多🌶
		</view>
	</view>
</template>

<script>
	import comicitem from './comicitem.vue'
	export default {
		components: {
			comicitem
		},
		props: {
			list: {
				default: []
			},
			hasMore: {
				default: false
			}
		},
		data() {
			return {

			};
		},
		methods: {
			goDetail(item) {
				this.$emit('goDetail', item);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {

		// height: 100%;
		.nomore {
			text-align: center;
			padding: 35rpx 0;
			font-size: 28rpx;
		}
	}
</style>
