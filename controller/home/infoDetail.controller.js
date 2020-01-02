const funcUtilsModel = require('../../lib/utils/func.utils')
const setInfo = require('../public/utils.func.controller')
const koaRequest = require('koa2-request')

/**
 * 渲染资讯发现详细页面
 * @param ctx
 * @returns {Promise<void>}
 */
exports.renderInfoPage = async ctx => {

    let { advId, title, ids } = ctx.query
    if (title) title = Buffer.from(title, 'base64').toString()
    if (ids) ids = Buffer.from(ids, 'base64').toString()
    let detailBannerSrc = {}
    let detailInfo = {}
    // 获取banner信息
    await funcUtilsModel.getColumnInfoById('16')
        .then(result => {
            if (Array.isArray(result) && result.length) {
                detailBannerSrc = result[0]
            }
        })
    // 获取第三方资讯发现
    let res = await koaRequest({
        url: `http://10.253.254.20:8088/api/usercenter/siteAdv/getOne`,
        method: 'get',
        qs: {advId: advId}
    })
    let resObj = JSON.parse(res.body)
    if (resObj.status === 1) {
        let adv = resObj.data.adv
        detailInfo.title = adv.advTitle
        detailInfo.content = adv.advContent
        detailInfo.dateTime = adv.advLastUptime
        let pre = resObj.data.pre
        let next = resObj.data.next
        if (!ids) {
            if (pre) {
                detailInfo.pre = {title: pre.advTitle, url: `/infoDetail?advId=${pre.advId}&title=${Buffer.from(pre.advTitle).toString('base64')}`}
            } else {
                detailInfo.pre = ''
            }
            if (next) {
                detailInfo.next = {title: next.advTitle, url: `/infoDetail?advId=${next.advId}&title=${Buffer.from(next.advTitle).toString('base64')}`}
            } else {
                detailInfo.next = ''
            }
        } else {
            let idsArr = ids.split('/')
            let titleArr = title.split('/')
            if (idsArr.indexOf(advId) === 0) {
                detailInfo.pre = ''
            } else {
                detailInfo.pre = {
                    title: titleArr[idsArr.indexOf(advId) - 1],
                    url: `/infoDetail?advId=${idsArr[idsArr.indexOf(advId) - 1]}&ids=${Buffer.from(ids.toString()).toString('base64')}&title=${Buffer.from(title.toString()).toString('base64')}`
                }
            }
            if (idsArr.indexOf(advId) === idsArr.length - 1) {
                detailInfo.next = ''
            } else {
                detailInfo.next = {
                    title: titleArr[idsArr.indexOf(advId) + 1],
                    url: `/infoDetail?advId=${idsArr[idsArr.indexOf(advId) + 1]}&ids=${Buffer.from(ids.toString()).toString('base64')}&title=${Buffer.from(title.toString()).toString('base64')}`
                }
            }
        }
    }
    if (resObj.status === 0) {
        detailInfo.title = '找不到相关信息'
        detailInfo.content = ''
        detailInfo.dateTime = ''
        detailInfo.next = ''
        detailInfo.pre = ''
    }

    await ctx.render('index.infoDetail', {
        header: setInfo.getHeaderHtml(detailInfo.title),
        detailBannerSrc,
        detailInfo
    })
}
