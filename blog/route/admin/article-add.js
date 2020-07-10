// 引入formidable第三方模块
const formidable = require('formidable');
const path = require('path');
// 导入Article集合构造函数
const { Article } = require('../../model/article');

module.exports = (req, res) => {
    // 创建表单解析对象
    const form = new formidable.IncomingForm();
    // 设置文件上传路径
    form.uploadDir = path.join(__dirname, '../', '../', 'public', 'uploads');
    // 保留表单上传文件的扩展名
    form.keepExtensions = true;
    // 对表单进行解析
    form.parse(req, async(err, fields, files) => {
        // err 是错误对象，如果表单解析失败，err里面存储错误信息 成功时为空
        // fields 对象类型 存储普通请求参数
        // files  对象类型 存储上传的文件信息
        // res.send(files.cover.path.split('public')[1]);
        await Article.create({
            title: fields.title,
            author: fields.author,
            publishDate: fields.publishDate,
            cover: files.cover.path.split('public')[1],
            content: fields.content
        });
        // 将页面重定向到文章列表页面
        res.redirect('/admin/article');
    });
}