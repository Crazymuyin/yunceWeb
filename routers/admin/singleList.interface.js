const router = require('koa-router')()
const controller = require('../../controller/admin/singleList.controller')

router.get('/singlePageManage', controller.renderSingleList)
router.get('/renderSingleEdit/:id/className/:className', controller.renderSingleEditPage)

module.exports = router
