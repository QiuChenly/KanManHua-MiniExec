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
					console.log("load recentRead succ")
				},
			})
			uni.getStorage({
				key: 'myBookList',
				success: (res) => {
					state.myBookList = res.data;
					console.log("load myBookList succ")
				},
			})
		},
		/**
		 * 检查是否存在于本地我的书架
		 * @param {Object} state
		 * @param {Object} comicID 漫画ID
		 */
		isAtLocalFavList(state, comicID) {
			var has = false;
			state.myBookList.filter(it => {
				if (it.comicID === comicID) {
					has = true;
				}
			})
			state.temp['isAtLocalFavList'] = has;
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
					console.log('save recentRead success')
				},
				fail() {
					console.log('save recentRead faild')
				}
			});
		},

		removeFavBook(state, comicID) {
			var arr = [];
			arr = state.myBookList.filter(it => {
				if (it.comicID === comicID) {} else {
					return it;
				}
			})
			state.myBookList = arr;
			uni.setStorage({
				key: 'myBookList',
				data: arr,
				success() {
					console.log('del myBookList success');
				},
				fail() {
					console.log('del myBookList fail');
				}
			})
		},
		/**
		 * 加入收藏
		 * @param {Object} comicInfo 漫画数据对象
		 */
		addFavBook(state, comicInfo) {
			var arr = [];
			arr.push(comicInfo);
			state.myBookList.filter(it => {
				if (it.comicID === comicInfo.comicID) {

				} else arr.push(it);
			})

			state.myBookList = arr;
			uni.setStorage({
				key: 'myBookList',
				data: arr,
				success() {
					console.log('save myBookList success');
				},
				fail() {
					console.log('save myBookList fail');
				}
			})
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
