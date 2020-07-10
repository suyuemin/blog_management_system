// 引用express框架
const express = require('express');
// 处理路径
const path = require('path');
// 引入body-parser模块 用来处理post请求参数
const bodyPaser = require('body-parser');
// 导入express-session模块
const session = require('express-session');
// 导入art-template模板引擎
const template = require('art-template');
// 导入dateformat第三方模块
const dateFormat = require('dateformat');
// 导入morgan第三方模块
const morgan = require('morgan');
// 导入config模块
const config = require('config');
// 创建网站服务器
const app = express();

// 数据库连接
require('./model/connect');
// 处理post请求参数   只能处理普通表单，不能处理二进制数据
app.use(bodyPaser.urlencoded({ extended: false }));
// 配置session
app.use(session({
    secret: 'secret key',
    // 不保存初始化cookie
    saveUninitialized: false,
    cookie: {
        // 设置cookie过期时间
        maxAge: 24 * 60 * 60 * 1000
    }
}));

// 告诉express框架模板所在的位置
app.set('views', path.join(__dirname, 'views'));
// 告诉express框架模板的默认后缀是什么
app.set('view engine', 'art');
// 当渲染后缀为art的模板时 所使用的模板引擎是什么
app.engine('art', require('express-art-template'));
// 向模板内部导入dataFormate变量
template.defaults.imports.dateFormat = dateFormat;

// 开放静态资源文件
app.use(express.static(path.join(__dirname, 'public')));

// 
console.log(config.get('title'));


if (process.env.NODE_ENV == 'development') {
    // 开发环境
    console.log('开发');
    // 在开发环境钟 将客户端发送到服务器端的请求信息打印到控制台
    app.use(morgan('dev'));
} else {
    // 生产环境
    console.log('生产');
}

// 引入路由模块
const home = require('./route/home');
const admin = require('./route/admin');

// 拦截请求，判断用户登录状态
app.use('/admin', require('./middleware/loginGuard'));

// 为路由匹配请求路径
app.use('/home', home);
app.use('/admin', admin);

// 错误处理中间件
app.use((err, req, res, next) => {
    // JSON.parse() 将字符串数据类型转换为对象数据类型
    const result = JSON.parse(err);
    let params = [];
    for (let attr in result) {
        if (attr != 'path') {
            params.push(attr + '=' + result[attr]);
        }
    }
    res.redirect(`${result.path}?${params.join('&')}`)
})

// 监听端口
app.listen(3000);
console.log('网站服务器启动成功，请访问localhost');