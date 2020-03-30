<template>
	<scroll-view class="content" scroll-y="true" @scroll="onScroll">
		<!-- key不能用单纯的index来绑定数据,否则会造成数据紊乱,这里用漫画ID来绑定每一个item对应的漫画是哪个,否则会发生数据显示错位. -->
		<comicitem :internalCall="true" class="test" v-for="item in myBookList" :key="item.comicID" :comicid="item.comicID">{{item.comicName}}</comicitem>
		<div class="place"></div>
		<qNoMore :hasMore='false'></qNoMore>
	</scroll-view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import qNoMore from '../../../compontents/qNoMore.vue'
	import comicitem from '../../search/compontents/comicitem.vue'
	
	export default {
		data() {
			return {

			}
		},
		components: {
			qNoMore,
			comicitem
		},
		computed: {
			...mapState(['myBookList']),
		},
		methods: {
			...mapMutations(['addFavBook']),
			onScroll(e) {
				if (e.detail.scrollTop > this.currentVal) {
					//向上拉动
					this.$emit('upEvent', e.detail.scrollTop)
					// console.log('向上拉动', e.detail)
				} else {
					//向下拉动
					this.$emit('upEvent', e.detail.scrollTop)
					// console.log('向下拉动', e.detail)
				}
				this.currentVal = e.detail.scrollTop;
				// console.log(e.detail);
			}
		}
	}
</script>

<style scoped>
	.content {
		width: 100%;
		height: 100%;
	}

	.place {
		/* 在最下面放一个20rpx高度占位元素,欺骗用户以为底部也有20的间隔,一致化整体风格. */
		height: 20rpx;
		opacity: 0;
	}
</style>
