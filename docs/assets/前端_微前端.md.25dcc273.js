import{_ as e,o as a,c as t,V as r}from"./chunks/framework.35aa2305.js";const f=JSON.parse('{"title":"微前端解决方案","description":"","frontmatter":{},"headers":[],"relativePath":"前端/微前端.md","filePath":"前端/微前端.md","lastUpdated":1691037194000}'),n={name:"前端/微前端.md"},i=r('<h1 id="微前端解决方案" tabindex="-1">微前端解决方案 <a class="header-anchor" href="#微前端解决方案" aria-label="Permalink to &quot;微前端解决方案&quot;">​</a></h1><p>微前端定义：Techniques, strategies and recipes for building a <strong>modern web app</strong> with <strong>multiple teams</strong> using <strong>different JavaScript frameworks</strong>. — <a href="https://micro-frontends.org/" target="_blank" rel="noreferrer">Micro Frontends</a></p><p>子项目独立部署运算</p><ol><li>single-spa：single-spa 是一个用于前端微服务化的JavaScript 前端解决方案(本身没有处理样式隔离， js 执行隔离) 实现了路由劫持和应用载入</li><li>qiankun：基于Single-SPA, 提供了更加开箱即用的API （ single-spa + sandbox+ import-html-entry ） 做到了，技术栈无关、并且接入简单（像iframe 一样简单）</li></ol><p><a href="https://segmentfault.com/a/1190000040275586" target="_blank" rel="noreferrer">微前端解决方案</a><a href="https://juejin.cn/post/6844904185910018062#heading-29" target="_blank" rel="noreferrer">qiankun 微前端方案实践及总结</a><a href="https://juejin.cn/post/6844904162509979662" target="_blank" rel="noreferrer">微前端-最容易看懂的微前端知识</a><a href="https://stackblitz.com/github/webpack/webpack.js.org/tree/master/examples/module-federation?file=README.md&amp;terminal=start&amp;terminal=" target="_blank" rel="noreferrer">Module Federation</a></p><h1 id="qiankun" tabindex="-1"><a href="https://www.npmjs.com/package/qiankun" target="_blank" rel="noreferrer">qiankun</a> <a class="header-anchor" href="#qiankun" aria-label="Permalink to &quot;[qiankun](https://www.npmjs.com/package/qiankun)&quot;">​</a></h1><ol><li>一个子项目一个服务，不同服务端口不同，怎么解决跨域？</li><li>资源会不会重复加载？</li><li>路由动态配置？</li><li>沙箱？JS、CSS隔离</li></ol><ul><li>onGlobalStateChange</li><li>setGlobalState</li></ul><blockquote><p>微应用暴露出的生命周期钩子，微应用需要提供生命周期钩子；</p></blockquote>',9),l=[i];function o(s,p,c,_,h,d){return a(),t("div",null,l)}const u=e(n,[["render",o]]);export{f as __pageData,u as default};
