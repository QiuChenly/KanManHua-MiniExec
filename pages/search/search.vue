<template>
	<view class="content">
		<view class="searchBox" :style="{
			'box-shadow':(searchDefault.length>0) ? '0 0 10rpx rgba(0, 0, 0, .5)' : 'none' }">
			<input :value="searchDefault" confirm-type="search" class="searchInput" focus placeholder="搜索漫画名或者作者" @confirm="search"
			 @input="inputText" />
			<image v-show="searchDefault != ''" @click="clearText" class="clearImg" src="../../static/clear.png" mode="aspectFit"></image>
			<view @click="search" class="searchBtn">搜索</view>
		</view>

		<scroll-view class='sRetCls' scroll-y="true" lower-threshold="100" @scrolltolower="getMore">
			<hotsearch v-if="searchRet.list.length<=0" :list='keywordList'></hotsearch>
			<searchList @goDetail='goDetail' v-else :list='searchRet.list' :hasMore='fetchState != 1'></searchList>
		</scroll-view>
	</view>
</template>

<script>
	var that;
	import {
		api
	} from '../../js/api.js'

	import hotsearch from './compontents/hotsearch.vue'
	import searchList from './compontents/searchList.vue'

	export default {
		data() {
			return {
				keywordList: [],
				searchDefault: '仙',
				searchRet: {
					maxPage: 0,
					currentPage: 1,
					list: []
				},
				fetchState: -1,
			}
		},
		components: {
			hotsearch,
			searchList
		},
		mounted() {
			that = this;
			api.getHotSearchKey().then(data => {
				that.keywordList = data;
			});
		},
		methods: {
			goDetail(id) {
				uni.navigateTo({
					url: '/pages/comicDetails/comicDetails?id=' + id
				})
			},
			clearText() {
				this.searchDefault = ''
				that.searchRet = {
					maxPage: 0,
					currentPage: 1,
					list: []
				};
				that.fetchState = -1;
			},
			inputText(e) {
				this.searchDefault = e.detail.value;
			},
			search() {
				// console.log(this.searchDefault)
				that.searchRet.list = [];
				this.searchNet(this.searchDefault, that.searchRet.currentPage);
			},
			searchNet(key, index) {
				api.getSearchResult(key, index).then(data => {
					// console.log(that.searchRet)
					if (data.data.length <= 0) {
						that.fetchState = 1;
						return;
					}
					that.fetchState = -1;
					that.searchRet.maxPage = data.page.total_page;
					that.searchRet.currentPage = data.page.current_page + 1;
					data.data.map(item => {
						that.searchRet.list.push(item);
					})
					// console.log('that.searchRet.list', that.searchRet.list)
				})
			},
			getMore() {
				if (this.fetchState == -1) {
					console.log('getMoreResult')
					this.fetchState = 1;
					this.searchNet(this.searchDefault, ++that.searchRet.currentPage);
				}
			}
		}
	}
</script>

<style lang="scss">
	.content {
		height: 100%;
	}

	.status-search {
		box-shadow: 0 0 10rpx rgba(0, 0, 0, .5);
	}

	.searchBox {
		transition: all .5s;
		// background-color: green;
		display: flex;
		height: 90rpx;
		align-items: center;
		padding: 0 20rpx;
		position: relative;

		.searchInput {
			height: 60rpx;
			width: calc(100% - 155rpx);
			padding: 0 0 0 30rpx;
			font-size: 27rpx;
			flex: 1;
			line-height: 50rpx;
			max-lines: 1;
			background-color: rgba($color: #ccc, $alpha: .4);
			border-radius: 100rpx 0 0 100rpx;
		}

		.clearImg {
			background-color: rgba($color: #ccc, $alpha: .4);
			padding: 0 15rpx 0 5rpx;
			width: 35rpx;
			height: 60rpx;
		}

		.searchBtn {
			top: calc((100% - 60rpx) / 2);
			// transform: translateY(-50%);
			height: 60rpx;
			line-height: 60rpx;
			font-size: 26rpx;
			text-align: center;
			background-color: #007AFF;
			color: #fff;
			border-radius: 0 100rpx 100rpx 0;
			width: 100rpx;
			// border-left: 1px solid gray;
		}
	}

	.sRetCls {
		height: calc(100vh - 90rpx);
	}
</style>
