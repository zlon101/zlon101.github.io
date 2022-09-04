#!/usr/bin/env node

const { exec } = require('child_process');
const path = require('path');

const { log } = console;

const ArticleList = [
  '前端',
  '数据算法',
  '网络',
  'assets',
  'React',
  'Vue',
  '微前端.md',
  '爬虫.md',
  'Gatsby建站.md',
  'Git.md',
  'Linux命令.md',
  'TS基础.md',
];
const args = process.argv.slice(2);
if (!args.length) {
  log('\n❌ 请输入参数，如: dir=xxx msg=xxx');
  process.exit(1);
}

const param = args.reduce((acc, item) => {
  const [k, val] = item.split('=');
  acc[k] = val;
  return acc;
}, {});
const ArticleDir = param.dir;
const commitMsg = param.msg;
// const ArticleDir = 'workspace/TyporaNotes';
if (!ArticleDir) {
  log('缺少 dir 参数');
  process.exit(1);
}
if (!commitMsg) {
  log('缺少 msg 参数');
  process.exit(1);
}

const cwd = process.cwd();
const srcFiles = ArticleList.reduce(
  (acc, cur) => `${acc} ${ArticleDir}/${cur}`,
  ''
).trim();

log(`cwd: ${cwd}`);
// log(`srcFiles: ${srcFiles}`);

const dstArticleDir = `${cwd}/static/articles/`;
const copy = `rm -rf ${dstArticleDir}* && cp -r ${srcFiles} ${dstArticleDir}`;
const gitPush = `git add . && git commit -m "${commitMsg}" && git push origin master`;
const childProcs = exec(`${copy} && npm run build && ${gitPush}`, { cwd });
childProcs.stdout.on('data', data => log(`${data}`));
childProcs.stderr.on('data', data => log(`${data}`));
childProcs.on('exit', code => log(`$ End: ${code ? '失败' : '成功'}`));
