import{_ as s,o as a,c as l,Q as n}from"./chunks/framework.cbe154cb.js";const e="/assets/bg2014061202.15537004.jpg",t="/assets/image-20200816155017683.2fcead7f.png",A=JSON.parse('{"title":"配置","description":"","frontmatter":{},"headers":[],"relativePath":"Git.md","filePath":"Git.md"}'),p={name:"Git.md"},o=n('<p><a href="https://git-scm.com/" target="_blank" rel="noreferrer">Git官网</a></p><p><a href="https://gitee.com/liaoxuefeng/learn-java/raw/master/teach/git-cheatsheet.pdf" target="_blank" rel="noreferrer">国外网友制作的Git Cheat Sheet</a></p><p><a href="https://mp.weixin.qq.com/s/1wFDbOm-FJ_NlBYvxN05Ng" target="_blank" rel="noreferrer">Git骚操作</a></p><p><a href="https://mp.weixin.qq.com/s/xQY5oFjwV7EAcWxT_7njfw" target="_blank" rel="noreferrer">团队合作必备的 Git 操作</a></p><p><strong>git &lt;command&gt; [options] [arguments]</strong></p><ul><li>[]: 可选</li><li>&lt;&gt;: 必选</li><li>{}: 单选</li></ul><p><img src="'+e+`" alt="bg2014061202"></p><p><strong>pull rebase</strong></p><div class="language-json"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">$ git stash</span></span>
<span class="line"><span style="color:#A6ACCD;">$ git pull --rebase</span></span>
<span class="line"><span style="color:#A6ACCD;">$ git push</span></span>
<span class="line"><span style="color:#A6ACCD;">$ git stash pop</span></span></code></pre></div><p><strong>git rebase</strong></p><ul><li><a href="https://juejin.im/post/6844903603694469134" target="_blank" rel="noreferrer">git merge 与 git rebase的区别</a></li><li><a href="https://www.liaoxuefeng.com/wiki/896043488029600/1216289527823648" target="_blank" rel="noreferrer">rebase</a></li></ul><h1 id="配置" tabindex="-1">配置 <a class="header-anchor" href="#配置" aria-label="Permalink to &quot;配置&quot;">​</a></h1><p>本地Git仓库和GitHub仓库之间的传输是通过SSH加密的，生成公钥私钥后，分发公钥，自己保留私钥。</p><ul><li>生成SSH密钥</li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">1. 创建密钥</span></span>
<span class="line"><span style="color:#A6ACCD;">ssh-keygen -t rsa -C &lt;注册使用的邮箱&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">或 ssh-keygen -t ed25519 -C &quot;your_email@example.com&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">将 user/.ssh/id_rsa.pub 中的内容复制到Github/Setting/SSH and GPG keys</span></span>
<span class="line"><span style="color:#A6ACCD;">2. 测试</span></span>
<span class="line"><span style="color:#A6ACCD;">ssh -T git@github.com</span></span></code></pre></div><ul><li>Git 是分布式版本管理，因此每台电脑需要自报家门。</li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">git config --global user.name &quot;xxx&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">git config --global user.email &quot;xxx&quot;</span></span></code></pre></div><p><code>global</code> 表示该电脑上的所有Git仓库都使用该配置信息。</p><ul><li>配置命令别名，当常用的命令或长的命令用短的别名代替</li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">git config --global alias.last = cat-file commit HEAD</span></span>
<span class="line"><span style="color:#A6ACCD;">% 用 last 代替 cat-file commit HEAD</span></span></code></pre></div><ul><li>设置<code>git commit</code>时打开的默认编辑器</li></ul><div class="language-json"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// 指定使用sublime Text编辑commit</span></span>
<span class="line"><span style="color:#A6ACCD;">修改或添加下面内容到git的全局配置文件.gitconfig，通常该文件在~/.gitconfig</span></span>
<span class="line"><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">core</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#A6ACCD;">  editor = &#39;/Applications/Sublime Text.app/Contents/SharedSupport/bin/subl&#39; -n -w</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">或者命令行中输入</span></span>
<span class="line"><span style="color:#A6ACCD;">git config --global core.editor </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">&#39;/Applications/Sublime Text.app/Contents/SharedSupport/bin/subl&#39; -n -w</span><span style="color:#89DDFF;">&quot;</span></span></code></pre></div><h1 id="创建版本库" tabindex="-1">创建版本库 <a class="header-anchor" href="#创建版本库" aria-label="Permalink to &quot;创建版本库&quot;">​</a></h1><ol><li>本地创建</li></ol><div class="language-tex"><button title="Copy Code" class="copy"></button><span class="lang">tex</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">git init</span></span></code></pre></div><h1 id="管理本地仓库" tabindex="-1">管理本地仓库 <a class="header-anchor" href="#管理本地仓库" aria-label="Permalink to &quot;管理本地仓库&quot;">​</a></h1><ul><li>本地文件更新，且未 add 到暂存区，撤销本地更改。</li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">git restore &lt;file&gt;</span></span></code></pre></div><ul><li>add 到暂存区(stage)，且未commit 到版本库，撤销add 更改，不影响本地文件。</li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">git restore --staged &lt;file&gt;</span></span></code></pre></div><ul><li>撤销最近的一次 commit</li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">git revert HEAD</span></span>
<span class="line"><span style="color:#A6ACCD;">在当前提交后面，新增一次提交，抵消掉上一次提交导致的所有变化。</span></span></code></pre></div><ul><li>修改commit的message</li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">git commit --amend &quot;xxx&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">  git commit -am &quot;message&quot;;  //</span></span></code></pre></div><ul><li>版本回退 git reset</li></ul><p>git reset让最新提交的指针回到以前某个时点，该时点之后的提交都从历史中消失。 默认情况下，git reset不改变工作区的文件（但会改变暂存区），--hard参数可以让工作区里面的文件也回到以前的状态。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">git reset HEAD^1  // 回退一个版本</span></span>
<span class="line"><span style="color:#A6ACCD;">git reset --hard HEAD^1</span></span></code></pre></div><ul><li><p>git diff：查看改动(谁和谁之间的改动？)</p></li><li><p>删除reflog 中的提交记录？</p></li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight has-diff"><code><span class="line"><span style="color:#A6ACCD;">git log --oneline</span></span>
<span class="line"><span style="color:#A6ACCD;">git reflog</span></span>
<span class="line"><span style="color:#A6ACCD;">git diff 工作区和版本库里面最新版本的区别：</span></span></code></pre></div><h1 id="远程仓库" tabindex="-1">远程仓库 <a class="header-anchor" href="#远程仓库" aria-label="Permalink to &quot;远程仓库&quot;">​</a></h1><p>本地Git仓库和GitHub仓库之间的传输是通过SSH加密的，生成公钥私钥后，分发公钥，自己保留私钥。</p><p>每个远程主机都有一个主机名，默认为 origin，</p><ul><li>克隆远程仓库</li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">git clone git@github.com:xx.git [本地目录名]</span></span>
<span class="line"><span style="color:#A6ACCD;">git clone -o &lt;主机名&gt; 地址</span></span></code></pre></div><ul><li>查看</li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">git remote -v</span></span></code></pre></div><ul><li>删除远程主机</li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">git remote rm &lt;主机名&gt;</span></span></code></pre></div><ul><li>重命名</li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">git remote rename &lt;原主机名&gt; &lt;新主机名&gt;</span></span></code></pre></div><ul><li>本地仓库关联远程仓库</li></ul><p>一个本地库可以关联多个远程库</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">git remote add [shortname] &lt;url&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">git remote add origin &lt;url&gt;</span></span></code></pre></div><ul><li>将本地仓库的当前分支推送到远程库。</li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;"># git push &lt;远程主机名&gt; &lt;本地分支名&gt;:&lt;远程分支名&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">git push -u origin master</span></span></code></pre></div><ul><li>git fetch</li></ul><p>这个命令会访问远程仓库，从中拉取所有你还没有的数据。 执行完成后，你将会拥有那个远程仓库中所有分支的引用，不会自动与本地仓库合并，可以随时合并或查看。fetch 后可以使用在本地使用&#39;远程库/分支&#39;访问，相当于远程库在本地的副本。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">git fetch &lt;远程仓库&gt;  // 拉取远程仓库的全部分支的更新</span></span>
<span class="line"><span style="color:#A6ACCD;">git fetch &lt;远程仓库&gt; &lt;远程分支&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">git merge &lt;远程库&gt;/&lt;分支&gt;  // 将拉取的更新合并到当前分支</span></span>
<span class="line"><span style="color:#A6ACCD;">origin/master</span></span></code></pre></div><ul><li>更新本地仓库到最新的版本，git pull</li></ul><p>git pull等于git fetch + git merge或fetch + git rebase。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">git pull &lt;远程主机名&gt; &lt;远程分支名&gt;:&lt;本地分支名&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">默认与本地当前分支合并</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">git pull origin master --allow-unrelated-histories</span></span></code></pre></div><p>git pull --rebase 合并远程仓库的变化到当前分支</p><ul><li><p>git merge</p></li><li><p>git rebase</p></li></ul><h1 id="分支" tabindex="-1">分支 <a class="header-anchor" href="#分支" aria-label="Permalink to &quot;分支&quot;">​</a></h1><p>关键字：HEAD master</p><p>每个分支都有一个指向该分支上提交节点的指针(引用)，如master 分支用master 指向节点，dev分支用dev 指向节点。在master分支上新增一个 <code>commit</code> 时，就会在该分支上新增一个节点，并且master 也会移动指向新的节点。HEAD 指向当前工作所在的分支中的位置，可以看作当前分支的别名，如HEAD指向master，master指向某个节点。<a href="https://www.liaoxuefeng.com/wiki/896043488029600/900003767775424" target="_blank" rel="noreferrer">参考</a></p><ul><li>查看分支</li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">git branch [-v | -a| -vv]</span></span>
<span class="line"><span style="color:#A6ACCD;">-v: 查看本地分支</span></span>
<span class="line"><span style="color:#A6ACCD;">-vv: 查看本地分支与远程分支之间的关联关系</span></span></code></pre></div><ul><li>新建分支</li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">git branch dev</span></span></code></pre></div><ul><li>切换分支</li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">git checkout dev #新版中使用 switch 替换checkout</span></span></code></pre></div><ul><li><p>切换分支会更新本地文件和暂存区(index)，工作区中的修改会保存(kept)。工作区和提交到暂存区中的修改，切换到其他分支时，这些修改会带到其他分支去(在其他分支也能看到)。</p></li><li><p>新建并切换分支</p></li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">// 注意是从哪个分支新建</span></span>
<span class="line"><span style="color:#A6ACCD;">git checkout -b dev / git swich -c dev</span></span></code></pre></div><p>**注：**在本地工作时要明确当前是在哪个分支上工作。</p><ul><li>本地分支关联远程分支，建立追踪关系</li></ul><div class="language-json"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">//  如果远程已经有了feature-branch，通过git fetch拉到本地，并通过以下命令在本地新建了feature-branch，并同远程分支关联。</span></span>
<span class="line"><span style="color:#A6ACCD;">git checkout -b feature-branch origin/feature-branch</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 手动关联</span></span>
<span class="line"><span style="color:#A6ACCD;">git branch --set-upstream-to=&lt;origin/branch_name&gt; 本地分支</span></span></code></pre></div><ul><li>本地分支push到远程分支</li></ul><div class="language-json"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">//</span></span>
<span class="line"><span style="color:#A6ACCD;">git push &lt;远程主机名&gt; &lt;本地分支名&gt;:&lt;远程分支名&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">git push origin local-branch:remote-branch</span></span></code></pre></div><p><img src="`+t+`" alt="image-20200816155017683"></p><ul><li>删除分支</li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;"># 删除本地分支</span></span>
<span class="line"><span style="color:#A6ACCD;">git branch -d &lt;branchname&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"># 删除远程分支</span></span>
<span class="line"><span style="color:#A6ACCD;">git push origin --delete &lt;branchName&gt;</span></span></code></pre></div><ul><li>进度尚未完成，保存进度。保存后工作区是干净的。</li></ul><p>切换分支会改变本地文件，如果本地修改未commit 是不能切换分支，但如果当前工作尚未完成不便提交 commit ，此使使用 stash 暂时保存本地文件。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;"># 查看stash</span></span>
<span class="line"><span style="color:#A6ACCD;">git stash list</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># 保存stash</span></span>
<span class="line"><span style="color:#A6ACCD;">git stash</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># 恢复stash</span></span>
<span class="line"><span style="color:#A6ACCD;">git stash pop/git stash apply</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># 删除stash</span></span>
<span class="line"><span style="color:#A6ACCD;">git stash drop stash@{n}</span></span></code></pre></div><p>参考: <a href="https://www.liaoxuefeng.com/wiki/896043488029600/900388704535136" target="_blank" rel="noreferrer">Bug分支</a></p><ul><li>合并某个提交</li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">git cherry-pick</span></span></code></pre></div><p><a href="https://mp.weixin.qq.com/s/1wFDbOm-FJ_NlBYvxN05Ng" target="_blank" rel="noreferrer">如何获取某个分支的某次提交内容？</a></p><ul><li>git pull</li></ul><div class="language-json"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// 拉取远程origin仓库的remote-branch 分支，然后与本地的local-branch 分支合并</span></span>
<span class="line"><span style="color:#A6ACCD;">git pull </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">origin</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">remote-branch</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;">:</span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">local-branch</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 拉取远程仓库中与本地当前分支建立追踪关系的分支，然后与本地当前分支合并</span></span>
<span class="line"><span style="color:#A6ACCD;">git pull </span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">git pull --rebase origin master</span></span></code></pre></div><p>参考：<a href="https://www.ruanyifeng.com/blog/2014/06/git_remote.html" target="_blank" rel="noreferrer">Git远程操作-阮一峰</a></p><ul><li>git fetch</li></ul><p>拉取远程仓库的分支，在本地生成或更新本地的引用(<code>origin/remote-branch</code>)</p><div class="language-json"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// 默认拉取远程仓库的全部分支的更新</span></span>
<span class="line"><span style="color:#A6ACCD;">git fetch </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">remote-repository</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">remote-branch</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 拉取远程仓库的全部更新</span></span>
<span class="line"><span style="color:#A6ACCD;">git fetch</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 只拉取远程仓库中master分支的更新</span></span>
<span class="line"><span style="color:#A6ACCD;">git fetch origin master</span></span></code></pre></div><ul><li>在本地分支与远程分支之间建立追踪关系</li></ul><div class="language-json"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">git branch --set-upstream local-branch origin/remote-branch</span></span></code></pre></div><ul><li>合并分支</li></ul><div class="language-json"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// 将dev分支合并到当前所在分支，当前所在分支会更新，将其他分支上的修改补充到当前分支</span></span>
<span class="line"><span style="color:#A6ACCD;">git merge dev  </span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 不使用fast forward快速合并</span></span>
<span class="line"><span style="color:#A6ACCD;">git merge --no-ff -m </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">xx</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> dev</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">git merge --abort</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">git merge --allow-unrelated-histories</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">git merge origin/remote-branch</span></span></code></pre></div><ul><li>rebase模式合并？参考：<a href="https://mp.weixin.qq.com/s/1wFDbOm-FJ_NlBYvxN05Ng" target="_blank" rel="noreferrer">Git骚操作</a></li></ul><p><strong>参考</strong>：</p><ul><li><a href="https://www.ruanyifeng.com/blog/2014/06/git_remote.html" target="_blank" rel="noreferrer">Git远程操作-阮一峰</a></li><li><a href="https://mp.weixin.qq.com/s/1wFDbOm-FJ_NlBYvxN05Ng" target="_blank" rel="noreferrer">Git骚操作</a></li></ul><h1 id="标签" tabindex="-1">标签 <a class="header-anchor" href="#标签" aria-label="Permalink to &quot;标签&quot;">​</a></h1><p>Tag 与commit 相关联，创建的Tag存储在本地，不会自动上传到远程库，</p><ul><li>查看Tag</li></ul><p><code>git tag</code></p><ul><li>添加Tag</li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">git tag &lt;TagName&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">% 默认将Tag添加到最新的commit上(HEAD指向的commit)，可以通过指定commit id，为指定的commit添加Tag.</span></span>
<span class="line"><span style="color:#A6ACCD;">git tag &lt;TagName&gt; [commitId]</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">git tag -a v1.4 -m &quot;my version 1.4&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">% 添加带注释的Tag</span></span>
<span class="line"><span style="color:#A6ACCD;">git tag -a &lt;TagName&gt; -m &quot;xx&quot; commitID</span></span></code></pre></div><ul><li>推送到远程</li></ul><p><code>git push origin TagName</code><code>git push origin --tags</code></p><ul><li>删除</li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">git tag -d TagName  % 删除本地Tag</span></span>
<span class="line"><span style="color:#A6ACCD;">git push origin :refs/tags/v0.9 % 删除远程Tag</span></span></code></pre></div><h1 id="git-commit" tabindex="-1">Git Commit <a class="header-anchor" href="#git-commit" aria-label="Permalink to &quot;Git Commit&quot;">​</a></h1><p>**一次commit只对应一件事。**需清晰明了，说明本次提交的目的。</p><p>commit message格式为<code>$type: $description</code>。</p><p>type用于说明commit的类型，只允许使用以下类型。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">* feat：新功能（feature）</span></span>
<span class="line"><span style="color:#A6ACCD;">* fix：修补bug</span></span>
<span class="line"><span style="color:#A6ACCD;">* docs：文档（documentation）</span></span>
<span class="line"><span style="color:#A6ACCD;">* style： 格式（不影响代码运行的变动）</span></span>
<span class="line"><span style="color:#A6ACCD;">* refactor：重构（即不是新增功能，也不是修改bug的代码变动）</span></span>
<span class="line"><span style="color:#A6ACCD;">* test：增加测试</span></span>
<span class="line"><span style="color:#A6ACCD;">* chore：构建过程或辅助工具的变动</span></span></code></pre></div><p>比如：一个组件现在有2个bug，按照以前我们是把2个bug都改了，再commit。而现在需要，解决一个bug就提交一次，并在commit message中写上<strong>fix: bug#1234</strong>（bug号）。</p><h1 id="commitizen" tabindex="-1">Commitizen <a class="header-anchor" href="#commitizen" aria-label="Permalink to &quot;Commitizen&quot;">​</a></h1><ul><li><a href="https://juejin.im/post/5afc5242f265da0b7f44bee4" target="_blank" rel="noreferrer">优雅的提交你的 Git Commit Message-掘金</a></li><li><a href="https://cloud.tencent.com/developer/article/1580371" target="_blank" rel="noreferrer">看下大厂 Git 提交规范是怎么做的-腾讯云</a></li></ul><h1 id="理论" tabindex="-1">理论 <a class="header-anchor" href="#理论" aria-label="Permalink to &quot;理论&quot;">​</a></h1><p><code>HEAD</code> 文件存放的是当前所在分支的引用。</p><h1 id="其他" tabindex="-1">其他 <a class="header-anchor" href="#其他" aria-label="Permalink to &quot;其他&quot;">​</a></h1><ul><li><a href="https://gitee.com/" target="_blank" rel="noreferrer">Gitee</a> 国内Git托管平台</li></ul><h2 id="commit-message-和-change-log-编写指南" tabindex="-1"><a href="https://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html" target="_blank" rel="noreferrer">Commit message 和 Change log 编写指南</a> <a class="header-anchor" href="#commit-message-和-change-log-编写指南" aria-label="Permalink to &quot;[Commit message 和 Change log 编写指南](https://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html)&quot;">​</a></h2><p><a href="https://mp.weixin.qq.com/s/XDINQCV2uv7TMhCi-ldGSw" target="_blank" rel="noreferrer">git rebase 与 merge的区别</a></p>`,126),i=[o];function c(r,g,C,u,h,d){return a(),l("div",null,i)}const y=s(p,[["render",c]]);export{A as __pageData,y as default};
