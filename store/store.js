import vue from 'vue'
import vuex from 'vuex'
vue.use(vuex);
const store = new vuex.Store({
	state: {
		recentRead: [],
		myBookList: [],
		temp: {},
		userInfo: {}
	},
	mutations: {
		/**
		 * 初始化store数据
		 * @param {Object} state 
		 */
		loadData(state, callback) {
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
			uni.getStorage({
				key: 'userInfo',
				success: (res) => {
					state.userInfo = res.data;
					console.log("load userInfo succ")
				},
				fail() {
					state.userInfo = {
						sex: 132,
					};
					state.temp.firstLaunch = true;
					callback();
					uni.setStorage({
						key: 'userInfo',
						data: state.userInfo,
						success() {
							console.log('save userInfo success.');
						}
					});
					console.log("load userInfo fail,auto set");
				}
			})
		},

		/**
		 * 设置用户性别,根据性别切换主页显示数据
		 * @param {Object} type 男1 女2
		 */
		setUserSexType(state, type) {
			if (type === 1) {
				state.userInfo.sex = 132;
			} else {
				state.userInfo.sex = 133;
			}
			uni.setStorage({
				key: 'userInfo',
				data: state.userInfo,
				success() {
					console.log('save userInfo success.')
				}
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
