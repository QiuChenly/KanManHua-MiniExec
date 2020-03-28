// import utils from './utils.js'

const {
	utils
} = require('./utils')

const api = {};
let baseImageUrl = 'https://image.yqmh.com';
var userToken =
	"VYCU5WafEplIQNqtpIytxDN8NkH18UmN%2Byf5I18zc8MDiJjJCnwTvxGbWAyzJa4nBJPPWOdVvWkFVme7CFXqyNLN3RjBL4BNXNoswcA2fWT7I68XPcZhbmhYlonaJrLQXxGU8et%2B5TR%2BK7EKJjZvvmugYzccv4vCd5jamWrTNVs%3D",
	imageBaseUrl = "http://wechat.321mh.com/kmh3/";

/**
 * sex 133 女  132 男
 */
api.getHomeData = (page, sex) => {
	let date = utils.getToday();
	let u =
		'https://cms-booklist.321mh.com/api/v1/bookList/getBookByType/?platform=6&productname=kmh&platformname=weixin_applet&client-type=weixin_applet&client-channel=tencent&client-version=3.2.4&booktype=' +
		sex + '&page=' +
		page + '&pagesize=20'
	return req(u, '')
}

api.getDetails = (id) => {
	//https://comic.321mh.com/app_api/v5/getcomicinfo_body/?platform=6&productname=kmh&platformname=weixin_applet&client-type=weixin_applet&client-channel=tencent&client-version=3.2.4&comic_id=107271
	let u =
		'https://comic.321mh.com/app_api/v5/getcomicinfo_body/?platform=6&productname=kmh&platformname=weixin_applet&client-type=weixin_applet&client-channel=tencent&client-version=3.2.4&comic_id=' +
		id;
	return req(u, '').then(res => {
		return res[1].data
	})
}

/**
 * 获取热门搜索
 */
api.getHotSearchKey = () => {
	let u =
		'https://getcomicinfo-globalapi.yyhao.com/app_api/v5/gettopsearch/?platform=6&productname=kmh&platformname=weixin_applet&client-type=weixin_applet&client-channel=tencent&client-version=3.2.4';
	return req(u, '').then((res) => {
		return res[1].data
	})
}

/**
 * 获取搜索结果
 */
api.getSearchResult = (keyWord, index) => {
	let u =
		'https://getcomicinfo-globalapi.yyhao.com/app_api/v5/getsortlist/?platform=6&productname=kmh&platformname=weixin_applet&client-type=weixin_applet&client-channel=tencent&client-version=3.2.4&search_key=' +
		encodeURI(keyWord) + '&orderby=click&page=' + index;
	return req(u, '').then(res => {
		return res[1].data;
	})
}

api.getBookByComicIDNew = (id) => {
	let u = 'https://cms-booklist.321mh.com/api/v1/bookList/getBookByComicidNew';
	let data = {
		"platform": 6,
		"productname": "kmh",
		"platformname": "weixin_applet",
		"client-type": "weixin_applet",
		"client-channel": "tencent",
		"client-version": "3.2.4",
		"booktype": "detail",
		"comic_id": id,
		"userauth": userToken
	};

	return req(u, JSON.stringify(data)).then(res => {
		return res[1].data
	})
}

// 核心Request请求

let req = (url, data) => {
	var method = 'GET';
	if (data.length > 0) {
		method = 'POST';
	}
	return uni.request({
		url,
		method,
		data
	})
}



export {
	api
}
