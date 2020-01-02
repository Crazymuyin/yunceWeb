const db = require('../mysql')

/**
 * 读取栏目数据
 * @returns {*}
 */
exports.readColumnList = () => {
    let _sql = `SELECT * FROM yunce_web.infoclass;`
    return db.query(_sql)
}

/**
 * findColumnInfo
 * @param id
 * @returns {*}
 */
exports.findOneColumn = (id) => {
    let _sql = `SELECT * FROM yunce_web.infoclass WHERE id=${id};`
    return db.query(_sql)
}

/**
 * 增加栏目
 * @param values
 * @returns {*}
 */
exports.insterColumnItem = (values) => {
    let _sql = `INSERT INTO yunce_web.infoclass (parentid, parentstr, infotype, classname, linkurl, picurl, picwidth, picheight, seotitle, keywords, description, orderid, checkinfo) VALUES(${values.toString()});`
    return db.query(_sql)
}

/**
 * 改栏目信息
 * @param values
 * @returns {*}
 */
exports.updateColumnItem = (values, id) => {
    let _sql = `UPDATE yunce_web.infoclass SET parentid=?, parentstr=?, infotype=?, 
     classname=?, linkurl=?, picurl=?, picwidth=?, picheight=?, seotitle=?, keywords=?, description=?, orderid=?, checkinfo=? WHERE id=${id};`
    return db.query(_sql, values)
}

/**
 * 删除栏目名称
 * @param id
 * @returns {*}
 */
exports.deleteColumnItemId = (id) => {
    let _sql = `DELETE FROM yunce_web.infoclass WHERE id=${id};`
    return db.query(_sql)
}

/**
 * 查询栏目是否存在
 * @param parentstr
 * @returns {*}
 */
exports.findColumnItemByClassName = (classname) => {
    let _sql = `SELECT id, parentstr FROM yunce_web.infoclass WHERE classname="${classname}"`
    return db.query(_sql)
}

exports.updateColumnStateById = (id, state) => {
    let _sql = `UPDATE yunce_web.infoclass SET checkinfo=${state} WHERE id=${id};`
    return db.query(_sql)
}

exports.deleteInfoById = (id) => {
    let _sql = `DELETE FROM yunce_web.info WHERE id=${id};`
    return db.query(_sql)
}

exports.findInfoById = (id) => {
    let _sql = `SELECT count(id) as total FROM yunce_web.info WHERE id=${id}`
    return db.query(_sql)
}
