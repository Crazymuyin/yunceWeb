const columnModel = require('../../lib/admin/columnManage.mysql')
const singleModel = require('../../lib/admin/singleList.mysql')
const checkNotLogin = require('../../middlewares/check').checkNotLogin
const checkLogin = require('../../middlewares/check').checkLogin
const moment = require('moment');
const fs = require('fs')
const utils = require('../../lib/utils/menuTree.utils')

/**
 * 渲染栏目管理首页
 * @param ctx
 * @returns {Promise<void>}
 */
exports.renderColumnManage = async ctx => {
    await checkLogin(ctx)
    await ctx.render('admin.columnManage')
}

/**
 * 渲染添加网站栏目
 * @param ctx
 * @returns {Promise<void>}
 */
exports.renderAddColumn = async ctx => {
    await checkLogin(ctx)
    let id = Number(ctx.params.id)
    await columnModel.readColumnList()
        .then(async (result) => {
            let newArr = []
            let editInfo = {}
            if (id) {
                await columnModel.findOneColumn(id)
                    .then(res => {
                        editInfo = res[0]
                    })
            }
            result.forEach(item => {
                newArr.push({id: item.id, parentId: item.parentid, parentStr: item.parentstr, className: item.classname})
            })
            newArr = utils.convertToTreeData(newArr, 0)
            newArr.unshift({id: 0, parentId: 0, parentStr: '一级栏目', className: '一级栏目'})
            await ctx.render('admin.columnManage.add', {
                newArr,
                editInfo
            })
        })
}

/**
 * 获取网站栏目列表
 * @param ctx
 * @returns {Promise<void>}
 */
exports.getColumnManageList = async ctx => {
    await checkLogin(ctx)
    await columnModel.readColumnList()
        .then(res => {
            ctx.body = {
                code: 0,
                msg: "查询成功",
                count: 924,
                data: res,
                is: true,
                tip: "操作成功！"
            }
        })
}

/**
 * 查询栏目详细
 * @param ctx
 * @returns {Promise<void>}
 */
exports.findOneColumn = async ctx => {
    await checkNotLogin(ctx)
    await columnModel.findOneColumn(id)
        .then(res => {
            ctx.body = {
                code: 200,
                data: res,
                message: '栏目详细成功'
            };
        })
}

/**
 * 新增栏目
 * @param ctx
 * @returns {Promise<*>}
 */
exports.insertColumnManager = async ctx => {
    await checkLogin(ctx)
    let { parentId, parentStr, infoType, className, linkUrl, picUrl, picwidth, picheight, seoTitle, keywords, description, orderId, checkInfo } = ctx.request.body
    if (parentId === '') return ctx.body = {code: 500, message: '请选择所属栏目类型'}
    if (className === '') return ctx.body = {code: 500, message: '请输入栏目名称'}
    if (infoType === '') return ctx.body = {code: 500, message: '请选择所属类型'}
    if (!checkInfo) checkInfo = 1
    if (!orderId) orderId = 1
    await columnModel.findColumnItemByClassName(className)
        .then(async (result) => {
            if (Array.isArray(result) && result.length) {
                return ctx.body = {code: 500, message: '栏目已存在'}
            } else {
                await columnModel.insterColumnItem([Number(parentId), `"${parentStr}"`, Number(infoType), className ? `"${className}"` : '""', linkUrl ? `"${linkUrl}"` : '""',
                    picUrl ? `"${picUrl}"` : '""', picwidth ? `"${picwidth}"` : '""', picheight ? `"${picheight}"` : '""', seoTitle ? `"${seoTitle}"` : '""', keywords ? `"${keywords}"` : '""', description ? `"${description}"` : '""', Number(orderId), Number(checkInfo)])
                    .then(async (res) => {
                        await singleModel.insertSingleContent([res.insertId, -1, '', '', moment().format('YYYY-MM-DD')])
                            .then(list => {
                                ctx.body = {
                                    code: 200,
                                    message: '栏目新增成功'
                                };
                            })
                    })
            }
        })
}

/**
 * 修改栏目详细
 * @param ctx
 * @returns {Promise<*>}
 */
exports.updateColumnItem = async ctx => {
    let {id, parentId, parentStr, infoType, className, linkUrl, picUrl, picwidth, picheight, seoTitle, keywords, description, orderId, checkInfo } = ctx.request.body
    if (parentId === '') return ctx.body = {code: 500, message: '请选择所属栏目类型'}
    if (className === '') return ctx.body = {code: 500, message: '请输入栏目名称'}
    if (infoType === '') return ctx.body = {code: 500, message: '请选择所属类型'}
    if (!checkInfo) checkInfo = 1
    if (!orderId) orderId = 1
    await columnModel.findOneColumn(id)
        .then(async (result) => {
            if (Array.isArray(result) && result.length === 0) {
                return ctx.body = {code: 500, message: '栏目不存在'}
            } else {
                if (infoType !== 0) {
                    await columnModel.findInfoById(id)
                        .then(async (results) => {
                            if (results[0].total) {
                                await columnModel.deleteInfoById(id)
                                    .then(res => {
                                        console.log('success')
                                    })
                            }
                        })
                } else if (infoType === 0) {

                }
                await columnModel.updateColumnItem([Number(parentId), `${parentStr}`, Number(infoType), className ? `${className}` : '', linkUrl ? `${linkUrl}` : '',
                    picUrl ? `${picUrl}` : '', picwidth ? `${picwidth}` : '', picheight ? `${picheight}` : '', seoTitle ? `${seoTitle}` : '', keywords ? `${keywords}` : '', description ? `${description}` : '', Number(orderId), Number(checkInfo)], id)
                    .then(res => {
                        ctx.body = {
                            code: 200,
                            message: '栏目修改成功'
                        };
                    })
            }
        })
}

/**
 * 删除栏目
 * @param ctx
 * @returns {Promise<void>}
 */
exports.deleteColumnItemId = async ctx => {
    let {id, infoType} = ctx.request.body
    await columnModel.deleteColumnItemId(id)
        .then(async (res) => {
            if (infoType === 0) {
                await columnModel.deleteInfoById(id)
                    .then(res => {
                        console.log('success')
                        ctx.body = {
                            code: 200,
                            message: '栏目删除成功'
                        }
                    })
            } else {
                ctx.body = {
                    code: 200,
                    message: '栏目删除成功'
                }
            }
        })
}

exports.updateColumnState = async ctx => {
    let {id, state} = ctx.request.body
    await columnModel.updateColumnStateById(id, state)
        .then(res => {
            ctx.body = {
                code: 200,
                message: '状态修改成功'
            }
        })
}
