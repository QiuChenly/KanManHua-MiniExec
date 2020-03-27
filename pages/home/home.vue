<template>
	<view class="content">
		<qTab :currentindex="currentIndex" :list="list" :dotActiveColor="dotColor" @changeItem="changeItem"></qTab>
		<swiper class="swiper" :current="currentIndex" @change="swiperchange" :duration="400">
			<swiper-item>
				<recommend></recommend>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item">排行界面</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item">分类界面</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import qTab from "../../compontents/qTab.vue";
	import category from "./compontents/category.vue";
	import newer from "./compontents/newer.vue";
	import recommend from "./compontents/recommend.vue";
	import zhuanji from "./compontents/zhuanji.vue";

	export default {
		data() {
			return {
				dotColor: "#000",
				list: [{
						title: "推荐"
					},
					{
						title: "排行"
					},
					{
						title: "分类"
					}
				],
				currentIndex: 0
			};
		},
		methods: {
			changeItem(index) {
				this.currentIndex = index;
			},
			swiperchange(e) {
				this.currentIndex = e.detail.current;
			}
		},
		components: {
			qTab,
			category,
			newer,
			recommend,
			zhuanji
		}
	};
</script>

<style lang="scss" scoped>
	.content {}

	.swiper {
		height: calc(100vh - 100rpx);

		swiper-item {}
	}
</style>
