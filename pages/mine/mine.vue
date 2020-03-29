<template>
	<view class="content">
		<qBar class="bar" :barTit="userProfile.nick" :letTitleCallByScroll="true" :showBackBtn="false"></qBar>
		<div class="head">
			<!-- 225rpx 本来是 200rpx的 但是为了实现下方圆角透视效果就多增了25 -->
			<div :style="{
			'height':'calc('+customHeight+'px + 225rpx)'
		}" class="bgbox">
				<image class="bg" mode="aspectFill" :src="userProfile.avatar" />
				<div class="mask"></div>
			</div>
			<view class="bar" :style="{
		  'height':customHeight+'px'
	  }"></view>
			<div class="person"></div>
			<div class="avatarBox">
				<image class="avatar" :src="userProfile.avatar" />
				<div class="detail">
					<span class="nick">{{userProfile.nick}}</span>
					<span class="nick-sub">{{userProfile.nicksub}}</span>
					<span class="nick-sub">{{userProfile.city}}</span>
				</div>
			</div>
			<qTab @changeItem="changeItem" class="tab" :list="tabItem" showType="line" :currentindex="currentindex"></qTab>
			<!-- 此处懒得监听滑动事件去让Tab控件fixed了
	  直接限定滑动高度,到达最高后无法继续向上滑动
      实现一样的效果.-->

			<swiper :style="{
	  	'height':'calc(100vh - '+customHeight+'px - 100rpx)'
	  }" class="swiper-box" :current="currentindex"
			 @change="changeItemSwiper" :duration="300">
				<swiper-item>
					<mybook></mybook>
				</swiper-item>
				<swiper-item>
					<recent @upEvent='upEvent'></recent>
				</swiper-item>
			</swiper>
		</div>
	</view>
</template>

<script>
	import qTab from "../../compontents/qTab.vue";
	import mybook from "./components/mybooklist.vue";
	import recent from "./components/lastedread.vue";
	import qBar from "../../compontents/qBar";

	export default {
		components: {
			qTab,
			mybook,
			recent,
			qBar
		},
		data() {
			return {
				customHeight: 0,
				userProfile: {
					nick: "秋城落叶",
					nicksub: "我思故我在",
					city: "China,NanJing",
					avatar: "https://git.lug.ustc.edu.cn/uploads/-/system/user/avatar/8872/avatar.png"
				},
				tabItem: [{
						title: "我的书架"
					},
					{
						title: "最近阅读"
					}
				],
				currentindex: 1,
				scrollLimit: false, //设置滑动的最高位置
			};
		},
		onLoad(args) {
			this.customHeight = uni.getStorageSync("SET_CUSTOM_BAR") + 5;
			var that = this;

		},
		onShow() {
			//reload recently	
			
		},
		methods: {
			changeItem(index) {
				this.currentindex = index;
			},
			changeItemSwiper(e) {
				this.currentindex = e.detail.current;
			},
			upEvent(val) {
				//实现滑动同步滚动,下面的代码写完了发现还不如不写...
				// var that = this;
				// uni.createSelectorQuery().select('.tab')
				// 	.boundingClientRect((res) => {
				// 		if (res.top <= that.customHeight + 1)
				// 			that.scrollLimit = true;
				// 		else that.scrollLimit = false;
				// 		console.log(res.top, that.customHeight + 1)
				// 	}).exec();
				// if (this.scrollLimit) {
				// 	return;
				// }
				if (val < this.customHeight / 4)
					val = 0
				else if (val > this.customHeight)
					val = 1000
				uni.pageScrollTo({
					duration: 300,
					scrollTop: val,
				})
			}
		}
	};
</script>

<style scoped>
	.bgbox {
		position: absolute;
		/* overflow: hidden; */
		width: 100%;
		z-index: -1;
	}

	.mask {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.4);
	}

	.bg {
		filter: blur(15px);
		position: absolute;
		height: 100%;
		width: 100%;
	}

	.bar {
		/* background-color: #007aff; */
	}

	.person {
		height: 200rpx;
		/* background-color: red; */
	}

	.avatarBox {
		position: relative;
		height: 200rpx;
		border-top-left-radius: 25rpx;
		border-top-right-radius: 25rpx;
		background-color: white;
	}

	.avatar {
		width: 120rpx;
		height: 120rpx;
		left: 50%;
		position: absolute;
		border-radius: 120rpx;
		transform: translate(-50%, -50%);
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
		animation: doki 2s infinite 0s;
		border: 5rpx solid rgba(255, 255, 255, 0.5);
	}

	.detail {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
	}

	.nick,
	.nick-sub {
		width: 100%;
		text-align: center;
		display: block;
		font-size: 28rpx;
	}

	.nick {
		/* background-color: red; */
	}

	.nick-sub {
		font-size: 24rpx;
		color: gray;
	}

	@keyframes doki {
		0% {}

		25% {}

		50% {
			width: 140rpx;
			height: 140rpx;
			box-shadow: 0 0 10px rgba(0, 0, 0, 0.7);
		}

		75% {}

		100% {}
	}

	.swiper-box {
		width: 100%;
	}
</style>
