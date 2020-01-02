const koa = require('koa-router')
const router = new koa()
const adminController = require('../../controller/admin/admin.controller')

router.get('/', adminController.readerAdminHome)
router.get('/addManager', adminController.renderAddManage)
router.get('/manager', adminController.renderAdminPage)

module.exports = router
