# [Gitlab API](https://docs.gitlab.com/ee/api/rest/) 

api 列表：`https://api.github.com/`

使用 Gitlab api 查询仓库信息
API 参考: `https://docs.gitlab.com/ee/api/repositories.html`
获取参考文件目录: `https://gitlab.com/api/v4/projects/{projectId}/repository/tree?recursive=true&ref=分支名`

gitlab api url 中的 query 必须与文档上的一致，不能随意使用 encodeURIComponent

# [GitLab CI/CD](https://docs.gitlab.cn/jh/ci/quick_start/) 

[GitLab](https://cloud.tencent.com/developer/tools/blog-entry?target=http%3A%2F%2Fmp.weixin.qq.com%2Fs%3F__biz%3DMzI3ODcxMzQzMw%3D%3D%26mid%3D2247492810%26idx%3D2%26sn%3Dc6b25b7106baf4d0e1a31f3b5fdd79f5%26chksm%3Deb5061fcdc27e8ea6dee6534b0bc255fee020fcacda3a44dfac7d24a2b825615c3d44653da4d%26scene%3D21%23wechat_redirect&source=article&objectId=1684099) CI/CD 由一个名为 .gitlab-ci.yml 的文件进行配置，改文件位于仓库的根目录下。文件中指定的脚本由GitLab Runner执行。

一个简单的管道通常包括三个阶段：build、test、deploy

# [Github Action](https://docs.github.com/en/actions/quickstart) 

某个【event】发生时，执行某些动作【action】。

`.github/workflows/xxx.yaml`，`.github/workflows` 目录下的一个 YAML 文件就是一个 workflow。

**workflow**：workflow 包含一个或多个 **jobs** ，jobs 之间可以顺序执行也可以并行执行，每个 job 在自己的虚拟机上或容器中运行，每个 job 包含一个或多个 step，每个 step 运行自定义脚本或 action。

同一个 job 中的 `step` 在同一个 `runner` 中执行，因此这些 `step` 可以共享数据和文件。



[GitHub Actions 入门教程-阮一峰](https://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html) 


# docker

[docker 部署并运行 Node项目](https://juejin.cn/post/7178673705462169655) 

