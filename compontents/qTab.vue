<template>
	<div id="nHeight" :class="[!allowWrap?'tab':'moreline-view']" :style="{
		'align-content': type,
		'background-color': bgColor,
	}">
		<view :style="{
			'width':(linesize===-1)?'auto':'calc((100% - ('+(linesize+1)+' * 20rpx)) / '+linesize+')'
		}"
		 class="menu" @click="click(index)" v-for='(item,index) in list' :key='index'>
			<span class="borders" :class="[showType === 'border' & (currentindex === index) ? 'border-select ' : '']">{{item.title}}</span>
			<div v-if='showType != "border"' class='baseShow' :class="clazz" :style="{
				'background-color':dotActiveColor,
				'opacity':(currentindex === index) ? 1 : 0
			}"></div>
		</view>
	</div>
</template>

<script>
	/**
	 * 自定义tab组件,接收以下参数
	 * :list tab列表,数组,数组对象为{title:'your title'}
	 * :dotActiveColor 文本型,指定点击后下方指示条颜色,默认黑色
	 * :currentindex 双向绑定,需要提供一个值绑定index显示
	 * :bgColor tab的默认背景颜色,demo中默认白色
	 * :showType 指定下方指示条的展现形式,是点还是横线.
	 * showType取值: normal line dot border
	 * 
	 * 接受以下事件
	 * @changeItem(index,mid) 响应函数,接受点击后的index项目,mid标识id
	 * @NativeRect(rect) 本函数用于获取实际tab的宽高,用来实现动态高度设置
	 */
	export default {
		props: {
			'list': {
				default: []
			},
			'dotActiveColor': {
				default: 'black'
			},
			'currentindex': {
				default: 0
			},
			'bgColor': {
				default: 'white'
			},
			'showType': {
				default: 'normal'
			},
			// 是否允许超过最大宽度后自动换行显示
			'allowWrap': {
				default: false
			},
			//指定超过屏幕宽度的话一行显示几个条目,如果提供值为-1或不写则默认尽可能多的塞满屏幕.
			'linesize': {
				default: -1
			},
			'mid': {
				default: 'defaultTag'
			}
		},
		data() {
			return {
				type: 'center',
				clazz: 'dot',
				clazz_: ''
			}
		},
		created() {
			if (this.list.length > 5)
				this.type = 'flex-start'
			else this.type = 'center'
			switch (this.showType) {
				case 'normal':
					this.clazz = 'dot';
					break
				case 'line':
					this.clazz = 'line';
					break;
				case 'border':
					this.clazz = '';
					this.clazz_ = 'borders';
					break;
				default:
					this.clazz = 'dot';
					break;
			}
			// console.log(this.showType, this.clazz)
		},
		mounted() {
			setTimeout(() => {
				uni.createSelectorQuery().in(this).select('#nHeight').boundingClientRect(res => {
					// console.log('qtab-res',res)
					this.$emit('NativeRect', res)
				}).exec();
			}, 1000);
		},
		methods: {
			click(index) {
				this.$emit('changeItem', index, this.mid);
				// console.log(index)
			}
		},
		components: {

		}
	}
</script>

<style lang="scss" scoped>
	.tab {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		align-content: flex-start;
		overflow: scroll;
		height: 100rpx;
	}

	.moreline-view {
		display: flex;
		flex-flow: row wrap;
	}

	.menu {
		// width: 130rpx;
		position: relative;
		text-align: center;
		line-height: 100rpx;
		text-align: center;
		padding: 0 0 0 20rpx;
		font-size: 29rpx;
		// background-color: #4CD964;
	}

	.baseShow {
		bottom: 15rpx;
		border-radius: 12rpx;
		background-color: #007AFF;
		transition: all .5s;
		opacity: 0;
	}

	.dot {
		position: absolute;
		left: 50%;
		margin-left: 10rpx;
		transform: translateX(-50%);
		width: 12rpx;
		height: 12rpx;
	}

	.line {
		width: calc(100% - 20rpx);
		height: 8rpx;
		position: absolute;
		bottom: 15rpx;
	}

	.borders {
		border-radius: 100rpx;
		padding: 0 20rpx;
		transition: all .5s;
		// opacity: 0;
		// background-color: #4CD964;
	}

	.border-select {
		border: 2px solid #007AFF;
		color: #fff;
		background-color: #007AFF;
	}
</style>
