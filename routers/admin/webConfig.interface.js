const koa = require('koa-router')
const router = new koa()
const controller = require('../../controller/admin/webConfig.controller')

router.get('/webInfo', controller.renderWebInfo)
router.get('/webInfo/basicSet', controller.readWebInfo)
router.get('/webInfo/addSet', controller.renderWebAddSet)

module.exports = router
