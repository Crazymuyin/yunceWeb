const koa = require('koa-router')
const router = new koa()
const controller = require('../../controller/admin/listManage.controller')


router.get('/listManage', controller.renderListManage)
router.get('/listManage/add', controller.renderAddListInfo)
router.get('/listManage/update/:id', controller.renderUpdateListInfo)
router.get('/listManage/detail/:id', controller.renderDetailListInfo)

module.exports = router
