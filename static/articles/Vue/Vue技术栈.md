#### Vue全家桶

- vuex：状态管理
- vue-router：路由
- vue-resource & axios(通用)：http请求
- vuelidate：表单验证

#### Vuex

##### 1. 基本使用

```js
import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        count: 0
    },
    // 读取状态, 插值表达式{{ $store.getters.doubleCount }}
    getters: {
        // 类似计算属性computed, 起到缓存的作用
        doubleCount(state){
            return state.count * 2;
        }
    }
    
    /*
	mutations:
    	由组件触发:
    	<button @click="$store.commit('increment', 2)">触发commit</button>
    */
    mutations: {
        increment(state, newV){
            state.count = state.count + newV;
        }
    },
    
    /*
    触发方式
    	<button @click="$store.dispatch('incrementAction', 2)">触发dispatch</button>
    	
    	actions 应该避免直接操作 state，state 的更改应该由 mutations 完成, 否则vue-devtools插件无法记录state的变更。
    	actions 可以根据当前 state 进一步处理数据, 计算或请求后端接口, 然后通过commit的方式提交给mutations去处理。

    */
    actions: {
        incrementAction(ctx, newV){
            let commit = ctx.commit;
            setTimeout( () => commit('increment'), 3000);
        }
    }
});

new Vue({
    store: store,		// 在组件实例中通过this.$store访问该store
    render: h => h(App)
}).$mount('#app');

// 在组件实例中读取store
computed: {
	count(){
        return this.$store.state.count;
    }
}

// 修改store

```

##### 2. 核心概念和原理

<img src="assets/Vue%E6%8A%80%E6%9C%AF%E6%A0%88/1561195170226.png" alt="1561195170226" style="zoom: 67%;" />   <img src="assets/Vue%E6%8A%80%E6%9C%AF%E6%A0%88/1561203551146.png" alt="1561203551146" style="zoom:67%;" />    





- **vuex底层实现**

  ```js
  // 简化版Vuex vue-min.js
  import Vue from 'vue'
  const Store = function Store (options = {}) {
    const {state = {}, mutations={}} = options;
    this._vm = new Vue({
      data: {
        $$state: state
      },
    })
    this._mutations = mutations
  }
  
  Store.prototype.commit = function(type, payload){
    if(this._mutations[type]) {
      // this.state访问的是原型上面的state 数据项
      this._mutations[type](this.state, payload)
    }
  }
  
  Object.defineProperties(Store.prototype, { 
    state: { 
      get: function(){
        // this._vm._data 而不是 _vm.data,  
        return this._vm._data.$$state
      } 
    }
  });
  export default {Store}
  
  // 使用简化版Vuex
  impore vuexMin from 'vue-min.js';
  
  const store = new vuexMin.Store({
      state: {
          count: 0
      },
      mutations: {
          increment(state, newV){
              state.count = state.count + newV;
          }
      }
  })
  
  Vue.prototype.$store = store;
  new Vue({
      el: 'xx',
      rendre: ...
  });
  ```


##### 1. Vuex结构

<table style='width:50px'>
<tr>
	<th colspan="2">this.$store</th>
</tr>
<tr>
	<td rowspan="2" style='vertical-align:center'>getter</td>
	<td>action</td>
</tr>
<tr>
	<td>mution</td>
</tr>
<tr>
	<td colspan="2">this.$store.state</td>
</tr>
</table>



##### 问答

1. $store是如何挂载到实例this上的?
2. 



---

#### [vue-router使用](https://router.vuejs.org/zh/)  

> - 作用：通过组合组件组成应用。将组件 (components) 映射到路由 (routes)，然后告诉 Vue Router 在哪里渲染组件。



1. 安装vue-router，js文件导入，注册，配置

   npm install vue-router --save

   ```javascript
   // main.js
   import VueRouter from 'vue-router';
   import Vue from 'Vue';
   
   Vue.use(VueRouter);				// 注册插件
   
   const router = new VueRouter({	// 配置路由
       mode: 'history',
       routes: [
           {path: '/', component: 组件1}
           ...
       ]
   });
   
   // 根实例
   new Vue({
       el: '#app', 
       router: router
   })
   ```

2. 使用\<router-view>挂载路由，\<router-link>链接路由

#### 预渲染

单页面(SPA) 应用的 SEO 优化有服务端渲染(SSR) 和页面预渲染两种方法。

- 预渲染的使用场景更多是简单的静态页面，加快页面的加载速度，并且侵入性更小，在已上线的项目稍加改动也可以轻松引入预渲染机制。
- 服务端渲染适用于复杂、较大型、与服务端交互频繁的功能型网站，比如电商网站。SSR方案则需要将整个项目结构推翻。

##### vue 预渲染实现

> 插件：prerender-spa-plugin & vue-meta-info
>
>  npm install prerender-spa-plugin --save-dev

```js
// vue.config.js
// 这三项一定要有，因为下面configureWebpack中用到了
const PrerenderSPAPlugin = require('prerender-spa-plugin');
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;
const path = require('path');

module.exports = {
  // 预渲染关键配置
  configureWebpack: () => {
    if (process.env.NODE_ENV !== 'production') return;
    return {
      plugins: [
        new PrerenderSPAPlugin({
          // 生成文件的路径，也可以与webpakc打包的一致。
          // 下面这句话非常重要！！！
          // 这个目录只能有一级，如果目录层次大于一级，在生成的时候不会有任何错误提示，在预渲染的时候只会卡着不动。
          staticDir: path.join(__dirname, 'dist'),
  
          // 对应自己的路由文件，如果有参数需要写具体参数，比如/a/:id需要写/a/123456
          routes: ['/', '/about'],
  
          // 这个很重要，如果没有配置这段，也不会进行预编译
          renderer: new Renderer({
            inject: {
              foo: 'bar'
            },
            headless: false,
            // 在 main.js 中 document.dispatchEvent(new Event('render-event'))，两者的事件名称要对应上。
            renderAfterDocumentEvent: 'render-event'
          })
        })
      ]
    };
  }
};

// main.js
  new Vue({
    router,
    store,
    render: (h) => h(App),
    // 添加mounted，不然不会执行预编译
    mounted() {
      document.dispatchEvent(new Event('render-event'));
    }
  }).$mount('#app');

```



- 服务端配置

  ```js
  History 模式需要后台配置支持，最简单的是通过 nginx 配置 try_files 指令。
  ```


##### vue-meta-info

- 组件内使用

  ```js
  <script>
    export default {
      metaInfo: {
        title: 'My Example App', // set a title
        meta: [{                 // set meta
          name: 'keyWords',
          content: 'My Example App'
        }]
        link: [{                 // set link
          rel: 'asstes',
          href: 'https://assets-cdn.github.com/'
        }]
      }
    }
  </script>
  ```


#### 单页面首屏加载优化

1. 路由懒加载
2. 按需加载三方资源，如iview,建议按需引入iview中的组件
3. 将一些静态js css放到其他地方（如OSS），减小服务器压力
4. 使用CDN资源,减小服务器带宽压力
5. 使用nginx开启gzip减小网络传输的流量大小
6. 若首屏为登录页，可以做成多入口，登录页单独分离为一个入口
7. 使用uglifyjs-webpack-plugin插件代替webpack自带UglifyJsPlugin插件

---

#### vue资源

- [vue 项目接口管理](https://mp.weixin.qq.com/s?__biz=MjM5NTEwMTAwNg==&mid=2650215743&idx=1&sn=2e2e67c19d24816c71351e81ef03a03d&chksm=befe151e89899c08cb755d67b14cd967f901e254c4e97e4a726b97cacdcb67faa52cc755f697&scene=0&key=2bb12b254a1b9904689047cb60b0e67a6d34c1466c57dc39d88f470f6ea5d06cc8b576a7eebc2a97aff410a4a7b0971419dea5e96612d186881de313fd07ea0296760dba9c91a8dbe297bfe59adf6437&ascene=1&uin=Mjc2NDI1NDU2NA%3D%3D&devicetype=Windows+7&version=62060720&lang=zh_CN&pass_ticket=Pn9cJyIWK2xt%2BmQltkMddf4S5oGoplFdiJ%2B16Yj6gD8L9Zd0WMlQ1u32%2FRJtZE1p)

---

- `$nextTick` 是在下次 DOM 更新循环结束之后执行延迟回调，在修改数据之后使用 `$nextTick`，则可以在回调中获取更新后的 DOM；
- 



