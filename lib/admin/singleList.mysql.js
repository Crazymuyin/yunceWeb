const db = require('../mysql')

/**
 * 查询单页面对应栏目
 */
exports.readSingleList = () => {
    let _sql = `SELECT *, (SELECT classname FROM yunce_web.infoclass WHERE id=classid) as classname FROM yunce_web.info ORDER BY id DESC;`
    return db.query(_sql)
}

/**
 * 新增单页面内容
 * @param values
 * @returns {*}
 */
exports.insertSingleContent = (values) => {
    let _sql = `INSERT INTO yunce_web.info set classid=?, mainid=?, picurl=?, content=?, posttime=?;`
    return db.query(_sql, values)
}

/**
 * 修改单页面内容
 * @param values
 * @param id
 * @returns {*}
 */
exports.updateSingleContentById = (values, id) => {
    let _sql = `UPDATE yunce_web.info SET picurl=?, content=?, posttime=?, mainId=? WHERE id=${id};`
    return db.query(_sql, values)
}

/**
 * 查询栏目内容是否存在
 * @param id
 * @returns {*}
 */
exports.findSingleById = (id) => {
    let _sql = `SELECT * FROM yunce_web.info WHERE id=${id};`
    return db.query(_sql)
}
