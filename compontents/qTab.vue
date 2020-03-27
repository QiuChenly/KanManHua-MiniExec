<template>
	<div class="tab" :style="{
		'align-content': type,
		'background-color': bgColor,
	}">
		<view class="menu" @click="click(index)" v-for='(item,index) in list' :key='index'>
			{{item.title}}
			<div v-show='currentindex === index' class='dot' :style="{
				'background-color':dotActiveColor
			}"></div>
		</view>
	</div>
</template>

<script>
	export default {
		props: [
			'list', 'dotActiveColor', 'currentindex', 'bgColor'
		],
		data() {
			return {
				type: 'center',
			}
		},
		created() {
			if (this.list.length > 5)
				this.type = 'flex-start'
			else this.type = 'center'
			// console.log(this.type)
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
		width: 130rpx;
		position: relative;
		text-align: center;
		line-height: 100rpx;
		font-size: 29rpx;
		// background-color: #4CD964;
	}

	.dot {
		position: absolute;
		bottom: 15rpx;
		left: 50%;
		transform: translateX(-50%);
		width: 12rpx;
		height: 12rpx;
		border-radius: 12rpx;
		background-color: #007AFF;
	}
</style>
