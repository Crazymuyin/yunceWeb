const friendshipLinkModel = require('../../lib/admin/friendshipLink.mysql')
const checkNotLogin = require('../../middlewares/check.js').checkNotLogin
const checkLogin = require('../../middlewares/check.js').checkLogin
const moment = require('moment')

/**
 * 渲染友情链接首页
 * @param ctx
 * @returns {Promise<void>}
 */
exports.renderFriendLink = async (ctx) => {
    await checkLogin(ctx)
    await ctx.render('admin.friendshipLink')
}

exports.renderFriendLinkAdd = async ctx => {
    await ctx.render('admin.friendshipLink.add')
}

/**
 * 读取友情链接列表
 * @param ctx
 * @returns {Promise<void>}
 */
exports.getFriendshipLinkList = async ctx => {
    let result
    let total
    let { page } = ctx.request.query
    await friendshipLinkModel.findFriendLinkCount()
        .then(result => {
            total = result[0].total
        })
    await friendshipLinkModel.readFriendLinkList(page)
        .then(res => {
            result = res
        })

    ctx.body = {
        code: 0,
        msg: "数据读取成功",
        total: total,
        data: result
    }
}

/**
 * 删除友情链接
 * @param ctx
 * @returns {Promise<void>}
 */
exports.deleteFriendLink = async ctx => {
    let { id } = ctx.request.body
    if (!id) ctx.body = {code: 500, message: 'id不能为空'}
    await friendshipLinkModel.deleteFriendLinkById(id)
        .then(result => {
            ctx.body = {
                code: 200,
                message: '删除成功'
            }
        })
}

/**
 * 添加友情链接
 * @param ctx
 * @returns {Promise<void>}
 */
exports.addFriendLink = async ctx => {
    let { webName, picUrl, linkUrl } = ctx.request.body
    let postTime = moment().format('YYYY-MM-DD')
    let checkInfo = 1
    await friendshipLinkModel.addFriendLink([`'${webName}'`, `'${picUrl}'`, `'${linkUrl}'`, `'${postTime}'`, Number(checkInfo)])
        .then(res => {
            ctx.body = {
                code: 200,
                data: res,
                message: '友情链接添加成功'
            }
        })
}
