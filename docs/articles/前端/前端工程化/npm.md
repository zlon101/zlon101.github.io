> [npm文档](https://docs.npmjs.com/) 
>
> 在安装一个 package，而此 package 要打包到生产环境 bundle 中时，你应该使用 `npm install --save`。如果你在安装一个用于开发环境的 package 时（例如，linter, 测试库等），你应该使用 `npm install --save-dev`。

#### 常用命令

> 查看全局包: npm list -g --depth 0sdps
> 安装全局包: npm i -g xx
> 删除全局包: npm uninstall -g vue
>
> 创建软链接: npm link, [npm link](https://juejin.cn/post/6844903960805900295) 


#### 常用包

- npm 源管理: nrm
- n nvm nvm-windows: [一台电脑上管理多个node版本](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) 
- 运行 npm 包二进制: npx

#### npm script

[npm script 使用指南](https://www.ruanyifeng.com/blog/2016/10/npm_scripts.html)   
[Node.js 命令行程序开发教程](https://www.ruanyifeng.com/blog/2015/05/command-line-with-node.html)  

npm package.json script

- `"src/**/*"`：`**` 表示任意一层子目录，`*` 表示任意文件名

#### [发布包](https://docs.npmjs.com/creating-and-publishing-unscoped-public-packages) 

1. 使用`npm login` 和 npm 账号在本地登录npm
2. 带 `scope` 的包名必须用 organization name 作前缀，每个npm用户/组织都有自己的范围，而且只有你能在你的范围内添加软件包。这意味着你不必担心有人抢先使用你的软件包名称。因此，这也是一个为组织发出官方软件包信号的好方法。

#### [包版本查询](https://semver.npmjs.com/) 

- `^2.2.0`:  2.2.0 到 2.x.x  主版本号不变
- `~2.2.0`:  2.2.0 到  2.2.x  次版本号不变
- `>2.2.0`:  2.2.0 到  最新版本

#### [npm registry](https://docs.npmjs.com/cli/v8/using-npm/registry) 

- 将一个scope 与 npm registry 关联，一旦一个作用域与一个注册表相关联，任何带有该作用域的软件包的npm安装将从该注册表请求软件包。任何包含该范围的软件包名称的npm发布都会被发布到该注册表。[参考](https://docs.npmjs.com/cli/v8/using-npm/scope) 
