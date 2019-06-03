module.exports = {
	host: process.env.HOST || '127.0.0.1',
	port: process.env.NODE_PORT || 20000,
	wechat: {
		token: 'weixin',
		appId: 'wx02bb1b1b7cd7cf97',
		appSecret: 'efb662434af6458caa20f9c3d4ac9d35'
	},
	mongo: {
		uri: process.env.MONDOBD_URI || 'mongodb://localhost/weixin',
		options: {
			useNewUrlParser: true,
			poolSize: 10
		}
	}
}
