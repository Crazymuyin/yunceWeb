const koa = require('koa-router')
const router = new koa()
const infoListCon = require('../../controller/home/info.controller')

router.get('/info/list', infoListCon.getInfoList)

module.exports = router
