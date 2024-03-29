> [npm文档](https://docs.npmjs.com/) 
>
> [github package](https://github.com/features/packages) [GitHub Packages](https://docs.github.com/en/packages/learn-github-packages/introduction-to-github-packages) 

> npm symbolic link

> [private package](https://docs.npmjs.com/about-private-packages) 

> package.json file 字段？
>
> [package.json中的main | module | browser](https://github.com/SunshowerC/blog/issues/8) 

# [npm registry](https://docs.npmjs.com/cli/v8/using-npm/registry) 

> scope

将一个scope 与 npm registry 关联，一旦一个作用域与一个注册表相关联，任何带有该作用域的软件包的npm安装将从该注册表请求软件包。任何包含该范围的软件包名称的npm发布都会被发布到该注册表。[参考](https://docs.npmjs.com/cli/v8/using-npm/scope) 

Each npm user/organization has their own scope, and only you can add packages in your scope.


> 某个 scope 与 registry

混合使用来自 npm registry 和私有 registry 的包

```shell
npm login --registry=http://reg.example.com --scope=@myco
或者
npm config set @myco:registry http://reg.example.com
```

## [发布包](https://docs.npmjs.com/creating-and-publishing-unscoped-public-packages) 

npm 官网注册账号


1. 使用`npm login` 和 npm 账号在本地登录npm
2. 带 `scope` 的包名必须用 organization name 作前缀，每个npm用户/组织都有自己的范围，而且只有你能在你的范围内添加软件包。这意味着你不必担心有人抢先使用你的软件包名称。因此，这也是一个为组织发出官方软件包信号的好方法。

# 版本管理

- `^2.2.0`:  2.2.0 到 2.x.x  主版本号不变
- `~2.2.0`:  2.2.0 到  2.2.x  次版本号不变
- `>2.2.0`:  2.2.0 到  最新版本

> 锁定node版本

```json
// package.json
"engines": {
  "node": "16.13.2 || 16.16.0"
},

// .npmrc
engine-strict = true
```

> 锁定包管理器

利用 only-allow 工具包、npm scripts 快速实现锁定

```shell
npm install -D only-allow
// package.json
"scripts": {
  "preinstall": "only-allow npm",
}
```

> [包版本查询](https://semver.npmjs.com/) 

# npm 依赖

在安装一个 package，而此 package 要打包到生产环境 bundle 中时，你应该使用 `npm install --save`。如果你在安装一个用于开发环境的 package 时（例如，linter, 测试库等），你应该使用 `npm install --save-dev`。

> dependencies、devDependencies 和 peerDependencies 的区别

当一个 package(pkg-xx) 提供给其他人使用时，这个 package 的 package.json 的 dependencies、devDependencies 和 peerDependencies 配置决定了 `npm i pkg-xx` 时哪些依赖包被安装
- dependencies: `npm i pkg-xx` 时会安装对应的依赖包
- devDependencies：不会安装
- peerDependencies：
  - npm v8.x.x 会自动安装 `peerDependencies` 依赖，之前版本的 npm 不会自动安装
  - `peerDependencies` 和 `devDependencies` 的区别：devDependencies 表示开发依赖，源码中应该要引用该依赖(`import` 或 `require`)，peerDependencies 源码中不用引用

## 依赖冲突

项目 project 中依赖组件 B、C 两个组件，组件 B、C 的依赖项中都有组件 A

- B 中对 A 的版本指定为 @latest，C 对 A 的版本指定为 C@1.0.0，在项目 project 中执行 npm install 时，安装的组件 C 的版本是 1.0.0
- B 中对 A 的版本指定为 @latest，C 对 A 的版本指定为 C>=1.0.0，在项目 project 中执行 npm install 时，安装的组件 C 的 latest 最新版本

- B 中对 A 的版本指定为 @latest，C 对 A 的版本指定为 C@1.0.0，在项目 project 的 package.json 中指定组件 C 的版本为以下情况时，执行 npm install 安装的组件 C 的版本分别对应：
  - package.json 中指定为 @latest，安装后的版本为 latest
  - package.json 中指定为 >=1.0.0，安装后版本为 latest
  - package.json 中指定为 @2.2.0，安装后版本为 2.2.0

# 常用命令

> 查看全局包: npm list -g --depth 0sdps
> 安装全局包: npm i -g xx
> 删除全局包: npm uninstall -g vue
> 创建软链接: [npm link](https://docs.npmjs.com/cli/v8/commands/npm-link) [解读](https://juejin.cn/post/6844903960805900295) [npx link](https://www.npmjs.com/package/link) 

# 常用包

- npm 源管理: nrm
- n nvm nvm-windows: [一台电脑上管理多个node版本](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) 
- 运行 npm 包二进制: npx

# npm script

[npm script 使用指南](https://www.ruanyifeng.com/blog/2016/10/npm_scripts.html) 
[Node.js 命令行程序开发教程](https://www.ruanyifeng.com/blog/2015/05/command-line-with-node.html)  

> npm package.json script

- process.argv  <==  `npm run xx -- -val=xx`
- process.env.npm_config_xxx  <==  `npm run xx -val=xx` 
- process.env.npm_package_config_xx <=== package.json 中配置 `{ config: { xx: '12' } }` 


- `-` 或 `--` 开头会作为参数传递给 npm ，通过 `process.env.npm_config_xx` 读取
  - 例如`npm run proxy --help`， `--help` 传递给 npm 
- `npm run script -- -name`:  中间的 `--` 会停止将之后的字符解析为参数，不在传递给 npm，通过 `process.argv` 读取

> exampel

- bash版本
```shell
#!/bin/bash
registry=$(npm config get registry);
if ! [[ $registry =~ "http://registry.x.com" ]]; then
    npm config set @xscope:registry https://abc.com/npm/
fi
```

- node版本
```js
#!/usr/bin/env node
const { exec } = require('child_process');

exec('npm config get registry', function(error, stdout, stderr) {
    if (!stdout.toString().match(/registry\.x\.com/)) {
        exec('  npm config set @xscope:registry https://abc.com/npm/');
    }
});
```

> 三方库
- [google/zx](https://github.com/google/zx) : 用 JS 编写 Shell 脚本
- cross-env: 环境变量

----------------------------------------

>  `"src/**/*"`：`**` 表示任意一层子目录，`*` 表示任意文件名