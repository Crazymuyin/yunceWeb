const koa = require('koa-router')
const router = new koa()
const infoDetailInterface = require('../../controller/home/infoDetail.controller')

router.get('/', infoDetailInterface.renderInfoPage)

module.exports = router
