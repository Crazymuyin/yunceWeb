const koa = require('koa-router')
const router = new koa()
const controller = require('../../controller/admin/admin.controller')
const webConfig = require('../../controller/admin/webConfig.controller')
const columnManage = require('../../controller/admin/columnManage.controller')
const singleList = require('../../controller/admin/singleList.controller')
const listManage = require('../../controller/admin/listManage.controller')
const imgManage = require('../../controller/admin/imageManage.controller')
const friendLinks = require('../../controller/admin/friendshipLink.controller')

// 管理员
router.get('/getUser', controller.getAdminAllData)
router.post('/addUser', controller.postAddAdminData)
router.post('/updateAdminState', controller.updateAdminState)
router.post('/updateAdminPassword', controller.updateAdminPassword)
router.post('/deleteAdmin', controller.deleteAdminInfo)

// 增加网站变量
router.post('/addWebConfig', webConfig.addWebConfig)
// 修改网站变量
router.post('/updateWebConfig', webConfig.updateWebConfig)

// 栏目管理
router.post('/getColumnManageList', columnManage.getColumnManageList)
router.post('/addColumnManager', columnManage.insertColumnManager)
router.post('/updateColumn', columnManage.updateColumnItem)
router.post('/deleteColumnId', columnManage.deleteColumnItemId)
router.get('/findOneColumn', columnManage.findOneColumn)
router.post('/updateColumnState', columnManage.updateColumnState)

// 单页面信息管理
router.get('/singleList', singleList.getSingleList)
router.post('/updateSingle', singleList.updateSingleContent)

// 列表信息管理
router.get('/listInfo', listManage.getManageList)
router.post('/listInfo/add', listManage.insertListManageInfo)
router.post('/listInfo/del', listManage.deleteListManage)

// 图片信息管理
router.get('/imgInfo', imgManage.getImageList)

// 友情链接管理
router.get('/getFriendshipLink', friendLinks.getFriendshipLinkList)
router.post('/deleteFriendLink/delete', friendLinks.deleteFriendLink)
router.post('/addFriendLink', friendLinks.addFriendLink)

module.exports = router
