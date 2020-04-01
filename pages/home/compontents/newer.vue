<template>
	<view class="content">
		<qTab class='mTab' :linesize='5' :allowWrap='true' :list='tablist' :currentindex='currentindex' :showType='"line"'
		 :style="{
			'top':'-' + (lastPoint*2) + 'rpx',
		}" @changeItem='changeItem'></qTab>
		<swiper :style="{
			'height':'calc(100vh - '+tabInfo.top+'px)',
		}" class="swiper" :duration="300" :current="currentindex"
		 @change="changeItemSwiper">
			<!-- 懒加载页面数据技术,swiper没提供相应的事件,吐了. -->
			<swiper-item v-for="(item,index) in tablist" :key='item.type'>
				<ranklist @pageScroll='pageScroll' :type='item.type' :isActived='index === currentindex'>
					<!-- 填补空白处 -->
					<view slot='tapWhite' class="tabh" :style="{
				 	'height':tabInfo.height+'px',
				 }"></view>
				</ranklist>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import qTab from '../../../compontents/qTab.vue'
	import ranklist from './child/ranklist.vue'
	export default {
		components: {
			qTab,
			ranklist
		},
		data() {
			return {
				lastPoint: 0,
				tabInfo: {},
				currentindex: 0,
				tablist: [{
					title: '综合榜',
					type: 'all'
				}, {
					title: '自制榜',
					type: 'self'
				}, {
					title: '新作榜',
					type: 'new'
				}, {
					title: '黑马榜',
					type: 'dark'
				}, {
					title: '免费榜',
					type: 'free'
				}, {
					title: '少年榜',
					type: 'boy'
				}, {
					title: '少女榜',
					type: 'girl'
				}, {
					title: '连载榜',
					type: 'serialize'
				}, {
					title: '完结榜',
					type: 'finish'
				}, {
					title: 'VIP榜',
					type: 'charge'
				}]
			}
		},
		created() {

		},
		mounted() {
			var that = this;
			uni.createSelectorQuery().in(that).select('.mTab')
				.boundingClientRect(ret => {
					that.tabInfo = ret;
					console.log(that.tabInfo); //注意 这里是PX单位
				}).exec();
		},
		props: [

		],
		methods: {
			pageScroll(e) {
				if (this.lPoint == undefined) this.lPoint = 0
				var scrollVal = e.scrollTop;
				// console.log(scrollVal, this.lPoint, this.lastTopScroll, (scrollVal > this.lPoint) ? '向上滑动' : '向下滑动')
				if (scrollVal > this.lPoint) {
					//向上滑动
					if (this.lastPoint <= this.tabInfo.height) this.lastPoint += 20
					this.lastTopScroll = scrollVal;
				} else {
					//向下滑动
					if (this.lastTopScroll - scrollVal > 100) {
						this.lastPoint = 0;
					}
				}
				this.lPoint = scrollVal;
				if (scrollVal < 200) this.lastPoint = 0
			},
			changeItem(index) {
				this.currentindex = index;
			},
			changeItemSwiper(e) {
				this.currentindex = e.detail.current;
				this.lastPoint = 0;//有时候用户会再上一个页面把tab拉到隐藏,这样就导致直接右滑下一个页面的时候tab不显示导致上面一大片空白,这里直接做swiper的监听让top为0强制显示出来
			}
		}

	}
</script>

<style scoped>
	.swiper {
		height: auto;
		width: 100%;
		/* background-color: #007AFF; */
	}

	.mTab {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		z-index: 100;
		/* opacity: .2; */
		box-shadow: 0 0 5px rgba(0, 0, 0, .3);
		transition: all .5s;
	}
</style>
