// 导入文章集合构造函数
const { Article } = require('../../model/article');
// 导入分页模块
const pagination = require('mongoose-sex-page');
module.exports = async(req, res) => {
    // 接收客户端传递过来的页面
    const page = req.query.page;

    // page()  指定当前页
    // size()  指定每页显示的数据条数
    // display()  指定客户端要显示的页面数量
    // exec()   向数据库发出查询请求
    // 查询所有文章数据
    let articles = await pagination(Article).find().page(page).size(4).display(5).populate('author').exec();
    // res.send(articles);
    // 渲染文章列表页面模板
    res.render('home/default.art', {
        articles
    })
}