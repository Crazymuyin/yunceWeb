const koa = require('koa-router')
const router = new koa()
const controller = require('../../controller/admin/imageManage.controller')


router.get('/imageManage', controller.renderImageManage)

module.exports = router
