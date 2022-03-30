#!/usr/bin/env node

const { exec } = require('child_process');

const { log } = console;
const ArticleDir = '/Users/zz-b93/workspace/TyporaNotes';
const ArticleList = ['前端', '数据结构与算法', '网络基础', 'assets', 'React', 'Vue', '图标.md', '微前端.md', 'Gatsby建站.md', 'Git.md', 'Linux命令.md', 'TS基础.md'];
const args = process.argv;
const commitMsg = args[2];

if (!commitMsg) {
  console.error('commit msg is null');
  process.exit(1);
}

const cwd = process.cwd();
const srcFiles = ArticleList.reduce((acc, cur) => `${acc} ${ArticleDir}/${cur}`, '').trim();

log(`cwd: ${cwd}`);
// log(`srcFiles: ${srcFiles}`);

const copy = `cp -r ${srcFiles} ${cwd}/static/articles/`;
const gitPush = `git add . && git commit -m "${commitMsg}" && git push origin master`;
const childProcs = exec(`${copy} && npm run build && ${gitPush}`, { cwd });
childProcs.stdout.on('data', data => log(`${data}`));
childProcs.stderr.on('data', data => log(`${data}`));
childProcs.on('exit', code => log(`$ End: ${code ? '失败' : '成功'}`));