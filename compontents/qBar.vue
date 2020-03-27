<template>
	<view class="content" :style="{height: barHeight+'px'}">
		<view class="bgview" :style="{
			'background-color':barBgColor,
			'opacity':barBgOpacity
		}">
		</view>

		<view class="bar-content" :style="{
			'margin-top':statusBarHeight+'px',
			'height':'calc(100% - '+statusBarHeight+'px)'
		}">
			<view class="back" @click="back">
				<image class="back-image" src="../static/MacQQ_icon_arrow_left_hover@2x.png" />
				<span class="back-title">返回</span>
			</view>

			<view class="title">
				<text :style="{
					'color':barTitColor,
				}">{{barTit}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	//@onPageScrollByBar 参数e
	//如果有监听页面滑动事件的需求 
	//需要传入函数以扩展监听,否则当前页面的滑动监听将被qBar拦截导致收不到滑动事件.
	export default {
		props: {
			bgcolor: {
				default: '#fff'
			},
			barTit: {
				default: "标题君"
			},
			barTitColor: {
				default: '#000'
			}
		},
		data() {
			return {
				barBgOpacity: 0,
				barBgColor: "#fff",
				barHeight: 100,
				statusBarHeight: 0
			};
		},
		created() {
			this.barBgColor = this.bgcolor;
			let that = this;
			this.barHeight = uni.getStorageSync("SET_CUSTOM_BAR") + 5;
			this.statusBarHeight = uni.getStorageSync("SET_STATUS_BAR");
			//获取当前栈顶的page
			let currentPage = getCurrentPages();
			currentPage[currentPage.length - 1].onPageScroll = e => {
				that.$emit('onPageScrollByBar', e)
				// console.log("?")
				let size = e.scrollTop;
				if (size > 90) {
					that.barBgOpacity = 1;
					return;
				}
				that.barBgOpacity = size / 100;
			};
		},
		onLoad() {},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1
				})
			}
		}
	};
</script>

<style lang="scss" scoped>
	.content {
		z-index: 100;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		width: 100vw;
		height: 100px;
		transition: all 0.3s;
		background-color: rgba($color: #000000, $alpha: 0);
		// background-color: #4CD964;

		.bgview {
			z-index: -1;
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			opacity: 0;
		}

		.bar-content {
			position: relative;

			.back {
				height: 100%;
				display: flex;
				align-items: center;

				.back-image {
					margin-left: 10rpx;
					height: 65rpx;
					width: 35rpx;
				}

				.back-title {
					color: rgba(0, 255, 255, 0.5);
					font-size: 28rpx;
				}
			}

			.title {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				color: #fff;
				font-size: 28rpx;
			}
		}
	}
</style>
