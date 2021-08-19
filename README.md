# learning-typescript

学习TypeScript，知识学了的话，还是要总结起来的，下面是自己的一点总结，梳理一下

我的GitHub仓库地址[]()


### 创建配置为文件



### 错误显示为中文

tsc --locale zh-CN

### 说一下优点和缺点

优点：

* 可读性
* 

### 知识点

never类型： 代表永远不存在的值的类型，

接口： interface在TS里面至关重要，用来规范类型，描述对象和类的具体结构

typeof 可以用来获取一个变量的声明类型

联合类型 | 

交叉类型 &

#### interface 与 type 区别

参考资料： [https://juejin.cn/post/6844903749501059085](https://juejin.cn/post/6844903749501059085)

相同点： 都可以描述一个对象或者函数；都允许拓展

不同点： type 可以做很多骚操作，type 可以声明基本【类型别名】，【联合类型】，【元组】等类型
interface 能够声明合并


#### 泛型

[专门讲解泛型的文章](https://juejin.cn/post/6844904184894980104)

泛型是什么？

可以使用泛型来创建可重用的组件， 一个组件可以支持多种类型的数据，
这样用户就可以用自己的数据类型来使用组件


我们什么时候使用泛型？

* 当我们的函数，接口或者类，处理多种数据类型的时候
* 当函数，接口或者类，在多个地方使用该数据类型的时候


泛型约束的作用？

* 确保属性的存在
* 检查对象上键是否存在
```js
function getProperty<T, K extends keyof T> (obj: T, key: K): T[K] {
    return obj[key];
}
```

泛型参数默认类型

```js
interface Afun<T = string> {
    name: T
}
```

泛型条件类型

```js
// 下面这句话的意思是，如果T能够赋值给U，那么就返回X 否则就是Y
T extends U ? X : Y

```

泛型工具类型





### TS 题库

[https://github.com/type-challenges/type-challenges/blob/master/README.zh-CN.md](https://github.com/type-challenges/type-challenges/blob/master/README.zh-CN.md)

### TS 工具库

解决自己手写的难题

* [ts-toolbelt](https://github.com/millsp/ts-toolbelt)
* [utility-types](https://github.com/piotrwitek/utility-types)
* [SimplyTyped](https://github.com/andnp/SimplyTyped)



### 参考资料

1. [十道题目带你走进 TypeScript 世界](https://juejin.cn/post/6974713100826050591#heading-43)


