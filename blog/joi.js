// 引入joi模块
const Joi = require('joi');

// 定义对象的验证规则
const schema = {
    username: Joi.string().alphanum().min(2).max(5).required().error(new Error('username属性没有通过验证')),
    // password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    // access_token: [Joi.string(), Joi.number()],
    // birthyear: Joi.number().integer().min(1900).max(2013),
    // email: Joi.string().email()
};



async function run() {
    try {
        // 实施验证
        await Joi.validate({ username: 'a' }, schema);
    } catch (e) {
        console.log(e.message);
        return;
    }
    console.log('ok');
}

run();