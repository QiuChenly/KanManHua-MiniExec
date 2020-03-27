<template>
	<scroll-view class="content">
		<qBar bgcolor="black" barTitColor="white" class="barStyle" :barTit="barTit" @onPageScrollByBar="onPageScrollByBar"
		 :class="[
			hideBar?'hideBar':'showBar'
		]"></qBar>
		<!-- <image :key='item' v-for="item in list" lazy-load="true" webp="true" :src="item" alt="" mode="widthFix"></image> -->
		<qImageLoader :key='index' v-for="(item,index) in list" :url='item'></qImageLoader>
		<div class="menu">
			<button type="default">GKD</button>
			<button type="default">GKD1</button>
			<button type="default">GKD2</button>
		</div>
	</scroll-view>
</template>

<script>
	import qBar from "../../compontents/qBar.vue"
	import qImageLoader from '../../compontents/qImageLoader.vue'
	export default {
		components: {
			qBar,
			qImageLoader
		},
		data() {
			return {
				barTit: "标题君",
				data: {},
				list: [],
				hideBar: false,
				lastTop: 0,
			};
		},
		onLoad() {
			this.data = JSON.parse(uni.getStorageSync('temp_read'));
			this.barTit = this.data.chapter_name;
			var index = 1;
			var size = this.data.end_num;
			while (index <= size) {
				this.list.push('https://mhpic.' + this.data.chapter_domain + this.data.chapter_image.high.replace('$$', index))
				index++;
			}
		},
		methods: {
			onPageScrollByBar(e) {
				if (e.scrollTop > 300) {
					let newState = e.scrollTop > this.lastTop;
					this.lastTop = e.scrollTop;
					if (this.hideBar != newState) {
						this.hideBar = newState;
					}
					// console.log(this.hideBar)
				}
			}
		}
	}
</script>

<style lang="scss">
	.content {
		color: #007AFF;

		.barStyle {
			transition: all .5s;
		}
	}

	.showBar {
		opacity: 1;
		visibility: visible;
	}

	.hideBar {
		opacity: 0;
		visibility: hidden;
	}

	.menu {
		position: fixed;
		bottom: 0;
		visibility: hidden;
	}
</style>
