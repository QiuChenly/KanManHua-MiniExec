<template>
	<div class="tab" :style="{
		'align-content': type,
		'background-color': bgColor,
	}">
		<view class="menu" @click="click(index)" v-for='(item,index) in list' :key='index'>
			<span>{{item.title}}</span>
			<div class='baseShow' :class="clazz" :style="{
				'background-color':dotActiveColor,
				'opacity':(currentindex === index)?1:0
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
	 * 
	 * 接受以下事件
	 * @changeItem(index) 响应函数,接受点击后的index项目
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
			}
		},
		data() {
			return {
				type: 'center',
				clazz: 'dot'
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
				default:
					this.clazz = 'dot';
					break;
			}
			// console.log(this.showType, this.clazz)
		},
		methods: {
			click(index) {
				this.$emit('changeItem', index);
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
		height: 100rpx;
		overflow: scroll;
	}

	.menu {
		// width: 130rpx;
		position: relative;
		text-align: center;
		line-height: 100rpx;
		padding: 0 20rpx;
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
		transform: translateX(-50%);
		width: 12rpx;
		height: 12rpx;
	}

	.line {
		width: calc(100% - 40rpx);
		height: 8rpx;
		position: absolute;
		bottom: 15rpx;
	}
</style>
