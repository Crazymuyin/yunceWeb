const funcUtilsModel = require('../../lib/utils/func.utils')
const setInfo = require('../public/utils.func.controller')
const defaultInfo = require('../../config/defaultConfig')

/**
 * 渲染关于我们
 * @param ctx
 * @returns {Promise<void>}
 */
exports.renderInfoPage = async ctx => {
    let seoInfo = {}
    let banner = defaultInfo.getAboutBanner()
    let aboutInfo = defaultInfo.getAboutInfo()
    let concept = defaultInfo.getAboutCloud()
    let honer = defaultInfo.getAboutHonor()

    // 读取栏目seo信息
    await funcUtilsModel.getColumnType(3)
        .then(result => {
            if (result.length) {
                seoInfo = result[0]
            }
        })

    // 公司简介
    await funcUtilsModel.getColumnInfoById(9)
        .then(result => {
            if (Array.isArray(result) && result.length) {
                aboutInfo = result[0]
            }
        })
    // banner
    await funcUtilsModel.getColumnInfoById(14)
        .then(result => {
            if (Array.isArray(result) && result.length) {
                banner = result[0]
            }
        })

    // 云测理念
    await funcUtilsModel.getColumnInfoListById(10, 4)
        .then(async(result) => {
        await funcUtilsModel.getFindColumnInfoById(10)
            .then(res => {
                concept.list = result
                if (Array.isArray(res) && res.length) {
                    concept.title = res[0]
                }
            })
        })

    await funcUtilsModel.getColumnInfoListById(11, 2)
        .then(async(result) => {
        await funcUtilsModel.getFindColumnInfoById(11)
            .then(res => {
                honer.list = result
                if (Array.isArray(res) && res.length) {
                    honer.title = res[0]
                }
            })
        })
    await ctx.render('index.about', {
        header: setInfo.getHeaderHtml(seoInfo.seotitle, seoInfo.keywords, seoInfo.description),
        aboutInfo,
        banner,
        concept,
        honer
    })
}
