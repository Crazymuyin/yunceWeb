/**
 * 栏目SEO头部调用
 * @param cid
 * @param id
 */
exports.getHeaderHtml = (...args) => {
    if (!args[0]) args[0] = `云测-您的网信安全健康保障秘器 测声誉、测风险、测舆情`
    if (!args[1]) args[1] = `云测,测声誉,测风险,测舆情,中正舆情,网络舆情,舆情监测,个人网信健康,声誉风险,舆情,舆情管理`
    if (!args[2]) args[2] = `“云测”是澜极智谷/中正舆情机构旗下平台型手机端应用产品，核心致力于个人互联网信息安全测评与网络健康管理。云测以“澜极大脑”大数据云AI平台为基础，通过大数据采集，大数据分析，数据挖掘，语义分析、信源追溯等深度学习模型仿真等技术，并依托公司在互联网舆情行业的多年业务沉淀，为党政企事业单位领导干部及管理者、演（文）艺工作者、其他社会类精英人士提供集网络声誉测评、风险数据查询、风险预警、危机应对等功能于一体的个人端网络健康解决方案。`
    let titleHtml = `<title>${args[0]}</title>`
    let authorHtml = `    <meta name="author" content="${args[3] ? args[3] : 'shmily、muyin'}" />`
    let keywordsHtml = `    <meta name="keywords" content="${args[1]}" />`
    let descriptionHtml = `    <meta name="description" content="${args[2]}" />`
    return `${titleHtml}\n${authorHtml}\n${keywordsHtml}\n${descriptionHtml}`
}
