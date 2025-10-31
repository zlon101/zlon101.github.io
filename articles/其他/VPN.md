- [sockboom](https://sockboom.boo/auth/)  https://sockboom.online/user/

- [clash 免费节点、订阅链接、使用教程](https://github.com/aiboboxx/clashfree?tab=readme-ov-file) 

# 代理终端流量-mac

[macOS终端使用代理网络](https://github.com/Qingquan-Li/blog/issues/131) 

[终端使用代理加速的正确方式（Clash）](https://weilining.github.io/294.html) 

1. 测试终端是否能访问某个地址 

```shell
curl -I http://www.google.com
```

或者查询本机网络地址

```shell
curl cip.cc
```

2. 配置终端脚本

不需要代理客户端开启全局代理，开启“规则判断” 也行。配置方法有下列几种：

- 只在当前终端窗口生效

在终端输入：
```shell
export https_proxy=http://127.0.0.1:1111 http_proxy=http://127.0.0.1:7890 all_proxy=socks5://127.0.0.1:1111
```

- 配置 shell 脚本

编辑 `.bashe_profile` 文件或 `.zshrc` ，添加以下内容，然后执行 `source .bashe_profile`，到此完成配置。之后可以在终端执行 `proxy_on`、`proxy_off` 命令来开启关闭代理。

```shell
#设置代理
function proxy_on() {
  #export no_proxy="localhost,127.0.0.1,localaddress,.localdomain.com"
  export http_proxy="http://127.0.0.1:7890"
  export https_proxy=$http_proxy
  export all_proxy=socks5://127.0.0.1:7890 # or this line
  echo -e "已开启代理"
}

function proxy_off(){
  unset http_proxy
  unset https_proxy
  echo -e "已关闭代理"
}
```