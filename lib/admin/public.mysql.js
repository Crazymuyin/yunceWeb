const db = require('../mysql')

/**
 * 查询用户是否存在
 * @param username
 * @returns {*}
 */
exports.findUserDataByUserName = (username) => {
    let _sql = `SELECT * FROM yunce_web.admin WHERE username = '${username}';`
    return db.query(_sql)
}
