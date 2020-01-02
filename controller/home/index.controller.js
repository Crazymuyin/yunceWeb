const funcUtilsModel = require('../../lib/utils/func.utils')
const setInfo = require('../public/utils.func.controller')
const defaultInfo = require('../../config/defaultConfig')

/**
 * 渲染网站首页
 * @param ctx
 * @returns {Promise<void>}
 */
exports.renderIndexPage = async ctx => {
    let seoInfo = {}
    let product = defaultInfo.getProduct()
    let solve = defaultInfo.getSolve()
    let application = defaultInfo.getApplication()
    let service = defaultInfo.getFunction()
    let core = defaultInfo.getCore()
    let videoSrc = defaultInfo.getVedioSrc()

    // 读取栏目seo信息
    await funcUtilsModel.getColumnType(1)
        .then(result => {
            if (result.length) {
                seoInfo = result[0]
            }
        })
    // 产品简介 栏目调用(单页面)
    await funcUtilsModel.getColumnInfoById(4)
        .then(result => {
            if (Array.isArray(result) && result.length) {
                product = result[0]
            }
        })
    // 解决问题
    await funcUtilsModel.getColumnInfoById(13)
        .then(result => {
            if (Array.isArray(result) && result.length) {
                solve = result[0]
            }
        })
    // banner 视频
    await funcUtilsModel.getColumnInfoById(15)
        .then(result => {
            if (Array.isArray(result) && result.length) {
                videoSrc = result[0]
            }
        })
    // 应用场景(列表)
    await funcUtilsModel.getColumnInfoListById(5, 9)
        .then(async (result) => {
            await funcUtilsModel.getFindColumnInfoById(5)
                .then(res => {
                    if (Array.isArray(res) && res.length) {
                        application.className = res[0]
                    }
                    application.app = result
                })
        })
    // 功能服务
    await funcUtilsModel.getColumnInfoListById(7, 7)
        .then(async (result) => {
            await funcUtilsModel.getFindColumnInfoById(7)
                .then(res => {
                    if (Array.isArray(res) && res.length) {
                        service.className = res[0]
                    }
                    service.app = result
                })
        })
    // 核心技术
    await funcUtilsModel.getColumnInfoListById(8, 4)
        .then(async (result) => {
            await funcUtilsModel.getFindColumnInfoById(8)
                .then(res => {
                    if (Array.isArray(res) && res.length) {
                        core.className = res[0]
                    }
                    core.app = result
                })
        })
    await ctx.render('index', {
        header: setInfo.getHeaderHtml(seoInfo.seotitle, seoInfo.keywords, seoInfo.description),
        videoSrc,
        product,
        solve,
        application,
        service,
        core
    })
}
