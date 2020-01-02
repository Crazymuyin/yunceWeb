const router = require('koa-router')()
const controller = require('../../controller/public/file.upload')

router.post('/uploadFile', controller.uploadImage)
router.post('/uploadFiles', controller.uploadFiles)

module.exports = router
