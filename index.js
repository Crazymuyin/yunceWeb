const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
const views = require('koa-views')
const path = require('path')
const static = require('koa-static')

const bodyParser = require('koa-bodyparser');
const session = require('koa-session-minimal')
const MysqlStore = require('koa-mysql-session')
const config = require('./config/default')
const staticCache = require('koa-static-cache')

const koaBody = require('koa-body')
const homeModel = require('./lib/home/home.mysql')

const staticPath = '/static'

// session存储配置
const sessionMysqlConfig = {
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE,
    host: config.database.HOST,
}

// 配置session中间件
app.use(session({
    key: 'USER_SID',
    store: new MysqlStore(sessionMysqlConfig)
}))

app.use(koaBody({
    multipart: true,
    formidable: {
        maxFileSize: 200*1024*1024    // 设置上传文件大小最大限制，默认2M
    }
}))

// 缓存
app.use(staticCache(path.join(__dirname, './public'), { dynamic: true }, {
    maxAge: 365 * 24 * 60 * 60
}))
app.use(staticCache(path.join(__dirname, './images'), { dynamic: true }, {
    maxAge: 365 * 24 * 60 * 60
}))

app.use(bodyParser());
// app.use(static(
//     path.join(__dirname, staticPath)
// ))
app.use(static(__dirname + '/static'))
app.use(static(__dirname + '/public'))
// 配置服务端模板渲染引擎中间件
app.use(views(path.join(__dirname, './views'), {
    extension: 'ejs'
}))
app.use(bodyParser({
    formLimit: '1mb'
}))

let adminMenuArr = [[{ name: "管理员管理", url: "/admin/manager", target: "openWeb" }, { name: "网站信息配置", url: "/admin/webInfo", target: "openWeb" }], [{ name: "栏目管理", url: "/admin/columnManage", target: "openWeb" }, { name: "单页信息管理", url: "/admin/singlePageManage", target: "openWeb" }, { name: "列表信息管理", url: "/admin/listManage", target: "openWeb" }], [{ name: "友情链接管理", url: "/admin/friendshipLink", target: "openWeb" }]]
let homeMenuArr = []
let contact = {}

getHomeMenu()

async function getHomeMenu() {
    await homeModel.getMenuList()
        .then(res => {
            if (Array.isArray(res) && res.length) {
                homeMenuArr = res
            } else {
                homeMenuArr = [{ classname: '首页', linkurl: '/' }, { classname: '资讯发现', linkurl: '/info' }, { classname: '关于我们', linkurl: '/adout' }]
            }
        })

    let params = ['"copyRight"', '"bjPhone"', '"cdPhone"', '"email"', '"cdAddress"', '"bjAddress"']
    await homeModel.getWebConfig(params)
        .then(res => {
            if (Array.isArray(res) && res.length) {
                res.forEach(item => {
                    contact[item.varname] = item.varvalue
                })
            } else {
                contact = {copyRight:"Copyright © 2015 - 2018 phpMyWind.com All Rights Reserved",bjPhone:"010-62102099",cdPhone:"028-87333240",email:"zzyuqing@yuqingol.com",cdAddress:"成都市武侯区西物慧鼎A座3层",bjAddress:"北京市海淀区中关村大街E世界财富中心C座9层"}
            }
        })
}

// 公共数据，每个路由里面都要该数据
app.use(async (ctx, next) => {
    ctx.state = {
        session: ctx.session,
        menuArr: adminMenuArr,
        homeMenuArr: homeMenuArr,
        contact: contact
    }
    if (ctx.request.url.indexOf('admin') !== -1 || ctx.request.url.indexOf('data') !== -1) {
        if (!ctx.session || !ctx.session.user) {
            ctx.redirect('/login');
            return false;
        }
    }
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (ctx.method == 'OPTIONS') {
        ctx.body = 200;
    } else {
        await next();
    }
});

// 首页入口
let home = require('./routers/home/index.interface')
let info = require('./routers/home/info.interface')
let infoDetail = require('./routers/home/infoDetail.interface')
let about = require('./routers/home/about.interface')

// 后台界面入口
let login = require('./routers/admin/admin.public.interface')
let admin = require('./routers/admin/admin.interface')
let webConfig = require('./routers/admin/webConfig.interface')
let columnManage = require('./routers/admin/coumnManage.interface')
let singleList = require('./routers/admin/singleList.interface')
let listManage = require('./routers/admin/listManage.interface')
let imageMange = require('./routers/admin/imageManage.interface')
let friendshipLink = require('./routers/admin/friendshipLink.interface')

// 数据入口
let adminData = require('./routers/interface/admin.userList.interface')
let uploadData = require('./routers/interface/upload.interface')
let homeData = require('./routers/interface/home.interface')

// 公共接口
let publicInterface = require('./routers/interface/public.admin.interface')

//装载所有子路由
let router = new Router();
router.use('/', home.routes(), home.allowedMethods());
router.use('/info', info.routes(), info.allowedMethods());
router.use('/infoDetail', infoDetail.routes(), infoDetail.allowedMethods());
router.use('/about', about.routes(), about.allowedMethods());

router.use('/login', login.routes(), login.allowedMethods());
router.use('/admin', admin.routes(), admin.allowedMethods());
router.use('/admin', webConfig.routes(), webConfig.allowedMethods())
router.use('/admin', friendshipLink.routes(), friendshipLink.allowedMethods())
router.use('/admin', columnManage.routes(), columnManage.allowedMethods())
router.use('/admin', singleList.routes(), singleList.allowedMethods())
router.use('/admin', listManage.routes(), listManage.allowedMethods())
router.use('/admin', imageMange.routes(), imageMange.allowedMethods())

router.use('/data', adminData.routes(), adminData.allowedMethods());
router.use('/upload', uploadData.routes(), uploadData.allowedMethods());
router.use('/web', homeData.routes(), homeData.allowedMethods());

router.use('/public', publicInterface.routes(), publicInterface.allowedMethods());

//加载路由中间件
app.use(router.routes()).use(router.allowedMethods());

app.listen(config.port);
console.log(`listening on port ${config.port}`)
