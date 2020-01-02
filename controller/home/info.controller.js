const funcUtilsModel = require('../../lib/utils/func.utils')
const setInfo = require('../public/utils.func.controller')
const koaRequest = require('koa2-request')

/**
 * 渲染资讯发现页面
 * @param ctx
 * @returns {Promise<void>}
 */
exports.renderInfoPage = async ctx => {
    let seoInfo = {}
    let bannerList = []
    await funcUtilsModel.getColumnType(2)
        .then(result => {
            if (result.length) {
                seoInfo = result[0]
            }
        })
    let res = await koaRequest({
        url: 'http://10.253.254.20:8088/api/usercenter/siteAdv/imps',
        method: 'get',
        qs: {advObject: 0}
    })
    let resObj = JSON.parse(res.body)
    if (resObj.status === 1) {
        let ids = []
        let title = []
        resObj.data.forEach(item => {
            title.push(item.advTitle)
            ids.push(item.advId)
        })
        resObj.data.forEach(item => {
            item.target = `/infoDetail?advId=${item.advId}&ids=${Buffer.from(ids.join('/')).toString('base64')}&title=${Buffer.from(title.join('/')).toString('base64')}`
        })
        bannerList = resObj.data
    }
    await ctx.render('index.info', {
        header: setInfo.getHeaderHtml(seoInfo.seotitle, seoInfo.keywords, seoInfo.description),
        bannerList: bannerList ? bannerList : []
    })
}

exports.getInfoList = async (ctx, next) => {

    let { page, size } = ctx.query

    let res = await koaRequest({
        url: 'http://10.253.254.20:8088/api/usercenter/siteAdv/commons',
        method: 'get',
        qs: {page: page, size: size, advObject: 0}
    })
    let result = JSON.parse(res.body)
    result.data.forEach(item => {
        let dd = item.advContent.replace(/<\/?.+?>/g,"")
        let desc = dd.replace(/ /g,"")
        item.description = desc.length > 120 ? `${desc.substring(0, 120)}...` : desc
        item.target = `/infoDetail?advId=${item.advId}&title=${Buffer.from(item.advTitle).toString('base64')}`
        if (item.advImgposition === 3) {
            let advImgArr = item.advImgs.split(';')
            let newArr = []
            advImgArr.forEach(list => {
                newArr.push({picUrl: list, target: `/infoDetail?advId=${item.advId}&title=${Buffer.from(item.advTitle).toString('base64')}`})
            })
            item.advImgArr = newArr
        }
    })
    ctx.body = {
        code: 200,
        data: result,
        message: '获取成功'
    }
}
