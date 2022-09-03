> - Hybrid App的本质，其实是在原生的 App 中，使用 WebView 作为容器直接承载 Web页面。因此，最核心的点就是 Native端 与 H5端 之间的**双向通讯层**，其实这里也可以理解为我们需要一套**跨语言通讯方案**，来完成 Native(Java/Objective-c/...) 与 JavaScript 的通讯。这个方案就是我们所说的 JSBridge，而实现的关键便是作为容器的 WebView，一切的原理都是基于 WebView 的机制。
> - WebView是一个基于webkit引擎、展现web页面的控件。

# H5开发

Hybrid  APP开发方式，即App中既有原生页面又有H5页面的混合开发模式。

- 原生开发：使用Android 或IOS对应的编程语言在相应的平台上进行开发，不能跨平台开发，App页面上包含的所有UI元素、数据内容等随App安装到手机上，离线状态下也能使用大部分内容。如果页面内容有更新，则需要发布新的App版本并且用户更新版本才能看到。
- H5页面：使用html+js+css等web技术开发的页面就是H5页面。H5表示HTML5，是由w3c制定的HTML标准。H5页面通过浏览器运行，支持跨平台开发，只需要开发一套代码就可以在Android、IOS和Windows上运行。开发者更新页面内容后用户可以直接查看新的页面，不需要更新App版本。
- 混合开发：同时使用原生和web技术进行App开发，因为web页面需要浏览器支持，原生代码利用webview（Android）或UIWebview\WKWebView（IOS）为H5页面提供容器。

# webview



WebView是一个基于webkit引擎、展现web页面的控件。JavaScript 执行在 WebView 的 Webkit 引擎中。webview提供了原生与H5（java与JavaScript）之间双向通讯的方案，即JSBridge。JSBridge 是一种 JS 实现的 Bridge，实现了JS调用原生和原生调用JS。

实现上分为4点：

(1). 原生编写方法供H5调用
(2). 原生调用H5提供的方法
(3). H5编写JS方法供原生调用
(4). H5调用原生提供的方法

其中第(1)、(2)点在原生中实现，第(3)、(4)点在H5中实现。

**1.JavaScript调用原生的方式** 

- 拦截url scheme
  
   在 WebView 中发出的网络请求，原生都能进行监听和捕获。因此由 h5 发起一个自定义协议请求，app 拦截这个请求后，根据请求的协议、参数、回调等进行处理，再由 app 调用 h5 中的回调函数。
   详细步骤如下：
   
   - 发起一个如`jsbridge://methodName?param1=value1&param2=value2`自定义协议的网络请求有两种方式：1. 通过localtion.href；2. 通过iframe方式； 通过location.href有个问题，同时并发多次请求会被合并成为一次，导致协议被忽略，也就是连续多次修改`window.location.href`的值，在Native层只能接收到最后一次请求，前面的请求都会被忽略掉。
   
   - Webview 端通过`iframe.src`发送 url scheme 请求，之后 Native使用 `shouldOverrideUrlLoading`方法拦截到请求并对url协议进行解析，根据 url scheme（包括所带的参数）进行相关操作。
   
     ```js
     let url = 'jsbridge://xxx/xxx';
     let iframe = document.createElement('iframe');
     iframe.src = url;
     document.body.appendChild(iframe);
     ```
   
   - 原生解析自定义协议请求并处理后，需要将处理结果返回给H5，这里有两种方法实现：
   
     1. 原生调用H5提供在`window`上提供的回调函数
     2. 通过事件监听：H5发送自定义协议请求时在`window`上添加一个事件监听器，同时指定一个事件响应函数。原生处理完数据后通过`window.dispatchEvent(event)` 派发一个事件并且将需要返回的数据传递出去。
   
- 注入API：Native 获取 JavaScript环境上下文，并直接在上面挂载对象或者方法，使 js 可以直接调用，Android 与 IOS 分别拥有对应的挂载方式。但是这种方法存在一定的安全隐患。

- 原生重写windows上的方法：使用prompt、console.log、alert方式，在webview层重写这三个方法。

**Native调用JavaScript** 

Native调用JS只需要H5在在全局暴露一些方法供原生调用，

```js
window.sdk = {
  double: val => val*2
}
```

原生调用的方式：

1. 使用webview的loadurl调用

   ```java
   webview.loadurl('javascript:JSBridge.trigger("webviewReady")')
   ```

2. evaluateJavascript：Android 4.4+可以使用evaluateJavascript实现Native调用JS

   ```java
   webview.evaluateJavascript('window.sdk.double(4)');
   ```

   


# 参考

- [Hybrid App技术解析 -- 原理篇](https://juejin.im/post/5b4ff3bee51d4519721b9986) 
- [JSBridge的原理](https://juejin.im/post/5abca877f265da238155b6bc) 
- [h5 与原生 app 交互的原理](https://mp.weixin.qq.com/s/zA2605MoYUXLI4oL46WU0Q) 
- [Hybrid App技术解析 -- 原理篇](https://mp.weixin.qq.com/s/x-mmH0g3Y0AaFDqmIDzdhQ) 
- [Hybrid App 技术解析——实战篇](https://mp.weixin.qq.com/s/JoESG2ANTu91rnYih0kvfw) 
- [H5 与 Native 交互之 JSBridge 技术](https://mp.weixin.qq.com/s/6pYUMtf_7fM_1Zg7qrNIAA)
- [JSBridge深度剖析](https://blog.csdn.net/xiangzhihong8/article/details/66970600) 
