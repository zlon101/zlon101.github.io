# 概念

> 关键词 | 核心概念

- 数据劫持
  - vue2 中通过 `defineProperty` 定义对象属性的 `getter` 和 `setter` 和重写数组的部分方法实现数据劫持，当数据被访问时进行依赖收集（订阅），当数据被修改时通知所有的订阅者更新

- 双向绑定
  - MVVM，数据和视图进行双向绑定，1）当数据更新时视图自动更新，2）当视图更新时（用户输入）数据自动更新。
  - Vue 是通过【数据劫持】 + 【发布订阅模式】来实现双向绑定。第一点通过数据劫持实现，第二点通过事件监听实现（`v-modle` 只是语法糖）。

响应式：数据劫持 + 观察者模式
异步更新：微任务（更新时机和浏览器回流重绘时机一样）
可观察对象 `Observer`
Dep
Watcher


# `new Vue`

> [Vue 的初始化过程都做了什么？](https://github.com/Holybasil/Blog/issues/13)

- initMixin、stateMixin、eventsMixin、lifecycleMixin、renderMixin
- 处理组件配置项，选项合并，初始化 Vue 属性（$parent、$root、$children）

> 实例化（new Vue(options)）

# 响应式流程

> 简述

- 在 Vue 初始化过程中，为 data 对象中的每一个属性key定义【setter】和【getter】。
- 当页面初次渲染时，执行渲染函数，访问属性时，会触发【getter】从而收集依赖，将【Dep】和【Watcher】关联起来。（render View时进行依赖收集）

当访问某个对象的属性时会触发 getter，然后将当前正在运行的【副作用】作为订阅者（Watcher）添加到该属性的集合中。副作用分为 render、user watch、compute。

- 当修改属性key时，会触发【setter】，从而通过 Dep 通知 Watcher 执行 update。之后重新渲染页面。

```html
<div>
    <p id="name"></p>
</div>

<script>
	var obj = { };
	
	Object.defineProperty(obj, 'name', {
		get(){
			return document.querySelector('#name').innerHTML;
		}，
		set(val){
			document.querySelector('#name').innerHTML = val;
		}
	});
	
	obj.name = 'czl';	// 执行set函数
</script>
```

## vue 响应式原理

响应式的数据分为两类：

- 对象，循环遍历对象的所有属性，为每个属性设置 getter、setter，以达到拦截访问和设置的目的，如果属性值依旧为对象，则递归为属性值上的每个 key 设置 getter、setter
  - 访问数据时（obj.key)进行依赖收集，在 dep 中存储相关的 watcher
  - 设置数据时由 dep 通知相关的 watcher 去更新

- 数组，增强数组的那 7 个可以更改自身的原型方法，然后拦截对这些方法的操作
  - 添加新数据时进行响应式处理，然后由 dep 通知 watcher 去更新
  - 删除数据时，也要由 dep 通知 watcher 去更新

> 数组的响应式更新
- 新创建一个以 Array.prototype 为原型的对象A，重新定义（Object.defineProperty）了对象A上的 push、pop 等方法，如果数组变量有 `__proto__` 属性则将数组的 `__proto__` 修改为对象A，否则重新定义数组变量的 push、pop 等方法。
- 若数组项是对象，则该对象是响应式更新，否则不会

> 为什么不用 `Object.defineProperty 劫持数组索引` ？
- 使用 `$set` 修改数组索引时可以实现响应式更新，Why？执行的重写之后的数组方法，`arr.splice` 
- [vue为什么不能检测数组的变化](https://juejin.cn/post/6844904046722023438)：JS 是可以劫持通过数组索引进行修改，只是因为性能问题没有这样做，比如 `arr.unshift()` 会触发原数组中所有索引的 getter 和 setter。

# watcher & dep

在 Vue 中共有三种 Watcher，分别为【 render watcher】，【computed watcher】，【user watcher】($watch)。
三种 watcher 的创建顺序和更新时的执行顺序都是 computed watcher、user watcher、render watcher。

组件更新顺序是：父组件先更新，然后更新子组件（因为父组件先于子组件创建）。
用户定义的【watcher】先于【render watcher】执行，因为先创建【user watcher】再创建【render watcher】。

> 三种 Watcher 创建的时间点

- compute watcher 在初始化 State 时（`initState => initComputed`）
- user watcher 在初始化 State 时（`initState => initWatch`）
- render watcher 在挂载时创建(`$mount`)

`vm._watcher => render watcher`。
`vm._watchers` 保存了当前实例的所有（三种）watcher。

若用户定义的【watcher】设置了 `immediate: true`，在创建 watcher 时就会执行 `handle`（在 beforeCreate 和 created 之间执行）。

> Observer

将数据转换为响应式，使用数据劫持后重写数组方法



观察者，收到 Dep 的通知后，执行 `update`，重新渲染。（监听器，用来监听属性的变化通知订阅者）。
Observer 的作用就是遍历对象的所有属性将其进行双向绑定，如果是对象，则进行深度递归遍历，将每一个子对象都转化成响应式对象。
如果是数组，则会对每一个成员都执行一遍 observe 方法，并对其原生的数组方法进行改写

**三类响应式数据**

1. props
如果不是根组件，则只对 props 做shalow reactive（浅层响应式）

2. data
3. computed
计算属性不会转化为响应式属性，不会作为其他数据的依赖，也不会创建【Dep】。其他需要用到某个计算属性的数据会将这个计算属性的依赖添加到自己的依赖集中。


> Dep：被观察者、依赖项，负责将数据变化的消息通知给所有的 Watcher，Watcher 和 Dep 是多对多的关系

- `pushTarget`、`popTarget`



> Watcher：订阅者，收到属性的变化，然后更新视图

- Watcher.addDep(Dep)：为Watch添加依赖
- `dep.depend()：Dep.target.addDep(dep)`，watcher 中保存了 dep，dep 中也保存了 watcher

```js
addDep (dep: Dep) {
  const id = dep.id
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id)
    this.newDeps.push(dep)
    if (!this.depIds.has(id)) {
      dep.addSub(this)
    }
  }
}
```

> 创建dep

defineReactive()
new Observer() <= observe

- observe：$data、数组中的对象、propsData

> 触发更新

对象是通过 setter 修改器来触发更新的，数组是通过7个原型方法mutator的执行来触发更新。
  - 修改对象属性：setter() => dep.notify() => Watch.update() => queueWatcher(watch) => nextTick(执行队列中的watch) => watch.run() =>
  - 修改数组：

> reactiveGetter：代理属性，在 getter 中收集依赖，在 setter 中触发更新

> proxyGetter：代理实例的 data、methods、props 对象上的属性，实现在实例上访问 data、methods 上的属性(`this.x`)


# 异步更新

Vue 在更新 DOM 时是**异步**执行的。只要侦听到数据变化，Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据变更。如果同一个 watcher 被多次触发，只会被推入到队列中一次。这种在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作是非常重要的。然后，在下一个的事件循环“tick”中，Vue 刷新队列并执行实际 (已去重的) 工作。Vue 在内部对异步队列尝试使用原生的 `Promise.then`、`MutationObserver` 和 `setImmediate`，如果执行环境不支持，则会采用 `setTimeout(fn, 0)` 代替。

例如，当你设置 `vm.someData = 'new value'`，该组件不会立即重新渲染。当刷新队列时，组件会在下一个事件循环“tick”中更新。多数情况我们不需要关心这个过程，但是如果你想基于更新后的 DOM 状态来做点什么，这就可能会有些棘手。虽然 Vue.js 通常鼓励开发人员使用“数据驱动”的方式思考，避免直接接触 DOM，但是有时我们必须要这么做。为了在数据变化之后等待 Vue 完成更新 DOM，可以在数据变化之后立即使用 `Vue.nextTick(callback)`。这样回调函数将在 DOM 更新完成后被调用。

> 步骤

1): 响应式数据（dep）变化触发 setter 或重写的数组方法；

2): dep 通知它的所有订阅者更新（遍历 dep.subs 并执行 `sub.update()`，订阅者就是 watcher）;

3): watcher 判断当前是同步更新、异步更新还是懒更新（对应计算属性），如果是异步更新判断异步队列中是否已经有当前 watcher，若没有就将当前 watcher 加入到队列中（队列中的 watcher 是按 watcher.id 排序）；

4): 在 nextTick 时清空队列，执行队列中的 watcher，先执行 watcher.before 再执行 watcher.run

5): 重置状态，调用组件 update、activated hooks


# diff 算法

> updateChildren
>
> 同层比较，双指针首尾同时遍历

当数据变化时，Vue.js 会使用新数据生成一个新的 Virtual DOM 树，然后将这个新的 Virtual DOM 树与旧的 Virtual DOM 树进行比较，找出两棵树的差异，并且只对差异部分进行真正的 DOM 操作。这个过程就是所谓的 diff 算法。



它的原理可以概括为以下三个步骤：

1. 新旧节点的比较
   Vue 首先比较新旧节点是否相同。如果不同，就根据新节点的内容创建一个新的真实节点，并将其插入到旧节点的位置，从而更新 DOM。如果相同，则进行下一步比较。

2. 子节点的比较
   Vue 接下来会递归地比较新旧节点的子节点，找出其中的差异。这一步骤会涉及到节点的增加、删除和移动等操作。

3. 差异的更新
   Vue 在完成新旧节点的比较之后，会根据比较结果对差异进行更新。对于新增的节点，Vue 会创建一个新的真实节点并将其插入到对应的位置；对于删除的节点，Vue 则会将其从 DOM 中删除；对于移动的节点，Vue 则会将其移动到新的位置。在这一步骤中，Vue 会尽可能地重用已有的节点，从而减少 DOM 操作的次数，提高性能。



更新**子节点**采用了 diff 算法，diff 算法是通过同层的树节点进行比较而非对树进行逐层搜索遍历的方式，所以时间复杂度只有O(n)。

新子节点列表和旧子节点列表使用首尾双指针，newStartInd、newEndInd、oldStartInd、oldEndInd
1. 分别判断新节点列表的首尾指针与旧节点列表的首尾指针对应的节点是否相同。这里共有有4种情况，如果有一种情况满足，复用旧节点，调用 patchVnode 对比更新节点。
2. 如果上诉4种情况都没有命中，则执行遍历将旧节点列表中没有节点的 key - index 作为键值对存入一个对象中（只执行一次）
3. 用新节点的 key 在上面生成的 key-index 对象中查找旧节点列表中是否有相同key 的节点，如果有则判断两个节点是否满足同一个 vnode
4. 如果旧节点列表中没有与新节点具有相同key的节点，或者两个节点不满足同一个 vnode，则按照新增节点处理。如果找到相同节点，则执行 patchVnode，然后将老节点移动到正确的位置。
5. 遍历完成后（`oldStartIdx > oldEndIdx || newStartIdx > newEndIdx`），如果老节点先于新节点遍历结束，则剩余的新节点执行新增节点操作。如果新节点先于老节点遍历结束，则剩余的老节点执行删除操作，移除这些老节点。

```js
function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
  let oldStartIdx = 0
  let newStartIdx = 0
  let oldEndIdx = oldCh.length - 1
  let oldStartVnode = oldCh[0]
  let oldEndVnode = oldCh[oldEndIdx]
  let newEndIdx = newCh.length - 1
  let newStartVnode = newCh[0]
  let newEndVnode = newCh[newEndIdx]
  let oldKeyToIdx, idxInOld, vnodeToMove, refElm

  // removeOnly is a special flag used only by <transition-group>
  // to ensure removed elements stay in correct relative positions
  // during leaving transitions
  const canMove = !removeOnly

  if (process.env.NODE_ENV !== 'production') {
    checkDuplicateKeys(newCh)
  }

  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    if (isUndef(oldStartVnode)) {
      oldStartVnode = oldCh[++oldStartIdx] // Vnode has been moved left
    } else if (isUndef(oldEndVnode)) {
      oldEndVnode = oldCh[--oldEndIdx]
    } else if (sameVnode(oldStartVnode, newStartVnode)) {
      patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx)
      oldStartVnode = oldCh[++oldStartIdx]
      newStartVnode = newCh[++newStartIdx]
    } else if (sameVnode(oldEndVnode, newEndVnode)) {
      patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx)
      oldEndVnode = oldCh[--oldEndIdx]
      newEndVnode = newCh[--newEndIdx]
    } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
      patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx)
      canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm))
      oldStartVnode = oldCh[++oldStartIdx]
      newEndVnode = newCh[--newEndIdx]
    } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
      patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx)
      canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm)
      oldEndVnode = oldCh[--oldEndIdx]
      newStartVnode = newCh[++newStartIdx]
    } else {
      if (isUndef(oldKeyToIdx)) oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx)
      idxInOld = isDef(newStartVnode.key)
        ? oldKeyToIdx[newStartVnode.key]
        : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx)
      if (isUndef(idxInOld)) { // New element
        createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx)
      } else {
        vnodeToMove = oldCh[idxInOld]
        if (sameVnode(vnodeToMove, newStartVnode)) {
          patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue, newCh, newStartIdx)
          oldCh[idxInOld] = undefined
          canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm)
        } else {
          // same key but different element. treat as new element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx)
        }
      }
      newStartVnode = newCh[++newStartIdx]
    }
  }
  if (oldStartIdx > oldEndIdx) {
    refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm
    addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue)
  } else if (newStartIdx > newEndIdx) {
    removeVnodes(oldCh, oldStartIdx, oldEndIdx)
  }
}
```

[参考](https://juejin.cn/post/7098631145201336357) 

> 是否是同一个vnode

节点类型相同、vnode.key相同、tag.isComment相等、input type 相同、并且都定义了对于 vnode 的数据对象。那么就说明这两个vnode是相同的vnode。
```js
function sameVnode (a, b) { 
        return ( 
            a.key === b.key && // key值 
            a.tag === b.tag && // 标签名 
            a.isComment === b.isComment && // 是否为注释节点 
            // 是否都定义了data，data包含一些具体信息，例如onclick , 
            style isDef(a.data) === isDef(b.data) &&  sameInputType(a, b) 
            // 当标签是<input>的时候，type必须相同 
        )
}
```


# Q

> Reflect Proxy

1. Object.defineProperty只能劫持对象的属性，而Proxy是直接代理对象。

由于 `Object.defineProperty` 只能对属性进行劫持，需要遍历对象的每个属性，如果属性值也是对象，则需要深度遍历。而 `Proxy` 直接代理对象，不需要遍历操作。

2. Object.defineProperty对新增属性需要手动进行Observe

由于 `Object.defineProperty` 劫持的是对象的属性，所以新增属性时，需要重新遍历对象，对其新增属性再使用 `Object.defineProperty` 进行劫持。


> $nextTick 回调什么时候执行？
- `Promise.resolve().then(执行nextTick)`，主线程执行完后执行微任务时执行 `nextTick` 
- 计算属性不会加入异步队列


> 计算属性的缓存是怎么实现的？

- 每个计算属性都会创建一个 watcher，计算属性的值实际上是 watcher.value，而只有 watcher 的依赖项变化时才会重新计算 watcher.value
- UI 依赖于某个计算属性，读取计算属性时，会将当前 Dep.target 加入到计算属性 watcher 中的 dep 列表中每项的订阅列表中
某个watcher-a  依赖于某个计算属性 ==> 该计算属性依赖于其他 dep 项 ==> 将 watcher-a 加入到 dep 项的订阅列表中


> computed 和 watch 配置的区别？
- computed 默认为懒执行，dirty 为 true。watch 有 immediate 配置，可以实现立即执行一次 cb
- computed 支持缓存，依赖数据发生改变，才会重新进行计算。watch 不支持缓存，立即响应式变化
- computed 不支持异步，watch 支持异步



> 不进行依赖收集的情况

pushTarget(watcher)，watcher 为空时表示不进行依赖收集，如执行 lifecycle hooks、data getters（执行组件配置中的 `data()` 函数）

> 监听生命周期钩子

`@hook:beforeDestroy`、`@hook:mounted` ， 事件的监听和派发是在同一个组件上


# 依赖收集与数据跟踪

vue 在实例化的时候，会对【data】对象中的每一个属性，去做数据跟踪，但是在写业务逻辑时，会有很多的属性其实在视图层根本用不到。但是这个属性在下面的【methods】的方法中会用到, 比如下面的代码:

```js
export default {
  data () {
    return {
      title: 'xxx', 		// 这个属性需要在视图层用到, 需要加上数据跟踪
      loginStatus: false, 	// 这个属性在视图层用不到, 但是在methods的方法中要用来改变和作为判断条件, 根本不需要加入数据跟踪
    }
  }
}
```

但是改写成这样以后, 不需要跟踪的就不会跟踪了, 但是这样会有什么问题吗? 目前不知道如何去验证

```js
export default {
  data () {
    this.loginStatus = false // 这样这个属性就不会加上数据跟踪, 但是下面的方法还可以 this.loginStatus 的去使用
    return {
      title: 'xxx' 			// 这个属性需要在视图层用到, 需要加上数据跟踪
    }
  }
}
```