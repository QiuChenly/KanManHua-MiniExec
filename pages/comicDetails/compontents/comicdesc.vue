<template>
	<view class="content">
		<view :style="{
			'height':isExpand ? tHeight+'px' : '120rpx',
		}" class="desc" @click="expand">
			<text id="desc-real">{{item.comic_desc}}</text>
		</view>
		<div :style="{ 
			'width':'100%',
			'transition':'all .3s',
			'text-align':'center'
		}">{{ isExpand ? '↑' : '↓' }}</div>
	</view>
</template>

<script>
	export default {
		props: {
			item: {}
		},
		data() {
			return {
				isExpand: false,
				tHeight: 0,
			}
		},
		mounted() {},
		methods: {
			expand() {
				var that = this;
				let view = uni.createSelectorQuery().in(this).select("#desc-real");

				view.boundingClientRect(data => {
					that.tHeight = data.height;
					// console.log("得到布局位置信息" + JSON.stringify(data));
				}).exec();
				this.isExpand = !this.isExpand;
			}
		}
	}
</script>

<style scoped lang="scss">
	.content {
		padding: 0 20rpx;

		.desc {
			font-size: 28rpx;
			overflow: hidden;
			transition: height .3s;
		}
	}
</style>
