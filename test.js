const path = require('path')
const R = require('ramda')
R.map(R.compose(console.log, (i) => path.resolve(__dirname, `./server/middleware/${i}`)))
