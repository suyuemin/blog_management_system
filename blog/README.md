# 博客管理系统

## 1. 项目环境搭建

### 1.1 项目介绍

博客管理系统

1. 博客内容展示

   ![](./readmePic/home.png)

   

   ![](./readmePic/article.png)

2. 博客管理功能

   ![](./readmePic/login.png)

   

   ![](./readmePic/user.png)

   

   ![](./readmePic/user-edit.png)

   ![](./readmePic/admin-article.png)

   

   ![](./readmePic/article-edit.png)

   

### 1.2 案例初始化

1. 建立项目所需文件夹

   * public 静态资源

   * model 数据库操作

   * route 路由

   * views 模板

2. 初始化项目描述文件

   * npm init -y

3. 下载项目所需第三方模块
   npm install express mongoose art-template express-art-template

4. 创建网站服务器

   app.js：	项目的入口文件

5. 构建模块化路由

   —route

   ​	-home.js

   ​	-admin.js

6. 构建博客管理页面模板

   1. 将静态文件粘贴到public目录下

   2. 开放静态资源文件

   3. html文件剪切到views目录下

   4. 将html文件后缀全部改成.art

   5. 在app.js中

      ```
      // 告诉express框架模板所在的位置
      app.set('views', path.join(__dirname, 'views'));
      // 告诉express框架模板的默认后缀是什么
      app.set('view engine', 'art');
      // 当渲染后缀为art的模板时 所使用的模板引擎是什么
      app.engine('art', require('express-art-template'));
      ```

      

   6. 模板中外链资源，相对路径（由浏览器解析）是相对于地址栏的请求路径。改为绝对路径

   7. 优化模板

      1. 将公共部分抽离 ，骨架文件抽离

          —common

            	- header.art
                    	- aside.art
                    	- layout.art

      2. 子模板的相对路径就是相对当前路径，因为它是由浏览器解析的，而不是浏览器

## 2. 项目功能实现

## 用户管理功能：

### 2.1 登录

1. 创建用户集合，初始化用户
   1. 连接数据库
   2. 创建用户集合
   3. 初始化用户
   
2. 为登录表单项设置请求地址、请求方式以及表单项name属性

3. 当用户点击登录按钮时，客户端验证用户是否填写了登录表单

4. 如果其中一项没有输入，阻止表单提交

5. 服务器端接收请求参数，验证用户是否填写了登录表单

6. 如果其中一项没有输入，为客户端做出响应，阻止程序向下执行

7. 根据邮箱地址查询用户信息

8. 如果用户不存在，为客户端做出响应，阻止程序向下执行

9. 如果用户存在，将用户名和密码进行比对

10. 比对成功，用户登录成功

    判断用户角色：

    1. 普通用户：跳转到首页
    2. 超级管理员：跳转到管理页

11. 比对失败，用户登录失败

12. 保存登录状态

13. 密码加密处理

14. 登录拦截：没有登录不可访问user页面，普通用户登录后也不可访问user页面

15. 用户退出功能

### 2.2 新增用户

1. 为用户列表页面的新增用户按钮添加链接
2. 添加一个连接对应的路由，在路由处理函数中渲染新增用户模板
3. 为新增用户表单指定请求地址、请求方式、为表单项添加name属性
4. 增加实现添加用户的功能路由
5. 接收到客户端传递过来的请求参数
6. 对请求参数的格式进行验证,这里使用第三方模块joi,验证不通过时，重定向到用户添加页面，将错误信息放置请求路径参数
7. 验证当前要注册的邮箱地址是否已经注册过，邮箱被占用时，重定向到用户添加页面，将错误信息放置请求路径参数
8. 对密码进行加密处理
9. 将用户信息添加到数据库中
10. 重定向页面到用户列表页面

### 2.3 数据分页

当数据库中的数据非常多是，数据需要分批次显示，这时就需要用到数据分页功能。

分页功能核心要素：

1. 当前页，用户通过点击上一页或者下一页或者页码产生，客户端通过get参数方式传递到服务器端
2. 总页数，根据总页数判断当前页是否为最后一页，根据判断结果做响应操作

总页数：Math.ceil（总数据条数 / 每页显示数据条数）

```
limit(2) // limit 限制查询数量  传入每页显示的数据数量
skip(1) // skip 跳过多少条数据  传入显示数据的开始位置
```

数据开始查询位置=（当前页-1）* 每页显示的数据条数

### 2.4 用户信息修改

1. 将要修改的用户ID传递到服务器端（get）
2. 建立用户信息修改功能对应的路由
3. 接收客户端表单传递过来的请求参数 
4. 根据id查询用户信息，并将客户端传递过来的密码和数据库中的密码进行比对
5. 如果比对失败，对客户端做出响应
6. 如果密码对比成功，将用户信息更新到数据库中

### 2.5 用户信息删除

1. 在确认删除框中添加隐藏域用以存储要删除用户的ID值
2. 为删除按钮添自定义属性用以存储要删除用户的ID值
3. 为删除按钮添加点击事件，在点击事件处理函数中获取自定义属性中存储的ID值并将ID值存储在表单的隐藏域中
4. 为删除表单添加提交地址以及提交方式
5. 在服务器端建立删除功能路由
6. 接收客户端传递过来的id参数
7. 根据id删除用户



## 文章管理功能：

### 2.6 创建文章集合

### 2.7 文章添加功能

1. 为发布新文章按钮添加链接
2. 为发布文章表单添加请求地址，请求方式
3. 为每个表单项添加name属性，方便服务端接收客户端的请求参数
4. 在服务端添加“实现文章添加功能路由”的路由
5. 表单编码成二进制类型（文章封面使用二进制存储）
6. 使用formidable第三方模块接收表单二进制数据
7. 将当前用户id（存储在req.app.locals.userInfo._id）显示在为作者
8. 当用户选择封面图片后，图片直接显示在页面中，在客户端完成，创建文件读取对象FileReader 读取文件，通过监听（onchange）事件获取读取结果，将读取结果放到img标签的src属性中
9. 将客户端传递到服务器端的文章插入到数据库中，文章封面图片已经上传到upload文件中，cover字段存储的是文件上传路径及文件名称

### 2.8 文章数据展示功能

1. 将文章数据查询之后传递到模板

2. 使用第三方模块dateformat对发布时间字段进行处理

   在app.js文件中对第三方模块dateformat进行全局配置，配置之后其他所有文件都能使用这个模块

3. 作者 字段 进行多集合联合查询

4. 使用第三方模块mongoose-sex-page进行分页显示

### 2.9 文章修改功能

1. 将要修改的文章ID传递到服务器端（get）

2. 建立用户信息修改功能对应的路由

3. 接收客户端表单传递过来的请求参数 

   这里涉及到二进制文件，所以不能用body-parser

   使用formidable第三方模块接收表单二进制数据

4. 将文章信息更新到数据库中

### 2.10 文章删除功能

1. 在确认删除框中添加隐藏域用以存储要删除文章的ID值
2. 为删除按钮添自定义属性用以存储要删除文章的ID值
3. 为删除按钮添加点击事件，在点击事件处理函数中获取自定义属性中存储的ID值并将ID值存储在表单的隐藏域中
4. 为删除表单添加提交地址以及提交方式
5. 在服务器端建立删除功能路由
6. 接收客户端传递过来的id参数
7. 根据id删除文章

## 博客前台展示页面：

### 2.11 文章列表页面展示功能

1. 将文章数据从文章集合中查询处理，并展示在页面中
2. 对author存储的是id，所以进一步做查询操作（多集合联合查询）
3. 使用第三方模块mongoose-sex-page进行分页显示
4. 渲染模板时，循环索引为单数类名为fl，偶数为fr
5. 使用第三方模块dateformat对发布时间字段进行处理
6. 文章内容出现html标签：
   1. 文章内容字段进行原文输出
   2. 使用正则表达式将html标签替换为空
7. 限制文章长度，对文章内容进行截取

### 2.12 文章详情页面展示功能

1. 在文章列表添加链接跳转到详情页面
2. 将文章id通过get参数传递到服务器端
3. 服务端接收文章id，通过id将文章信息查询出来，author仍然要用到多集合联合查询
4. 将文章信息传递到模板中
5. 文章数据通过模板展示
6. 使用第三方模块dateformat对发布时间字段进行处理
7. 文章内容需要原文输出

### 2.13 文章评论

1. 创建评论集合
2. 判断用户是否登录，如果用户登录，再允许用户提交评论表单
3. 在文章评论表单中添加两个隐藏域，传递aid和uid
4. 在服务器端创建文章评论功能对应的路由
5. 在路由请求处理函数中接收客户端传递过来的评论信息
6. 将评论信息存储在评论集合中
7. 将页面重定向回文章详情页面
8. 在文章详情页面路由中获取文章评论信息并展示在页面中

## 3. 开发环境与生产环境

### 3.1 什么是开发环境与生产环境

​		环境，就是指项目运行的地方，当项目处于开发阶段，项目运行在开发人员的电脑上，项目所处的环境就是开发环境。当项目开发完成以后，要将项目放到真实的网站服务器电脑中运行，项目所处的环境就是生产环境。

### 3.2 为什么要区分开发环境与生产环境

​		因为在不同的环境中，项目的配置是不一样的，需要在项目代码中判断当前项目运行的环境，根据不同的环境应用不同的项目配置。

### 3.3 如何区分开发环境与生产环境

​		通过电脑操作系统中的系统环境变量区分当前是开发环境还是生产环境。

**开发：**

![](./readmePic/development.png)

**生产：**

![](./readmePic/production.png)



```
if (process.env.NODE_ENV == 'development') {
     // 开发环境
 } else {
     // 生产环境
 }
```

### 3.4 第三方模块config

​		作用：允许开发人员将不同运行环境下的应用配置信息抽离到单独的文件中，模块内部自动判断当前应用的运行环境，并读取对应的配置信息，极大提供应用配置信息的维护成本，避免了当运行环境重复的多次切换时，手动到项目代码中修改配置信息

**使用步骤**

1. 使用npm install config命令下载模块
2. 在项目的根目录下新建config文件夹
3. 在config文件夹下面新建default.json（存放默认信息）、development.json（存放开发信息）、production.json（存放生产信息）文件
4. 在项目中通过require方法，将模块进行导入
5. 使用模块内部提供的get方法获取配置信息

**将敏感配置信息存储在环境变量中**

1. 在config文件夹中建立custom-environment-variables.json文件
2. 配置项属性的值填写系统环境变量的名字
3. 项目运行时config模块查找系统环境变量，并读取其值作为当前配置项属于的值

```
 { 
     "db": {
           "pwd": "APP_PWD"
     }
 }
```

![](./readmePic/custom-environment-variables.png)

## 4.项目包含的知识点

### 4.1 密码加密 bcrypt

哈希加密是单程加密方式：1234 => abcd
在加密的密码中加入随机字符串可以增加密码被破解的难度。

```
// 导入bcrypt模块
const bcrypt = require('bcryptjs');
// 生成随机字符串 gen => generate 生成 salt 盐
let salt = await bcrypt.genSalt(10);
// 使用随机字符串对密码进行加密
let pass = await bcrypt.hash('明文密码', salt);
```

```
// 密码比对
let isEqual = await bcrypt.compare('明文密码', '加密密码');
```

bcrypt依赖的其他环境

1. python 2.x
2. node-gyp
       npm install -g node-gyp
3. windows-build-tools
        npm install --global --production windows-build-tools

### 4.2 cookie与session

cookie：浏览器在电脑硬盘中开辟的一块空间，主要供服务器端存储数据。
cookie中的数据是以域名的形式进行区分的。
cookie中的数据是有过期时间的，超过时间数据会被浏览器自动删除。
cookie中的数据会随着请求被自动发送到服务器端。

session：实际上就是一个对象，存储在服务器端的内存中，在session对象中也可以存储多条数据，每一条数据都有一个sessionid做为唯一标识。

在node.js中需要借助express-session实现session功能。

```
const session = require('express-session');
app.use(session({ secret: 'secret key' }));
```

### 4.3 Joi

JavaScript对象的规则描述语言和验证器。

```
const Joi = require('joi');
const schema = {
    username: Joi.string().alphanum().min(3).max(30).required().error(new Error(‘错误信息’)),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    access_token: [Joi.string(), Joi.number()],
    birthyear: Joi.number().integer().min(1900).max(2013),
    email: Joi.string().email()
};
Joi.validate({ username: 'abc', birthyear: 1994 }, schema);
```

### 4.4 formidable 

作用：解析表单，支持get请求参数，post请求参数、文件上传。

```
 // 引入formidable模块
 const formidable = require('formidable');
 // 创建表单解析对象
 const form = new formidable.IncomingForm();
 // 设置文件上传路径
 form.uploadDir = "/my/dir";
 // 是否保留表单上传文件的扩展名
 form.keepExtensions = false;
 // 对表单进行解析
 form.parse(req, (err, fields, files) => {
     // fields 存储普通请求参数
         // files 存储上传的文件信息
 });
```

### 4.5 文件读取 FileReader

```
 var reader = new FileReader();
 reader.readAsDataURL('文件');
 reader.onload = function () {
     console.log(reader.result); 
 }
```

### 4.6 数据分页 mongoose-sex-page

```
const pagination = require('mongoose-sex-page');
pagination(集合构造函数).page(1) .size(20) .display(8) .exec();
```

### 4.7 mongoDB数据库添加账号

1. 以系统管理员的方式运行powershell
2. 连接数据库 mongo
3. 查看数据库 show dbs
4. 切换到admin数据库 use admin
5. 创建超级管理员账户 db.createUser()
6. 切换到blog数据 use blog
7. 创建普通账号 db.createUser()
8. 卸载mongodb服务
   1. 停止服务 net stop mongodb
   2. mongod --remove

9. 创建mongodb服务
       mongod --logpath="C:\Program Files\MongoDB\Server\4.1\log\mongod.log" --dbpath="C:\Program          Files\MongoDB\Server\4.1\data" --install –-auth
10. 启动mongodb服务 net start mongodb
11. 在项目中使用账号连接数据库
          mongoose.connect('mongodb://user:pass@localhost:port/database')