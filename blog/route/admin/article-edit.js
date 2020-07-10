// 引入文章集合构造函数
const { Article } = require('../../model/article');
module.exports = async(req, res) => {
    // 标识 标识当前范文的是用户管理页面
    req.app.locals.currentLink = 'article';
    // 获取到地址栏中的文章id参数
    const { id } = req.query;
    // 如果当前传递了id参数
    if (id) {
        //修改操作
        const article = await Article.findOne({ _id: id });
        // res.send(article)
        res.render('admin/article-edit.art', {
            article: article,
            link: '/admin/article-modify?id=' + id,
            button: '修改'
        });
        // return;
    } else {
        //添加操作
        res.render('admin/article-edit.art', {
            link: '/admin/article-add',
            button: '添加'
        })

    }
}