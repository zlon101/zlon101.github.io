# [React哲学](https://zh-hans.reactjs.org/docs/thinking-in-react.html) 

将渲染UI和添加交互分开编写，视图和逻辑功能分开。

先写静态UI，UI完成后再添加逻辑。编写静态UI时，不要使用state，state代表随时间变化的数据，此时可以使用props。

1. 扩展开发，修改关闭，当需要添加新的功能时，使用HOC高阶组件对基础组件进行封装；
2. 单一功能


## [弹性组件设计原则](https://overreacted.io/zh-hans/writing-resilient-components/)  

不要阻断数据流

不要将props传递的数据转交给state，避免复制props到state


派生状态会导致代码冗余，并使组件难以维护。 [确保你已熟悉这些简单的替代方案：](https://zh-hans.reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html) 

如果你需要**执行副作用**（例如，数据提取或动画）以响应 props 中的更改，请改用 [`componentDidUpdate`](https://zh-hans.reactjs.org/docs/react-component.html#componentdidupdate)。

如果只想在 **prop 更改时重新计算某些数据**，[请使用 memoization helper 代替](https://zh-hans.reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#what-about-memoization)。

如果你想**在 prop 更改时“重置”某些 state**，请考虑使组件[完全受控](https://zh-hans.reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-controlled-component)或[使用 `key` 使组件完全不受控](https://zh-hans.reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-uncontrolled-component-with-a-key) 代替。



# [在 React 组件中获取数据的标准方法](https://zh-hans.reactjs.org/docs/concurrent-mode-suspense.html)

> 该方法处于试验阶段

 suspense API 将使异步数据获取对于客户端和服务器渲染都是完全有可能的。

让 Suspense 成为组件读取异步数据的主要方式——无论数据来自何方。

> 参考

[使用Hook请求数据](https://www.robinwieruch.de/react-hooks-fetch-data)  

[异步渲染更新](https://zh-hans.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#updating-state-based-on-props) 
在类组件的各种生命周期中执行数据请求、setState


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
