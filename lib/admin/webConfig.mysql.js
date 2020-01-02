const db = require('../mysql')

// 读取网站默认配置
exports.readWebInfo = () => {
    let _sql = `SELECT id, varname, varinfo, vartype, varvalue FROM yunce_web.webconfig;`
    return db.query(_sql)
}

// 增加变量选项
exports.addWebConfig = (values) => {
    let _sql = `insert into yunce_web.webconfig set varname=?,varinfo=?,vartype=?,varvalue=?;`
    return db.query(_sql, values)
}

// 修改(增加)变量值
exports.updateWebConfig = (values) => {
    let _sql = `UPDATE yunce_web.webconfig SET varvalue=? WHERE id=?;`
    return db.query(_sql, values)
}

// 查询变量是否存在
exports.findWebConfigById = (id) => {
    let _sql = `SELECT COUNT(*) FROM yunce_web.webconfig WHERE id=${id};`
    return db.query(_sql)
}

// 根据变量名称查询变量值
exports.findWebConfigByName = (varname) => {
    let _sql = `SELECT varvalue FROM yunce_web.webconfig WHERE varname="${varname}";`
    return db.query(_sql)
}
