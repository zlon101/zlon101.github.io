#### 基本概念

> 1. JS 属于解释型语言，不用编译转换为其他语言(如C++需编译为汇编语言才能由计算机执行)。
> 2. **单线程**：同一时间只能做一件事，只能有一段代码被 JavaScript 引擎执行；



##### 数据类型

参考: [你真的掌握变量和类型了吗](https://juejin.im/post/6844903854882947080)  数据存储、栈、堆

1. 基本数据类型：Number、String、Boolean、Null、Undefined、Symbol 值保存在**栈中**；变量存放的是数据本身，值是不可变的，在内存中占据固定的8字节大小；按值访问；
2. 引用类型：Object、Array、Function 等值保存在**堆中**(对象、数组的大小是动态的)，变量存放的是数据的引用(地址)，按引用访问；
3. 栈的速度快，但数据的大小和生命期是固定的；堆可以动态分配内存大小，速度慢；

##### 赋值|深拷贝|浅拷贝

- 对于基本类型，赋值、浅拷贝及深拷贝得到完全独立的新的变量；
- 对于引用类型，赋值(参数传递 & 返回值)相当于复制指针(引用)，新变量的内部数据与原数据完全相同；
- 浅拷贝，只会对第一层创建新的变量；

> 数组的 slice、from、concat 及析构 ... 属于浅拷贝，Object.assign 也是浅拷贝；深度拷贝可以利用JSON.parse(JSON.stringify(obj)) 实现，但不能处理 undefine、函数、symbol 等在序列化时被忽略的值；

##### 对象和数组字面量

- 使用对象和数组字面量创建时不会调用各自的构造函数；

#### 动态原型

- JS中原型上的方法可以访问该原型的实例的上下文, 即访问实例的数据或方法；

  ```js
  Vue.prototype.$reverseText = function (propertyName) {
    this[propertyName] = this[propertyName]
      .split('')
      .reverse()
      .join('')
  }
  
  new Vue({
    data: {
      message: 'Hello'
    },
    created: function () {
      console.log(this.message) // => "Hello"
      this.$reverseText('message')
      console.log(this.message) // => "olleH"
    }
  })
  ```

#### 类型转换

> 参考:  [类型和精度](https://juejin.im/post/6844903854882947080#heading-23) 

**规则：**  

- 基本数据类型之间的相互转换；(参考JavaScript 权威指南 P49)

- 对象转换为基本数据类型：
  valueOf & toString() 分别在什么情况下使用？

  1. 希望对象转换为数字( Number(obj) )时：

     - 若对象有 valueOf，并且 valueOf 返回一个**原始值**(Number、String、Boolean、Null、undefined)，则调用valueOf，并在需要时将 valueOf 返回的原始值转换为 Number 类型；

     - 否则调用 toString ，若 toString 返回的不是原始值则抛出错误，否则返回 toString 的值，并在需要时将 toString 的返回值转换为 Number 类型。

  2. 希望对象转换为 String(obj) 时：

     - 与上面完全类似，只是先检测 toString ，若不满足再检测 valueOf。

  3. 特殊情况

     - 加法运算符(不是一元 `+` 运算符)、==、!=、关系运算符 (>、<等)这四类运算符作用于非日期对象时，使用第一条规则，但是不会对 valueOf 或 toString 的返回值进一步转换；
     - 加法、==、!=运算符作用于日期对象时，都将 Date 转换为 String 类型，并返回 string ，

     ```js
     let date = new Date();
     print(typeof (date + 0));	// string
     date == String(date);     // true
     
     let obj = {
       valueOf() {
         print('call valueOf\n');
         return '100';
       },
       toString() {
         print('call toString\n');
         return 200;
         }
     }
     obj + 1;
     obj + 'str'
     ```

- String & Number 的关系
  1：数字与字符串作加法时，将数字转换为字符串；
  
  2：其他运算符(==、比较运算符)，将字符串转换为数字；
  
  ```js
  {} == ''
  // 调 ({}).valueOf() 返回的是自身，一个对象
  // 再调 toString()，返回 '[object Object]'
  // 两个字符串做比较，结果为 false
  // 如果右侧是数字，再将[object Object] 转换为数字 NaN，再做比较
  
  '1' == 1;  // true
  ```
  
- 以下数据在转换为 Boolean 类型时为 false
  0 -0 +0 null defined NaN ''
  [] 和 {} 转换为 true

  ```js
  undefined == null; // undefined === null 为 false
  NaN == NaN;		   // false , JS 中唯一的一个
  ```
  
- Boolean、String、Number 包装对象

  ```js
  var x = new Boolean(false); // x 是一个对象
  if(x){
     console.log(true);  // true
  }
  ```
#### 对象

> 对象只能用 string 类型作为键，Map 的键可以是任何类型；
>
> 对象的某个属性只能是**数据属性**或**访问器属性**中的一种；
>
> - 数据属性：用 configurable、enumerable、value、writable描述符对象描述；
>
> - 访问器属性：用configurable、enumerable、get、set 描述符对象描述；
>
> - Object.create、assign、defineProperty、defineProperties、getOwnPropertyDescriptor、getOwnPropertyDescriptors
>
>   - create 与 defineProperties 的第二个参数是相同类型，都是一个属性描述符对象；使用以上三类方法定义对象的属性时，value、configurable、enumerable、writable 默认值分别是 undefined、false、false、false，而使用属性访问(点运算符 `obj.prop`)定义的属性的 configurable、writable、enumerable 默认值是 true；
>   - assign 浅拷贝源对象的属性时，只能拷贝源对象的可枚举的自身属性，同时拷贝时无法拷贝属性的特性们(configurable、writable、enumerable 的值被忽略，被全设为 true)，而且访问器属性会被转换成数据属性；
>   - configurable 为 false 时，属性的 `configurable、enumerable、getter、setter` 不能被修改，唯一能修改的是将 `writable` 从 true 改为 false；属性的值是否能被修改只需要看 `writable` 属性。
>
> 

- 无值：没有值与值为 undefined 不同 

  ```js
  var arr = new Array(3);
  arr[0] = undefined;
  // 第一项有值，其余项没有值
  ```


- 字符串 in obj;  遍历对象及其**原型链**上的**有值**的属性，包括**不可枚举**的属性；

  ```js
  'valueOf' in [];	// true
  'valueOf' in {};	// true
  ```
  
  
  
- for...in
  无序  含继承属性  可枚举  有值(含undefined null)     可终止循环；
  for-in 以原始插入顺序遍历对象的可枚举属性(key)；
  
  因为遍历是无序的，所以不能在数组上使用；
  
  - in 运算符判断属性是否在对象或对象的原型链上，可以判断**不可枚举 & valueOf 等原生属性**，不含空值；




- for...in 是唯一一个可以遍历**原型链**上的属性；
- `Object.getOwnPropertyNames(obj)`  & `obj.hasOwnProperty`是唯一一个可以遍历**不可枚举**属性；
- for...of 调用的是 Iterable 接口, 唯一可遍历**无值**的方法；
- 其余的 Array.map、forEach、Object.keys、Object.values()都是遍历自身、可枚举、有值的属性；
  - map & forEach 都不能使用`break 、continue`；
  - `map` 返回新的数组，forEach 返回 undefined；

##### API

参考:  https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object  

**原型相关：**  

- `Object.getPrototypeOf(obj)` 
- `Object.setPrototypeOf(obj, protoObj)`
- `Object.prototype.isPrototypeOf(obj)` 

**属性相关：**  

- `Object.keys(obj)`：自身**可枚举**属性

- `Object.getOwnPropertyNames(obj)`:  返回包括**不可枚举**在内的自有属性

- `Object.getOwnPropertySymbols(obj)` 

- `Object.getOwnPropertyDescriptor(obj,prop)`：返回`obj.proto`属性描述符对象

- `Object.getOwnPropertyDescriptors(obj)`：返回`obj` 的所有自身属性(包括 Symbol )的描述符对象

- `Object.defineProperty(obj,prop, descriptor)` 

- `Object.defineProperties(obj,props)` 

- `Object.prototype.hasOwnProperty(prop)`：

  

##### 浅拷贝对象

Object.assign() 方法只能拷贝源对象的可枚举的自身属性，同时拷贝时无法拷贝属性的特性们，而且访问器属性会被转换成数据属性，也无法拷贝源对象的原型，该方法配合 Object.create() 方法可以实现上面说的这些。

```js
Object.create(
  Object.getPrototypeOf(obj),
  Object.getOwnPropertyDescriptors(obj)
)；
```

参考： https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptors 

##### 深拷贝

1)  `JSON.stringify + JSON.parse` :  `undefined`、symbol、函数

参考:  https://juejin.im/post/6844903929705136141 

```js
export function deepClone(srcData, hash = new WeakMap()) {
  // 基本数据类型 | 函数
  if (srcData === null || typeof srcData !== 'object') {
    return srcData;
  }
  if (srcData instanceof Date) return new Date(srcData);
  if (srcData instanceof RegExp) return new RegExp(srcData);

  if (hash.get(srcData)) {
    return hash.get(srcData);
  }

  // 引用类型: 包括数组
  let newData = new srcData.constructor();
  hash.set(srcData, newData);

  let keys = [...Object.keys(srcData), ...Object.getOwnPropertySymbols(srcData)];
  keys.forEach((k) => {
    newData[k] = deepClone(srcData[k], hash);
  });
  return newData;
}
```





#### 数组

> - 本质是对象，数字索引在内部被转换为字符串，因为 JS 对象的属性名只能是字符串。
> - 使用 [] 字面量创建数组比使用 new 效率更高；

##### 数组有哪些方法支持响应式更新，如果不支持怎么办，底层原理如何实现？

- 支持：push、pop、shift、unshift、splice、sort、reverse，这些方法会改变原数组。
- 不支持：filter、concat、slice、forEach、map，这些方法不会改变原数组；可以修改整个数组实现响应式更新(将新的数组赋值给原来的数组)。
- 原理同样是使用 Object.defineProperty 对数组方法(get、set)进行改写

##### forEach 和 map 的区别

1. `forEach` 执行后返回 `undefined`，不会修改原数组，不能提前终止和跳出循环；
2. `map` 执行后返回新的数组，不会修改原数组，不能提前终止和跳出循环；
3. `for in ` & `for of` 可以提前终止(break)循环；

#### 正则表达式

##### RegExp

###### RegExp 对象的属性

- lastInd: 下一次检索的起始位置，RegExp.exec() & RegExp.test() 会用到；
- source: 正则表达式的字符串形式；
- global、ignoreCase、mutiline：Boolean 类型的值，表示是否有该修饰符；

- RegExp.test('abc')：Boolean 值，是否匹配；
- RegExp.exec('abc')：[完整匹配的子串, index: 0, input: 输入的字符串]，数组的第二项开始是括号捕获的字符串，如果有修饰符 g，则可以多次调用 exec()，每次调用是从 lastInd 开始搜索；

##### String 方法

- String.search()，首次匹配的索引，未匹配则返回 -1；
- String.match()
  1. 没有 g 修饰时，返回的结果与 RegExp.exec()相同
  2. 有 g 修饰时，返回数组，数组项包含全部匹配的子字符串；
- String.replace()
- String.split()

> 创建正则表达式的两种方式: 字面量和构造函数的区别

- 字面量形式的表达式在脚本加载后编译，正则表达式是常量是用字面量更合适；

- 构造函数形式的表达式在脚本运行时编译，构造函数用于创建动态的正则表达式；

- 反斜杠(\\)在字符串中有特殊含义，表示其后的字符作为普通字符处理（the backslash is an escape in string literals）。`/a\*b/` 和 `RegExp("a\\*b")` 等价。

  ```js
  // 字符串的特殊字符前加入反斜杠
  function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
  }
  ```

#### 继承

```js
function Parent(){}
function Child(){
  Parent.call(this);
}
Child.prototype = new Parent(args);
Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;
```



API

- 原型相关

  ```js
  // 原型链, 可以是原型的原型
  obj.isPrototypeOf()
  Object.getPrototypeOf()
  Object.setPrototypeOf()
  //obj instanceof 构造函数
  ```

- 访问对象的原型

  1: `__proto__`

  2: Object.setPrototypeOf、Object.getPrototypeOf

  3: 通过构造函数 obj.constructor.prototype


参考：

- [双重继承](https://mp.weixin.qq.com/s?__biz=MjM5NTEwMTAwNg==&mid=2650215832&idx=1&sn=7e48c9ef8bf7c4ccaa246907eb6579f5&chksm=befe15b989899caf8612620992acdb67783396f1b2bf981fae71cf761fac43c16b4b60457975&scene=0&key=06b6f34db6d09e01cbeea01642f35f6916e02c7d3cc0c4d1b777d666c2d8d94cacb1516bc3b5a608a6713416a69e553d88c1feba945dc494447e016071b279de4675b2ca438636285d10a796bdf5b3b2&ascene=1&uin=Mjc2NDI1NDU2NA%3D%3D&devicetype=Windows+7&version=62060739&lang=zh_CN&pass_ticket=ltTFzXuqdXnUtMsLWgFnt%2B8zWUV2F%2B3hSDDtrPIUYwtCjZ5qZr5AlYFajnxJ9w5P) 

#### bind apply

- fn.bind(obj) 之后 fn 的执行上下文就无法更改；

  ```js
  // 即使是执行 fn.bind(obj2) 或 fn.call(obj2) 或者以对象的方法调用
  fn.bind(obj);
  let obj3 = {
    print: fn
  }
  obj3.print();  // print 的执行上下文依然是 obj
  ```


##### fn.apply

指定函数 fn 的 this 对象；并且将参数的传递方式改为数组(即参数为数组)

**应用**

- apply 修改参数的传递方式

  ```js
  Math.max(1,2,3);    // 3
  Math.max( [1,23] )  // NaN
  
  // 目的: 以数组的形式传参
  let max = function(arr){
    return Math.max.apply(Math, arr);
  }
  max([1,2,3]);
  ```

- 类数组使用数组方法

**实现**

- demo

  ```js
  if (!Function.prototype.myBind) {
    Function.prototype.myBind = function bind(ctx) {
      let preArg = [].slice.call(arguments, 1);
      let self = this;
      let binded = function () {
        let arg = [].slice.call(arguments);
        arg = preArg.concat(arg);
        preArg = null;
        self.apply(new.target ? this : ctx, arg);
      }
      if (self.prototype) {
        binded.prototype = Object.create(self.prototype);
      }
      return binded;
    }
  }
  ```

  

#### this

> 定义：**运行时**函数的执行环境；
>
> JS 中一切皆对象，运行环境也是对象，函数、对象方法都是运行在某个环境中(this)；

- this指向代码运行时所在的对象，非箭头函数的this由运行时(**调用时**)决定；箭头函数的this由定义是外层作用域的this决定。
  函数调用的形式有：

  1. 普通形式：fn(12)

  2. 箭头函数调用

  3. 对象方法 & 数组元素：

     ```js
     // 以对象的方法调用
     obj.fn(12)
     
     function fn(){
       console.log(this.val);
     }
     let arr = [fn];
     arr.val = 100;
     arr[0]();  // 100; 数组也是对象
     ```

  4. 构造函数：new fn(12)
     调用构造函数会自动创建一个新的实例对象，通过this获取该实例，构造只是用于初始化该对象；构造函数的prototype属性作为实例对象的原型；

  5. bind apply call：fn.apply(proto, 12)

  6. 回调函数，自动调用：

     ```js
     arr.map( function(item){
       // 回调函数是非箭头函数时, 回调函数的this指向全局对象
       // 回调函数是箭头函数时，this 指向 ???
     })
     ```

- 同一个函数可以在不同的环境中执行，而且函数内部可以访问当前环境的其他变量，因此需要能引用当前的执行环境；

- 箭头函数中this由词法作用域决定，this被设置为包含该箭头函数的执行上下文的this(父级上下文)，**且不受调用方式影响**；

  ```js
  var globalObject = this;
  var foo = () => this;
  console.log(foo() === globalObject);    // true
  
  var obj = {foo: foo};
  console.log(obj.foo() === globalObject); // true
  
  console.log(foo.call(obj) === globalObject); // true
  
  foo = foo.bind(obj);
  console.log(foo() === globalObject); // true
  ```

- 函数(方法)中的 this 指向调用该函数(方法)的对象，ES5在非严格模式下的函数调用中，this 指向全局对象(函数作为全局对象的属性，调用函数类似调用全局对象的方法)，严格模式下指向undefined；strict模式下，this指向全局对象会报错，所以strict模式下禁止将对象中使用了this的方法导出至全局环境中。

参考：

- [JS 中的 this 的原理-阮一峰](http://www.ruanyifeng.com/blog/2018/06/javascript-this.html)

#### 作用域

> - Scope：当前执行上下文，包含当前所有可见的变量，Scope在我们写代码的时候就被定义好了，比如谁嵌套在谁里面。
>
> - 作用域为可访问变量，函数的集合。
>
> - 当函数被调用，一个 execution context 被创建，这个执行上下文包涵信息：函数在哪调用（call-stack），函数怎么调用的，参数等等；执行上下文的一个属性就是this，指向函数执行期间的this对象。

<img src="assets/1566455349876.png" style="margin:0; padding-left:1em; width:40%">

- 泡泡1是全局作用域，有标识符foo；
- 泡泡2是作用域foo，有标识符a,bar,b；
- 泡泡3是作用域bar，仅有标识符c。



每次调用函数都会创建新的执行上下文，具体分解为两步：

1. creation stage(调用函数时，但在执行函数内部代码之前)
   - 创建scope chain(**作用域链**)，包含至少一个 VO：[vo1, v02, ...]
   - 创建变量对象：形参、arguments、函数体中声明的变量和函数，此时变量的值为 undefined ；当变量和函数使用相同的标识符声明时，函数的优先级更高；
   - 确定 **this**
2. activation\code execution stage
   - 分配值，引用函数和解释/执行代码；

将执行上下文表述为对象，其属性分别为：作用域链 变量 this；

##### 参考

- [执行上下文-重点-英文](http://davidshariff.com/blog/what-is-the-execution-context-in-javascript/)
- [作用域链-重点-英文](http://davidshariff.com/blog/javascript-scope-chain-and-closures/)
- [执行上下文-segementFault](https://mp.weixin.qq.com/s?__biz=MjM5NTEwMTAwNg==&mid=2650215808&idx=1&sn=8c882586a033f58a56498c02f5b88792&chksm=befe15a189899cb7c66ab13e987130c3aa72d5888e5da6676b9aa37a664012cb9e5bcc02ac7f&scene=0&key=aed6be2b7ed28ff5f6586ea4cb6bdcf73f5d9f7317d7c6ca48d223d2c2cbe07e5ee4cfed2395e25889e258ccbc81272f38ba2c899370291e19cd8aff41009769922c6d9df34c30b99f745bbd3e4ce914&ascene=1&uin=Mjc2NDI1NDU2NA%3D%3D&devicetype=Windows+7&version=62060720&lang=zh_CN&pass_ticket=Pn9cJyIWK2xt%2BmQltkMddf4S5oGoplFdiJ%2B16Yj6gD8L9Zd0WMlQ1u32%2FRJtZE1p)
- [变量对象-掘金](https://juejin.im/post/58ec3cc944d90400576a2cdc)

#### 闭包

> - 词法作用域：变量的作用域，即变量能被访问的区域；每个函数都有一个与之关联的作用域链，**函数定义时创建作用域链**，调用函数时创建一个新的对象用来保存当前函数作用域；内嵌函数的作用域上至少有3个作用域对象(内嵌函数作用域、外部函数作用域、全局作用域)；
>
> - 函数对象的内部状态除了包含函数的代码，还必须引用当前作用域链；
>
> - JavaScript 允许函数嵌套，并且内部函数可以访问定义在外部函数中的所有变量和函数，以及外部函数能访问的所有变量和函数。但是，外部函数却不能够访问定义在内部函数中的变量和函数(函数作用域 & 局部作用域)。这给内部函数的变量提供了一定的安全性。此外，由于内部函数可以访问外部函数的作用域，因此当内部函数生存周期大于外部函数时，外部函数中定义的变量和函数的生存周期比内部函数执行时间长。当内部函数以某一种方式被任何一个外部函数作用域访问时，一个闭包就产生了；
>
> - **JS 每次执行一个函数**，都会创建一个新的**作用域对象**(scope object)，用来保存在该函数中创建的局部变量；通常在函数返回时，垃圾回收器会在这时回收这个作用域对象；如果这个函数返回的函数或对象方法却保留一个指向这个作用域对象的引用，因此这个作用域对象不会被回收；
>
> ```js
>function outside(x){
>      var privateVar;     // 此处可以定义私有数据
>      function inside(y){
>       	return x+y;
>    	}
>    	return inside;
>   }
>   var fn_inside = outside(3); // fn_inside的功能是将实参加3
>   var result = fn_inside(2);  // 5
>   var result2 = outside(3)(2);// 5
> ```
> 
>   inside 被 return 后，传入 outside 的实参(当前是3)是如何保存的( outide 的形参 x 与在该函数内部定义的 privateVar 一样)。一个闭包必须保存它可见作用域中所有的参数、变量，因为每次调用 outside 传入的参数可能不同，每次调用 outside (外部函数 )实际上都重新创建了一遍这个闭包(**本质是内部函数被重新定义，关联了新的作用域链**)。只有当返回的inside 没有被引用时，内存才会被释放。上式的作用域链为：inside--->outside--->全局；
>
>   **注：**不能在内嵌函数中(特别是形参)定义与外部函数同名的变量，否则将无法访问定义在外部函数中的变量；参考：函数 MDN

- demo

  ```js
  // 情况1
  function fn(){
      var n = 0;
      function add(){
          n++;
          console.log(n);
      }
      return {
          n: n,
          add: add
      }
  }
  var r1 = fn();	var r2 = fn();	
  r1.add();	r1.add();
  console.log(r1.n);
  r2.add();
  // 输出：1 2 0 1, 第三个为什么不是 2
  
  /* 情况2：如果 r1.n 是引用类型, 此时输出的值与前一个值相同 */
  function fn(){
      let obj = {};
      obj.n = 0;
      function add(){
          obj.n++;
          console.log(obj.n);
      }
      return {
          n: obj,  // 不能用 n: obj.n, 必须是引用类型, 
          add: add // 因为函数返回是按值传递(复制), 如果返回的是基本数据类型, 
      }
  }
  var r1 = fn();	var r2 = fn();	
  r1.add();	r1.add();
  console.log(r1.obj.n);
  r2.add();
  // 输出 1 2 2 1
  // 答: 这种情况与闭包无关, 是因为return 返回的是对象的引用(与赋值一样), 
  // 所以当返回的是基本数据类型时, 返回的这个值与闭包中的值已经没有关联了;
  
  // 情况3
  function fn(){
    var n = 0;
    setTimeout( () => ++n );
    function add(){
        return n;
    }
    return {n: n, add: add  }
  }
  var r1 = fn();
  setTimeout(()=>{
    console.log('1s 后 r1.n: ' + r1.n);    // 输出 0
    console.log('1s 后 闭包: ', r1.add());  // 输出 1
  }, 1000);
  ```
  
  - 定义一个函数时，会创建一个**作用域链**，包含了该函数可以访问的作用域对象(VO变量对象)， 作用域链以数组的形式赋值给该函数的 [[Scopes]] 属性，作用域链中至少包含一个全局作用域对象；例如当执行 fn() 时，会创建 add 函数，同时创建包含两个作用域对象的作用域链，([[Scopes]] 数组有两个元素，Scopes[0] 代表的是外层函数 fn 的作用域对象，该对象只有 obj 一个属性；Scopes[1] 代表全局作用域对象)；
  - 调用函数 add 时，会为函数创建一个执行上下文，然后**复制** add 函数的 Scopes 属性值，构建当前执行环境的作用域链，再将当前 add 函数的作用域对象加入到所构建的作用域链的前端，组成 add 函数所能访问的全部作用域对象。 
  
  参考：JS 高阶程序设计 P179、P181

#### 函数-函数式编程

##### arguments

定义：函数调用时，传递给函数的实参的有序列表；

Q：arguments 与声明的形参是否同步

- 同步：非严格模式下没有使用默认参数、剩余参数、解构赋值；
- 其余情况都不会同步；

**严格模式**

- 函数内部开启严格模式，则该函数不能使用默认参数、剩余参数、解构赋值、arguments.caller;
- 使用函数表达式形式、或将 `use strict` 移至函数外可以解决上述问题；

##### 柯里化

> 作用：将一个函数拆分为多个函数，将多参形式转为单参形式，预先设置函数的参数；
>
> 形式：函数的封装，一个函数返回另一个函数；

- 判断数据类型

  ```js
  const checkType = type => {
    return data => Object.prototype.toString.call(data) === `[object ${type}]`;
  }
  let types = ['Number', 'String', 'Boolean'];
  let utils = {};
  types.forEach( type => utils[`is${type}`]=checkType(type) );
  
  // 使用
  utils.isNumber(12);
  ```

##### 节流 & 防抖

- 对计算复杂度较高的函数，限制其在一定时间内的执行次数，如1秒内调用多次，但只执行一次；比如 `onresize` 事件。

  ```js
  window.onresize = throttle(handleResize, 1000);
  function throttle(fn, time) {
    let timer;
    return (...args) => {
      timer && clearTimeout(timer);
      timer = setTimeout(() => fn(...args), time);
    }
  }
  function handleResize(e) {
    print(e.currentTarget.innerWidth);
  }
  
  
  // 防抖
  function debounce (callFn, interval){
    let timer = null;
    return function(){
      clearTimeout(timer);
      timer = setTimeout(()=>{
        clearTimeout(timer);
        callFn.apply(this, arguments);
      }, interval);
    }
  }
  
  // 节流:  降低执行的频率
  function throttle(callFn, interval){
    let timer = null;
    return function(){
      if(!timer){
        timer = setTimeout(()=>{
          clearTimeout(timer);
          timer = null;
          callFn.apply(this, arguments);
        }, interval);
      }
    }
  }
  
  // 函数调用 N 次后才真正执行一次
  function throttleTimer(callFn, N){
    let count = 0;
    return function(...args){
  		if(count++ === N){
  			callFn.apply(this, args);
        count = 0;
      }
    }
  }
  ```

##### 组合 compose



##### 偏函数



##### 函数记忆



#### 事件

##### 事件流（事件传播）
- 事件流：事件冒泡 & 事件捕获，用来描述从页面中接收事件的顺序；

  - IE 的事件流是事件冒泡机制，即事件是由最具体的元素(触发事件的那个元素)接收事件，然后沿 DOM 树逐级向上传播直到 document 对象，在每一级节点上都会发生该事件；
  - Netscape 是事件捕获机制，
  - 事件流即执行事件处理程序有三个阶段：事件捕获、处于目标阶段( event.target )、事件冒泡阶段；

- 注册事件监听器的方法有3种：

  1. 内联标签属性：`<input type="button" onclick="需要执行的JS代码 alert(event.type, 23)">`，监听器函数中的 this 执行全局对象 window；

  2. DOM 0 级事件处理程序：

     ```js
     btn = document.getElementById(btn'');
     btn.onclick = function (event){
         // 需要执行的代码
         // this 指向当前元素, this === event.target
         // 返回false会阻止事件的默认行为
         // 一类事件只能有一个事件监听器，多个监听器以最后一个注册的有效； 
     }
     ```
     
  3. DOM2 级事件处理程序：
  
     ```js
     btn = document.getElementById(btn'');
     btn.addEventListener('click', function(event){
         // this 指向当前元素, this === event.target
     });
     ```
  
     一类事件可以注册多个事件监听器，按注册的顺序调用执行；
  
     三种方法的事件处理程序函数中的 this 都指向当前元素(`this === event.currentTarget`)，参考《JS高级程序设计-P356》；
  
     当某种事件(如 click )通过三种方法注册了多个事件监听器时，他们的调用顺序为：
  
     - 标签属性注册的事件监听器最先执行；
     - DOM0 优先级高于 DOM2级的事件处理程序；
  - 通过 addEventListener注册的完全相同的事件监听器按注册的顺序执行；
  - `addEventListener(type, listener, options)`  options 选项
    - passive: 不会阻止默认事件，https://zh.javascript.info/default-browser-action#chu-li-cheng-xu-xuan-xiang-passive

##### 事件捕获与事件冒泡

<img src="assets/1561894029832.png" style="margin:0; width: 80%">

<img src="assets/eventflow.svg" style="margin:0; width:75%; height:450px">

- 当某类事件发生在一个元素上，现代浏览器运行两种方式：捕获和冒泡；
  - 捕获以 `<html>` 元素沿 DOM 树到该元素为路径，从 `<html>` 检测该路径上的元素是否注册了某类事件处理程序，若是，则运行该程序，然后继续检测路径上的下一个元素；
  - 冒泡：与捕获的不同之处在于，沿与捕获相反的方向开始检测，即从该元素开始到 html 元素；
  - 如今，默认所有事件处理程序都在**冒泡**阶段执行，若想在事件捕获阶段执行事件处理函数，可以用 addEventListener(, , true)，指定在该回调函数在事件捕获阶段执行。
  - 实际的目标元素的监听器的执行阶段始终在第二阶段(处于目标)，DOM2 级事件规范明确要求捕获阶段不涉及事件目标；
- 例子
  - div--->p--->button 表示 DOM 树，div 是 p 的父级，三个元素都用 addEventListener() 注册了 click 事件监听器，默认第三个参数为 false ，默认情况下三个元素的监听器的执行顺序为 ：button(第2阶段执行)、p(第3阶段执行)、div(第3阶段执行)；
  - 当第三个参数都设为 true 时，监听器的执行顺序为：div(第1阶段执行)、p(第1阶段执行)、button(第2阶段执行)；
  - 当div 和 button 使用 false注册事件监听，p使用 true 注册，点击button后执行的顺序为：p(事件捕获阶段)、button(处于目标阶段)、div(事件冒泡阶段)
- 小结：
  1. 一个事件被触发后(如点击页面上的一个元素，触发click类型的事件，这个元素称作目标元素)；
  2. 首先进行事件捕获，以根元素html元素为起点，沿DOM树直到目标元素，检查路径上的元素是否注册了同一类型的事件，并且指定了该事件处理程序在事件捕获阶段执行，若是，则执行事件处理程序；
  3. 处于目标阶段，执行目标元素的事件理程序；
  4. 最后是事件冒泡阶段，以目标元素为起点，直到根元素，若路径上的元素注册了相同类型的事件处理程序，并且指定了事件处理程序在事件冒泡阶段执行，则执行该事件处理程序；
  5. 若同一元素同一事件类型，在事件捕获和事件冒泡阶段都指定了事件处理函数，则这两个事件处理函数都会执行，即使该元素是目标元素也是，若是目标元素，则第三个参数无效，都是在第二阶段执行，按注册的顺序执行；
  6. event.stopPropagation(); 阻止捕获 & 冒泡阶段事件的传播，捕获阶段事件从根元素向目标元素传递，冒泡阶段事件从目标元素向根元素传递；
  7. event.preventDefault(); 取消默认事件；event.stopPropagation() 和 event.preventDefault()也可以在另外两种注册事件处理器的方法中使用；
  8. 内联事件处理程序 & `btn.onclick = handle` 都是在事件**冒泡**阶段执行回调函数；
- 一句话：`addEventListener` 的第三个参数指定回调函数在事件的捕获或冒泡阶段执行；

###### 事件委托

- 将监听器注册在父级元素上，监听来自子元素的事件，根据事件对象 event.target 来区分子元素；如 `<ul>` 及 `<li>`；
- event.preventDefault() 阻止默认事件；
  - Event.cancelable:  事件是否可以被取消，当 `cancelable` 为 `false` 时调用 `preventDefault` 无效。


##### 触发事件

如何手动触发事件：IE 中使用 fireEvent，标准浏览器中使用 dispatchEvent。

> `EventTarget.dispatchEvent()`  
>
> ```js
> let event = new MouseEvent("click", {
>   bubbles: true,
>   cancelable: true,
> });
> ele.dispatch(event);
> ```
>
> `dispathcEvent` 派发的自定义事件只能用 `addEventListener` 监听，不能用 `on<event>` 

##### 嵌套事件的执行顺序

通常事件的执行是异步的，在执行事件a时，发生了事件b，事件b会被添加到事件队列中；但是如果在一个事件是在另一个事件中发起时，该事件会立刻执行，然后恢复到之前的执行顺序

```js
<button id="menu">Menu (click me)</button>
<script>
  menu.onclick = function() {
    alert(1);
    menu.dispatchEvent(new CustomEvent("menu-open", {
      bubbles: true
    }));
    alert(2);
  };
  // triggers between 1 and 2
  document.addEventListener('menu-open', () => alert('nested'));
</script>
// 输出: 1 → nested → 2.
```



[javascript-info-event](https://javascript.info/dispatch-events) 


#### 事件循环

任务队列  宏任务(`macrotask`)  微任务(`microtask`)

任务队列中，在每一次事件循环中，`macrotask` 只会提取一个执行，而 `microtask `会一直提取，直到 `microsoft `队列为空为止。

也就是说如果某个 `microtask` 任务被推入到执行中，那么当主线程任务执行完成后，会循环调用该队列任务中的下一个任务来执行，直到该任务队列到最后一个任务为止。而事件循环每次只会入栈一个 `macrotask`，主线程执行完成该任务后又会检查 `microtasks`队列并完成里面的所有任务后再执行 `macrotask` 的任务。

macrotasks: setTimeout, setInterval, setImmediate, I/O, UI rendering;
microtasks: process.nextTick, Promise, MutationObserver；

```js
setTimeout(function () {
  console.debug("0");
}, 0);

let p = new Promise((resolve) => {
  console.debug("1");
  resolve();
});
p.then(() => console.debug("2")).finally(() => console.debug("3"));

console.debug("4");
// 1 4 2 3 0
```



**参考：**

- [JS 运行机制-事件循环-阮一峰](http://www.ruanyifeng.com/blog/2014/10/event-loop.html)
- [这一次，彻底弄懂 JavaScript 执行机制](https://juejin.im/post/59e85eebf265da430d571f89)
- [JavaScript 运行机制--Event Loop详解](https://juejin.im/post/5aab2d896fb9a028b86dc2fd)
- [腾讯-从 setTimeout 谈事件循环](http://www.alloyteam.com/2015/10/turning-to-javascript-series-from-settimeout-said-the-event-loop-model/#prettyPhoto)

#### Web Worker

> 浏览器中 JavaScript 引擎是单线程执行的。也就是说，在同一时间内，只能有一段代码被 JavaScript 引擎执行。如果同一时间还有其它代码需要执行的话，则这些代码需要等待 JavaScript 引擎执行完成当前的代码之后才有可能获得被执行的机会。正常情况下，作为页面加载过程中的重要一步，JavaScript 引擎会顺序执行页面上的所有 JavaScript 代码。当页面加载完成之后，JavaScript 引擎会进入空闲状态。用户在页面上的操作会触发一些事件，这些事件的处理方法会交给 JavaScript 引擎来执行。由于 JavaScript 引擎的单线程特性，一般会在内部维护一个待处理的事件队列。每次从事件队列中选出一个事件处理方法来执行。如果在执行过程中，有新的事件发生，则新事件的处理方法只会被加入到队列中等待执行。如果当前正在执行的事件处理方法非常耗时，则队列中的其它事件处理方法可能长时间无法得到执行，造成用户界面失去响应，严重影响用户的使用体验。



- 主线程**异步**创建 web worker，主线程代码不会阻塞在这里等待 worker 线程去加载、执行指定的脚本文件，而是会立即向下继续执行后面代码。

- Web Worker 自身是由 webkit(浏览器内核) 多线程实现，但它并没有为 JavaScript 语言带来多线程编程特性，我们现在仍然不能在 JavaScript 代码中创建并管理一个线程，或者主动控制线程间的同步与锁等特性。

- 在我看来，Web Worker 是 worker 编程模型在浏览器端 JavaScript 语言中的应用。浏览器的运行时, 同其他 GUI 程序类似，核心逻辑像是下面这个无限循环: 

  ```js
  while(true){  
      // 1 更新数据和对象状态  
      // 2 渲染可视化UI  
  }
  ```

- 在 Web Worker 之前，JavaScript 执行引擎只能在一个单线程环境中完成这两项任务。而在其他典型 GUI 框架，如前文 Swing 库中，早已引入了 Swing Worker 来解决大量计算对 UI 渲染的阻塞问题。Web Worker 的引入，是借鉴了 worker 编程模型，给单线程的 JavaScript 带来了后台计算的能力。

参考：

- [腾讯全端 AlloyTeam-Web Worker](http://www.alloyteam.com/2015/11/deep-in-web-worker/#prettyPhoto)
- [JS 工作线程实现方式-setTimeout & web worker](https://www.ibm.com/developerworks/cn/web/1105_chengfu_jsworker/index.html)
  setTimeout & setInterval 执行过程；

#### Ajax

**`XMLHttpRequest` 实例的属性**

- readyState：xhr 的状态，0-4；
  - 0：unsend 未初始化，未调用open；
  - 1：opened，已建立服务器链接；
  - 2：headers_receive，加载成功；
  - 3：loading，交互，正在处理请求；
  - 4：done，完成，请求已完成；
- onreadystatechange：xhr的状态更新时触发该事件；
- onloadstart、progress、onload：通信的进度事件；
- status：HTTP 响应状态码；
- statusText：HTTP 响应状态说明；
- responseText：响应内容； 

**使用**

- 为了确保跨浏览器兼容，在 `open` 之前注册 `onreadystatechange` 事件监听器，

- setRequestHeader必须在open方法之后，send()方法之前；且setRequestHeader可以调用多次，最终的值采用追加得到。

  ```js
  let xhr = getXHR();
  xhr.onreadystatechange = function (){
    if(xhr.readyState == 4){
      if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
         result = xhr.responseText;
  		}
    }
  }
  // 保证这些方法一定要是大写字母，否则其他一些浏览器（比如FireFox）可能无法处理这个请求
  xhr.open('GET', url);
  xhr.send(null);
  
  function getXHR(){
    var xhr = null;
    if(window.XMLHttpRequest) {// 兼容 IE7+, Firefox, Chrome, Opera, Safari
      xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
      try {
        xhr = new ActiveXObject("Msxml2.XMLHTTP");// 即MSXML3
      } catch (e) {
        try {
          xhr = new ActiveXObject("Microsoft.XMLHTTP"); // 兼容IE5、6
        } catch (e) {
          alert("您的浏览器暂不支持Ajax!");
        }
      }
    }
    return xhr;
  }
  ```

#### 各种方法实现

##### 实现 Array.reduce

```js
Object.defineProperty(Array.prototype, 'reduce', {
  value: function (callback /*, initialValue*/) {
    // this 指向数组
    var arr = Object(this);
    var len = arr.length >>> 0;
    var ind = 0;
    var initVal;
    // 有初始值
    if (arguments.length >= 2) {
      initVal = arguments[1];
    }
    else {
      // 稀疏矩阵, 无值 new Array(3)
      while (ind < len && !(ind in arr)) {
        ind++;
      }
      initVal = arr[ind++];
    }
    // 8. Repeat, while ind < len
    while (ind < len) {
      if (ind in arr) {
        initVal = callback(initVal, arr[ind], ind, arr);
      }
      ind++;
    }
    return initVal;
  }
});
```

- 简写为

  ```js
  Array.prototype._reduce = function(cb){
    let ind = 0;
    let len = this.length;
    let initVal = null;
    if(arguments.length > 1)	initVal = arguments[1];
    else{
      while(ind < len && !this.hasOwnProperty(ind)){
        ind++;
      }
      initVal = this[ind++];
    }
    
    for(; ind < len; ind++){
      initVal = cb(initVal, this[ind], ind, this);
    }
    return initVal;
  }
  ```

##### Object.create

```js
if(typeof Object.create !== 'function'){
  Object.create = function (proto){
    function _F(){};
    _F.prototype = proto;
    return new _F();
  }
}
```

##### 多维数组平铺

```js
function selfFlat(depth = 1){
  let arr = [].slice.call(this);
  if(depth === 0)	return arr;
  return arr.reduce((acc, cur) => {
    if(Array.isArray(cur)){
       // acc.concat(selfFlat.call(cur, depth-1));
       return [...acc, ...selfFlat.call(cur, depth-1)]
    }
    else{
      return acc = [...acc, cur];
    }
  }, []);
}

// 要求数组项不能包含逗号, 只能用逗号分隔
arr.join().split(',').map(i => print(i));
```

##### 快排

```js
//排序
function fastSort(arr, start, end){
  if(start==end) return;
  var ind = part(arr, start, end);  
  if(ind>start)  fastSort(arr, start, ind-1);
  if(ind<end)  fastSort(arr, ind+1, end);
}
function part(arr, start, end){  
  var ind = start, small=start-1;
  var midInd = Math.floor((start + end) >> 1);
  var target = arr[midInd];
  swap(midInd, end);
  
  for(; ind < end; ind++){
    if(arr[ind] < target){
      swap(ind, ++small);
    }
  }
  swap(++small, end);
  
  function swap(ind1, ind2){
    var t=arr[ind1];
    arr[ind1]=arr[ind2];
    arr[ind2]=t;
  }
  return small;  
}
```

##### 数组排序并去重

```js
function sortRemoveDuplicate(oriArr){
    if(oriArr.length > 1){
        let middleInd = Math.floor(oriArr.length / 2);  // 数组中位数索引
        let middleVal = oriArr.splice(middleInd, 1)[0]; // 提取数组中位数赋值给middleVal
        // 相等时被过滤掉, 实现去重
        let left = oriArr.filter( el => el < middleVal );
        let right= oriArr.filter( el => el > middleVal );
        let leftArr = sortRemoveDuplicate(left);
        let rightArr = sortRemoveDuplicate(right);
        // 为了消除函数执行过程中对函数名( sortRemoveDuplicate )的依赖, 可以使用下面的方式
        // let leftArr = arguments.callee(left);
        return leftArr.concat(middleVal, rightArr);
    }else{
        return oriArr;
    }
}
```

- 要点
  1. 二分法
  2. Array.splice
  3. 尾递归

##### 函数柯里化

```js
function curry(fn) {
  if (fn.length <= 1) return fn;
  let gene = (...args) => {
    if (args.length >= fn.length) {
      return fn(...args);
    } else {
      return (...arg2) => gene(...args, ...arg2);
    }
  }
  return gene;
}
// 使用
function add(a, b, c, d) {
  return a + b + c + d;
}
let curryed = curry(add);
print( curryed(1,2)(3)(4) );
```

##### 图像懒加载

```js
<img src="./imgs/default.png" data="./imgs/1.png" alt="">
  
let imgs =  document.querySelectorAll('img')
// 可视区高度
let clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
function lazyLoad () {
  // 滚动卷去的高度
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
  for (let i = 0; i < imgs.length; i ++) {
    // 得到图片顶部距离可视区顶部的距离
    let x = clientHeight + scrollTop - imgs[i].offsetTop
    // 图片在可视区内
    if (x > 0 && x < clientHeight+imgs[i].height) {
      imgs[i].src = imgs[i].getAttribute('data')
    }
  }
}
setInterval(lazyLoad, 1000)
```



##### 参考

- [一个合格的中级前端工程师要掌握的JavaScript 技巧](https://mp.weixin.qq.com/s?__biz=Mzg5ODA5NTM1Mw==&mid=2247483958&idx=1&sn=66a115a5ea1707f2947de0a8decefe3b&chksm=c06683a0f7110ab64021c9613f9d88bd47ec645e5a241859e9548f10c25958d735f62d0d1749&mpshare=1&scene=1&srcid=&key=06b6f34db6d09e012be03b7bef14060e321a7fbb4d11935feaea803d3af4fd7a8c5711e8666856a63385bea5cbe185461629077415a1f5e3adcf452bc16ae83de5648bdf8c1e6a85edd20de4a1603fbf&ascene=1&uin=Mjc2NDI1NDU2NA%3D%3D&devicetype=Windows+7&version=62060833&lang=zh_CN&pass_ticket=xxDfG3UAWJ1CvPVMnUqmt%2FAQ83Ih6iim%2FeHMcWKLZk0MttltZwQ3Tf2IdlzE5BYs)
- [JS 常用工具函数](https://mp.weixin.qq.com/s?__biz=Mzg5ODA5NTM1Mw==&mid=2247484390&idx=1&sn=c0c844f18ddade5bc96fc99d11b06103&chksm=c0668270f7110b662815eab075b0b12c452a59454f80035ae7998e9bb5cd9a15977acad8ee76&mpshare=1&scene=1&srcid=&sharer_sharetime=1567989742920&sharer_shareid=c0fa4bb765d12545f4439ab827814978&key=3e754fdb358244861665075a257e0962a2c20f2945caa4684dc19a63c9756a01305c6b216a3dbbf0b80b2e74ffec18360d1fa41ae555af14d1deed4ed62bcb9312523cbe877d5d512922dad0f0465b9a&ascene=1&uin=Mjc2NDI1NDU2NA%3D%3D&devicetype=Windows+7&version=62060833&lang=zh_CN&pass_ticket=D8igzih7KnA8%2F5LHQdRG6th5IVXvvQD7ukUD5HSt%2FLcfZ7gOforYJWqBjo9rYF%2FC)

---

#### JS 小技巧

##### 速获取毫秒数

```js
const now = + new Date();   // +运算符将string类型转换为Number类型
```

##### 小数取整 && 强转 boolean

```js
~~2.8    // 2
!!0      // false
```

##### 逻辑运算 & 短路规则

```js
let result = (0 || {age:12});  // result: {age:12}
let result = (1 && {age:12});    // {age:12}
// true && expression 总是会返回 expression, 而 false && expression 总是会返回 false。
// && 运算符返回第一个 false 的值，当所有操作数都是 true 时，返回最后一个表达式的值；
// || 运算符返回第一个 true 的值，当所有操作数都返回 false 时，返回最后一个表达式的值；
```

##### 判断变量是否定义

```js
(typeof x) === 'undefined';
var y;
typeof y === 'undefined'  // true, 不能区分定义了未初始化的变量
```

##### 判断数据类型

- typeof：不能区分数组和对象，可以区分 function；

- constructor：不能检测 Null 和 undefined，若类的原型被重写则检测不准确；

- Object.prototype.toString.call(变量).slice(8, -1)；最准确最常用的方式；但是不能判断自定义类实例。

  ```js
  /*
    方法1：
  	使用箭头函数返回函数, 灵活；
  	闭包；
  	字符串模板；
  */
  const isType = type => {
      // type 作为闭包
      return target => Object.prototype.toString.call(target) === `[object ${type}]`;
  }
  let isArray = isType('Array');
  let arr = [1,2];
  isArray(arr);
  ```

##### 解构

- 数组对象的解构

  ```js
  let arr = ['czl', 22];
  let {0: name, 1: age} = arr;
  // name = 'czl', age = 22
  ```


#### 垃圾回收和内存泄漏

https://juejin.im/post/6844903833387155464 



#### JS 全局函数

<img src="assets/JS全局函数.png" style="margin:0">