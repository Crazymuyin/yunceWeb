const listManageModel = require('../../lib/admin/listManage.mysql')
const checkNotLogin = require('../../middlewares/check.js').checkNotLogin
const checkLogin = require('../../middlewares/check.js').checkLogin
const utils = require('../../lib/utils/menuTree.utils')
const moment = require('moment');

/**
 * 渲染列表首页
 * @param ctx
 * @returns {Promise<void>}
 */
exports.renderListManage = async (ctx) => {
    await checkLogin(ctx)
    await listManageModel.findColumnList()
        .then(async (result) => {
            let newArr = []
            result.forEach(item => {
                newArr.push({id: item.id, parentId: item.parentid, parentStr: item.parentstr, className: item.classname, infoType: item.infotype})
            })
            let columnList = utils.convertToTreeData(newArr, 0)
            await ctx.render('admin.listManage', {
                columnList
            })
        })
}

/**
 * 渲染增加详细信息页面
 * @param ctx
 * @returns {Promise<void>}
 */
exports.renderAddListInfo = async ctx => {
    await listManageModel.findColumnList()
        .then(async (result) => {
            let newArr = []
            result.forEach(item => {
                newArr.push({id: item.id, parentId: item.parentid, parentStr: item.parentstr, className: item.classname, infoType: item.infotype})
            })
            let columnList = utils.convertToTreeData(newArr, 0)
            await ctx.render('admin.listManage.add', {
                columnList
            })
        })
}

/**
 * 渲染编辑页面
 * @param ctx
 * @returns {Promise<void>}
 */
exports.renderUpdateListInfo = async ctx => {
    let { id } = ctx.params
    let editInfo = {}
    let pageInfo = {}
    if (!id) ctx.body = {code: 500, message: 'id不能为空'}
    await listManageModel.findColumnList()
        .then(async (result) => {
            let newArr = []
            result.forEach(item => {
                newArr.push({id: item.id, parentId: item.parentid, parentStr: item.parentstr, className: item.classname, infoType: item.infotype})
            })
            let columnList = utils.convertToTreeData(newArr, 0)
            await listManageModel.findListDetailById(id)
                .then(res => {
                    editInfo = res[0]
                })
            await ctx.render('admin.listManage.edit', {
                columnList,
                editInfo,
                pageInfo
            })
        })
}

/**
 * 渲染预览页面
 * @param ctx
 * @returns {Promise<void>}
 */
exports.renderDetailListInfo = async ctx => {
    let { id } = ctx.params
    let editInfo = {}
    if (!id) ctx.body = {code: 500, message: 'id不能为空'}
    await listManageModel.findColumnList()
        .then(async (result) => {
            await listManageModel.findListDetailById(id)
                .then(res => {
                    editInfo = res[0]
                })
            await ctx.render('admin.listManage.detail', {
                editInfo
            })
        })
}

/**
 * 列表获取
 * @param ctx
 * @returns {Promise<void>}
 */
exports.getManageList = async ctx => {
    let count = 0
    let { page, limit, classId } = ctx.request.query
    await listManageModel.findListManageCount()
        .then(res => {
            count = res[0].total
        })
    await listManageModel.findListManageInfo(classId, page, limit)
        .then(res => {
            ctx.body = {
                code: 0,
                msg: "获取成功",
                count: count,
                data: res
            }
        })
}

/**
 * 新增
 * @param ctx
 * @returns {Promise<void>}
 */
exports.insertListManageInfo = async ctx => {
    let {classId, parentId, title, source, author, linkUrl, keywords, description, content, picUrl, hits, orderId, postTime, checkInfo} = ctx.request.body
    if (!source) source = '澜极云数'
    if (!author) author = '澜极云数'
    if (!hits) hits = 0
    if (!orderId) orderId = 1
    if (!postTime) postTime = moment().format('YYYY-MM-DD')
    if (checkInfo === '') checkInfo = 1
    await listManageModel.insertListInfo([Number(classId), Number(parentId),
        `'${title}'`, `'${source}'`, `'${author}'`, `'${linkUrl}'`, `'${keywords}'`, `'${description}'`, `'${content}'`,
        `'${picUrl}'`, Number(hits), Number(orderId), `'${postTime}'`, Number(checkInfo)])
        .then(res => {
            ctx.body = {
                code: 200,
                data: res,
                message: '列表信息添加成功'
            }
        })
}

/**
 * 删除信息
 * @param ctx
 * @returns {Promise<void>}
 */
exports.deleteListManage = async ctx => {
    let { id } = ctx.request.body
    if (!id) ctx.body = {code: 500, message: 'id不能为空'}
    await listManageModel.deleteListManageById(id)
        .then(res => {
            ctx.body = {
                code: 200,
                message: '删除成功',
                data: res
            }
        })
}
