<template>
	<scroll-view class="content">
		<view class="tab" @click="reverse">
			<text class="tab-text comic_status">连载</text>
			<text class="tab-text lastupdate">{{newer}}</text>
			<text class="tab-text reverse">{{reversename ? '正序↓':'倒序↑'}}</text>
		</view>
		<view class="item-style" v-for="(item,index) in chapter" :key="index" @click="goread(item)">
			<text class="item-style-chapter-name time">{{dateFormat(item.create_date)}}</text>
			<text class="item-style-chapter-name">{{item.chapter_name}}</text>
		</view>
	</scroll-view>
</template>

<script>
	import {
		mapMutations
	} from 'vuex'
	export default {
		props: {
			chapter: {

			}
		},
		data() {
			return {
				reversename: false,
				newer: '',
			};
		},
		created() {
			this.newer = this.dateFormat(this.chapter[0].create_date) + ' ' + this.chapter[0].chapter_name;
		},
		methods: {
			...mapMutations(['setTempData']),
			reverse() {
				this.reversename = !this.reversename;
				this.$emit('reversechapter', {});
			},
			dateFormat(timestamp) {
				var time = new Date(timestamp * 1000) //先将时间戳转为Date对象，然后才能使用Date的方法
				var year = time.getFullYear(),
					month = time.getMonth() + 1, //月份是从0开始的
					day = time.getDate();

				var ret = year + '-';
				if (month < 10) {
					ret = ret + '0' + month;
				} else {
					ret = ret + month;
				}
				ret += '-';
				if (day < 10) {
					ret = ret + '0' + day;
				} else {
					ret = ret + day;
				}
				//add0()方法在后面定义
				return ret
			},
			goread(item) {
				// 存储中转数据到vuex
				this.setTempData({
					'key': 'temp_read',
					data: item
				});
				uni.navigateTo({
					url: '/pages/readcomic/readcomic'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tab {
		display: flex;
		background-color: #fff;
		padding: 10rpx;
		align-items: center;
		position: relative;

		.comic_status {
			margin-left: 20rpx;
		}

		.tab-text {
			font-size: 26rpx;
		}

		.lastupdate {
			margin-left: 10rpx;
			font-size: 23rpx;
			color: #C0C0C0;
		}

		.reverse {
			position: absolute;
			right: 10rpx;
		}
	}

	.item-style {
		display: flex;
		align-items: center;
		padding: 20rpx;
		border-bottom: 1rpx solid rgba(0, 0, 0, .2);

		.item-style-chapter-name {
			font-size: 27rpx;
			margin-right: 10rpx;
		}

		.time {
			text-align: center;
			width: 180rpx;
			// background-color: #007AFF;
		}
	}
</style>
