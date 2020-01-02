const koa = require('koa-router')
const router = new koa()
const publicController = require('../../controller/admin/public.controller')

// 登录
router.post('/login', publicController.postLoginIn)
router.get('/logout', publicController.logout)

module.exports = router
