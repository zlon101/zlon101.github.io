# 概览

[八种状态管理库](https://juejin.cn/post/7172509907403407391#heading-5) 

1. React Router
2. Redux
3. Flux & Immutable （是什么?）
4. React Native
5. Middleware（中间件）
6. reselect
7. redux-thunk
8. redux-sage
9. styled-components

react + redux + react-router + less + es6 + webpack

Antd＋React＋Redux 开发项目，Roadhog 或者 Webpack 构建项目，Nextjs 做服务端渲染。

[redux-saga](https://link.juejin.im?target=https%3A%2F%2Fgithub.com%2Fredux-saga%2Fredux-saga) 用来处理异步请求，[reselect](https://link.juejin.im?target=https%3A%2F%2Fgithub.com%2Freactjs%2Freselect) 缓存机制用来减少state改变带来的渲染压力,还有一些为了交互衍生出来的中间件 [react-redux](https://link.juejin.im?target=https%3A%2F%2Fgithub.com%2Freactjs%2Freact-redux)、[react-router-redux](https://link.juejin.im?target=https%3A%2F%2Fgithub.com%2FReactTraining%2Freact-router%2Ftree%2Fmaster%2Fpackages%2Freact-router-redux)、[react-router-dom](https://link.juejin.im?target=https%3A%2F%2Fgithub.com%2FReactTraining%2Freact-router%2Ftree%2Fmaster%2Fpackages%2Freact-router-dom) ，预处理器[Sass](https://link.juejin.im?target=https%3A%2F%2Fwww.w3cplus.com%2Fsassguide%2Fsyntax.html)或[Less](https://link.juejin.im?target=https%3A%2F%2Fwww.w3cschool.cn%2Fless%2F) 尽量也掌握下。


# browserify是什么？

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

# Redux

组件免不了要与用户互动，React 的一大创新，就是将组件看成是一个状态机，一开始有一个初始状态，然后用户互动，导致状态变化，从而触发重新渲染 UI 。

应用中所有的 state 都以一个对象树的形式储存在一个单一的 store 中。 惟一改变 state 的办法是触发 action，一个描述发生什么的对象。 为了描述 action 如何改变 state 树，你需要编写 reducers。

store作为数据源\数据集，state代表数据源的状态。数据集是会发生变化的，是什么触发了数据集的变化(更新)？是视图或服务器返回的数据。所以，当视图发生变化时派发一个action给reducer，reducer根据当前数据集的状态和action确定数据集的新的状态。改变state的唯一途径就是派发action。

- store：对象
- action：对象
- reducer：函数

## API

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

## Action

action 本质就是对象，用于携带数据，**Action** 是把数据从应用（译者注：这里之所以不叫 view 是因为这些数据有可能是服务器响应，用户输入或其它非 view 的数据 ）传到 store 的有效载荷。它是 store 数据的**唯一**来源。一般来说你会通过 [`store.dispatch()`](http://cn.redux.js.org//docs/api/Store.html#dispatch) 将 action 传到 store。

[`bindActionCreators()`](http://cn.redux.js.org//docs/api/bindActionCreators.html) 可以自动把多个 action 创建函数 绑定到 `dispatch()` 方法上。


## reducer

Reducers是函数，接收state和action并返回新的state；

禁止在 reducer 里做以下操作：

1. 修改传入的参数
2. 执行有副作用的操作，如 API 请求和路由跳转；
3. 调用非纯函数，如 `Date.now()` 或 `Math.random()`。

只要传入参数相同，返回计算得到的下一个 state 就一定相同。没有特殊情况、没有副作用，没有 API 请求、没有变量修改，单纯执行计算。

修改store.state中的指定数据项并且不修改原来的状态

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

## 异步数据

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


- action creator

同步情况下，`action creator`返回对象，异步情况下`action creator`返回一个函数，该函数被Redux Tunk中间件调用(该函数的参数由中间件提供)，函数内可以执行dispatch 和异步请求。

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

## 中间件

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

## 参考

[Redux 入门教程（一）：基本用法 - 阮一峰的网络日志](https://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html) 

# React-Redux

## 容器组件

UI 组件负责 UI 的呈现，容器组件负责管理数据和逻辑。

参考：[React入门教程-阮一峰](https://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_three_react-redux.html) 

# styled-components

使用JS上编写CSS，[styled components](https://github.com/styled-components/styled-components)就是其中一种解决方案。styled components是一个React第三方库，作用是可以将样式写成组件的形式，实现在JS上编写CSS。

实际上styled components使用的还是CSS，因此完美**支持CSS的所有特性**；

# redux-sage

redux-saga  是一个用于管理 Redux 应用异步操作的中间件（又称异步 action）。 redux-saga 通过创建 Sagas 将所有的异步操作逻辑收集在一个地方集中处理，可以用来代替 redux-thunk 中间件。

这意味着应用的逻辑会存在两个地方：
- Reducers 负责处理 action 的 state 更新
- Sagas 负责协调那些复杂或异步的操作

# [Immer](https://github.com/immerjs/use-immer)

https://react.dev/learn/updating-objects-in-state#write-concise-update-logic-with-immer

`produce(当前state, draft=>{...});`  返回新的state

`produce(函数，默认state);`  返回一个函数，此时produce是一个高阶函数，immer的柯里化。

produce返回的那个函数 is ready to accept a state, and call your update function with the draft.

使用immer代替useState Hook，`use-immer` 

## 源码

Immer records all the changes that are performed on the draft object and generates an array of JSON objects indicating what has changed. These arrays are called Patches. Immer also produces inverse patches, which are patches that need to be applied if you want to go back to the previous state.

When creating a draft, Immer will copy all *own* properties from the base to the draft.This includes non-enumerable and symbolic properties.

The final instance will be constructed with the same mechanism as the draft was created.

`Immer = Copy-on-write + Proxy`

Immer记录了对draft对象作的修改，然后生成一个JSON对象。

draftState 是个 Proxy，对它的读写操作会走到内部定义好的 getter/setter 里，简单来说就是当你获取 draftState 内部的对象时，它都会返回一个 Proxy，而当你进行赋值时，它都会对原对象的 copy 对象进行赋值。最后返回 copy 对象。

Immer会将包装后的代理对象作为入参传入加工函数，**值得注意的是加工函数内的this也指向该代理对象**。如果第一个参数是加工函数。

所有对draft的修改都会应用到 a \_\_copy\_\_ of the base state

Only plain objects and arrays are made mutable. All other objects are considered uncopyable.


结构共享  深度更新


根节点预先创建一个 Proxy，对象树上被访问到的所有中间节点（或新增子树的根节点）都要创建对应的 Proxy

而每个 Proxy 都只在监听到写操作（直接赋值、原生数据操作 API 等）时才创建拷贝值（所谓Copy-on-write），并将之后的写操作全都代理到拷贝值上。

## [用immer实现undo-redo](https://techinscribed.com/implementing-undo-redo-functionality-in-redux-using-immer/) 

# Immutable.js

对 Immutable 对象的任何修改或添加删除操作都会返回一个新的 Immutable 对象。Immutable 实现的原理是 **Persistent Data Structure**（持久化数据结构），也就是使用旧数据创建新数据时，要保证旧数据可用且不变。同时为了避免 deepCopy 把所有节点都复制一遍带来的性能损耗，Immutable 使用了 **Structural Sharing**（结构共享），即如果对象树中一个节点发生变化，只修改这个节点和受它影响的父节点，其它节点则进行共享。请看下面动画：

fromJS toJS get  set  updataIn  setIn

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

## Redux & Immutable 最佳实践

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

## 参考

[immutables详解及React中实践](https://github.com/camsong/blog/issues/3) 

# React-Router

Router的实现原理无非就是实现当URL变化的时候渲染的组件跟着变化。 要实现这个功能，就需要监听URL的变化，有两种方式可以实现，一是通过onhashchange监听#的变化，一是用history的新的API，包括pushState(), replaceState(), popstate等。具体实现细节我们暂时不讲。

`Router`组件本身只是一个容器，真正的路由要通过`Route`组件定义

```vue
<Router history={hashHistory}>
  <Route path="/" component={App}/>
  <Route path="/repos" component={Repos}/>
  <Route path="/about" component={About}/>
</Router>
```

上面代码中，用户访问/repos（比如http://localhost:8080/#/repos）时，加载Repos组件；访问/about（http://localhost:8080/#/about）时，加载About组件。

> 默认路由

```vue
  <IndexRoute component={Home}/>
```

> 默认Link

```vue
  <IndexLink to="/">Home</IndexLink>
```

## 路径

如果一个路由使用了相对`路径`，那么完整的路径将由它的所有祖先节点的`路径`和自身指定的相对`路径`拼接而成。[使用绝对`路径`](https://react-guide.github.io/react-router-cn/docs/guides/basics/RouteConfiguration.html#decoupling-the-ui-from-the-url)可以使路由匹配行为忽略嵌套关系。

- Link
  `<Link to={`/user/${user.id}`}>{user.name}</Link>`

# HTML to JSX

https://transform.tools/html-to-jsx


# [remix](https://remix.run/)

Remix is a full-stack React framework with nested routing. It lets you break your app into nested parts that can load data in parallel and refresh in response to the user actions. To create a new Remix project, run:



**优点：**

- **优化的客户端渲染：** 对于**客户端密集型应用程序**（如ChatGPT），大部分渲染发生在初始加载后的客户端，Remix是完美的选择。
- **使用Loaders获取数据：** 在渲染路由之前提前获取所有数据，无需进行加载后的API调用，从而加速页面转换。
- **Vite集成：** Remix与**Vite**完美兼容，实现极速构建和流畅的开发体验。

**缺点：**

- **较新的生态系统：** Remix是一个比较新的框架，这意味着与Next.js相比，社区资源和第三方插件较少。
- **对SSR关注较少：** 虽然Remix可以进行SSR，但它真正的优势在于CSR，因此如果你正在运行一个对SEO要求很高的应用程序，你可能会发现Remix不如Next.js。
- **学习曲线：** Remix对路由和数据加载的独特方法可能需要一些调整，特别是对于来自Next.js的开发者。
