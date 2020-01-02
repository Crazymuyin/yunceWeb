const webConfigModel = require('../../lib/admin/webConfig.mysql')
const checkNotLogin = require('../../middlewares/check.js').checkNotLogin
const checkLogin = require('../../middlewares/check.js').checkLogin

/**
 * 渲染网站信息配置首页Render
 * @param ctx
 * @returns {Promise<void>}
 */
exports.renderWebInfo = async ctx => {
    await checkLogin(ctx)
    await ctx.render('admin.webInfo')
}

/**
 * 读取基本配置文件项列表
 * @param ctx
 * @returns {Promise<void>}
 */
exports.readWebInfo = async ctx => {
    await webConfigModel.readWebInfo()
        .then(async (webInfoList) => {
            await ctx.render('admin.webInfo.basicSet', {
                webInfoList
            })
        })
}

/**
 * 增加新变量Render
 * @param ctx
 * @returns {Promise<void>}
 */
exports.renderWebAddSet = async (ctx) => {
    await ctx.render('admin.webInfo.addSet')
}

/**
 * 增加变量类型
 * @param ctx
 * @returns {Promise<*>}
 */
exports.addWebConfig = async (ctx) => {
    let { addName, addDesc, type, addValue } = ctx.request.body
    if(!addName) return ctx.body = {code: 500, message: '变量名称不能为空'};
    if(!addDesc) return ctx.body = {code: 500, message: '参数说明不能为空'};
    if(type === '') return ctx.body = {code: 500, message: '变量类型不能为空'};
    await webConfigModel.findWebConfigByName(addName)
        .then(async (res) => {
            if (Array.isArray(res) && res.length >= 1) {
                ctx.body = {
                    code: 500,
                    message: '该变量已经存在'
                }
                return false
            } else {
                await webConfigModel.addWebConfig([addName, addDesc, type, addValue])
                    .then(res => {
                        ctx.body = {
                            code: 200,
                            message: '变量添加成功'
                        }
                    })
            }
        })
}

exports.updateWebConfig = async ctx => {
    let { id, addValue } = ctx.request.body
    if (!id) ctx.body = {code: 500, message: 'ID不能为空'}
    await webConfigModel.updateWebConfig([addValue, id])
        .then(res => {
            ctx.body = {
                code: 200,
                message: '配置信息修改成功'
            }
        })
}

