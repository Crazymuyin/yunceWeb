const singleModel = require('../../lib/admin/singleList.mysql')
const checkNotLogin = require('../../middlewares/check').checkNotLogin
const checkLogin = require('../../middlewares/check').checkLogin
const moment = require('moment');

/**
 * 渲染单页面信息管理
 * @param ctx
 * @returns {Promise<void>}
 */
exports.renderSingleList = async ctx => {
    await checkLogin(ctx)
    await ctx.render('admin.singlePageManage')
}

/**
 * 渲染单页面管理编辑页面
 * @param ctx
 * @returns {Promise<void>}
 */
exports.renderSingleEditPage = async ctx => {
    let {id, className} = ctx.params
    await singleModel.findSingleById(id)
        .then(async (pageInfo) => {
            pageInfo = pageInfo[0]
            await ctx.render('admin.singlePageEdit', {
                id,
                className,
                pageInfo
            })
        })
}

/**
 * 单页面信息管理列表数据
 * @param ctx
 * @returns {Promise<void>}
 */
exports.getSingleList = async ctx => {
    await singleModel.readSingleList()
        .then(async (result) => {
            let singleList = {
                code: 0,
                msg: "数据获取成功",
                count: 10,
                data: result
            }
            ctx.body = singleList
        })
}

/**
 * 增加单页面内容
 * @param ctx
 * @returns {Promise<{code: number, message: string}>}
 */
exports.updateSingleContent = async ctx => {
    let {id, mainId, imagePath, content, postTime} = ctx.request.body
    let currentDate = moment().format('YYYY-MM-DD')
    if (!content) return ctx.body = {code: 500, message: "内容不能为空"}
    await singleModel.updateSingleContentById([imagePath, content, postTime ? postTime : currentDate , mainId], id)
        .then(res => {
            ctx.body = {
                code: 200,
                message: "内容修改成功"
            }
        })
}
