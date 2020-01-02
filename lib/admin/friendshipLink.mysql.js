const db = require('../mysql')

//查询友情链接总条数
exports.findFriendLinkCount = () => {
    let _sql = `SELECT COUNT(0) AS total FROM links;`
    return db.query(_sql)
}

//查询友情链接
exports.readFriendLinkList = () => {
    let _sql = `SELECT * FROM yunce_web.links;`
    return db.query(_sql)
}

// 删除友情链接
exports.deleteFriendLinkById = (id) => {
    let _sql = `DELETE FROM yunce_web.links WHERE id=${id};`
    return db.query(_sql)
}

// 删除友情链接
exports.addFriendLink = (values) => {
    // let _sql = `INSERT INTO yunce_web.links set webname=?, picurl=?, linkurl=?, posttime=?, checkinfo=?;`
    // return db.query(_sql, values)
    let _sql = `INSERT INTO yunce_web.links (webname, picurl, linkurl, posttime, checkinfo)
    VALUES (${values}) on duplicate KEY UPDATE webname=${values[0]}, picurl=${values[1]},
    linkurl=${values[2]}, posttime=${values[3]}, checkinfo=${values[4]};`
    return db.query(_sql)
}
