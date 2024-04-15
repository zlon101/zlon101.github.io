> [ES6入门-阮一峰](https://es6.ruanyifeng.com/#docs/class) 

# 变量声明

> var 特点

声明函数作用域或全局作用域变量

可以重复声明

存在声明提升

> [const let 特点](https://github.com/febobo/web-interview/issues/34) 

1. const 和 let 都不存在变量提升，都存在暂时性死区

**暂时性死区**：let 和 const 声明的变量从进入块级作用域就绑定了，不能在 let 或 const 声明语句之前使用 var 或者 没有 var 声明及使用该变量。因此在 let 和 const 声明语句之前(死区)不能以任何形式出现该变量，并且 typeof 也不是一定安全的操作(在没有 let 和 const 之前，typeof 一定不会产生错误)。

总之，暂时性死区的本质就是，只要一进入当前作用域，所要使用的变量就已经存在了，但是不可获取，只有等到声明变量的那一行代码出现，才可以获取和使用该变量。

2. 不能重复声明

3. var 声明的全局变量作为顶层对象( window\global )的属性，let 和 const 声明的变量不会；

4. 块级作用域中的函数声明

ES5 规定函数声明只能在全局或函数作用域中，不能在块级作用域(ES5 没有块级作用域)，但浏览器没有遵守该规定，ES5 环境下，在块级作用域中声明的函数存在声明提升，等同于函数表达式(声明提升，值为 undefined)；

ES6 引入块级作用域，允许在块级作用域中声明函数；

```js
// ES6严格模式
'use strict';
if (true) {
 function f() {}
}
// 不报错
```

ES6 规定块级作用域中的函数声明语句的行为类似于 let，在块级作用域之外不可引用；

为了减少兼容性问题，浏览器可以不遵守 ES6 的规定，在 ES6 环境下的浏览器中的行为方式：

可以在块级作用域中声明函数，但会像对待 var 语句一样(而不是 let)，将函数的声明提升至函数作用域的顶部(只是声明，尚未赋值)；在块级作用域中该函数都是可用的。

```js
// ES6的浏览器环境, 此处为全局作用域
function f() { 
 console.log('I am outside!');
}
(function () {
 // 此处为函数作用域
 // var f = undefined; 该语句是块级作用域中的函数声明部分提升至此;
 typeof f;           // undefined
 if (true) {
   // 此处为块级作用域, 在该作用域中函数是可以访问的;
   f();             // 输出 xx indide
   function f() { console.log('I am inside!'); }
 }
 f();               // 输出 inside
}());
```

**总结：**

- 避免在块级作用域中声明函数，如果要声明也建议使用函数表达式而不是函数声明语句；
- ES6 的块级作用域允许声明函数的规则，只在使用大括号的情况下成立，如果没有使用大括号，就会报错。

4. const 声明复杂数据类型

const 声明复合类型的变量，变量名指向数据的地址，因此 const 只保证该地址不会改变，但地址中的数据可以被改变；

使用 Object.freeze(obj) 冻结 obj 对象；

# 全局对象 & 顶层对象

> 获取全局对象的三种方式：window、global、self

1. global 只在 node 中才支持；
2. window 只在浏览器环境中支持；
3. self 在浏览器和 web worker 中支持；

> 不同环境中 this 的指向：

1. 全局环境 this 指向全局对象，
2. node 模块和 ES6 模块中，this 指向当前模块；
3. 函数中，指向调用对象或顶层对象、undefined(严格模式)；

> 勉强能获取不同环境中的 全局对象

```js
function getGlobal() {
  return global || self;
}
```

在语言标准层面引入 global 作为顶层对象，即在所有环境中都存在 global 对象，垫片库[`system.global`](https://github.com/ljharb/System.global)模拟了该方法，可以在所有环境拿到 `global`。

# 变量的解构赋值

- 从引用类型变量中提取部分数据(数组元素、对象属性值)赋值给新的变量；
- 变量：复杂数据类型的变量(数组、对象)，要求是可遍历的结构，具有 Iterator 接口；
- 赋值遵守模式匹配；

数组和对象的解构赋值是一种**模式匹配**，要求等号两边的模式相匹配。数组的元素是按次序排列的，变量的取值由它的位置决定；而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。

```js
let {bar: bar, foo: foo} = { foo: "aaa", bar: "bbb" };
// 简写为
let { bar, foo } = { foo: "aaa", bar: "bbb" };
import {xx} from 'xxx';
let { log, sin, cos } = Math;

let foo;
({foo} = {foo: 1});     // 成功, 必须用()包裹, 否则将被解析为代码块而不是赋值语句;只有不将大括号写在行首，避免JavaScript将其解释为代码块

var obj = {
  p: [
    'Hello',
    { y: 'World' }
  ]
};
var { p: [x, { y }] } = obj;  // x: "Hello", y: "World"
```

> 应用

1. 交换变量的值

```js
[x, y] = [y, x];
```

2. 函数返回多个值

```js
function example() {
 return [1, 2, 3];
}
var [a, b, c] = example();
```

3. 函数参数

```js
// 参数是一组无次序的值
function f({x, y, z}) { ... }
f({z: 3, y: 2, x: 1});

function ({mapState, content}){
   // ...
}
```

4. 函数默认参数

```js
jQuery.ajax = function (url, {
  async = true,
  beforeSend = function () {},
  cache = true,
  complete = function () {},
  crossDomain = false,
  global = true,
  // ... more config
}) {
  // ... do stuff
};
```

5. 导入模块的指定方法

```js
const { SourceMapConsumer, SourceNode } = require("source-map");
```

# 扩展运算符

任何定义了遍历器（Iterator）接口的对象（参阅 Iterator 一章），都可以用扩展运算符转为真正的数组；

- 数组合并

```js
let arr1 = [1,2];
let arr2 = [3,4];
let arr3 = [...arr1, ...arr2];
// arr3 = [1,2,3,4]
```

- 和解构赋值同时使用

```js
let arr = [1,2,3];
let [first, ...rest] = arr;
// first = 1; rest = [2,3]
```


# 标签模板

模板字符串可以紧跟在一个函数名后面，该函数将被调用来处理这个模板字符串。这被称为【标签模板】功能（tagged template）。

```js
alert`123`;  // 调用alert 处理后面的字符串; 弹出 123;

// styled-components
styled.dic`
	margin: 0 auto;
`;
```

# 数组扩展

**类数组对象**：本质特征就是要有 length 属性；

- 将类数组对象和可遍历对象转换为数组

1. Array.from：可以转换类数组对象和可遍历对象；

2. **扩展运算符**：将数组转换为逗号分隔的列表，背后调用的是遍历器接口（`Symbol.iterator`），如果一个对象没有部署这个接口，就无法转换；`[...arguments]`，扩展运算符后面跟的一定是数组(或类数组)；

3. 像 `{length: 2}` 这个对象就只能使用 `Array.from` 转换；

- 得到初始化的数组

```js
Array.from({length: 5}, (v, i) => i);   // [0,1,2,3,4]
Array.from({length: 3}, ele=>0);        // [0,0,0]
new Array(3).fill(0);  // // [0,0,0]
```

> 数组扩展的内容

1. Array.from
2. Array.of
3. 实例的 copyWithin
4. 实例的 find() 、 findIndex() 和 fill();
5. 实例的 keys()、values() 和 entries()；返回遍历器对象；
6. 实例的 includes()
7. 数组的空位

参考：[数组扩展](http://caibaojian.com/es6/array.html)

# 函数的扩展

1. 参数的默认值

```js
// 写法一
function m1({x = 0, y = 0} = {}) {
  return [x, y];
}

// 写法二
function m2({x, y} = { x: 0, y: 0 }) {
  return [x, y];
}
// 推荐第一种
m1({x: 1});  // [1, 0]
m2({x: 1});  // [1, undefined]
```

2. length 属性：默认参数之前的参数的个数(预期传入的参数的个数)

```js
function fn(a, b=0, c){
    //...
}
// fn.length: 1
```

3. 剩余参数：必须位于参数列表的最后

```js
function fn(...args){
  // args 是一个数组    
}
```

4. 箭头函数

部署管道机制（pipeline）的例子，即前一个函数的输出是后一个函数的输入。

```js
const pipeline = (...funcs) => initVal => funcs.reduce((acc, cur) => cur(acc), initVal);

const plus1 = a => a + 1;
const mult2 = a => a * 2;
const addThenMult = pipeline(plus1, mult2);

console.log( addThenMult(2) ); // 6
```

5. 函数绑定运算符(::)

```js
foo::bar(...arguments);
// 等同于
bar.apply(foo, arguments);
// 运算符左侧是指定的 this 对象, 右侧是函数
```

6. 严格模式

《ECMAScript 2016标准》规定只要函数参数使用了默认值、解构赋值、或者扩展运算符，那么函数内部就不能显式设定为严格模式，否则会报错。严格模式下也不能使用 arguments 和 callers

7. 尾调用优化

ES6 下的**尾调用优化**只在严格模式下才有效；

```js
// 将调用函数的操作放到当前函数执行的最后一步
function fn(){
    "use strict"
    return g();
}
function fn(){
    // 当前函数满足尾调用
    if(xx){
        return g();
    }
    else  return w();
}

// 下式不是尾调用优化, 因为函数默认 return undefined;
function fn(){
    g();
    // return undefined;
}
```


只有不再用到外层函数的内部变量，内层函数的调用帧才会取代外层函数的调用帧，否则就无法进行【尾调用优化】。下面的函数无法实现尾调用优化。

```js
function addOne(a){
  var one = 1;
  function inner(b){
    return b + one;
  }
  return inner(a);
}
```

**尾递归优化示例**

尾递归的实现，往往需要改写递归函数，确保最后一步只调用自身。做到这一点的方法，就是把所有用到的内部变量改写成函数的参数。

```js
// 1. 阶乘
function factorial(n) {
  if (n === 1) return 1;
  return n * factorial(n - 1);
}
// 优化后
function factorial(n, total) {
  if (n === 1) return total;
  return factorial(n - 1, n * total);
}

// 2. fibonacci 
function Fibonacci (n) {
  if ( n <= 1 ) {return 1};
  return Fibonacci(n - 1) + Fibonacci(n - 2);
}
// 优化后
function Fibonacci2 (n , ac1 = 1 , ac2 = 1) {
  if( n <= 1 ) {return ac2};
  return Fibonacci2 (n - 1, ac2, ac1 + ac2);
}
```

[函数扩展](http://caibaojian.com/es6/function.html)

# Class

> 例子

```js
class Person{
  static staticProA = 'xxx';
  static staticMethodA() {
    // this 指向 Person，而不是实例
  }
  constructor(name, age){
    this.name = name;
    this.age = age;
  }
  getName(){
    return this.name;
  }
}
/*
* this 指向实例对象,
* 类的方法(getName)定义在类的prototype(Person.prototype)上, 并且不可枚举;
* 方法之间不需要逗号,
*/
```

> constructor

类必须有一个 constructor 方法，若没有显示定义，默认的 constructor 为 `constructor(){}`

> super

1. 在super方法调用前，不能使用this，因为 ES6 是先创建父类实例；
2. 作为函数调用，super 代表父类的构造函数，此时父类构造函数中的 `new.target` 为子类构造函数，并且作为函数调用时只能出现在子类的构造函数中；

```js
class A {}

class B extends A {
  constructor() {
    super();
    // 相当于 A.prototype.constructor.call(this);
  }
 }
```

3. 作为对象时，super 指向父类的原型，ES6 规定通过 `super` 调用父类的方法时，`super` 会绑定子类的`this`。
```js
class A {
  p() {
    return 2;
  }
}

class B extends A {
  constructor() {
    super();
    this.name = 'czl';
    console.log(super.p()); // 调用 A的 方法, 该方法中的this 指向子类的实例,可以访问 this.name
  }
  p(){
 		return 100;
  }
}
```

> 静态属性和静态方法

父类中的静态属性和静态方法可以被子类继承

> 私有属性

私有属性不能被继承

私有属性名必须在类实例和类本身上是唯一标识

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fields

https://zh.javascript.info/private-protected-properties-methods


> ES6 中Class 与 ES5 的区别

- 函数存在声明提升，Class 不会；
- 类内部默认开启严格模式；
- ES5 继承先创建子类实例，再调用父类构造函数，将属性和方法添加到子类实例上；ES6 是先创建父类实例，再通过子类的构造函数修改 this；
- Class 定义在原型上的方法是不可枚举的；
- Class 实现了子类的构造函数继承父类的构造函数（继承静态属性和方法）


# Proxy

Proxy 用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种**元编程**，即对编程语言进行编程。**Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写**。Proxy 这个词的原意是代理，用在这里表示由它来“代理”某些操作，可以译为“代理器”。

1. get(target, propKey, receiver)
   拦截对象属性的读取；
2. set(target, propKey, value, receiver)
   拦截对象属性的赋值操作；
3. has(target, propKey)
   拦截`propKey in proxy`的操作；
4. apply(target, object, args)
   `apply`方法拦截函数的调用、call和apply操作；

> this 指向

使用 Proxy 代理的情况下，目标对象内部的 `this` 关键字会指向 Proxy 代理。

```js
const target = {
  m: function () {
    console.log(this === proxy);
  }
};
const handler = {};
const proxy = new Proxy(target, handler);

target.m() // false
proxy.m()  // true
```

> 使用 Proxy 实现观察者模式

观察者模式（Observer mode）指的是观察者(函数)自动观察被观察者(数据对象)，一旦对象有变化，函数就会自动执行。

```javascript
const person = observable({
  name: '张三',
  age: 20
});
function print() {
  console.log(`${person.name}, ${person.age}`)
}

observe(print);
person.name = '李四';  // // 李四, 20

/*
* observable 和 observe 实现;
* observable 注册被观察者(数据对象);
* obsere 注册观察者(数据更新时执行的函数);
*/ 

// 观察者(函数)
const queuedObservers = new Set();

const observe = fn => queuedObservers.add(fn);
const observable = obj => new Proxy(obj, {set});

function set(target, key, value, receiver) {
  const result = Reflect.set(target, key, value, receiver);
  queuedObservers.forEach(observer => observer());
  return result;
}
```

> [proxy-polyfill](https://github.com/GoogleChrome/proxy-polyfill) 

# Reflect

> 使用 Reflect 来将操作转发给原始对象

`Reflect` 对象的方法与 `Proxy` 对象的方法一一对应，只要是 `Proxy` 对象的方法，就能在 `Reflect` 对象上找到对应的方法。这就让 `Proxy` 对象可以方便地调用对应的 `Reflect` 方法，完成默认行为，作为修改行为的基础。也就是说，不管`Proxy` 怎么修改默认行为，你总可以在 `Reflect` 上获取默认行为。

**对于每个可被 `Proxy` 捕获的内部方法，在 `Reflect` 中都有一个对应的方法，其名称和参数与 `Proxy` 捕捉器相同。** 


# Iterator & 遍历器

遍历器生成函数接收一个可选的数据结构(如数组)，返回一个遍历器对象，该对象必须要有 `next` 方法，调用该函数会返回指定的数据结构中的下一个元素。for...of 根据遍历器对象依次访问元素。

- **可遍历数据**：部署了 iterator 接口，原生的数组、部分类数组对象、Set、Map的 `Symbol.iterator` 属性就是遍历器生成函数，最简单的实现方式就是 generator 函数。

- for...of、扩展运算符、解构赋值。


# Promise

- Promise是异步编程的一种解决方案，比传统的解决方案—**回调函数和事件**更合理和更强大；

- 有了`Promise`对象，就可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数。此外，`Promise`对象提供统一的接口，使得控制异步操作更加容易。Promise提供then方法加载回调函数，使用then方法以后，异步任务的两段执行看得更清楚了；

- Promise就是为了解决回调地狱而提出的，它不是新的语法功能，而是一种**新的写法**，允许将回调函数的嵌套，改成链式调用；

- Promise 创建后会立即执行

```javascript
let promise = new Promise(function(resolve, reject) {
  // 需要执行的异步操作, 立即执行
  // 异步操作失败时执行 reject, 成功执行 resolve,
  // resolve 和 reject 会将数据以实参的形式传递出去;
  console.log('Promise');
  setTimeout(resolve, ms, 'done');  
});
```

- `then` 方法可以接受两个回调函数作为参数。第一个回调函数是Promise对象的状态变为Resolved时调用，第二个回调函数是Promise对象的状态变为Reject时调用。其中，第二个函数是可选的，不一定要提供。这两个函数都接受Promise对象传出的值作为参数。

## Promise 读取文件

```javascript
let read = require('read-file');
function readFile(name) {
  return new Promise((resolve, reject) => {
    // 1. 第1步
    read(name, 'utf-8', (error, data) => {
      if (error) reject(error);
      else resolve(data);
    });
  });
}

readFile('name2.txt')
	// 2. 第2步
  .then(data => readFile(data))
	// 3. 第3步
  .then(data => {  		
      console.log(`1-s: ${data}`);
      return 123;
    },
    error => {
      console.log(`1-e: ${error}`);
      return 0;
    })	
  .then(data => console.log(`2-s: ${data}`),
    error => console.log(`2-e: ${error}`))
  .then(data => console.log(`3-s: ${data}`),
    error => console.log(`3-e: ${error}`));
/*
 执行流程
 1. 执行第一步, 通过 resolve(data) 或 reject(error) 传递数据, 并且返回一个 promise 实例;
 2. 执行第二步, 根据上一步是成功或失败, 执行 then 的成功回调或失败回调; 如果上一步返回的是 promise 实例,
    则回调函数的参数来自于 resolve(data) 或 reject(error) 的实参;
    如果上一步返回的不是 promise 实例, 则回调函数的参数来自于上一步 return 的值。 
*/
```

## 参考

- [你了解Promise吗-segmentfault](https://mp.weixin.qq.com/s?__biz=Mzg5ODA5NTM1Mw==&mid=2247484260&idx=1&sn=0bc8a7aed8b15d3cc7e75c76394b648a&chksm=c06682f2f7110be41b29ce0eabc441fba11e1ab306ca40e4e7d81d338b4af7e35721573d1cca&mpshare=1&scene=1&srcid=&sharer_sharetime=1566171898757&sharer_shareid=c0fa4bb765d12545f4439ab827814978&key=56eb82a42460d979c3afc63a4f31177e13db16329cf4763c707bf96642e8906b81d68c0b03fa52eaabde20326b79c31368a9de23b389122e084df4a3c4aa327001973a319a1020fe8e99f6a26930b5b9&ascene=1&uin=Mjc2NDI1NDU2NA%3D%3D&devicetype=Windows+7&version=62060833&lang=zh_CN&pass_ticket=D8igzih7KnA8%2F5LHQdRG6th5IVXvvQD7ukUD5HSt%2FLcfZ7gOforYJWqBjo9rYF%2FC)
- [Promse A+ 规范](https://malcolmyu.github.io/2015/06/12/Promises-A-Plus/#note-4) 
- [Promise 实现原理-掘金](https://juejin.im/post/5b83cb5ae51d4538cc3ec354)


# Generator

Generator函数是ES6提供的一种异步编程解决方案，执行Generator函数会返回一个**遍历器对象**，即 Generator 是迭代器生成函数。

从语法上，首先可以把它理解成，Generator函数是一个状态机，封装了多个内部状态。

执行Generator函数会返回一个遍历器对象，也就是说，Generator函数除了状态机，还是一个遍历器对象生成函数。返回的遍历器对象，可以依次遍历Generator函数内部的每一个状态。

Generator函数有多种理解角度：

- Generator函数是一个状态机，封装了多个内部状态。

- 形式上，Generator函数是一个普通函数，但是有两个特征。

  1. `function` 关键字与函数名之间有一个星号；
  2. 函数体内部使用 **yield** 语句，定义不同的内部状态（yield语句在英语里的意思就是“产出”）。

- 例如

```js
function* foo(x) {
  log('start');
  var y = 2 * (yield (x + 1));
  var z = yield (y);
  return (x + y + z);
}
var hw = foo(1);  // 执行该行不会输出 start
hw.next();   // { value: 2, done: false }
hw.next(3);  // { value: 6, done: false }
```

> yield

- 遇到 `yield` 语句，就暂停执行后面的操作，并将紧跟在 `yield` 后面的那个表达式的值，作为返回的对象的 `value` 属性值。
- yield 表达式(如：yield(x+1)) 的返回值是 undefined，通过 hw.next(val)可以设置上次 yield 表达式的返回值；

<p style="color:red;font-weight:bold">核心：yield 暂停执行，next 继续执行</p>

> 返回值: iterator 遍历器对象

Generator函数总是返回一个遍历器，ES6规定这个遍历器是Generator函数的实例，也继承了Generator函数的`prototype`对象上的方法。

```javascript
function* g() {};
g.prototype.hello = function () {
  return 'hi!';
};

let iter = g();

iter instanceof g // true
iter.hello()      // 'hi!'
// 生成器函数g()返回的迭代器对象 iter 是 g 的实例，并且继承了 g.prototype 上的方法;
// g() 类似于构造函数, 但又不是，g() 返回的不是 this, this === global;
```

> 将 Generator 封装为构造函数并 在 Generator 中使用 this

```javascript
function* gen() {
  this.a = 1;
  yield this.b = 2;
  yield this.c = 3;
}

function F() {
  return gen.call(gen.prototype);
}

var f = new F();

f.next();  // Object {value: 2, done: false}
f.next();  // Object {value: 3, done: false}
f.next();  // Object {value: undefined, done: true}
```

> `yield*`

`yield*` 遍历遍历器对象，任何有 Iterator 接口的数据结构都可以被 `yield*` 遍历

用来在一个Generator函数里面执行另一个Generator函数。


## 异步 Generator

异步 Generator 生成 异步的 Iterator ，异步 Iterator 的 next() 方法返回的是一个 Promise

异步 Generator 的 yield 产出的是 Promise 对象或 Thunk ，即异步生成器创建的迭代器的 next() 方法返回的是 Promise

## 应用

1. 异步操作的同步表达；
2. 控制流管理；
3. 部署 Iterator 接口；
4. 作为数据结构：类数组结构

> 遍历二叉树

```javascript
// 下面是二叉树的构造函数，
// 三个参数分别是左树、当前节点和右树
function Tree(left, label, right) {
  this.left = left;
  this.label = label;
  this.right = right;
}

// 下面是中序（inorder）遍历函数。
// 由于返回的是一个遍历器，所以要用generator函数。
// 函数体内采用递归算法，所以左树和右树要用yield*遍历
function* inorder(t) {
  if (t) {
    yield* inorder(t.left);
    yield t.label;
    yield* inorder(t.right);
  }
}

// 下面生成二叉树
function make(array) {
  // 判断是否为叶节点
  if (array.length == 1) return new Tree(null, array[0], null);
  return new Tree(make(array[0]), array[1], make(array[2]));
}
let tree = make([[['a'], 'b', ['c']], 'd', [['e'], 'f', ['g']]]);

// 遍历二叉树
var result = [];
for (let node of inorder(tree)) {
  result.push(node);
}
```

> 参考

[Generatot函数](http://caibaojian.com/es6/generator.html)


# async & await

**async 函数就是 Generator 函数的语法糖**。用 `async` 替换 Generator 函数声明中的 `*`，用 `await` 替换 `yield` 

await 命令只能出现在 async 函数中，await 表达式会暂停当前 [`async function`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function) 的执行，等待其后面表达式的结果，像 Generateor 函数一样将执行权转让给其他程序；

- async 定义一个通过事件循环异步执行的异步函数，该函数隐式返回一个 Promise 对象，可以用`then`方法指定下一步的操作。
- `async`函数内部`return`语句返回的值，会成为`then`方法回调函数的参数；
- `async`表示函数里有异步操作，`await`表示紧跟在后面的表达式需要等待结果。
- `async`函数返回的 Promise 对象，必须等到内部所有`await`命令后面的 Promise 对象执行完，才会发生状态改变，才会执行`then`方法指定的回调函数，除非遇到`return`语句或者抛出错误。



> result = await 表达式

When an `await` is encountered in code (either in an async function or in a module), the awaited expression is executed, while all code that depends on the expression's value is paused and pushed into the [microtask queue](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop). The main thread is then freed for the next task in the event loop. This happens even if the awaited value is an already-resolved promise or not a promise. 

当在 async 函数或 module 顶层中遇到 await 运算符，await 后面的表达式立即执行，await 语句后面的语句加入到【微任务】队列中，即使 await 表达式是 already-resolved promise or not a promise。

- await 等待一个Promise对象，await 表达式的值就是 Promise 处理的结果，若表达式不是 Promise，
- 则返回表达式本身的值；
- await 会暂停异步函数(async 函数)的执行（无论表示的是否是 Promise-like），调用async函数的上层函数会继续执行(收到异步函数返回的隐式Promise)
- 若 await 后面的表达式的值不是 Promise 或 [thneables](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise#thenables) ，则用 Promise.resolve() 包装
  If the value is not a `Promise`, `await` converts the value to a resolved `Promise`, and waits for it. 

- 若 await 后面的表达式的值是Promise，且 Promise 正常处理(fulfilled)，其回调的resolve函数参数作为 await 表达式的值，继续执行 [`async function`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function)。

- 若 await 后面的表达式的值是Promise，且  Promise 处理异常(rejected)，await 表达式会把 Promise 的异常原因抛出。所以最好将await命令放在`try catch`中

```js
async function myFunction() {
  try {
    await somethingThatReturnsAPromise();
  } catch (err) {
    console.log(err);
  }
}
```


> async 实现

async 函数的实现原理，就是将 Generator 函数和自动执行器，包装在一个函数里。

```js
function spawn(genF) {
  return new Promise(function (resolve, reject) {
    const gen = genF();
    function step(nextF) {
      let next;
      try {
        next = nextF();
      } catch (e) {
        return reject(e);
      }
      if (next.done) {
        return resolve(next.value);
      }
      Promise.resolve(next.value).then(
        function (v) {
          step(function () {
            return gen.next(v);
          });
        },
        function (e) {
          step(function () {
            return gen.throw(e);
          });
        }
      );
    }
    
    step(function () {
      return gen.next(undefined);
    });
  });
}
```

> 参考

- [MDN-aync](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function)
- [MDN-await](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/await)  
- [理解 JavaScript 的 async/await](https://segmentfault.com/a/1190000007535316) 
- [async & await 面试题](https://mp.weixin.qq.com/s?__biz=MjM5NTEwMTAwNg==&mid=2650215577&idx=1&sn=0edb4be37430e17ba1029ab3b1a36a57&chksm=befe14b889899daea69684da9ac22613cfef5e534f920a194a640f21ab5ec839d498642ed455&scene=0&key=6deb43fc298651d2935752bd2c9f8fa907d71cfcf410807341a1a420ced46efe20f453fa8f835874ef05bec5deefb1be9a1a136a7027e798b32030bded88d257b46b8f1442a2b56ac165cfaa80db49f5&ascene=1&uin=Mjc2NDI1NDU2NA%3D%3D&devicetype=Windows+7&version=62060720&lang=zh_CN&pass_ticket=Pn9cJyIWK2xt%2BmQltkMddf4S5oGoplFdiJ%2B16Yj6gD8L9Zd0WMlQ1u32%2FRJtZE1p) 
- [setTimeout promise async](https://gongchenghuigch.github.io/2019/09/14/awat/) 


# 异步编程

ES6诞生以前，异步编程的方法，大概有下面四种：回调、事件监听、Promise对象

[异步编程](http://caibaojian.com/es6/async.html) 

# 模块

- import 命令具有提升效果，import 是在编译阶段执行的，在代码运行之前。
- `import`语句会执行所加载的模块
- `import`语句是 Singleton 模式，多次import 同一个模块只会导入一次，也只会执行一次模块中的全局代码

```js
import {A} from 'mode'
import {A} from 'mode'

// 等价于 
import {A, B} from 'mode'
```