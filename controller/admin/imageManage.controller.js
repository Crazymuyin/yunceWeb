const friendshipLinkModel = require('../../lib/admin/imageManage.mysql')
const checkNotLogin = require('../../middlewares/check.js').checkNotLogin
const checkLogin = require('../../middlewares/check.js').checkLogin

exports.renderImageManage = async (ctx) => {
    await checkLogin(ctx)
    await ctx.render('admin.imageManage')
}

exports.getImageList = async ctx => {
    let data = [
        {id: 1, avatar: '/imgs/avatar_01.jpg', title: '钟向东董事长应国家税务总局邀请前往长沙授课', columnName: '企业动态[43]', updateTime: '2016-09-20 15:04:07', publisher: 'qwerty', clickNum: 909},
        {id: 2, avatar: '/imgs/avatar_01.jpg', title: '钟向东董事长受邀为太原师范学院作网络舆情研判专题讲座', columnName: '企业动态[43]', updateTime: '2016-09-09 15:04:07', publisher: 'qwerty', clickNum: 3978},
        {id: 3, avatar: '/imgs/avatar_01.jpg', title: '中正舆情机构走进国家税务总局党校展开网信舆情管理培训', columnName: '企业动态[43]', updateTime: '2016-08-29 15:04:07', publisher: 'qwerty', clickNum: 985},
        {id: 4, avatar: '/imgs/avatar_01.jpg', title: '中正舆情受邀为国网四川省电力公司甘孜供电公司作舆情培训', columnName: '企业动态[43]', updateTime: '2016-08-26 15:04:07', publisher: 'qwerty', clickNum: 1582},
        {id: 5, avatar: '/imgs/avatar_01.jpg', title: '澜极智谷集团与商业观察杂志社达成全面战略合作关系', columnName: '企业动态[43]', updateTime: '2016-08-20 15:04:07', publisher: 'qwerty', clickNum: 823},
        {id: 6, avatar: '/imgs/avatar_01.jpg', title: '福建平潭综合试验区金融创新服务中心到访集团总部', columnName: '企业动态[43]', updateTime: '2016-07-11 15:04:07', publisher: 'qwerty', clickNum: 956},
        {id: 7, avatar: '/imgs/avatar_01.jpg', title: '钟向东董事长为国网重庆南岸供电公司作舆情管理专题培训', columnName: '企业动态[43]', updateTime: '2016-07-10 15:04:07', publisher: 'qwerty', clickNum: 1259},
        {id: 8, avatar: '/imgs/avatar_01.jpg', title: '关于“部分公司仿冒中正舆情云测APP”的声明', columnName: '企业动态[43]', updateTime: '2016-07-04 15:04:07', publisher: 'qwerty', clickNum: 689},
        {id: 9, avatar: '/imgs/avatar_01.jpg', title: '全国首个个人网络舆情安全管理平台云测APP在成都上线', columnName: '企业动态[43]', updateTime: '2016-07-03 15:04:07', publisher: 'qwerty', clickNum: 4258},
        {id: 10, avatar: '/imgs/avatar_01.jpg', title: '热烈欢迎中共武侯区委宣传部黄南副部长一行莅临指导', columnName: '企业动态[43]', updateTime: '2016-06-30 15:04:07', publisher: 'qwerty', clickNum: 2846},
    ]
    let imgInfo = {
        code: 0,
        msg: "test",
        count: 10,
        data: data
    }
    ctx.body = imgInfo
}
