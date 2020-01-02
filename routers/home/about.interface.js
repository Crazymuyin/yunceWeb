const koa = require('koa-router')
const router = new koa()
const aboutInterface = require('../../controller/home/about.controller')

router.get('/', aboutInterface.renderInfoPage)

module.exports = router
