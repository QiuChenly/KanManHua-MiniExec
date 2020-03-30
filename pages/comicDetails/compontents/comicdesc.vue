<template>
	<view class="content">
		<div class="func">
			<view class="addFav" :class="[!isLocalSaveFav?'addFav-add':'addFav-remove']" @click="addFav">{{isLocalSaveFav ? '移出书架' : '加入书架'}}</view>
		</div>
		<view :style="{
			'height':isExpand ? tHeight+'px' : '120rpx',
		}" class="desc" @click="expand">
			<text id="desc-real">{{item.comic_desc}}</text>
		</view>
		<div :style="{ 
			'width':'100%',
			'transition':'all .3s',
			'text-align':'center'
		}">{{ isExpand ? '↑' : '↓' }}</div>
	</view>
</template>

<script>
	import {
		mapMutations,
		mapState
	} from 'vuex'
	export default {
		props: {
			item: {},
			comicInfo: {
				default: {
					comicID: 0,
					comicName: 'test'
				}
			}
		},
		data() {
			return {
				isExpand: false,
				tHeight: 0,
				isLocalSaveFav: false
			}
		},
		mounted() {
			this.isAtLocalFavList(this.comicInfo.comicID);
			this.isLocalSaveFav = this.temp.isAtLocalFavList;
		},
		computed: {
			...mapState(['temp']),
		},
		methods: {
			...mapMutations(['addFavBook']),
			...mapMutations(['removeFavBook']),
			...mapMutations(['isAtLocalFavList']),
			addFav() {
				if (this.isLocalSaveFav) {
					this.isLocalSaveFav = false;
					this.removeFavBook(this.comicInfo.comicID);
				} else {
					// 保存到本地最近阅读
					this.isLocalSaveFav = true;
					this.addFavBook(this.comicInfo);
				}
			},
			expand() {
				var that = this;
				let view = uni.createSelectorQuery().in(this).select("#desc-real");
				view.boundingClientRect(data => {
					that.tHeight = data.height;
					// console.log("得到布局位置信息" + JSON.stringify(data));
				}).exec();
				this.isExpand = !this.isExpand;
			}
		}
	}
</script>

<style scoped lang="scss">
	.content {
		padding: 0 20rpx;

		.desc {
			font-size: 28rpx;
			overflow: hidden;
			transition: height .3s;
		}

		.func {
			width: 100%;
			height: 70rpx;
			position: relative;
			margin-bottom: 20rpx;

			.addFav {
				position: absolute;
				right: 0;
				width: 180rpx;
				height: 70rpx;
				border-radius: 100rpx;
				transition: all .5s;
				line-height: 70rpx;
				text-align: center;
				font-size: 25rpx;
				color: white;
				box-shadow: 0 0 10rpx rgba(0, 0, 0, .5);
			}

			.addFav-add {
				background-color: #5eba5c;
			}

			.addFav-remove {
				background-color: #DD524D;
			}
		}

	}
</style>
