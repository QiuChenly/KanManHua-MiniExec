<template>
	<view class="content">
		<qTab :currentindex="currentIndex" :list="list" :dotActiveColor="dotColor" @changeItem="changeItem"></qTab>
		<swiper class="swiper" :current="currentIndex" @change="swiperchange" :duration="400">
			<swiper-item>
				<recommend></recommend>
			</swiper-item>
			<swiper-item>
				<newer></newer>
			</swiper-item>
			<swiper-item>
				<category></category>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import qTab from "../../compontents/qTab.vue";
	import category from "./compontents/category.vue";
	import newer from "./compontents/newer.vue";
	import recommend from "./compontents/recommend.vue";

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
				currentIndex: 2
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
