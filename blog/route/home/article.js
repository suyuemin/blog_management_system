// 导入文章集合构造函数
const { Article } = require('../../model/article');
// 将评论集合构造函数进行导入
const { Comment } = require('../../model/comment');
module.exports = async(req, res) => {
    // 接收客户端传递过来的文章id
    let id = req.query.id;
    // 根据文章id查询文章信息
    const article = await Article.findOne({ _id: id }).populate('author');
    // 查询文章所对应的评论
    const comments = await Comment.find({ aid: id }).populate('uid');
    // res.send(comments);
    // return;
    // 将文章信息传递到模板中
    res.render('home/article.art', {
        article,
        comments
    })
}