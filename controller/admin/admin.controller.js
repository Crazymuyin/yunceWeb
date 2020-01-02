const adminModel = require('../../lib/admin/adminUser.mysql')
const md5 = require('md5')
const checkNotLogin = require('../../middlewares/check.js').checkNotLogin
const checkLogin = require('../../middlewares/check.js').checkLogin
const moment = require('moment');

/**
 * 渲染首页
 * @param ctx
 * @returns {Promise<void>}
 */
exports.readerAdminHome = async ctx => {
    await checkLogin(ctx)
    await ctx.render('admin')
}

/**
 * 渲染admin 管理页面
 * @param ctx
 * @returns {Promise<void>}
 */
exports.renderAdminPage = async ctx => {
    await checkLogin(ctx)
    await ctx.render('admin.manager')
}

/**
 * 渲染管理添加界面
 * @param ctx
 * @returns {Promise<void>}
 */
exports.renderAddManage = async ctx => {
    await checkLogin(ctx)
    await ctx.render('admin.manager.addManager')
}

/**
 * 管理员列表
 * @param ctx
 * @returns {Promise<void>}
 */
exports.getAdminAllData = async ctx => {
    let result
    let total
    let { page } = ctx.request.query
    await adminModel.findAdminCountById()
        .then(result => {
            total = result[0].total
        })
    await adminModel.readAllAdmin(page)
        .then(res => {
            result = res
        })
    ctx.body = {
        code: 0,
        msg: "数据读取成功",
        count: total,
        data: result
    }
}

/**
 * 添加管理员
 * @param ctx
 * @returns {Promise<{code: number, message: string}>}
 */
exports.postAddAdminData = async ctx => {
    let { username, password, nickname } = ctx.request.body
    if(!username) return ctx.body = {code: 500, message: '用户名不能为空'};
    await adminModel.findAdminData(username)
        .then(async (result) => {
            if(result[0].total >= 1) {
                ctx.body = {
                    code: 500,
                    message: '用户存在'
                };
                return false
            } else if (password === '') {
                password = 123456
            } else {
                await adminModel.insertAdminData([username, md5(password), nickname, moment().format('YYYY-MM-DD')])
                    .then(res => [
                        ctx.body = {
                            code: 200,
                            message: '注册成功'
                        }
                    ])
            }
        })
}

/**
 * 修改账户状态
 * @param ctx
 * @returns {Promise<void>}
 */
exports.updateAdminState = async ctx => {
    let { id, state } = ctx.request.body
    if (id === '') {
        ctx.body = {code: 500, message: 'ID不能为空'}
        return
    }
    if (state === '') {
        ctx.body = {code: 500, message: '状态不能为空'}
        return
    }
    await adminModel.updateUserState(Number(state), Number(id))
        .then(result => {
            ctx.body = {
                code: 200,
                message: "状态修改成功"
            }
        })
}

/**
 * 修改密码
 * @param ctx
 * @returns {Promise<{code: number, message: string}>}
 */
exports.updateAdminPassword = async ctx => {
    let { id, password } = ctx.request.body
    if (!password) return ctx.body = {code: 500, message: "密码不能我空"}
    await adminModel.updateUserPassword(md5(password), Number(id))
        .then(result => {
            ctx.body = {
                code: 200,
                message: "密码修改成功"
            }
        })
}

/**
 * 用户删除
 * @param ctx
 * @returns {Promise<{code: number, message: string}>}
 */
exports.deleteAdminInfo = async ctx => {
    let { id } = ctx.request.body
    if (!id) return ctx.body = {code: 500, message: "ID不能我空"}
    await adminModel.deleteUserData(id)
        .then(res => {
            ctx.body = {
                code: 200,
                message: "用户删除成功"
            }
        })
}
