const koa = require('koa-router')
const router = new koa()
const controller = require('../../controller/admin/public.controller')


router.get('/', controller.renderLoginPage)

module.exports = router
