const db = require('../mysql')

/**
 * 查询栏目名称
 */
exports.findColumnList = () => {
    let _sql = `SELECT id, parentid, parentstr, infotype, classname FROM yunce_web.infoclass WHERE checkinfo = 1;`
    return db.query(_sql)
}

/**
 * 查询单条详细
 * @param id
 * @returns {*}
 */
exports.findListDetailById = (id) => {
    let _sql = `SELECT *, (SELECT classname FROM yunce_web.infoclass WHERE id=classid) as classname FROM yunce_web.infolist WHERE id=${id}`
    return db.query(_sql)
}

/**
 * 新增列表信息
 * @param values
 * @returns {*}
 */
exports.insertListInfo = (values) => {
    let _sql = `INSERT INTO yunce_web.infolist (classid, parentid, title, source, author, linkurl, keywords, description, content, picurl, hits, orderid, posttime, checkinfo) VALUES (${values}) on duplicate KEY UPDATE 
    classid=${values[0]}, parentid=${values[1]}, title=${values[2]}, source=${values[3]}, author=${values[4]}, linkurl=${values[5]}, keywords=${values[6]}, 
    description=${values[7]}, content=${values[8]}, picurl=${values[9]}, hits=${values[10]}, orderid=${values[11]}, posttime=${values[12]}, 
    checkinfo=${values[13]};`
    return db.query(_sql)
}

/**
 * 查询列表信息
 * @param classId
 * @returns {*}
 */
exports.findListManageInfo = (classId, page, limit) => {
    let _sql
    if (classId) {
        _sql = `SELECT id, title, classid, description, hits, author, posttime, (SELECT classname FROM yunce_web.infoclass WHERE id = classid) AS classname FROM yunce_web.infolist WHERE classid = ${classId} ORDER BY id DESC limit ${(page-1)*limit}, ${limit};`
    } else {
        _sql = `SELECT id, title, classid, description, hits, author, posttime, (SELECT classname FROM yunce_web.infoclass WHERE id = classid) AS classname FROM yunce_web.infolist ORDER BY id DESC limit ${(page-1)*limit}, ${limit};`
    }
    return db.query(_sql)
}

/**
 * 查询总条数
 * @param classId
 * @returns {*}
 */
exports.findListManageCount = (classId) => {
    let _sql
    if (classId) {
        _sql = `SELECT count(id) as total FROM yunce_web.infolist WHERE classid = ${classId};`
    } else {
        _sql = `SELECT count(id) as total FROM yunce_web.infolist;`
    }
    return db.query(_sql)
}

/**
 * 删除列表信息
 * @param id
 * @returns {*}
 */
exports.deleteListManageById = (id) => {
    let _sql = `DELETE FROM yunce_web.infolist WHERE id=${id};`
    return db.query(_sql)
}
