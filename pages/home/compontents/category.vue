<template>
	<view class="content">
		<div :style="{
			'top':'-'+huadongtop+'px'
		}" class="select" :class="[menuState?'select-hide':'']">
			<div class="select-child" :style="{
			  'height':showMenuMore? menuHeight+'px':'100rpx'
		  }">
				<span>剧情</span>
				<qTab mid='juqin' @changeItem='indexChanged' @NativeRect="NativeRect" :list="selectList.juqin" :currentindex="selectList.juqinIndex"
				 :allowWrap="true" showType="border"></qTab>
				<view class="tap-more" @click="onShowMoreClick">{{showMenuMore?"↑":"↓"}}</view>
			</div>
			<div class="select-child">
				<span>进度</span>
				<qTab mid='jindu' @changeItem='indexChanged' :list="selectList.jindu" :currentindex="selectList.jinduIndex"
				 :allowWrap="true" showType="border"></qTab>
			</div>
			<div class="select-child">
				<span>资费</span>
				<qTab mid='zifei' @changeItem='indexChanged' :list="selectList.zifei" :currentindex="selectList.zifeiIndex"
				 :allowWrap="true" showType="border"></qTab>
			</div>
			<qTab mid="paixu" @changeItem='indexChanged' :list="selectList.sortType" :currentindex="selectList.sortIndex"
			 :allowWrap="true" showType="line"></qTab>
			<view class="sLine"></view>
		</div>

		<scroll-view @scrolltolower="loadmore" class="list" scroll-y="true" @scroll="listScroll" :style="{
			'height':'calc(100vh - 100rpx)'
		}">
			<view class="zhanwei" :style="{
			'height':zhanwei+'px'
		}"></view>
			<comicitem :internalCall="true" :comicid="item.comic_id" v-for="(item) in comicList" :key="item.comic_id"></comicitem>
			<view class="bottom" :style="{
				'height':'20rpx',
			}"></view>
			<qLoading :hasMore='true'></qLoading>
		</scroll-view>
	</view>
</template>

<script>
	import qTab from "../../../compontents/qTab.vue";
	import {
		api
	} from "../../../js/api.js";
	import comicitem from "../../search/compontents/comicitem.vue";
	import qLoading from '../../../compontents/qLoading.vue'

	export default {
		components: {
			qTab,
			comicitem,
			qLoading
		},
		data() {
			return {
				selectList: {
					juqinIndex: 0,
					juqin: [],
					jinduIndex: 0,
					jindu: [],
					zifeiIndex: 0,
					zifei: [],
					sortIndex: 0,
					sortType: [{
							title: "人气",
							type: "total_view_num"
						},
						{
							title: "更新",
							type: "update_time"
						}
					]
				},
				showMenuMore: false,
				menuHeight: 100,
				currentPage: 1,
				comicList: [],
				zhanwei: 0,
				menuState: false,
				huadongnimatade: 0,
				huadongtop: 0
			};
		},
		methods: {
			listScroll(e) {
				if (e.detail.scrollTop <= this.menuHeight) {
					this.huadongtop = 0;
					return;
				}
				if (e.detail.scrollTop > this.huadongnimatade) {
					this.menuState = true;
					this.huadongtop = e.detail.scrollTop / 2
					this.showMenuMore = false;
				} else {
					this.menuState = false;
					this.huadongtop = 0
				}
				this.huadongnimatade = e.detail.scrollTop;
			},
			/**
			 * 点击下滑按钮显示更多菜单
			 */
			onShowMoreClick(e) {
				this.showMenuMore = !this.showMenuMore;
			},
			NativeRect(rect) {
				console.log('NativeRect(rect)', rect)
				this.menuHeight = rect.height;
			},
			indexChanged(index, type) {
				console.log(index, type)
				switch (type) {
					case 'paixu':
						this.selectList.sortIndex = index
						this.loadmore(null, true)
						break;
					case 'zifei':
						this.selectList.zifeiIndex = index
						break;
					case 'jindu':
						this.selectList.jinduIndex = index
						break;
					case 'juqin':
						this.selectList.juqinIndex = index
						break;
				}
			},
			loadComic(needClear) {
				var that = this;
				if (needClear) {
					this.currentPage = 1;
					this.comicList = [];
				}
				api.getCategoryByCondition(this.currentPage, this.selectList.sortType[this.selectList.sortIndex].type).then(res => {
					res.data.map(it => {
						console.log(it);
						// cartoon_id: 5323
						// cartoon_name: "神印王座"
						that.comicList.push({
							comic_id: it.cartoon_id,
							comic_name: it.cartoon_name
						});
					});
					that.willload = false;
				});
			},
			loadmore(e, clear = false) {
				if (!this.willload) {
					this.willload = true;
					this.currentPage++;
					this.loadComic(clear);
				}
			}
		},
		created() {
			var that = this;
			api.getCategoryTab().then(data => {
				that.selectList.juqin = [{
					title: "全部",
					type: "all"
				}];
				data.data.drama.filter(it => {
					that.selectList.juqin.push({
						title: it.name,
						type: it.key
					});
				});
				that.selectList.jindu = [{
					title: "全部",
					type: "all"
				}];
				data.data.plan.filter(it => {
					that.selectList.jindu.push({
						title: it.name,
						type: it.key
					});
				});
				that.selectList.zifei = [{
					title: "全部",
					type: "all"
				}];
				data.data.adge.filter(it => {
					that.selectList.zifei.push({
						title: it.name,
						type: it.key
					});
				});
				uni.createSelectorQuery().in(that).select('.select').boundingClientRect(ret => {
					console.log('that.zhanwei ', ret)
					that.zhanwei = ret.height;
				}).exec();
			});
		},
		mounted() {
			this.loadComic(true);
		},
		props: []
	};
</script>

<style scoped lang="scss">
	.sLine {
		height: 1rpx;
		width: 100%;
		background-color: rgba(192, 192, 192, 0.5);
	}

	.content {}

	.list {
		width: 100%;
		height: 100%;
	}

	.select {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		background-color: white;
		z-index: 100;
		transition: all 0.8s;
	}

	.select-hide {
		top: -1000px;
	}

	.select-child {
		height: 100rpx;
		width: 100%;
		overflow: hidden;
		display: flex;
		transition: all 0.5s;

		span {
			text-align: center;
			font-size: 28rpx;
			height: 100%;
			display: block;
			width: 10%;
			line-height: 100rpx;
		}

		.tap-more {
			line-height: 100rpx;
			text-align: center;
			width: 10%;
		}

		q-tab {
			width: 80%;
		}
	}
</style>
