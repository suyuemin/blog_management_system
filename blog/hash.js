// 导入bcrypt模块
const bcrypt = require('bcryptjs');


async function run() {
    // 生成随机字符串 gen => generate 生成 salt 盐
    // 数值越大 生成的随机字符串复杂度越高
    // 数值越小 生成的随机字符串复杂度越低
    // 默认值是 10
    // 返回随机生成的字符串
    let salt = await bcrypt.genSalt(10);
    // 使用随机字符串对密码进行加密
    let pass = await bcrypt.hash('123456', salt);
    console.log(salt);
    console.log(pass);
}

run();