const publicModel = require('../../lib/admin/public.mysql')
const md5 = require('md5')
const checkNotLogin = require('../../middlewares/check.js').checkNotLogin
const checkLogin = require('../../middlewares/check.js').checkLogin

/**
 * 渲染登录页面
 * @param ctx
 * @returns {Promise<void>}
 */
exports.renderLoginPage = async ctx => {
    await ctx.render('login', {
        session: ctx.session
    })
}

/**
 * 管理员登录
 * @param ctx
 * @returns {Promise<void>}
 */
exports.postLoginIn = async ctx => {
    console.log(ctx.request.body)
    let { name, password } = ctx.request.body
    await publicModel.findUserDataByUserName(name)
        .then(result => {
            if (Array.isArray(result) && result.length && result[0].username === name && result[0].password === md5(password)) {
                ctx.session = {
                    user: result[0].username,
                    nickname: result[0].nickname,
                    id: result[0].id
                }
                ctx.body = {
                    code: 200,
                    message: '登录成功'
                }
            } else {
                ctx.body = {
                    code: 500,
                    message: '用户名或密码错误'
                }
            }
        }).catch(error => {
            console.log(error)
        })
}

exports.logout = async ctx => {
    ctx.session = null
    console.log('登出成功')
    ctx.body = true
}
