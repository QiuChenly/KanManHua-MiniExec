<template>
	<view class="content">
		<div class='c-title'>
			<text>{{item.title}}</text>
			<image class="c-title-image" :style="{
				'visibility': (item.comic_info.length > displaySize)?'visible' : 'hidden' 
			}"
			 src="../../../static/refresh.png" mode="aspectFit" @click="refreshComic"></image>
		</div>
		<div class="comic-item">
			<view @click="comicClick(item.comic_id)" :class="displayCls" v-for="(item,index) in list" :key="index">
				<div class="item-comic-box-image">
					<image class="item-comic-box-image" :src="getImage(item,index)" mode="aspectFill">
					</image>
					<div class="tag-box">
						<span class="tag" v-for="(itema,indexa) in item.comic_type" :key="indexa" v-if='indexa<4'>
							{{itema}}
						</span>
					</div>
				</div>
				<div class="comic-name-box" :class="[((viewmode === 'square' || viewmode === 'HeterotypicV1') && index%2!=0)?'comic-name-box-right':'comic-name-box-left']">
					<text class='title'>{{item.comic_name}}</text>
					<text class='subtit'>{{item.content}}</text>
				</div>
			</view>
		</div>
	</view>
</template>

<script>
	/* 
	传入一个事件@comicClick,接受漫画点击响应,函数传入参数为漫画ID
	 */
	export default {
		props: {
			item: {},
			viewmode: {}
		},
		data() {
			return {
				list: [],
				currentIndex: 0,
				displaySize: 4,
			};
		},
		created() {
			if (this.viewmode === 'trisection')
				this.displaySize = 6;
		},
		mounted() {
			this.refreshComic();
		},
		computed: {
			displayCls() {
				switch (this.viewmode) {
					case 'default':
						return 'item-comic-box';
						break;
					case 'square':
						return 'item-comic-square';
						break;
					case 'trisection':
						return 'item-comic-trisection'
						break;
					case 'HeterotypicV1':
						return 'item-comic-heterotypic-v1';
						break;
					default:
						return 'item-comic-box';
				}
			}
		},
		methods: {
			getImage(item, index) {
				//修正 因现实六等分导致图片源bug的问题
				//修正 因HeterotypicV1异型界面显示的漫画图片为宣传漫画图
				if (this.displaySize == 6 || (this.displayCls === 'item-comic-heterotypic-v1' && (index == 1 || index == 2))) return 'http://image.yqmh.com/mh/' + item.comic_id + '.jpg'
				if (item.img_url.indexOf("cms") > -1) {
					return 'http://cms.samanlehua.com/' + item.img_url;
				} else {
					return 'http://image.yqmh.com/mh/' + item.comic_id + '_2_1.jpg';
				}
			},
			refreshComic() {
				this.list = [];
				while (this.list.length < this.displaySize) {
					this.list.push(this.item.comic_info[this.currentIndex])
					this.currentIndex += 1;
					if (this.currentIndex >= this.item.comic_info.length)
						this.currentIndex = 0
				}
			},
			comicClick(id) {
				this.$emit('comicClick', id);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		.c-title {
			padding: 20rpx;
			display: flex;
			// background-color: #007AFF;
			font-size: 38rpx;
			align-items: center;

			.c-title-image {
				margin-left: 20rpx;
				height: 38rpx;
				width: 38rpx;
			}
		}

		// 下方漫画推荐列表
		.comic-item {
			display: flex;
			flex-wrap: wrap;
		}
	}

	//默认属性
	.item-comic-box-image {
		position: relative;
		border-radius: 10rpx;
		box-shadow: 0 0 8rpx rgba(0, 0, 0, .35);
		display: block;
		width: 100%;
	}

	.comic-name-box {
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		// background-color: #007AFF;
		display: flex;
		flex-direction: column;
		justify-content: center;

		.title {
			font-size: 26rpx;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		.subtit {
			text-overflow: ellipsis;
			white-space: nowrap;
			overflow: hidden;
			font-size: 23rpx;
			color: gray;
		}
	}

	.comic-name-box-left {
		.title {
			text-align: left;
		}

		.subtit {
			text-align: left;
		}
	}

	.comic-name-box-right {
		.title {
			text-align: right;
		}

		.subtit {
			text-align: right;
		}
	}

	.tag-box {
		background-color: rgba(255, 255, 255, .8);
		border-radius: 0 0 10rpx 10rpx;
		visibility: hidden;
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		display: flex;
		align-items: center;

		.tag {
			margin: 5rpx 0;
			border: 2rpx solid black;
			border-radius: 20rpx;
			padding: 0 10rpx;
			font-size: 20rpx;
			margin-left: 10rpx;
		}

	}

	// 默认视图
	.item-comic-box {
		margin-left: 20rpx;
		width: calc((100% - 60rpx)/2);
		margin-bottom: 10rpx;

		.item-comic-box-image {
			height: 200rpx;
		}

		.comic-name-box {}
	}

	//正方形Square视图
	.item-comic-square {
		margin-left: 20rpx;
		width: calc((750rpx - 60rpx) / 2);

		.tag-box {
			visibility: visible;
			justify-content: center;
		}

		.item-comic-box-image {
			height: calc((750rpx - 60rpx) / 2);
		}

		.comic-name-box {}
	}

	//三等分视图
	.item-comic-trisection {
		margin-left: 20rpx;
		width: calc((750rpx - 80rpx) / 3);

		.item-comic-box-image {
			height: calc((750rpx - 200rpx) / 2);
		}
	}

	//异型v1布局
	.item-comic-heterotypic-v1 {
		margin-left: 20rpx;
		width: calc((750rpx - 60rpx) / 6 * 2);
		// overflow: hidden;

		.item-comic-box-image {
			height: calc((750rpx - 200rpx) / 2);
		}
	}

	.item-comic-heterotypic-v1:nth-child(1),
	.item-comic-heterotypic-v1:nth-child(4) {
		width: calc((750rpx - 60rpx) / 6 * 4);
	}
</style>
