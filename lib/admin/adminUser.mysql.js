const db = require('../mysql')

// 查询用户表总条数
exports.findAdminCountById = () => {
    let _sql = `SELECT COUNT(0) AS total FROM admin;`
    return db.query(_sql)
}

// 查询admin
exports.readAllAdmin = (page) => {
    let _sql = `select * from admin limit ${(page-1)*10}, 10;`
    return db.query( _sql)
}

// 注册用户
exports.insertAdminData = ( value ) => {
    let _sql = "insert into admin set username=?,password=?,nickname=?,checkadmin=1,logintime=?;"
    return db.query( _sql, value )
}
// 删除用户
exports.deleteUserData = ( id ) => {
    let _sql = `delete from admin where id=${id};`
    return db.query( _sql )
}

// 修改用户状态
exports.updateUserState = (state, id) => {
    let _sql = `UPDATE yunce_web.admin SET checkadmin=${state} WHERE id=${id};`;
    return db.query(_sql)
}

// 修改用户密码
exports.updateUserPassword = (password, id) => {
    let _sql = `UPDATE yunce_web.admin SET password=${password} WHERE id=${id};`
    return db.query(_sql)
}

// 查找用户
exports.findAdminData = ( username ) => {
    let _sql = `select count(0) as total from admin where username="${username}";`
    return db.query( _sql )
}
