const xml2js = require('xml2js')
const compiled = require('./tpl')
/**
 * 解析xml
 * @param {*} xml 
 */
exports.parseXML = (xml) => {
	return new Promise((resolve, reject) => {
		xml2js.parseString(xml, { trim: true }, (err, content) => {
			if (err) reject(err)
			else resolve(content)
		})
	})
}

/**
 * 
 */
const formatMessage = (result) => {
	const message = {}

	if (typeof result === 'object') {
		const keys = Object.keys(result)

		for (let i = 0; i < keys.length; i++) {
			const item = result[keys[i]]
			const key = keys[i]

			if (!(item instanceof Array) || item.length === 0) {
				continue
			}

			if (item.length === 1) {
				const val = item[0]

				if (typeof val === 'object') {
					message[key] = formatMessage(val)
				} else {
					message[key] = (val || '').trim()
				}
			} else {
				message[key] = []

				for (let j = 0; j < item.length; j++) {
					message[key].push(formatMessage(item[j]))
				}
			}
		}
	}

	return message
}
exports.formatMessage = formatMessage

exports.tpl = (content, message) => {
	let type = 'text'
	if (Array.isArray(content)) {
		type = 'news'
	}

	if (!content) {
		content = 'Empty News'
	}

	if (content && content.type) {
		type = content.type
	}
	const info = {
		content,
		createTime: new Date().getTime(),
		msgType: type,
		toUserName: message.FromUserName,
		fromUserName: message.ToUserName
	}
	return compiled(info)
}
