import vue from 'vue'
import vuex from 'vuex'
vue.use(vuex);
const store = new vuex.Store({
	state: {
		recentRead: [],
		myBookList: [],
		temp: {}
	},
	mutations: {
		/**
		 * 初始化store数据
		 * @param {Object} state 
		 */
		loadData(state) {
			uni.getStorage({
				key: 'recentRead',
				success: (res) => {
					state.recentRead = res.data;
					console.log("load succ")
				},
			})
		},

		/**
		 * 添加最近阅读书籍
		 * @param {Object} bookMap 漫画对象
		 */
		addRecentRead(state, bookMap) {
			let arr = [];
			arr.push(bookMap);
			state.recentRead.filter(it => {
				if (it.comicID === bookMap.comicID) {

				} else arr.push(it);
			})
			state.recentRead = arr;
			uni.setStorage({
				key: 'recentRead',
				data: state.recentRead,
				success() {
					console.log('success')
				},
				fail() {
					console.log('faild')
				}
			});
		},
		/**
		 * 加入收藏
		 * @param {Object} comicInfo 漫画数据对象
		 */
		addFavBook(state, comicInfo) {

		},
		/**
		 * 设置页面间数据传递临时数据,下次启动后丢失
		 * @param {Object} data
		 */
		setTempData(state, data) {
			state.temp[data.key] = data.data;
			// console.log('临时存储', state.temp, data.data)
		}
	}
})

export default store
