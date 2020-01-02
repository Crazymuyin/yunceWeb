const db = require('../mysql')

/**
 * 获取前端菜单列表
 * @returns {*}
 */
exports.getMenuList = () => {
    let _sql = `SELECT classname, linkurl FROM yunce_web.infoclass WHERE parentid = 0 AND checkinfo = 1;`
    return db.query(_sql)
}

/**
 * 获取网站配置文件
 * @param values
 * @returns {*}
 */
exports.getWebConfig = (values) => {
    let _sql = `SELECT varname, varvalue FROM yunce_web.webconfig WHERE varname IN (${values.toString()});`
    return db.query(_sql)
}
