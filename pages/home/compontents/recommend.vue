<template>
	<scroll-view scroll-y="true" lower-threshold="100px" @scrolltolower="loadMore" class="content" scroll-with-animation="true">
		<!-- @click="click_item(item)"  -->
		<view class='item' v-for="(item,index) in getListAsTopic" :key="index">
			<!-- banner -->
			<banner @bannerItemClick='bannerItemClick' v-if="item.ordernum == 448370" :list="getlist"></banner>
			<comicmore :item="item" :viewmode='getViewDisplayType(item)' v-else-if="item.ordernum != '448370'" @comicClick='comicClick'>

			</comicmore>
		</view>
	</scroll-view>
</template>

<script>
	import {
		api
	} from '../../../js/api.js'
	import banner from './child/banner.vue'
	import comicmore from '../../comicDetails/compontents/comicmore.vue'

	export default {
		components: {
			banner,
			comicmore
		},
		props: [

		],
		data() {
			return {
				comicdata: {},
				currentWebPage: 1,
				nomore: false
			}
		},
		mounted() {
			api.getHomeData(this.currentWebPage, '132').then(res => {
				this.comicdata = res[1].data.data;
				this.currentWebPage++;
			})
		},
		computed: {
			getlist: function() {
				if (!this.comicdata.hasOwnProperty('book'))
					return [];
				let a = this.comicdata.book[0].comic_info;
				let list = []
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
					if (item.ordernum != '13176' && item.ordernum != '38') {
						return item
					}
				})
			}
		},
		methods: {
			comicClick(id) {
				uni.navigateTo({
					url: '/pages/comicDetails/comicDetails?id=' + id
				})
			},
			getViewDisplayType(item) {
				switch (item.ordernum) {
					case 447676:
					case 13445:
					case 13424:
					case 13409:
						return 'square';
					case 446900:
					case 446146:
					case 166:
						return 'trisection';
					case 13401:
					case 13416:
					case 13354:
					case 13430:
						return 'HeterotypicV1';//异型版v1布局
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
