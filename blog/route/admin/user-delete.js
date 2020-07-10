const { User } = require('../../model/user');

module.exports = async(req, res) => {
    // 获取要删除的用户id
    let id = req.query.id;
    // 根据id删除用户
    await User.findByIdAndDelete({ _id: id });
    // 将页面重定向到用户列表页面
    res.redirect('/admin/user');
}