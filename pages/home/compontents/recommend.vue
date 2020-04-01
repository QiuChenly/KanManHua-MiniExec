<template>
	<scroll-view @scroll="onScroll" scroll-y="true" lower-threshold="100px" @scrolltolower="loadMore" class="content"
	 scroll-with-animation="true">
		<!-- @click="click_item(item)"  -->
		<view class='item' v-for="(item,index) in getListAsTopic" :key="index">
			<!-- banner -->
			<banner :canScroll="canScroll" @bannerItemClick='bannerItemClick' v-if="item.config.display_type == 73" :list="getlist"></banner>
			<comicmore :item="item" :viewmode='getViewDisplayType(item)' v-else @comicClick='comicClick'>

			</comicmore>
		</view>
		<qBottomTips></qBottomTips>
	</scroll-view>
</template>

<script>
	import {
		api
	} from '../../../js/api.js'
	import banner from './child/banner.vue'
	import comicmore from '../../comicDetails/compontents/comicmore.vue'
	import qBottomTips from '../../../compontents/qBottomTips.vue'
	import {
		mapState
	} from 'vuex';

	export default {
		components: {
			banner,
			comicmore,
			qBottomTips
		},
		props: [

		],
		data() {
			return {
				canScroll: true,
				scrollStamp: 0,
				scrollStamp_Temp: 0,
				comicdata: {},
				currentWebPage: 1,
				nomore: false,
				timer: undefined
			}
		},
		mounted() {
			api.getHomeData(this.currentWebPage, this.userInfo.sex).then(res => {
				this.comicdata = res[1].data.data;
			})
		},
		watch: {
			sexChange() {
				api.getHomeData(this.currentWebPage, this.userInfo.sex).then(res => {
					this.comicdata = res[1].data.data;
				})
			}
		},
		computed: {
			...mapState(['userInfo']),
			sexChange() {
				return this.userInfo.sex
			},
			getlist: function() {
				if (!this.comicdata.hasOwnProperty('book') || this.comicdata.book.length <= 0)
					return [];
				let a = this.comicdata.book[0].comic_info;
				let list = [];
				for (var item in a) {
					list.push({
						title: a[item].comic_name,
						content: a[item].content,
						imageUrl: 'http://cms.samanlehua.com/' + a[item].img_url,
						itemData: a[item]
					})
				}
				return list
			},
			getListAsTopic() {
				if (!this.comicdata.book) return [];
				return this.comicdata.book.filter(item => {
					if (item.config.display_type != 47 && item.config.display_type != 101) {
						return item
					}
				})
			}
		},
		methods: {
			timerExec() {
				var that = this;
				if (that.scrollStamp_Temp === that.scrollStamp) {
					that.canScroll = true;
					clearInterval(that.timer);
					that.timer = undefined;
				} else {
					that.canScroll = false;
					that.scrollStamp_Temp = that.scrollStamp;
				}
				// console.log(that.canScroll, "监听事件", that.scrollStamp_Temp, that.scrollStamp)
			},
			comicClick(id) {
				uni.navigateTo({
					url: '/pages/comicDetails/comicDetails?id=' + id
				})
			},
			getViewDisplayType(item) {
				switch (item.config.display_type) {
					case 26:
						return 'square';
					case 24:
						return 'trisection';
					case 61:
						return 'HeterotypicV1'; //异型版v1布局
					default:
						return 'default';
				}
			},
			click_item(item) {
				uni.navigateTo({
					url: '/pages/comicDetails/comicDetails?id=' + item.comic_id
				})
			},
			getImage(item) {
				if (item.feature_img.indexOf('/mh/') > -2) {
					return 'https://image.yqmh.com/mh/' + item.comic_id + '.jpg'
				} else return 'https://image.yqmh.com' + item.feature_img;
			},
			loadMore() {
				return;
				// 下面的代码是以前的web端接口,已经废弃.
				if (this.nomore) return;
				uni.showNavigationBarLoading(true)
				api.getDaliyUpdate(this.currentWebPage).then(res => {
					uni.hideNavigationBarLoading();
					if (res[1].data.data == null) {
						this.nomore = true
						return;
					}
					this.comicList.push.apply(this.comicList, res[1].data.data.list);
					this.currentWebPage++;
				})
			},
			bannerItemClick(item) {
				this.click_item(item)
				// console.log(item)
			},
			onScroll(event) {
				// console.log(this.timer);
				this.scrollStamp = event.timeStamp;
				if (this.timer === undefined)
					this.timer = setInterval(this.timerExec, 100)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		// display: flex;
		width: 100%;
		height: 100%;
		// 这里高度设置为100%可以让他在Swiper里面垂直滚动
		// dcloud官方的Swiper控件是真的不行.
	}
</style>
