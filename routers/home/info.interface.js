const koa = require('koa-router')
const router = new koa()
const infoInterface = require('../../controller/home/info.controller')

router.get('/', infoInterface.renderInfoPage)

module.exports = router
