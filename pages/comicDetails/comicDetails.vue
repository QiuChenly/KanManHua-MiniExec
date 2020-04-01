<template>
	<scroll-view class="content">
		<qBar barTitColor="#fff" :bgcolor="barcolor" :barTit="barTit" @onPageScrollByBar="onscroll"></qBar>
		<view class="bg" :style="{
			'position': 'relative',
			'height': barHeight+'px',
		}">
			<image webp="true" mode="aspectFill" :src="barImg" class="head"></image>

			<div style="
				position: absolute;
				top: 0;left: 0;
				width: 100%;
				height: 100%;
				background-color: rgba(0,0,0,.4)
			">
			</div>

			<!-- 下方标题与tag -->
			<!-- 	'height':'calc(100% - ('+barHeight+'px - 125px))', -->
			<view class="detail" :style="{
				'width':'100%'
				}">

				<div :style="{
				'margin-top': '5rpx'	
				}">
					<text :style="{
						'font-size': '40rpx',
					}">{{comicdata.comic_name}}</text>
					<text :style="{
						'font-size': '25rpx',
						'margin-left':'10px'
					}">{{comicdata.comic_media}}</text>
				</div>
				<div>
					<text class="type-item" v-for="(item,index) in comicdata.comic_type_new" :key="index">
						{{item.name}}
					</text>
				</div>
				<div>
					<!-- (TMD用亿做单位你也太夸张了吧??) -->
					<text :style="{
						'font-size': '25rpx',
						'background-color':'rgba(0,0,0,0.5)',
						'border-radius':'10rpx',
						'padding':'5rpx 20rpx'
					}">人气:{{(comicdata.renqi / 100000).toFixed(0)}} (TMD用亿做单位你也太夸张了吧??)</text>
				</div>
			</view>
			<!-- 分享组件 -->
			<qShare class="sharetag" @shareClick="shareClick"></qShare>
		</view>

		<div :style="{
			'height':'100rpx',
		}">
			<!-- 利用一个占位高度实现无缝滚动 -->
			<qTab :class="{'is_fixd':isFixd}" :style="{
			'top': (barHeight - 145)+'px',
		}" :bgColor='barBgColor' :list="tablist"
			 :dotActiveColor="dotcolor" @changeItem='itemchange' :currentindex="tabcurrent"></qTab>
		</div>

		<!-- 切换页面显示 -->
		<view class="tab-swiper" :class="{'needMargin':isFixd}">
			<comicdesc :comicInfo="comicInfoDesc" v-if="tabcurrent == 0" :item='comicdata'></comicdesc>
			<comicchapter v-if="tabcurrent == 1" @reversechapter='reversechapter' :chapter='comicdata.comic_chapter' :comicID='comicID'></comicchapter>
		</view>

		<!-- 下方的更多推荐 -->
		<comicmore @comicClick='comicClick' :item='item' v-for="(item,index) in moreComic.data" :key='index'></comicmore>


		<qBottomTips></qBottomTips>

		<!-- <swiper :duration="300" :current="tabcurrent" @change="swiperchange" :style="{
			'height':'calc(100vh - 80rpx - '+barHeight+'px)',
		}">
			<swiper-item class="comic-desc">
			</swiper-item>
			<swiper-item class="comic-list">
				
			</swiper-item>
		</swiper> -->
	</scroll-view>
</template>

<script>
	import {
		api
	} from '../../js/api.js'

	import qBar from '../../compontents/qBar.vue'
	import qTab from '../../compontents/qTab.vue'
	import comicdesc from './compontents/comicdesc.vue'
	import comicchapter from './compontents/comicchapter.vue'

	import qShare from '../../compontents/qShare.vue'
	import comicmore from './compontents/comicmore.vue'
	import qBottomTips from '../../compontents/qBottomTips.vue'

	import {
		mapMutations,
		mapState
	} from 'vuex'

	export default {
		data() {
			return {
				tabcurrent: 0,
				dotcolor: 'black',
				barBgColor: '#fff',
				tablist: [{
					title: '详情'
				}, {
					title: '目录'
				}],
				barcolor: '#000',
				comicID: '',
				barHeight: 0,
				barImg: '',
				barTit: '漫画详情',
				comicdata: {},
				isFixd: false,
				moreComic: {},
				comicInfoDesc: {
					comicID: 0,
					comicName: 'test'
				}
			};
		},
		computed: {},
		components: {
			qBar,
			qTab,
			qBottomTips,
			comicdesc,
			comicchapter,
			qShare,
			comicmore
		},
		onLoad(option) {
			let that = this;
			this.barHeight = uni.getStorageSync("SET_CUSTOM_BAR") + 150;
			this.comicID = option.id; //'91961'; //
			this.comicInfoDesc.comicID = this.comicID;
			this.barImg = 'https://image.yqmh.com/mh/' + this.comicID + '.jpg';
			// console.log(this.barImg)
			api.getDetails(this.comicID).then(comicInfo => {
				that.comicdata = comicInfo;
				// console.log(JSON.stringify(comicInfo))
				that.barImg = comicInfo.cover_list[1];
				// console.log(that.barImg)
				that.barTit = comicInfo.comic_name;
				that.comicInfoDesc.comicName = that.barTit;
				// 保存到本地最近阅读
				that.addRecentRead({
					comicID: option.id,
					comicName: comicInfo.comic_name
				});
			}).then(() => {
				api.getBookByComicIDNew(that.comicID, '').then(res => {
					that.moreComic = res;
				})
			})


		},
		methods: {
			...mapMutations(['addRecentRead']), //加入最近阅读历史
			...mapMutations(['addFavBook']), //加入最近阅读历史
			itemchange(index) {
				this.tabcurrent = index;
			},
			reversechapter() {
				this.comicdata.comic_chapter = this.comicdata.comic_chapter.reverse();
			},
			onscroll(e) {
				this.isFixd = e.scrollTop > 145;
			},
			shareClick() {
				uni.showToast({
					title: "分享按钮"
				})
			},
			comicClick(id) {
				uni.navigateTo({
					url: '/pages/comicDetails/comicDetails?id=' + id
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.is_fixd {
		position: fixed;
		left: 0;
		right: 0;
		z-index: 100;
		background-color: white;
		box-shadow: 0 0 5px rgba(0, 0, 0, .3);
	}

	.tab-swiper {
		margin-top: 20rpx;
	}

	.head {
		// background-color: #007AFF;
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		// filter: blur(10px);
	}

	.content {
		// height: 1700px;

		swiper {
			min-height: 200px;
			// height: 100vh;
		}
	}

	.bg {
		overflow: hidden;

		.sharetag {
			position: absolute;
			bottom: 40rpx;
			right: 0rpx;
		}
	}

	.detail {
		position: absolute;
		left: 10px;
		bottom: 10px;
		// background-color: #007AFF;

		text {
			color: #fff;
		}
	}

	.type-item {
		border-radius: 20rpx;
		margin-left: 20rpx;
		font-size: 20rpx;
		// font-weight: lighter;
		padding: 5rpx 20rpx;
		background-color: rgba(0, 0, 0, .5);
	}

	.type-item:first-child {
		margin-left: 0;
	}

	.comic-desc {
		// background-color: #007AFF;
		margin-top: 10rpx;
		font-size: 28rpx;
		overflow: scroll;
	}

	.comic-list {
		overflow: scroll;
		margin-top: 10rpx;
		// background-color: #4CD964;
	}
</style>
