const fs = require('fs')
const https = require('https')
const path = require('path')
const _ = require('lodash')
const imdbs = require('../database/json/IMDb.json')
async function getImage(url, imgPath) {
	https.get(url, function(res) {
		let imgData = ''
		res.setEncoding('binary')
		res.on('data', function(chunk) {
			imgData += chunk
		})
		res.on('end', function() {
			fs.writeFile(imgPath, imgData, 'binary', function(err) {
				if (err) {
					console.log(err)
				}
				console.log('success')
			})
		})
	})
}
// create folders
function mkdirsSync(dirname) {
	if (fs.existsSync(dirname)) {
		return true
	} else {
		if (mkdirsSync(path.dirname(dirname))) {
			fs.mkdirSync(dirname)
			return true
		}
	}
}
const promises = imdbs.map((item) => {
	const url = item.profile.split('V1').shift() + '_SX400_SY500_' + item.profile.split('V1').pop()
	const imgPath = path.resolve(__dirname, `../../static/characters/${item.name}/${item.name}.jpg`)
	const imgDir = path.resolve(__dirname, `../../static/characters/${item.name}`)
	mkdirsSync(imgDir)
	return getImage(url, imgPath)
})
// const promises = imdbs.map((item) => {
// 	let count = 0
// 	return item.images.map((item2) => {
// 		const url = item2
// 		const imgPath = path.resolve(__dirname, `../../static/characters/${item.name}/images/${++count}.jpg`)
// 		const imgDir = path.resolve(__dirname, `../../static/characters/${item.name}/images`)
// 		mkdirsSync(imgDir)
// 		return getImage(url, imgPath)
// 	})
// })
const acc = _.reduce(
	promises,
	function(acc, curr) {
		acc = [ ...acc, ...curr ]
		return acc
	},
	[]
)
// imdbs.forEach((item) => {
// 	const imgPath = path.resolve(__dirname, `../../static/characters/${item.name}/images/`)
// 	const dirs = fs.readdirSync(imgPath)
// 	dirs.forEach((dir) => {
// 		if (dir === '0.jpg') {
// 			fs.unlinkSync(imgPath + '/' + dir)
// 		}
// 	})
// })
Promise.all(acc).then(() => {
	process.exit(1)
})
