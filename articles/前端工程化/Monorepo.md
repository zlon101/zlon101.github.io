单仓多模块管理，就是把多个项目放在一个仓库里面。用统一的本地关联、构建、发布流程，来消费业务域下所有管理的组件模块


Monorepo只是一个概念，它并不代表某项具体的技术，具体实现需要多种工具结合使用。需要包含：

1. 包管理：pnpm、npm、yarn
2. 包版本管理：Lerna、Changesets
3. 包构建方案：Turborepo


例如一个技术选型：
pnpm：包依赖管理工具。
changesets：包版本管理工具。
eslint，pretter: 代码规范工具。
commitizen，commitlint：提交规范工具。
husky，lint-staged：git hook相关工具。
vitepress：文档服务工具。


> 资料

[大型前端项目管理模式实践](https://developer.aliyun.com/article/1067018#:~:text=Monorepo%20%E5%85%B6%E5%AE%9E%E4%B8%8D%E6%98%AF%E4%B8%80%E4%B8%AA%E6%96%B0,%E6%89%80%E6%9C%89%E7%AE%A1%E7%90%86%E7%9A%84%E7%BB%84%E4%BB%B6%E6%A8%A1%E5%9D%97%E3%80%82)

[Monorepo—探秘源码管理新姿势](https://cloud.tencent.com/developer/article/1944358)