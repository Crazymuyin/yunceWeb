const fs = require('fs')
const path = require('path')
const date = require('silly-datetime')

/**
 * 上传单个文件
 * @param ctx
 * @returns {Promise<void>}
 */
exports.uploadImage = async ctx => {
    const file = ctx.request.files.file
    const reader = fs.createReadStream(file.path)
    const currentDate = date.format(new Date(), 'YYYY-MM-DD')
    let currentPath  = path.join(__dirname, '../../public/upload/') + `${currentDate}`
    await dirExists(currentPath)

    let filePath = `${currentPath}/${file.name}`
    const upStream = fs.createWriteStream(filePath)
    reader.pipe(upStream)
    ctx.body = {
        code: 0,
        msg: '图片上传成功',
        data: {
            src: `/upload/${currentDate}/${file.name}`,
            title: file.name
        }
    }
}

/**
 * 上传多个文件
 * @param ctx
 * @param next
 * @returns {Promise<string>}
 */
exports.uploadFiles = async (ctx, next) => {
    // 上传多个文件
    const files = ctx.request.files.file // 获取上传文件
    for (let file of files) {
        // 创建可读流
        const reader = fs.createReadStream(file.path)
        // 获取上传文件扩展名
        let filePath = path.join(__dirname, '../../public/upload/') + `/${file.name}`
        // 创建可写流
        const upStream = fs.createWriteStream(filePath)
        // 可读流通过管道写入可写流
        reader.pipe(upStream)
    }
    return ctx.body = "上传成功！"
}

/**
 * 读取路径信息
 * @param {string} path 路径
 */
function getStat(path){
    return new Promise((resolve, reject) => {
        fs.stat(path, (err, stats) => {
            if(err){
                resolve(false);
            }else{
                resolve(stats);
            }
        })
    })
}

/**
 * 创建路径
 * @param {string} dir 路径
 */
function mkDir(dir){
    return new Promise((resolve, reject) => {
        fs.mkdir(dir, err => {
            if(err){
                resolve(false);
            }else{
                resolve(true);
            }
        })
    })
}

/**
 * 路径是否存在，不存在则创建
 * @param {string} dir 路径
 */
async function dirExists(dir){
    let isExists = await getStat(dir);
    //如果该路径且不是文件，返回true
    if(isExists && isExists.isDirectory()){
        return true;
    }else if(isExists){     //如果该路径存在但是文件，返回false
        return false;
    }
    //如果该路径不存在
    let tempDir = path.parse(dir).dir;      //拿到上级路径
    //递归判断，如果上级目录也不存在，则会代码会在此处继续循环执行，直到目录存在
    let status = await dirExists(tempDir);
    let mkDirStatus;
    if(status){
        mkDirStatus = await mkDir(dir);
    }
    return mkDirStatus;
}
