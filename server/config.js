module.exports = {
	host: process.env.HOST || '127.0.0.1',
	port: process.env.NODE_PORT || 20000,
	SITE_ROOT_URL: 'http://2507xm5933.zicp.vip',
	wechat: {
		baseUrl: 'https://api.weixin.qq.com/cgi-bin',
		token: 'weixin',
		appId: 'wx02bb1b1b7cd7cf97',
		appSecret: 'efb662434af6458caa20f9c3d4ac9d35'
	},
	oauth: {
		baseUrl: 'https://api.weixin.qq.com/sns'
	},
	mongo: {
		uri: process.env.MONDOBD_URI || 'mongodb://localhost/weixin',
		options: {
			useNewUrlParser: true,
			poolSize: 10
		}
	}
}
