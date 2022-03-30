#### 技术栈
> 1. React Router
> 2. Redux
> 3. Flux & Immutable （是什么?）
> 4. React Native
> 5. Middleware（中间件）
> 6. reselect
> 7. redux-thunk
> 8. redux-sage
> 9. styled-components

react+redux+react-router+less+es6+webpack

[redux-saga](https://link.juejin.im?target=https%3A%2F%2Fgithub.com%2Fredux-saga%2Fredux-saga) 用来处理异步请求，[reselect](https://link.juejin.im?target=https%3A%2F%2Fgithub.com%2Freactjs%2Freselect) 缓存机制用来减少state改变带来的渲染压力,还有一些为了交互衍生出来的中间件 [react-redux](https://link.juejin.im?target=https%3A%2F%2Fgithub.com%2Freactjs%2Freact-redux)、[react-router-redux](https://link.juejin.im?target=https%3A%2F%2Fgithub.com%2FReactTraining%2Freact-router%2Ftree%2Fmaster%2Fpackages%2Freact-router-redux)、[react-router-dom](https://link.juejin.im?target=https%3A%2F%2Fgithub.com%2FReactTraining%2Freact-router%2Ftree%2Fmaster%2Fpackages%2Freact-router-dom) ，预处理器[Sass](https://link.juejin.im?target=https%3A%2F%2Fwww.w3cplus.com%2Fsassguide%2Fsyntax.html)或[Less](https://link.juejin.im?target=https%3A%2F%2Fwww.w3cschool.cn%2Fless%2F) 尽量也掌握下。



Antd＋React＋Redux 开发项目，Roadhog 或者 Webpack 构建项目，Nextjs 做服务端渲染。

#### react-native

react-native就是基于Virtual DOM渲染出原生控件。



#### browserify是什么？

```js
// index.js
const store = createStore(rootReducer)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

// App,js
const App = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
)

// AddTodo
const AddTodo = ({ dispatch }) => {
  let input
  return (
      <form
        onSubmit={e => {
          dispatch(addTodo(input.value))// 派发action
        }}
      >
      </form>
  )
}
export default connect()(AddTodo) // 生成容器组件


// VisibleTodoList
const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return todos
    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter(t => t.completed)
    case VisibilityFilters.SHOW_ACTIVE:
      return todos.filter(t => !t.completed)
    default:
      throw new Error('Unknown filter: ' + filter)
  }
}
const mapStateToProps = state => ({
  todos: getVisibleTodos(state.todos, state.visibilityFilter)
})
const mapDispatchToProps = dispatch => ({
  toggleTodo: id => dispatch(toggleTodo(id))
})
export default connect(mapStateToProps, mapDispatchToProps)(TodoList)

// TodoList.js
const TodoList = ({ todos, toggleTodo }) => (
  <ul>
    {todos.map(todo => (
      <Todo key={todo.id} {...todo} onClick={() => toggleTodo(todo.id)} />
    ))}
  </ul>
)
export default TodoList
// Todo
const Todo = ({ onClick, completed, text }) => (
  <li onClick={onClick}> {text} </li>
)
export default Todo

//------------------------------------------------------------------
// Footer.js
const Footer = () => (
  <div>
    <FilterLink filter={VisibilityFilters.SHOW_ALL}>All</FilterLink>
  </div>
)
export default Footer

// FilterLink
const mapStateToProps = (state, ownProps) => ({
  active: ownProps.filter === state.visibilityFilter
})
const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => dispatch(setVisibilityFilter(ownProps.filter))
})
export default connect(mapStateToProps, mapDispatchToProps)(Link)

// Link
const Link = ({ active, children, onClick }) => (
  <button
    onClick={onClick}
    disabled={active}
  >
    {children}
  </button>
)
export default Link
```





#### Redux

> 状态管理：组件免不了要与用户互动，React 的一大创新，就是将组件看成是一个状态机，一开始有一个初始状态，然后用户互动，导致状态变化，从而触发重新渲染 UI 。
>
> 应用中所有的 state 都以一个对象树的形式储存在一个单一的 store 中。 惟一改变 state 的办法是触发 action，一个描述发生什么的对象。 为了描述 action 如何改变 state 树，你需要编写 reducers。
>
> store作为数据源\数据集，state代表数据源的状态。数据集是会发生变化的，是什么触发了数据集的变化(更新)？是视图或服务器返回的数据。所以，当视图发生变化时派发一个action给reducer，reducer根据当前数据集的状态和action确定数据集的新的状态。改变state的唯一途径就是派发action。
>
> store：对象
>
> action：对象
>
> reducer：函数

##### API

- 组件派发（dispatch）action对象 store
- 组件可以通过订阅store中的状态(state)来刷新自己的视图

```js
// reducers 是一个函数，根据action和当前state确定新的 state

// 创建 Redux store 来存放应用的状态。
// API 是 { subscribe, dispatch, getState }。
let store = createStore(reducers)

// 可以手动订阅更新，也可以事件绑定到视图层。
store.subscribe(() => console.log(store.getState()))

// 改变内部 state 惟一方法是 dispatch 一个 action。
// action 可以被序列化，用日记记录和储存下来，后期还可以以回放的方式执行
store.dispatch({ type: 'INCREMENT' })

store.getState();
```

##### Action

> action 本质就是对象，用于携带数据，**Action** 是把数据从应用（译者注：这里之所以不叫 view 是因为这些数据有可能是服务器响应，用户输入或其它非 view 的数据 ）传到 store 的有效载荷。它是 store 数据的**唯一**来源。一般来说你会通过 [`store.dispatch()`](http://cn.redux.js.org//docs/api/Store.html#dispatch) 将 action 传到 store。

[`bindActionCreators()`](http://cn.redux.js.org//docs/api/bindActionCreators.html) 可以自动把多个 action 创建函数 绑定到 `dispatch()` 方法上。



##### reducer

> Reducers是函数，接收state和action并返回新的state；

禁止在 reducer 里做以下操作：

1. 修改传入的参数
2. 执行有副作用的操作，如 API 请求和路由跳转；
3. 调用非纯函数，如 `Date.now()` 或 `Math.random()`。

只要传入参数相同，返回计算得到的下一个 state 就一定相同。没有特殊情况、没有副作用，没有 API 请求、没有变量修改，单纯执行计算。



- 修改store.state中的指定数据项并且不修改原来的状态

  ```js
  // state.todos是对象数组, 每个元素都是一个对象
  function (state, action){
      return Object.assign({}, state, {
          todos: state.todos.map((todo, index) => {
              if (index === action.index) {
                  return Object.assign({}, todo, {
                      completed: !todo.completed
                  })
              };
              return todo
          })
      })
  }	
  
  // 将reducers拆分成多个子reducers
  import { combineReducers, createStore } from 'redux';
  // visibilityFilter 和 todos 都是reducer
  let reducer = combineReducers({ 
    // 这个对象的结构就是state的结构，对象的key就是state的key
    visibilityFilter, 
    todos 
  });
  let store = createStore(reducer)
  ```

<u>**拆分reducer并使用**</u> 

当state中有多个数据并且需要多个reducer分别处理时，可以分别编写多个子reducer函数，然后使用函数combineReducers(obj)将子reducer合并。并且传递给combineReducers的对象的key需要与state中数据的key相同。表示state的某个属性使用某个子reducer来处理。

##### 异步数据

默认情况下，redux.createStore()所创建的 Redux store 没有使用 middleware，所以只支持 同步数据流。异步处理时与同步的不同之处在于action creator和dispatch不同。

- Redux MiddleWare
  提供的是位于 action 被发起之后，到达 reducer 之前的扩展点。 你可以利用 Redux middleware 来进行日志记录(loggerMiddleware)、创建崩溃报告、调用异步接口或路由等等。

  ```js
  createStore(
      rootReducer,
      preloadedState,
      // thunkMiddleware使dispatch函数可以接收函数作为参数
      applyMiddleware(thunkMiddleware, loggerMiddleware)
  )
  ```




- action creator：同步情况下，`action creator`返回对象，异步情况下`action creator`返回一个函数，该函数被Redux Tunk中间件调用(该函数的参数由中间件提供)，函数内可以执行dispatch 和异步请求。

  ```js
  /*
  	异步情况下的action creator返回函数， 这个函数Fn的返回值作为dispatch(Fn)的返回值？
  	异步情况重点在于action creator函数的编写
  */
  dispatch(fetchPosts(subreddit));
  
  function fetchPosts(subreddit) {
      // Thunk middleware 知道如何处理函数。
      // 这里把 dispatch 方法通过参数的形式传给函数，以此来让它自己也能 dispatch action。
      // 因为是由中间件调用该返回的函数, 因此dispatch 参数也由中间件提供(中间件包装了store的dispatch方法)
      return dispatch => {
          // 请求发起, 更新state
          dispatch(requestPosts(subreddit));
          return fetch(`https://www.reddit.com/r/${subreddit}.json`)
              .then(response => response.json())
          
          	// 可以多次dispatch, 这里使用请求的响应结果更新state
          	// 最后一个dispatch(action), action必须是对象, 就和同步情况下一样
              .then(json => dispatch(receivePosts(subreddit, json)))
      }
  }
  
  function requestPosts(subreddit) {
      return {
          type: REQUEST_POSTS,
          subreddit
      }
  }
  ```

##### 中间件

例如thunkMiddleware就是一个函数

```js
function thunkMiddleware(store){
    // next指dispatch
    return function (next){
        return function (action){
            
        }
    }
}
```

参考：[Redux-异步数据-中间件](<https://cn.redux.js.org/docs/advanced/Middleware.html>)

大多数的应用都会使用 middleware 或 enhancer 来拓展 Redux store 的功能。**（注：middleware 很常见，enhancer 不太常见）** middleware 拓展了 Redux `dispatch` 函数的功能；enhancer 拓展了 Redux store 的功能。

##### 参考

- [Redux 入门教程（一）：基本用法 - 阮一峰的网络日志](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html) 
- 



#### React-Redux

##### 容器组件

> UI 组件负责 UI 的呈现，容器组件负责管理数据和逻辑。
>
> 参考：[React入门教程-阮一峰](<http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_three_react-redux.html>)

#### styled-components

使用JS上编写CSS，[styled components](https://github.com/styled-components/styled-components)就是其中一种解决方案。styled components是一个React第三方库，作用是可以将样式写成组件的形式，实现在JS上编写CSS。

实际上styled components使用的还是CSS，因此完美**支持CSS的所有特性**；

#### redux-sage

> redux-saga  是一个用于管理 Redux 应用异步操作的中间件（又称异步 action）。 redux-saga 通过创建 Sagas 将所有的异步操作逻辑收集在一个地方集中处理，可以用来代替 redux-thunk 中间件。
>
> 这意味着应用的逻辑会存在两个地方：
>
> - Reducers 负责处理 action 的 state 更新
> - Sagas 负责协调那些复杂或异步的操作

#### Immer

`produce(当前state, draft=>{...});`  返回新的state

`produce(函数，默认state);`  返回一个函数，此时produce是一个高阶函数，immer的柯里化。

- produce返回的那个函数 is ready to accept a state, and call your update function with the draft.



使用immer代替useState Hook，`use-immer` 



##### 源码

>  Immer records all the changes that are performed on the draft object and generates an array of JSON objects indicating what has changed. These arrays are called Patches. Immer also produces inverse patches, which are patches that need to be applied if you want to go back to the previous state.
>
>  
>
>  When creating a draft, Immer will copy all *own* properties from the base to the draft.This includes non-enumerable and symbolic properties.
>
>  The final instance will be constructed with the same mechanism as the draft was created.



`Immer = Copy-on-write + Proxy`

Immer记录了对draft对象作的修改，然后生成一个JSON对象。



draftState 是个 Proxy，对它的读写操作会走到内部定义好的 getter/setter 里，简单来说就是当你获取 draftState 内部的对象时，它都会返回一个 Proxy，而当你进行赋值时，它都会对原对象的 copy 对象进行赋值。最后返回 copy 对象。



Immer会将包装后的代理对象作为入参传入加工函数，**值得注意的是加工函数内的this也指向该代理对象**。如果第一个参数是加工函数。



所有对draft的修改都会应用到 a \_\_copy\_\_ of the base state



Only plain objects and arrays are made mutable. All other objects are considered uncopyable.



结构共享

深度更新

根节点预先创建一个 Proxy，对象树上被访问到的所有中间节点（或新增子树的根节点）都要创建对应的 Proxy

而每个 Proxy 都只在监听到写操作（直接赋值、原生数据操作 API 等）时才创建拷贝值（所谓Copy-on-write），并将之后的写操作全都代理到拷贝值上。

##### [用immer实现undo-redo](https://techinscribed.com/implementing-undo-redo-functionality-in-redux-using-immer/) 

#### Immutable.js

对 Immutable 对象的任何修改或添加删除操作都会返回一个新的 Immutable 对象。Immutable 实现的原理是 **Persistent Data Structure**（持久化数据结构），也就是使用旧数据创建新数据时，要保证旧数据可用且不变。同时为了避免 deepCopy 把所有节点都复制一遍带来的性能损耗，Immutable 使用了 **Structural Sharing**（结构共享），即如果对象树中一个节点发生变化，只修改这个节点和受它影响的父节点，其它节点则进行共享。请看下面动画：

fromJS toJS

get  set

updataIn  setIn

```js
import { Map} from 'immutable';
let a = Map({
  select: 'users',
  filter: Map({ name: 'Cam' })
})
let b = a.set('select', 'people');
a.get('filter') === b.get('filter'); // true

cursor = cursor.update('c', x => x + 1);

getInitialState() {
  return {
    data: Map({ times: 0 })
  }
},
  handleAdd() {
    this.setState({ data: this.state.data.update('times', v => v + 1) });
    // 这时的 times 并不会改变
    console.log(this.state.data.get('times'));
  }


//---------------------------------------------------------
//获取List索引的元素
ImmutableData.get(0);
// 获取Map对应key的value
ImmutableData.get('a');
// 获取嵌套数组中的数据
ImmutableData.getIn([1, 2]);
// 获取嵌套map的数据
ImmutableData.getIn(['a', 'b']);

const mapCopy = map; // Look, "copies" are free!


//---------------------------------------------------------
const MyDumbComponent = props => {
   // ...
   // props.objectProp is turned into a plain JavaScript object
   // props.arrayProp is turn into a plain JavaScript array
}
 
MyDumbComponent.propTypes = {
   objectProp: PropTypes.object,
   arrayProp: PropTypes.array,
}
 
const mapStateToProps = state => ({
   objectProp: mySelectorThatReturnsImmutableMap(state),
   arrayProp: mySelectorThatReturnsImmutableList(state),
})
 
export default connect(mapStateToProps)(withImmutablePropsToJS(MyDumbComponent))
```

##### Redux & Immutable 最佳实践

1. Never mix plain JavaScript objects with Immutable.JS

2. Make your entire Redux state tree an Immutable.JS object

   - Create the tree using Immutable.JS’s `fromJS()` function.
   - Use an Immutable.JS-aware version of the `combineReducers` function, such as the one in [redux-immutable](https://www.npmjs.com/package/redux-immutable), as Redux itself expects the state tree to be a plain JavaScript object.
   - When adding JavaScript objects to an Immutable.JS Map or List using Immutable.JS’s `update`, `merge` or `set` methods, ensure that the object being added is first converted to an Immutable object using `fromJS()`.
   - Example

   ```js
   // avoid
   const newObj = { key: value }
   const newState = state.setIn(['prop1'], newObj)
   // newObj has been added as a plain JavaScript object, NOT as an Immutable.JS Map
   
   // recommended
   const newObj = { key: value }
   const newState = state.setIn(['prop1'], fromJS(newObj))
   // newObj is now an Immutable.JS Map
   ```

3. Use Immutable.JS everywhere except your dumb components

4. 避免使用toJS

5. Never use toJS() in mapStateToProps

6. 使用高阶组件(HOC)，Use a Higher Order Component to convert your Smart Component’s Immutable.JS props to your Dumb Component’s JavaScript props


[最佳实践](https://redux.js.org/recipes/using-immutablejs-with-redux#is-using-immutablejs-worth-the-effort) 

- `import withImmutablePropsToJS from 'with-immutable-props-to-js';` 

##### 参考

- [immutables详解及React中实践](https://github.com/camsong/blog/issues/3) 
- 

#### React-Router

Router的实现原理无非就是实现当URL变化的时候渲染的组件跟着变化。 要实现这个功能，就需要监听URL的变化，有两种方式可以实现，一是通过onhashchange监听#的变化，一是用history的新的API，包括pushState(), replaceState(), popstate等。具体实现细节我们暂时不讲。

`Router`组件本身只是一个容器，真正的路由要通过`Route`组件定义

```js
<Router history={hashHistory}>
  <Route path="/" component={App}/>
  <Route path="/repos" component={Repos}/>
  <Route path="/about" component={About}/>
</Router>
```

上面代码中，用户访问/repos（比如http://localhost:8080/#/repos）时，加载Repos组件；访问/about（http://localhost:8080/#/about）时，加载About组件。



> - 默认路由
>
>   ```js
>   <IndexRoute component={Home}/>
>   ```
>
>   
>
> - 默认Link
>
>   ```js
>   <IndexLink to="/">Home</IndexLink>
>   ```
>



##### 路径

如果一个路由使用了相对`路径`，那么完整的路径将由它的所有祖先节点的`路径`和自身指定的相对`路径`拼接而成。[使用绝对`路径`](https://react-guide.github.io/react-router-cn/docs/guides/basics/RouteConfiguration.html#decoupling-the-ui-from-the-url)可以使路由匹配行为忽略嵌套关系。

- Link
  <Link to={`/user/${user.id}`}>{user.name}</Link>



#### 静态类型检查

- Flow：Facebook
- Typescript：微软

#### SEO 优化

- Next.js：用于React应用的极简的服务端渲染框架。

#### Next

##### 介绍

> Next 创建的应用中只有初始页面采用服务端渲染，其他通过路由操作到达的页面均为客户端渲染。

- pages：./pages 是一个保留路径，在 /pages 路径下任何js文件中导出的默认 React 组件都被视作一个页面；pages中的文件结构自动映射为对应的路由结构；
- static：保留路径，存放静态资源；

- package.json

  ```json
  {
    "scripts": {
      "dev": "next",
      "build": "next build",
      "start": "next start"
    }
  }
  ```

- 使用了 Next.js 作为服务端渲染工具，切记仅使用 next/link 中的 Link 组件。

  ```html
  <Link href="/about">
  	<a style={{fontSize: 20}}>About Page</a>
  </Link>
  ```

##### 组件

###### Head

```html
<Head>
	<title>My page title</title>
	<meta name="viewport" content="initial-scale=1.0, width=device-width" />
</Head>
```

###### link

###### document

> 自定义自己的服务端渲染模板，创建 /_document.js 
>
> ```js
> // pages/_document.js
> import Document, { Head, Main, NextScript } from 'next/document'
> export default 
> class MyDocument extends Document {
>   static async getInitialProps (ctx) {
>     const props = await Document.getInitialProps(ctx)
>     return { ...props, customValue: 'hi there!' }
>   }
> 
>   render () {
>     return (
>      <html>
>        <Head>
>          <style>{`body { margin: 0 } /* custom! */`}</style>
>        </Head>
>        <body className="custom_class">
>          {this.props.customValue}
>          <Main />
>          <NextScript />
>        </body>
>      </html>
>     )
>   }
> }
> ```
>



###### 错误处理

Next中，有一个默认组件error.js，负责处理404或者500这种错误。当然，你也可以自定义一个_error.js组件覆盖默认的错误处理组件：

##### 自定义服务器和路由

- 项目根目录下创建 server.js 文件：

  ```js
  // server.js
  
  const { createServer } = require('http')
  const { parse } = require('url')
  const next = require('next')
  
  const dev = process.env.NODE_ENV !== 'production'
  const app = next({ dev })
  const handle = app.getRequestHandler()
  
  app.prepare().then(() => {
    createServer((req, res) => {
      const parsedUrl = parse(req.url, true)
      const { pathname, query } = parsedUrl
  
      if (pathname === '/a') {
        app.render(req, res, '/b', query)
      } else if (pathname === '/b') {
        app.render(req, res, '/a', query)
      } else {
        handle(req, res, parsedUrl)
      }
    })
    .listen(3000, (err) => {
      if (err) throw err
      console.log('> Ready on http://localhost:3000')
    })
  })
  ```

##### CSS

NEXT组件中声明CSS，目前主要有两种方式：

1. 内嵌CSS：组件级的独立作用域，利用 styled-jsx 库

   ```js
   export default () => (
     <div>
       Hello world
       <p>scoped!</p>
       <style jsx>{`
         p {
           color: blue;
         }
         div {
           background: red;
         }
         div:hover {
           background: blue;
         }
         @media (max-width: 600px) {
           div {
             background: blue;
           }
         }
       `}</style>
     </div>
   )
   ```

   `scope CSS`的作用范围，如果添加了 `jsx`属性，则是不包括子组件的当前组件；如果添加了 `global` 和 `jsx`属性，则是包括了子组件在内的当前组件；如果没添加任何属性，则作用与 添加了 `global` 和 `jsx`的作用类似，只不过 `next`不会对其进行额外的提取与优化打包。

2. CSS-in-JS 内联样式

   ```js
   export default () => (
     <div style={{color: red}}>
       Hello world
     </div>
   )
   ```

##### 服务端框架

>  next.js自带服务器，但是它可以做的事情很有限，只能处理 ssr 渲染。 我们可以将next.js作为 koa 的一个中间件来使用，当然您也可以选择 express 和 egg.js，使用方式都很类似。



##### 部署

生产模式下，需要先使用生产模式构建代码，再启动服务器。因此，需要两条命令：

1. npm run build
2. npm run start

Next官方推荐使用now作为部署工具，只要在package.json文件中写入：

```json
{
  "name": "my-app",
  "dependencies": {
    "next": "latest"
  },
  "scripts": {
    "dev": "next",
    "build": "next build",
    "start": "next start"
  }
}
```

接着运行now命令，就可以实现一键部署。

##### 参考

- [next 官网](https://nextjs.org/learn/basics/navigate-between-pages)
- [next.js+koa2+antd环境轻松搭建](https://juejin.im/post/5cbb362351882532525a1082)
  [看了就会的next.js路由](https://juejin.im/post/5cbc0b3ae51d456e46603e31)

- [中文](https://github.com/accforgit/DayLearnNote/blob/master/React/Next.js-README.md#%E8%B7%AF%E7%94%B1)
- [入门教程](https://my.oschina.net/chkui/blog/2872965) 
