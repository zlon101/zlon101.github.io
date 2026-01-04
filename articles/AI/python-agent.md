# 环境配置

> pyenv： python 版本管理

- 按照 pyenv
  ```shell
  brew update
  brew install pyenv
  
  # 配置 shell (如果你用的是 zsh，macOS 默认)
  echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.zshrc
  echo '[[ -d $PYENV_ROOT/bin ]] && export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.zshrc
  echo 'eval "$(pyenv init -)"' >> ~/.zshrc
  
  source ~/.zshrc
  
  
  # 2025年了，Python 3.12 已经很普遍，但为了 AI 库兼容性，3.11 依然是黄金选择
  pyenv install 3.11.8
  
  # 设置全局默认版本 (类似 nvm use default 18)
  pyenv global 3.11.8
  ```
  
  
  
- pyenv： python 版本管理

  ```sh
  # 1. 创建并进入目录
  mkdir agent-v1
  cd agent-v1
  
  # 2. 指定当前目录使用 Python 3.11 (由 pyenv 管理)
  pyenv local 3.11.8
  
  
  # 2. 【关键】创建虚拟环境 (相当于初始化空的 node_modules)
  # 语法: python -m venv <名字>
  # 习惯上名字叫 .venv 或 venv，类似前端约定 .env 或 node_modules
  python -m venv .venv
  
  # 3. 【关键】激活环境
  # 这一步是前端没有的。必须告诉终端："接下来的 pip install 都要装进这个 .venv 盒子里"
  source .venv/bin/activate
  # 此时你的终端提示符左边会出现 (.venv) 
  
  # 4. 安装依赖 (比如安装旧版 LangChain)
  pip install langchain==0.0.100
  
  # 5. 验证安装位置
  # 类似 npm list
  pip show langchain
  #你会看到 Location 指向了 .../agent-v1/.venv/lib/python3.11/site-packages
  ```

  

- poetry：管理项目依赖、虚拟环境、打包发布

