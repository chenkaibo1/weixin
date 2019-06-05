const tip = '我的卡丽熙/太阳，欢迎来到河间地\n' + '回复 1，穿越到到冰火查身份\n' + '回复 2，进入冰火手办商城\n' + '回复 3，获取最新的种子资源\n' + '回复 4，查看 9 大家族秘密'

module.exports = async (message) => {
	console.log(message)
	let content
	switch (message.MsgType) {
		case 'text':
			content = tip
			break
		case 'image':
			content = {
				type: 'image',
				mediaId: message.MediaId
			}
			break
		case 'voice':
			content = {
				type: 'voice',
				mediaId: message.MediaId
			}
			break
		case 'video':
			content = {
				type: 'video',
				mediaId: message.MediaId
			}
			break
		default:
			content = tip
			break
	}
	return content
}
