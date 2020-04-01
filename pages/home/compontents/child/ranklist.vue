<template>
	<scroll-view @scrolltolower="willLower" :lower-threshold="50" class="content" scroll-y="true" @scroll="pageScroll">
		<slot name="tapWhite"></slot>
		<div class="top">--每日12点更新--</div>
		<qLoading v-if='list.length<=0'></qLoading>
		<div class="lists" v-else>
			<comicitem :internalCall="true" :comicid="item.comic_id" v-for="(item,index) in list" :key='item.comic_id'></comicitem>
			<view class="bottom"></view>
			<qNoMore :hasMore='size!=lists.length'></qNoMore>
		</div>
	</scroll-view>
</template>

<script>
	import {
		api
	} from '../../../../js/api.js'
	import qLoading from '../../../../compontents/qLoading.vue'
	import comicitem from '../../../search/compontents/comicitem.vue'
	import qNoMore from '../../../../compontents/qNoMore.vue'

	export default {
		components: {
			qLoading,
			qNoMore,
			comicitem
		},
		props: {
			type: {},
			isActived: {
				default: false
			},
		},
		data() {
			return {
				// 实现懒加载技术
				initialization: false,
				lists: [],
				list: [],
				size: 0,
			}
		},
		onLoad() {
			console.log('onLoad')
		},
		onHide() {
			console.log('onHide')
		},
		onShow() {
			console.log('onShow')
		},
		onUnload() {
			console.log('onUnLoad')
		},
		created() {
			console.log('created' + this.type)
			if (this.isActived && !this.initialization) {
				this.loadInit();
			}
		},
		activated() {
			console.log('activated' + this.type)
		},
		watch: {
			isActived: function(val, oldval) {
				if (!this.initialization) {
					this.loadInit()
				}
				// console.log('onActive', oldval, val, this.isActived, this.type)
			}
		},
		computed: {

		},
		methods: {
			willLower() {
				this.getlist();
			},
			pageScroll(e) {
				this.$emit('pageScroll', e.detail);
			},
			getlist() {
				var that = this;
				if (this.size <= 0 || this.size == undefined) {
					this.size = 10;
				} else if (this.size < this.lists.length) {
					this.size += 10;
				} else {
					this.nomore = true;
					return;
				}
				this.lists.map((it, index) => {
					if (that.list.length < that.size && index > that.list.length - 1) {
						that.list.push(it)
					}
				})
			},
			loadInit() {
				var that = this;
				var time = new Date();
				var t = time.getFullYear() + '-';
				var m = time.getMonth() + 1;
				if (m < 10) m = '0' + m;
				t += m + '-';
				m = time.getDay();
				if (m < 10) m = '0' + m;
				t += m
				api.getRankList(this.type, t).then(data => {
					if (data.data.length > 0) that.initialization = true
					setTimeout(() => {
						that.lists = data.data;
						that.getlist();
					}, 1500)
				})
				console.log('me default be actived!', this.type)
			}
		}
	}
</script>

<style scoped>
	.content {
		height: 100%;
		width: 100%;
	}

	.top {
		height: 40rpx;
		background-color: rgba(0, 0, 0, .08);
		padding: 20rpx 0;
		text-align: center;
		color: rgba(0, 0, 0, .6);
		font-size: 25rpx;
	}

	.bottom {
		height: 20rpx;
	}
</style>
