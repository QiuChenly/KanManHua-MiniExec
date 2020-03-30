<template>
	<view class="content">
		<qBar bgcolor="black" barTitColor="white" class="barStyle" :barTit="barTit" @onPageScrollByBar="onPageScrollByBar"
		 :class="[
			hideBar?'hideBar':'showBar'
		]"></qBar>
		<!-- <image :key='item' v-for="item in list" lazy-load="true" webp="true" :src="item" alt="" mode="widthFix"></image> -->
		<qImageLoader :key='index' v-for="(item,index) in list" :url='item'></qImageLoader>
		<div class="menu" :class="[showMenu?'menu-show':'']">
			<view class="jumpUp" @click="upChapter">上一话</view>
			<view class="jumpNext" @click="nextChapter">下一话</view>
		</div>
	</view>
</template>

<script>
	import qBar from "../../compontents/qBar.vue"
	import qImageLoader from '../../compontents/qImageLoader.vue'
	import {
		mapState
	} from 'vuex';

	import {
		api
	} from '../../js/api.js'

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
				showMenu: false,
				comicID: 0,
				targetIndex: 0,
				comicChapter: [],
				comicBase: {},
			};
		},
		onLoad(option) {
			// console.log(option)
			var that = this;
			this.comicID = option.id;
			this.targetIndex = Number(option.chapter);
			api.getDetails(this.comicID).then(comicInfo => {
				that.comicChapter = comicInfo.comic_chapter;
				that.comicBase = comicInfo;
				// 保存到本地最近阅读
				// that.addRecentRead({
				// 	comicID: option.id,
				// 	comicName: comicInfo.comic_name
				// });
				// console.log(that.comicChapter);
				return comicInfo.comic_chapter;
			}).then((chapters) => {
				that.getSelectPage(chapters, 0);
			})
		},
		computed: {
			// 从中转数据中监控读取temp数据
			...mapState(['temp']),
		},
		onShareAppMessage(res) {
			if (res.from === 'button') { // 来自页面内分享按钮
				console.log(res.target)
			}
			return {
				title: '我在看《' + this.comicBase.comic_name + '》的《' + this.barTit + '》,你也快一起来看看⑧¿',
				path: '/pages/readcomic/readcomic?id=' + this.comicID + '&chapter=' + this.targetIndex
			}
		},
		methods: {
			/**
			 * 获取下一话或上一话的数据
			 * @param {Object} chapters 目录集合
			 * @param {Object} mode 1 表示加载下一话 2 表示加载上一话 0 表示页面初始化加载章节
			 */
			getSelectPage(chapters, mode) {
				var that = this;
				var target = that.targetIndex;
				if (mode == 2) target--;
				if (mode == 1) target++;
				// console.log(that.targetIndex, target, mode)
				that.data = chapters.filter((it, index) => {
					// console.log(it.chapter_order_num === that.targetIndex);
					return it.chapter_order_num === target;
				})
				if (that.data.length <= 0) {
					uni.showToast({
						title: '没有章节了 QAQ',
						duration: 1000,
						icon: 'none'
					})
					//没有更多章节了
					return;
				}
				that.targetIndex = target;
				that.data = that.data[0];
				that.getCurrentPage();
			},
			getCurrentPage() {
				var that = this;
				// console.log('that.data', that.data)
				that.barTit = that.data.chapter_name;
				var index = 1;
				var size = that.data.end_num;
				that.list = [];
				while (index <= size) {
					that.list.push('https://mhpic.' + that.data.chapter_domain + that.data.chapter_image.high.replace('$$', index))
					index++;
				}
				//滑动到-100的距离,让他强制回到最上面
				uni.pageScrollTo({
					scrollTop: -100,
					duration: 0
				})
			},
			nextChapter() {
				console.log('nextChapter')
				this.getSelectPage(this.comicChapter, 1);
			},
			upChapter() {
				console.log('upChapter')
				this.getSelectPage(this.comicChapter, 2);
			},
			onPageScrollByBar(e) {
				var that = this;

				//处理左侧上一话下一话菜单弹出
				uni.createSelectorQuery().select('.content')
					.boundingClientRect(res => {
						that.showMenu = res.height - e.scrollTop < 1000
					}).exec();


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
		bottom: 200rpx;
		transition: all .5s;
		opacity: 0;
		visibility: hidden;

		.jumpUp,
		.jumpNext {
			padding: 20rpx 40rpx;
			text-align: center;
			color: white;
			font-size: 26rpx;
			border-radius: 0 10rpx 10rpx 0;
		}

		.jumpUp {
			background-color: #DD524D;
			box-shadow: 0px 15px 18px -6px rgba(227, 49, 0, 0.65);
		}

		.jumpNext {
			margin-top: 20rpx;
			background-color: #2daebf;
			box-shadow: 0px 15px 18px -6px rgba(95, 193, 206, 0.65);
		}
	}

	.menu-show {
		opacity: 1;
		visibility: visible;
	}
</style>
