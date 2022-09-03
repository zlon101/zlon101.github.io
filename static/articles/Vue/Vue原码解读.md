# 数据驱动 & 响应式原理

```
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

- 通过Object.defineProperty和getter & setter实现数据响应。对Vue中data对象的每个属性都定义了set和get，监听这些属性的变化，当这些属性变化时，通知那些与之相关的数据更新。



# 依赖收集与数据跟踪

当数据变化时，找到界面中需要更新的地方。 

- vue在实例化的时候, 会对data对象中的每一个属性, 去做数据跟踪, 但是在写业务逻辑时, 会有很多的属性其实在视图层根本用不到, 但是这个属性在下面的methods的方法中会用到, 比如下面的代码:

  ```
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

  ```
  export default {
    data () {
      this.loginStatus = false // 这样这个属性就不会加上数据跟踪, 但是下面的方法还可以 this.loginStatus 的去使用
      return {
        title: 'xxx' 			// 这个属性需要在视图层用到, 需要加上数据跟踪
      }
    }
  }
  ```

  

# Vue的编译过程

- 3WEH
  - 什么是编译：Vue编写的模板HTML无法识别，通过编译进行依赖收集，将data中的数据与视图进行绑定，实现依赖关联。当模型发生变化时，更新视图，即**模型驱动视图**。
  - 为什么是编译，
  - 双向绑定：事件监听(input)，当事件发生时，修改模型(data对象)，又因为模型设置的set函数，进而更新视图。



# 数组的push如何响应？

