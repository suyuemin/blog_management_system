const guard = (req, res, next) => {

    // 判断用户访问的是否是登录页面
    // 判断用户的登录状态
    // 如果用户是登录的，将请求放行
    // 如果用户不是登录的，将请求重定向到登录页面

    if ((req.url != '/login') && !req.session.username) {
        res.redirect('/admin/login')
    } else {
        // 用户是登录状态
        // 用户访问的是退出，并且用户登录状态
        if ((req.url == '/logout')) {
            next();
        } else if (req.session.role == 'normal') {
            // 用户属于普通用户
            // 跳到博客首页，阻止程序向下执行
            return res.redirect('/home');
        }
        next();
    }
}

module.exports = guard;