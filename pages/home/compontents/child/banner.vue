<template>
	<view class="content">
		<div class='bgbox'>
			<image v-for="(item,index) in list" class="bg" :key="index" :src="item.imageUrl" :class="[index==currentindex?'showimg':'hideimg']"
			 mode="center"></image>
			<div class='bgshadow'></div>
		</div>
		<swiper previous-margin="50rpx" next-margin="50rpx" circular="true" @change="itemchange" :style="{
			'height': height+'px',
		}"
		 :autoplay="true" :interval="animalInterval" :duration="animalDuration">
			<swiper-item @click="itemclick(item.itemData)" v-for="(item,index) in list" :key='index' class="item" :class="[index == currentindex ? 'currently' : 'precurrently']">
				<image class="item-image" mode="aspectFill" :src="item.imageUrl"></image>

				<!-- banner标题与副标题 -->
				<div class='detail'>
					<text class="detail-title">{{item.title}}</text>
					<text class="detail-subtitle">{{item.content}}</text>
				</div>
			</swiper-item>
		</swiper>


		<!-- 下方小白点 -->
		<div class="dot" :style="{
			'visibility':needDot?'visible':'hidden'
		}">
			<view class="dot-child" :style="{
				'background-color':dotColor
			}" :class="[index == currentindex ? 'active' : 'deactive']"
			 v-for="(item,index) in list" :key='index'></view>
		</div>
	</view>
</template>

<script>
	// banner组件接受以下属性与方法:
	// 1. :height 改变banner的默认高度
	// 2. :list	  banner的数据源,他们的数据格式是:
	/* 
		[
			{
				title: 字符串:表示显示的默认标题内容,
				content: 字符串:显示副标题,
				imageUrl: 字符串:显示图片的网址,
				itemData: object:传递原始json数据,在banner点击item后接收事件@bannerItemClick(item)中可获取该数据
			},{
				title:   	同上,
				content: 	同上,
				imageUrl:	同上,
				itemData:	同上
			}
		]
	 */
	// 2.1 :dotColor	改变下方小白点的颜色,可以是#FFFFFF或者red/black等字符串
	// 2.2 :animalDuration	改变切换动画的持续时间 默认1000ms
	// 2.3 :animalInterval	改变切换画廊的时间  默认3000ms
	// 2.4 :needDot	是否需要下方的小白点  默认true
	// 3. @bannerItemClick='事件名称'  该事件接受一个参数item,获取传递进来的itemData数据
	export default {
		props: {
			// 指定banner高度
			height: {
				default: 300
			},
			// 指定banner数据源绑定
			// 
			list: {

			},

			//小白点颜色
			dotColor: {
				default: 'white'
			},
			//动画持续时间
			animalDuration: {
				default: 1000
			},
			//动画延迟
			animalInterval: {
				default: 3000
			},
			//是否需要下方小白点
			needDot: {
				default: true
			}
		},
		data() {
			return {
				currentindex: 0,
				animationEase: {},
			}
		},
		created() {},
		methods: {
			itemchange(e) {
				this.currentindex = e.detail.current
			},
			itemclick(e) {
				// console.log("log",e)
				this.$emit('bannerItemClick', e)
			}
		},
		computed: {}
	}
</script>

<style scoped lang="scss">
	.content {
		position: relative;
		overflow: hidden;
	}

	.hideimg {
		opacity: 0;
	}

	.showimg {
		opacity: 1;
	}

	.bgbox {
		position: absolute;
		height: 100%;
		width: 100%;
		// background-color: #007AFF;
		overflow: hidden;

		.bgshadow {
			position: absolute;
			height: 100%;
			width: 100%;
			background-color: rgba(0, 0, 0, .4);
		}

		.bg {
			position: absolute;
			filter: blur(25px);
			height: 100%;
			width: 100%;
			transition: all 1s;
		}
	}

	swiper {
		swiper-item {
			// background-color: #4CD964;
		}
	}

	.dot {
		position: absolute;
		left: 50%;
		bottom: 20rpx;
		transform: translate(-50%);
		display: flex;

		.dot-child {
			transition: all .3s;
			border-radius: 15rpx;
			width: 15rpx;
			height: 15rpx;
			margin-left: 10rpx;
			background-color: #007AFF;
		}

		.dot-child:first-child {
			margin-left: 0;
		}
	}

	.active {
		width: 30rpx !important;
	}

	.deactive {
		width: 15rpx !important;
	}

	.currently {

		// background-color: #007AFF;
		.item-image {
			box-shadow: 0 0 8px rgba(0, 0, 0, 1);
			transform: translateZ(10px) !important;
		}

		.detail {
			opacity: 1 !important
		}
	}

	.precurrently {

		// background-color: #007AFF;
		.item-image {
			transform: translateZ(-5px) !important;
			width: 100% !important;
			box-shadow: 0 0 5px rgba(0, 0, 0, .8);
		}
	}

	.item {
		perspective: 500rpx;
		position: relative;

		.item-image {
			position: absolute;
			top: 10%;
			border-radius: 20rpx;
			height: 50%;

			width: 90% !important;
			left: 5% !important;

			transition: all .5s;
		}

		.detail {
			position: absolute;
			bottom: 30px;
			right: 20px;
			width: 100%;
			opacity: 0;
			transition: all .5s;

			.detail-title,
			.detail-subtitle {
				display: block;
				text-align: right;
				color: white;
				font-size: 25rpx;
				margin-bottom: 20rpx;
			}

			.detail-title:first-child {
				font-size: 35rpx;
			}
		}
	}
</style>
