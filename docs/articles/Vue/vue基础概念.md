> - 什么是字符串模板：单文件中的template 和 实例化vue对象时的template 属性。
> 
>- DOM 模板：在 html 文件中编写的html标签(包含自定义标签)，直接在DOM中使用组件。
> - html 属性名和属性值



- vue 实例属性：`data、computed、methods、props` 中的属性都挂载到 vue 实例的一级属性上。
- `computed` 可以依赖多个vue 实例属性，并根据依赖进行缓存。

- 指令：指令可以带参数和修饰符，指令绑定的表达式。指令的值是多少？



- Vue 推荐在绝大多数情况下使用**模板**来创建你的 HTML。然而在一些场景中，你真的需要 JavaScript 的完全编程的能力。这时你可以用**渲染函数**，它比模板更接近编译器。
- Vue 的模板实际上被编译成了渲染函数



# 组件

> 组件是可复用的 Vue 实例
>
> 根实例特有选项: el

创建组件的方式有哪些？

- 使用 Vue.component 或 Vue.extend 定义组件

- 全局注册

  ```vue
  Vue.component('my-component-name', {
    // ... options ...
  })
  ```

  



函数式组件和类组件：函数式组件只是函数，所以渲染开销也低很多

vue-class-component 和 vue-property-decorator

vm 表示实例，h 表示 createElement



组件的选项对象

```js
var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
})
```



为了能在模板中使用，这些组件必须先注册以便 Vue 能够识别。这里有两种组件的注册类型：全局注册和局部注册。

// 定义一个名为 button-counter 的新组件

// 全局注册：全局注册的行为必须在根 Vue 实例 (通过 new Vue) 创建之前发生



html 的属性名不区分大小写，都是小写

html 属性值只能是字符串？

```vue
Vue.component('button-counter', {
  data() {
    return {
      count: 0
    }
  },
  props: ['title'],
  template: <button v-on:click="count++">You clicked me {{ count }} times.</button>
})
// ***********************************************************
props: ['initialCounter'],
data(){
  return {
    counter: this.initialCounter
  }
}
```



## [动态组件](https://cn.vuejs.org/v2/guide/components.html#%E5%8A%A8%E6%80%81%E7%BB%84%E4%BB%B6)  

```html
<tbody is="my-cmp"></tbody>
```

`tbody` 在渲染时被替换为`my-cmp` 组件



$emit ==> $event

自定义事件(非click)

- $emit：触发一个事件
- $event：

---

# vue组件三大核心概念

<img src="assets/vue%E5%9F%BA%E7%A1%80%E6%A6%82%E5%BF%B5/vue%E7%BB%84%E4%BB%B6%E6%A0%B8%E5%BF%83%E6%A6%82%E5%BF%B5.jpeg" alt="vue组件核心概念" style="zoom: 67%;" />    

- 原生组件(也叫 HTML 元素)的构成：`<div id='app' style='width:70%'>内容</div>`，开始标签、内容、结束标签、属性(特性)、属性值；自定义组件也由这些部分构成。

  ```html
  <!--使用自定义组件-->
  <my-component name='czl'>
      <!-- 此处为组件内容，通过slot插槽传递 -->
      <p></p>
      <div></div>
  </my-component>
  ```



> - 一个 Vue 应用由一个通过 new Vue 创建的**根 Vue 实例**，以及可选组件树组成；
> - 在 Vue 里，一个组件本质上是一个拥有预定义选项的一个 **Vue 实例**，每个组件都会各自独立维护它的 data对象。因为你每用一次组件，就会有一个它的新**实例**被创建，所以data对象是通过函数返回；
> - 在组件上使用**v-for**时，**key** 是必须提供的；
> - **组件有自己独立的作用域，**数据不会传递到组件内 ，因此使用**props**向组件内部传递数据； 
> - 不要在选项属性或回调上使用箭头函数；
> - Vue 将模板编译成虚拟 DOM 渲染函数；



Vue最核心的功能：数据的双向绑定，实时同步数据，数据驱动DOM。

- Q:数据双向绑定是哪两方数据?    
  - A:HTML元素数据(表单元素)--Vue实例中的data将元素的属性与属性值分离，其值存放在Vue实例中；用v-model、v-bind将元素属性与其属性值相互绑定。

- Vue创建的实例代理了data和method属性，所以可以直接通过实例（this.**）访问；

- 实例属性与方法用$开头来访问，如vueApp.$el可以访问元素；

## Vue构成

1. 组件化
2. 数据驱动 & 状态管理(vuex)
3. 指令

## 计算属性 & watch

1. 计算属性只能执行同步代码，计算属性根据响应式依赖进行缓存，当依赖的数据没有更新时，多次访问计算属性直接取缓存的值；
2. watch 可以执行异步操作；


## 1. 属性

**1.1 分类**

- 自定义属性props
- 原生属性attrs
- 插槽props
- 特殊属性class、style

data与props的区别？

单向数据流？

### Vue为什么禁止修改父组件传递进来的props， 又是如何监控到子组件修改了props?

- 因为Vue遵循单向数据流，模型(比如props数据)渲染视图，如果允许子组件修改父组件传递的值，那么同一父组件的其他子组件就会受影响，导致数据流向很混乱，所以禁止子组件修改props。可以通过父组件传递一个回调函数实现。Vue通过 `defineProperty`  定义属性的属性描述符中的`get`和`set`，当修改属性时判断是否是父组件触发的修改。

### 组件内部修改 props 的方法

1. 拷贝至 data 或 计算属性，结合 emit 实现父组件更新；
2. `sync` 修饰符；
3. 将 props 包装为对象，因为 props 传递是引用；

## 2. 事件

- 事件驱动 & 数据驱动
- 普通事件 & 修饰符事件

在自定义组件上注册监听原生事件(如click)，使用 native 事件修饰符 `<my-componenet @click.native="handle"></my-component>`；因为 my-component 不在DOM树上，添加的是组件内模板的代码(组件模板默认会继承非props特性)，如果没有 native 修饰，则原生的监听器(click)没有作用；注意自定义事件this.$emit不需要native修饰。

## 3. 插槽

- 普通插槽
- 作用域插槽

参考链接: [详解vue组件三大核心概念](<https://mp.weixin.qq.com/s?__biz=Mzg5ODA5NTM1Mw==&mid=2247483942&idx=1&sn=bb123cb4d34f94f79881f0fa226da26b&chksm=c06683b0f7110aa6baf6e8ab59870a10fbf9a07083910054a25e67e50d306985103570d88ca2&mpshare=1&scene=1&srcid=&key=3e64675c4af2e8c1cb87133eea4dc87d7279f068d389ab5644397f9f2d0c1e1cd7e62cc0d356a7eed5b35b508b65ab0ee65bab9587ba98854bfbffa1c964800fab1fc979d082faa5ab76ece9c4c63431&ascene=1&uin=Mjc2NDI1NDU2NA%3D%3D&devicetype=Windows+7&version=62060739&lang=zh_CN&pass_ticket=S8Ujki2fz5qcjOi%2B1GEFSYgOxjQ%2BmiRmgp17ybRU2kbGBIyFXc%2FGjUjxA3p23gkD>)

# 组件构成

## props

> `props`  的 key & value，类型、默认值、验证

- props属性：定义组件时，在组件实例的props选项上声明的属性；可以通过`this.$props`获取该属性，直接使用`v-bind=$props`在`<template>`中的元素上进行绑定。
- 非props属性：使用组件时，定义了未在props选项上声明的属性；`$attrs` 可以访问非 `props` 属性。默认情况下，所有的非props属性被组件\<template>的根元素继承；通过`inheritAttrs`设置根元素是否继承非`props`属性

  ```javascript
  <my-component name="czl" age="22"></my-component>
  局部注册
  new Vue({
    el:"#app",
    components:{
        myComponent:{
            inheritAttrs:false,	默认为true            
            template: '<div id="root"><input v-bind=$attrs></div>'
        }
    }
  })
  ```

## 无参bind

- v-bind:参数='表达式'

- 使用无参的bind指令可以一次动态绑定多个值，等价于将属性名作为参数

  ```html
  <MyCom v-bind="obj"/>
  obj: {
  	name: 'czl',
  	age: 22
  } 
  // 等价于 <MyCom v-bind:name="obj.name" :age="obj.age">
  ```
  
  

## slot

- slot：分发__内容__(元素由开始标签、结束标签和**内容**构成)，当有多个内容需要分发时，通过指定slot.name即具名slot实现。
- 插槽prop: 绑定在`<slot>`上的特性

## watch监听引用数据

- 监听复杂数据(object、array)
  
    ```js
  watch: {
    obj: {
          deep: true,
          handle: function(newValue, oldValue){
               ...
          }        
      }
  }
  ```


## keep-alive

- 将组件\<my-component>进行缓存，避免每次重新渲染组件(create, mounte等)，用于路由及组件切换(动态组件\<component v-bind:is="cmp">)。

	```html
  <keep-alive>
     <my-component></my-component>
  </keep-alive>
	```

## native

- 若没有修饰符native，那下面的@click就是自定义事件click而非原生click
  
  ```html
  <mycomponent @click.native='handleClick'></mycomponent>
  ```
  

# key

vue和react的虚拟DOM的Diff算法大致相同，其核心是基于两个简单的假设：

1. 两个相同的组件产生类似的DOM结构，不同的组件产生不同的DOM结构。
2. 同一层级的一组节点，他们可以通过唯一的id进行区分。

基于以上这两点假设，使得虚拟DOM的Diff算法的复杂度从O(n^3)降到了O(n)。



- `key` 的作用是给予一个节点唯一的身份识别，有相同父元素的子元素必须有独特的 `key`，特别是列表渲染时的节点，因为相同的组件产生类似的DOM结构 。这样在使用Diff算法对新旧虚拟DOM进行比较时，计算出哪些节点是可以**就地复用或者调整顺序**，可以更高效的重用排序现有的元素；比较时，依次对比两个节点的类型、属性、子节点。
- key的作用主要是为了高效的更新虚拟DOM。

# 组件通信

1. props & emit：自定义属性和自定义事件
2. $refs、$parent、$children
3. provide & inject
4. $attrs & $listeners
5. Event Bus
6. vuex

- [SegmentFault参考](<https://mp.weixin.qq.com/s?__biz=MjM5NTEwMTAwNg==&mid=2650215866&idx=1&sn=c4cc189d145d5c358db61697ca70a82e&chksm=befe159b89899c8d4ae785b5f63063434dc1279830c020d8b60985e8e6a36a2e55f93a2ac6d4&scene=0&key=2bb12b254a1b99044f1b54db34647d49c8c06f37b302512cea302a011df276cdf11973e6bbdd41b9ebfa174ff119d5b271bd567f7bbc5eb6a01718c24400c75602ee6810ea48253930f85fd15310ff25&ascene=1&uin=Mjc2NDI1NDU2NA%3D%3D&devicetype=Windows+7&version=62060739&lang=zh_CN&pass_ticket=Ssclv0EjFV5vOJWuvp4F%2F2EaOid5lYknyYjfJDT8vOG1egweHVyv%2ByaE%2BGO8rIc8>)

# Virtual DOM

## Diff 算法

Diff 算法将时间复杂度从O(n3)减少到O(n)；

diff 算法包括几个步骤：

1. 用 JS 对象表示 DOM 树的结构，然后用这个树构建一个真正的 DOM 树，插到文档当中；
2. 当状态变更的时候，重新构造一棵新的对象树，然后用新的树和旧的树进行比较(同层比较)，记录两棵树差异；
3. 把所记录的差异应用到所构建的真正的DOM树上，视图就更新了；

参考：

- [揭秘Vue中的Virtual Dom](https://mp.weixin.qq.com/s?__biz=Mzg5ODA5NTM1Mw==&mid=2247484031&idx=1&sn=ece0d952f7192b3d408da5fc68a880a4&chksm=c06683e9f7110aff8b0b9f0cbbd5de34754c28c1176189964564ed5cd28a459e6f9e09be54d5&mpshare=1&scene=1&srcid=&key=3e64675c4af2e8c1434a938098a616e5abdb665d9e84903be474c86d977e282af3b8878d3952b0c28b6c2d63d63a00ed7195b0d74798baf1d7c34bd3d2ead3a110f204c293a0583dab0b48772f18fb87&ascene=1&uin=Mjc2NDI1NDU2NA%3D%3D&devicetype=Windows+7&version=62060833&lang=zh_CN&pass_ticket=WoiLyjX22pgkcex3J0Zr4C7XhoDMUgwrJ0I8gXuNREhi9k%2F0J3OO2IhX87FJPVXU)

# render & JSX & 函数组件 

如何描述组件的UI和状态信息？

1. 字符串模板
2. __`<template>`__
3. render 函数

这三中方法的作用都是一样的(可以相互替换)

## 1.render

<u>render 函数</u>

- ```js
  new Vue({
    render(h){
      h('p', 子节点);
      // h 即 createElemnet
    }
  })
  ```

- 

[Vue官网API](https://cn.vuejs.org/v2/api/#render)

- **createElement** 的返回值是什么?
  createElement的返回的不是一个实际的  DOM 元素。它更准确的名字可能是 `createNodeDescription`，因为它所包含的信息会告诉 Vue 页面上需要渲染什么样的节点，包括及其子节点的描述信息。我们把这样的节点描述为“虚拟节点 (virtual node)”，也常简写它为“**VNode**”。“虚拟 DOM”是我们对由 Vue 组件树建立起来的整个 VNode 树的称呼。

[render 和 template 的关联](#)

- template 模板的来源？
  当 Vue 选项对象中有 render 渲染函数时，Vue 构造函数将直接使用渲染函数渲染 DOM 树，当选项对象中没有 render 渲染函数时，Vue 构造函数首先通过将 template 模板编译生成渲染函数，然后再渲染 DOM 树，而当 Vue 选项对象中既没有 render 渲染函数，也没有 template 模板时，会通过 el 属性获取挂载元素的 outerHTML 来作为模板，并编译生成渲染函数。

## 2.函数式组件

特点：

1. 声明了functional: true; 
2. render(h, context);     // 由第二个参数提供状态数据, h-->createElement

## 3.JSX

**JSX只是JS的语法扩展，在JS文件中使用。**

**插件**：@vue/babel-preset-jsx @vue/babel-helper-vue-jsx-merge-props

https://github.com/vuejs/jsx#installation

__Demo：__

- render(h, ctx)中第一个参数在某些版本下只能用名称h，详细见**[Vue-函数式组件]([https://cn.vuejs.org/v2/guide/render-function.html#%E5%87%BD%E6%95%B0%E5%BC%8F%E7%BB%84%E4%BB%B6](https://cn.vuejs.org/v2/guide/render-function.html#函数式组件))**

  ```js
  <template>
  	<VNode :vnodes="getJSXSpan()" info="info"/><hr>
  </template>
  
  <script>
  export default {
  components: {    
      // 函数组件
      VNode: {
          functional: true,
          
          // 第一种使用方法
          render: (h, ctx) => {
              return h('div', {
                  style: {
                      color: 'blue'
                  },
                  attrs: {
                      id: "funCom"
                  }
              }, [ctx.props.vnodes])
          }
          
          // 第二种使用方法
          render: (h, ctx) => ctx.props.vnodes
          
          // 第三种使用方法
          render: (h, ctx) => {            
              let {type, info} = ctx.props;
              // return h(type, ctx.data, ctx.children);
  
              return FC();
              
              function FC(){
                  info = info || '未定义';
                  return (
                      <type class="func-comp" {...ctx.data}>
                          <span>{ ctx.children }</span>
                      </type>
                  )                
              }
          }
      }
  },
  
  methods: {
      getJSXSpan() {
      	return <span>Message: {this.msg}</span>;
      },
  }
  </script>
  ```

## 参考

### [render 函数与模板编译：运行时构建 & 独立构建](https://zhuanlan.zhihu.com/p/25486761)

---

当使用 `vue-loader` 或 `vueify` 的时候，`*.vue` 文件内部的模板会在构建时预编译成 JavaScript。你在最终打好的包里实际上是不需要编译器的，所以只用运行时版本即可。



# vue实例

当一个 Vue 实例被创建时，它将 `data` 对象中的所有的属性加入到 Vue 的**响应式系统**中。当这些属性的值发生改变时，视图将会产生“响应”，即匹配更新为新的值。当这些数据改变时，视图会进行重渲染。值得注意的是只有当实例被创建时就已经存在于 `data` 中的属性才是**响应式**的。也就是说如果你添加一个新的属性，

## 模板

- 绑定的数据对象不必内联定义在模板里

  ```js
  <div v-bind:class="classObject"></div>
  ```



- 注意这里的 `is="todo-item"` 属性。这种做法在使用 DOM 模板时是十分必要的，因为在 `<ul>` 元素内只有 `<li>` 元素会被看作有效内容。这样做实现的效果与 `<todo-item>` 相同，但是可以避开一些潜在的浏览器解析错误。查看 [DOM 模板解析说明](https://cn.vuejs.org/v2/guide/components.html#解析-DOM-模板时的注意事项) 来了解更多信息。



需要注意的是**如果我们从以下来源使用模板的话，这条限制是不存在的**：

- 字符串 (例如：`template: '...'`)

- [单文件组件 (`.vue`)](https://cn.vuejs.org/v2/guide/single-file-components.html)  

- <script type="text/x-template">

当直接在 DOM 中使用一个组件 (而不是在字符串模板或[单文件组件](https://cn.vuejs.org/v2/guide/single-file-components.html)) 的时候，我们强烈推荐遵循 [W3C 规范](https://html.spec.whatwg.org/multipage/custom-elements.html#valid-custom-element-name)中的自定义组件名 (字母全小写且必须包含一个连字符)。这会帮助你避免和当前以及未来的 HTML 元素相冲突。





- 不要在选项属性或回调上使用[箭头函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions)，比如 `created: () => console.log(this.a)` 或 `vm.$watch('a', newValue => this.myMethod())`。因为箭头函数并没有 `this`，`this` 会作为变量一直向上级词法作用域查找，直至找到为止；

- 计算属性：基于响应式依赖进行缓存，当依赖的数据没有更新时，不会执行函数；
  计算属性默认只有getter

  ```js
  computed: {
    fullName: {
      // getter
      get: function () {
        return this.firstName + ' ' + this.lastName
      },
      // setter
      set: function (newValue) {
        var names = newValue.split(' ')
        this.firstName = names[0]
        this.lastName = names[names.length - 1]
      }
    }
  }
  ```

# vue 响应式原理

<img src="assets/vue%E5%9F%BA%E7%A1%80%E6%A6%82%E5%BF%B5/vue%E5%93%8D%E5%BA%94%E5%BC%8F%E6%9B%B4%E6%96%B0.png" alt="vue响应式更新" style="zoom: 50%;" />   

创建一个vue 实例时，vue 遍历data 对象的属性，并使用 defineProperty 将属性转换为 getter\setter (vue3.0 使用 Proxy)，当属性被访问或修改时触发更新(使用了发布订阅模式)。



每个组件实例都对应一个 **watcher** 实例，它会在组件渲染的过程中把“接触”过的数据属性记录为依赖。之后当依赖项的 setter 触发时，会通知 watcher，从而使它关联的组件重新渲染。

## 异步更新队列

> [vue官网](https://cn.vuejs.org/v2/guide/reactivity.html#异步更新队列)



## 参考

- [深入响应式原理-vue官网](https://cn.vuejs.org/v2/guide/reactivity.html)