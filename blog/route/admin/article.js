// 将文章的集合的构造函数导入到当前文件中
const { Article } = require('../../model/article');
// 导入mongoose-sex-page第三方模块
const pagination = require('mongoose-sex-page');
module.exports = async(req, res) => {
    // 接收客户端传递过来的页面
    const page = req.query.page;
    // 标识 标识当前范文的是用户管理页面
    req.app.locals.currentLink = 'article';
    // page()  指定当前页
    // size()  指定每页显示的数据条数
    // display()  指定客户端要显示的页面数量
    // exec()   向数据库发出查询请求
    // 查询所有文章数据
    let articles = await pagination(Article).find().page(page).size(2).display(3).populate('author').exec();
    // res.send(articles);
    // 渲染文章列表页面模板
    res.render('admin/article.art', {
        articles
    })
}