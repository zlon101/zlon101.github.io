> https://nextjs.org/


serverless function？


> 目录

├─public
├─style
├─components
│  ├─layout
│  └─comp2
│─pages
    ├─_app.j
    └─page-1
    └─page-2



# 渲染方式

## Pre-rendering

默认所有的页面都会被 pre-rendering，Next.js 有两种 pre-rendering 形式，他们的区别在于生成 HTML 的时机。

Next.js has two forms of pre-rendering: [**Static Generation**](https://www.nextjs.cn/docs/basic-features/pages#static-generation-recommended) and [**Server-side Rendering**](https://www.nextjs.cn/docs/basic-features/pages#server-side-rendering). 

1. [**Static Generation**](https://www.nextjs.cn/docs/basic-features/pages#static-generation-recommended) is the pre-rendering method that generates the HTML at **build time**. The pre-rendered HTML is then *reused* on each request.

在用户请求之前生成页面，不涉及动态数据，无法使用仅在请求期间可用的数据，例如查询参数或HTTP标头。

**API**：getStaticProps，只在服务端执行

In development mode (when you run `npm run dev` or `yarn dev`), every page is [pre-rendered](https://www.nextjs.cn/docs/basic-features/pages#pre-rendering) on each request — even for pages that use [Static Generation](https://www.nextjs.cn/docs/basic-features/pages#static-generation-recommended).

[`getStaticProps`](https://www.nextjs.cn/docs/basic-features/data-fetching#getstaticprops-static-generation) runs **only on the server-side**. It will never run on the client-side. It won’t even be included in the JS bundle for the browser. 

2. [**Server-side Rendering**](https://www.nextjs.cn/docs/basic-features/pages#server-side-rendering) is the pre-rendering method that generates the HTML on **each request**.

每次请求时，获取数据，然后生成 HTML 文件

**API**：getServerSideProps，只在服务端执行

Serve-Side Rendering 的 TTFB 比 Static Generation 慢



Q：如何判断一个页面是静态生成的页面？

A：如果没有阻塞数据要求，Next.js 就会自动判断页面是静态的。这意味着页面中没有 getServerSideProps 和 getInitialProps。



> 根据动态路由生成静态 HTML

<img src="./assets/nextjs/how-to-dynamic-routes.png" alt="how-to-dynamic-routes" style="zoom:50%;" /> 

## Client-side Rendering

Client-side 请求数据推荐使用 Nextjs 内置的 `swr` hook

#  Incremental Static Regeneration (ISR)

增量静态再生
