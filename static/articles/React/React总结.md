# 待解决

- `const ProfilePage = React.lazy(() => import('./ProfilePage')); // 懒加载`  



# [React哲学](https://zh-hans.reactjs.org/docs/thinking-in-react.html)  

> 将渲染UI和添加交互分开编写，视图和逻辑功能分开。
>
> 先写静态UI，UI完成后再添加逻辑。编写静态UI时，不要使用state，state代表随时间变化的数据，此时可以使用props。

1. 扩展开发，修改关闭，当需要添加新的功能时，使用HOC高阶组件对基础组件进行封装；
2. 单一功能



# [组件状态-state & props](https://zh-hans.reactjs.org/docs/faq-state.html#what-is-the-difference-between-state-and-props)  



# setState到底是异步还是同步?

先给出答案: 有时表现出异步,有时表现出同步
1. `setState` 只在**合成事件**和**钩子函数**中是“异步”的，在原生事件和 `setTimeout` 中都是同步的。
2. `setState`的“异步”并不是说内部由异步代码实现，其实本身执行的过程和代码都是同步的，只是合成事件和钩子函数的调用顺序在更新之前，导致在合成事件和钩子函数中没法立马拿到更新后的值，形式了所谓的“异步”，当然可以通过第二个参数 `setState(partialState, callback)` 中的callback拿到更新后的结果。
3. `setState` 的批量更新优化也是建立在“异步”（合成事件、钩子函数）之上的，在原生事件和 setTimeout 中不会批量更新，在“异步”中如果对同一个值进行多次 `setState` ， `setState` 的批量更新策略会对其进行覆盖，取最后一次的执行，如果是同时 `setState` 多个不同的值，在更新时会对其进行合并批量更新。



# [受控 | 非受控](https://segmentfault.com/a/1190000012458996) 



## [弹性组件设计原则](https://overreacted.io/zh-hans/writing-resilient-components/)  

- 不要阻断数据流
  不要将props传递的数据转交给state，避免复制props到state

  ```js
  class x extends React.Component {
    constructor(props){
      this.state = {
        y: props.y
      }
    }
  }
  ```

  派生状态会导致代码冗余，并使组件难以维护。 [确保你已熟悉这些简单的替代方案：](https://zh-hans.reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html)  
  
  - 如果你需要**执行副作用**（例如，数据提取或动画）以响应 props 中的更改，请改用 [`componentDidUpdate`](https://zh-hans.reactjs.org/docs/react-component.html#componentdidupdate)。
  - 如果只想在 **prop 更改时重新计算某些数据**，[请使用 memoization helper 代替](https://zh-hans.reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#what-about-memoization)。
  - 如果你想**在 prop 更改时“重置”某些 state**，请考虑使组件[完全受控](https://zh-hans.reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-controlled-component)或[使用 `key` 使组件完全不受控](https://zh-hans.reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-uncontrolled-component-with-a-key) 代替。
  
  
  
- 不要在Side Effects中阻断数据流

# 性能优化

## 纯函数组件

继承 React.PureComponent( `class Cmp extends React.PureComponent` )或在 `shouldComponentUpdate` 中比较current props 和 next props。

只有在props更新时才渲染组件而不是每次父组件渲染时。

`React.PureComponent` 对 props 和 state 作了浅层比较，因为作深层比较反而会减低性能。



# 模态对话框

[模态对话框](https://www.w3.org/TR/wai-aria-practices-1.1/#dialog_modal)  

  

# [在 React 组件中获取数据的标准方法](https://zh-hans.reactjs.org/docs/concurrent-mode-suspense.html)   

> 该方法处于试验阶段

 suspense API 将使异步数据获取对于客户端和服务器渲染都是完全有可能的。

让 Suspense 成为组件读取异步数据的主要方式——无论数据来自何方。

参考：

- [使用Hook请求数据](https://www.robinwieruch.de/react-hooks-fetch-data)  
- [异步渲染更新](https://zh-hans.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#updating-state-based-on-props) 
  在类组件的各种生命周期中执行数据请求、setState

## 类组件



## 函数式组件



# 函数式组件 vs 类组件

参考：https://juejin.im/post/6844904049146331150

- useRef 获取最新的状态



# 组件的默认属性及类型约束

**1) 类组件**  

```ts
const defaultProps = {
  name: "stranger",
};
type Props = {
	age: number;
} & Partial<typeof defaultProps>;


class Greeting extends React.Component<Props, {}> {
	static defaultProps = defaultProps;
	//  ...
}
```



# TS + React

1). 为什么使用函数表达式而不是函数声明定义函数式组件？

- 因为使用函数表达式可以指定 `React.FC` 类型，`React.FC`  定义了 `children` 和函数返回类型。



3).  `ReactNode` 、 `ReactElement` 和 `JSX.Element` 的区别？

- `document.getElementById('root') as HTMLElement` 

- `children?: React.ReactNode `  

- `React.ReactNode` 包含了 `React.ReactElement`，`React.ReactElement` 是泛型

- 组件类型用 `React.ComponentType` 声明

- JSX 使用 `JSX.Element` 声明

  ```tsx
  const Cmp : ComponentType<IProps>;
  <Cmp/>
  
  
  // 
  declare global {
    namespace JSX {
      // tslint:disable-next-line:no-empty-interface
      interface Element extends React.ReactElement<any, any> { }
    }
  }
  // render 返回的是 JSX.Element 类型？
  type RenderCallback = (args) => JSX.Element;
  ```



**4).** 定义函数类型：

​    由于JavaScript具有动态和灵活的性质，有时可能会遇到一个对象，该对象可以作为上述某些类型的组合使用，就是一个既具有函数特性又具有对象特性的类型，它具有一些属性。

```ts
type Foo = (a: string) => string
interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
}

function getCounter(): Counter {
    let counter = (function (start: number) { }) as Counter;
    counter.interval = 123;
    counter.reset = function () { };
    return counter;
}

let c = getCounter();
c(10);
c.reset();
c.interval = 5.0
```



**5).** TypeScript还有一种感叹号（`!`）结尾的语法，它会从前面的表达式里移除`null`和`undefined`。

```ts
export const withDefaultProps = <P extends object, DP extends Partial<P> = Partial<P>>
(defaultProps: DP, Cmp: ComponentType<P>) => {
  // 提取出必须的属性
  type RequiredProps = Omit<P, keyof DP>;
  // 重新创建我们的属性定义，通过一个相交类型，将所有的原始属性标记成可选的，必选的属性标记成可选的
  type Props = Partial<DP> & Required<RequiredProps>;

  Cmp.defaultProps = defaultProps;

  // 返回重新的定义的属性类型组件，通过将原始组件的类型检查关闭，然后再设置正确的属性类型
  return (Cmp as ComponentType<any>) as ComponentType<Props>;
};
        
type State = Readonly<typeof initialState>;
}

// 定义类型/接口
type State = Readonly<typeof initialState> & Partial<typeof 可选字段集合>;

```
