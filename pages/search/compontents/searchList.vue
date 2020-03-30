<template>
	<view class="content">
		<comicitem v-for="(item,index) in list" :key='index' :comicid='item.comic_id' @goDetail='goDetail'></comicitem>

		<qNoMore :hasMore='hasMore'></qNoMore>
	</view>
</template>

<script>
	import comicitem from './comicitem.vue'
	import qNoMore from '../../../compontents/qNoMore.vue'
	export default {
		components: {
			comicitem,
			qNoMore
		},
		props: {
			list: {
				default: []
			},
			hasMore: {
				default: false
			}
		},
		data() {
			return {

			};
		},
		methods: {
			goDetail(item) {
				this.$emit('goDetail', item);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {}
</style>
