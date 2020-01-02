const koa = require('koa-router')
const router = new koa()
const indexInterface = require('../../controller/home/index.controller')

router.get('/', indexInterface.renderIndexPage)

module.exports = router
