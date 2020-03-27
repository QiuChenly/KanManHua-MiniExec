const utils = {}

utils.getToday = () => {
	let date = new Date();
	return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
}

module.exports = {
	utils
}
