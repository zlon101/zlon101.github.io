/**
 * 解析文章目录
 * ****/
import path from "path";
import fs from "fs";
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const resolvePath = relaPath => path.resolve(__dirname, relaPath);
const isDir = absPath => fs.lstatSync(absPath).isDirectory();
const log = console.log;

const Blacklist = ['assets', 'public'];
let rootDir = '';
export default function getFileFromDir(dir, tree = {}) {
  !rootDir && (rootDir = dir);
  
  tree.link = dir.replace(rootDir, '').replace(/\.md$/, '').replace(/\\/g, '/');
  tree.text = path.basename(dir);
  
  const list = fs.readdirSync(dir);
  let itemPath = '', formatPath = '';
  list.forEach(item => {
    itemPath = path.join(dir, item);
    if (isDir(itemPath)) {
      if (Blacklist.includes(path.basename(itemPath))) {
        return;
      }
      const newDirNode = {
        items: [],
        collapsed: true,
      };
      if (!tree.items) {
        tree.items = [];
      }
      tree.link = false;
      tree.items.push(newDirNode);
      getFileFromDir(itemPath, newDirNode);
    } else if (/\.md$/.test(item)) {
      formatPath = itemPath.replace(rootDir, '').replace(/\.md$/, '').replace(/\\/g, '/');
      if (!tree.items) {
        tree.items = [];
      }
      tree.link = false;
      tree.items.push({
        text: path.basename(formatPath),
        link: formatPath,
      });
    }
  });
  sort(tree.items || []);
  return tree;
}

function sort(list) {
  list.sort((a, b) => {
    if ((a.items && b.items) || (!a.items && b.items)) {
      return 0;
    }
    if (a.items) {
      return -1;
    }
    return 1;
  });
  for (const one of list) {
    one.items && sort(one.items);
  }
}
