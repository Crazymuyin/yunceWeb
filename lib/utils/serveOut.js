const koaRequest = require('koa2-request')               //koa封装的请求第三方接口的方法
var resData = {
    token: '6caad2f73e5977948de7937af924cca7',
    start: 0,
    count: 10
}
module.exports = function () {
    return async function (ctx, next) {
        //koa封装的请求第三方接口的方法(koa2-request)
        let res = await koaRequest({
            url: 'http://api.douban.com/v2/movie/top250',
            method: 'get',
            qs: {
                start: 25,
                count: 2
            }
        });
        let res1 = await koaRequest({
            url: 'localhost:3030/test',
            method: 'post',
            form: resData
        })
        console.log(JSON.parse(res.body),JSON.parse(res1.body))
        await next()
    }
}

// let http = require('http')
// let qs = require('querystring')
//
// let getJsonData = async (page, size, advObject, fn) => {
//     let params = {
//         page: page,
//         size: size,
//         advObject: advObject
//     }
//     params = qs.stringify(params)
//     let httpRequest = {
//         host: '10.253.254.20',
//         port: 8088,
//         path: `/api/usercenter/siteAdv/commons?${params}`,
//     }
//     await http.request(httpRequest, function (_res) {
//         var content = ''
//         _res.setEncoding('utf-8')
//         _res.on('data', function(chunk) {
//             content += chunk
//         })
//         _res.on('end',function(){
//             return fn(null, content)
//         })
//     }).end()
// }
//
// let getSearchData = () => {}
//
// module.exports = {
//     getJsonData: getJsonData
// }
