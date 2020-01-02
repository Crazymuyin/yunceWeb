const koa = require('koa-router')
const router = new koa()
const controller = require('../../controller/admin/friendshipLink.controller')


router.get('/friendshipLink', controller.renderFriendLink)
router.get('/friendshipLink/add', controller.renderFriendLinkAdd)

module.exports = router
