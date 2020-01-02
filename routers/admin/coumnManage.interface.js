const router = require('koa-router')()
const controller = require('../../controller/admin/columnManage.controller')

router.get('/columnManage', controller.renderColumnManage)
router.get('/columnManage/addColumn/:id', controller.renderAddColumn)

module.exports = router
