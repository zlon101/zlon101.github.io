import getMd from './.vitepress/parse-dir.mjs';
import path from "path";
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const resolvePath = relaPath => path.resolve(__dirname, relaPath);

const log = console.log;

const list = getMd(resolvePath('./articles'));
log(list)

// log(resolvePath('./xxx').replaceAll(path.sep, '/'))