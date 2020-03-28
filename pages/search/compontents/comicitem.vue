<template>
	<view class="list" @click='clickItem'>
		<image lazy-load="true" class="content-img" :src="'https://image.yqmh.com/mh/' + comicid + '.jpg'" mode="aspectFill"></image>
		<div class="content-right">
			<div class='comicTit'>{{comicinfo.comic_name}}</div>
			<div class='subtit'>{{comicinfo.comic_author}}</div>
			<div class='tags'>
				<text class="tags-item" v-if="index<4" v-for="(item,index) in comicinfo.comic_type_new" :key='index'>{{item.name}}</text>
			</div>
			<div class='extraMsg'>更新到: {{comicinfo.last_chapter_name}}</div>
		</div>
	</view>
</template>

<script>
	var that;
	import {
		api
	} from '../../../js/api.js'
	export default {
		props: {
			comicid: {

			}
		},
		data() {
			return {
				comicinfo: {
					comic_name: '加载中...'
				},
			};
		},
		mounted() {
			var that = this;
			// console.log(this.comicid)
			api.getDetails(this.comicid).then(data => {
				that.comicinfo = data;
				console.log(that.comicinfo)
			})
		},
		methods: {
			clickItem() {
				this.$emit('goDetail', this.comicid);
			}
		},
		computed: {

		}
	}
</script>

<style lang="scss" scoped>
	.list {
		margin: 0 20rpx;
		margin-top: 20rpx;
		// background-color: #007AFF;

		display: flex;
		flex-wrap: nowrap;

		.content-img {
			border-radius: 10rpx;
			box-shadow: 0 0 10rpx rgba(0, 0, 0, .5);
			width: 190rpx;
			height: 250rpx;
		}

		.content-right {
			flex: 1;
			display: flex;
			flex-direction: column;
			margin-left: 20rpx;
			font-size: 29rpx;
			padding: 10rpx 0;
			overflow: hidden;

			.comicTit {
				font-size: 30rpx;
				height: 70rpx;
				line-height: 70rpx;
			}

			.subtit {
				// background-color: #007AFF;
				font-size: 25rpx;
				margin: 0 0 15rpx 0;
			}

			.tags {
				flex: 1;
			}

			.tags-item {
				font-size: 20rpx;
				padding: 2rpx 10rpx;
				margin-right: 10rpx;
				background-color: rgba(0, 0, 0, .4);
				border-radius: 100rpx;
				color: white;
			}

			.extraMsg {
				flex: 1;
				font-size: 24rpx;
				text-overflow: ellipsis;
				white-space: nowrap;
				overflow: hidden;
			}
		}
	}
</style>
