const db = require('../mysql')

/**
 * 获取单页面内容、图片链接、栏目名称、栏目描述
 * @param id
 */
exports.getColumnInfoById = (id) => {
    let _sql = `SELECT classid, picurl, content, (SELECT classname FROM yunce_web.infoclass WHERE id = classid) AS classname, (SELECT keywords FROM yunce_web.infoclass WHERE id = classid) AS keywords, (SELECT description FROM yunce_web.infoclass WHERE id = classid) AS description FROM yunce_web.info WHERE id = ${id};`
    return db.query(_sql)
}

/**
 * 单独查询栏目对应信息
 * @param id
 * @returns {*}
 */
exports.getFindColumnInfoById = (id) => {
    let _sql = `SELECT classname, description FROM yunce_web.infoclass WHERE id in (${id});`
    return db.query(_sql)
}

/**
 * 读取列表内容、图片链接、栏目名称等信息
 * @param id
 * @returns {*}
 */
exports.getColumnInfoListById = (id, limit) => {
    let _sql = `SELECT title, keywords, description, picurl, content FROM yunce_web.infolist WHERE classid = ${id} AND checkinfo = 1 limit 0, ${limit};`
    return db.query(_sql)
}

/**
 * 获取栏目类别
 * @param cid 当前页面栏目id
 * @returns {*}
 */
exports.getColumnType = (cid) => {
    let _sql = `SELECT * FROM yunce_web.infoclass WHERE id=${cid};`
    return db.query(_sql)
}

/**
 * 获取栏目信息
 * @param tbName 表名
 * @param id 是否为内容页(非0即是)
 */
exports.getColumnInfo = (tbName, id) => {
    let _sql = `SELECT * FROM ${tbName} WHERE id=${id}`
    return db.query(_sql)
}
