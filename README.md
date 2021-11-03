# 我眼中的 TypeScript

学习 TypeScript，知识学了的话，还是要总结起来的，下面是自己的一点总结，梳理一下

我的 GitHub 仓库地址[https://github.com/zeroone001/learning-typescript](https://github.com/zeroone001/learning-typescript)

### 参考资料

1. [十道题目带你走进 TypeScript 世界，掘金](https://juejin.cn/post/6974713100826050591#heading-43)
2. [深入理解 TypeScript，一本书](https://jkchao.github.io/typescript-book-chinese/#why)
3. [声明文件，非常棒的讲解视频](https://www.bilibili.com/video/BV185411574h?p=2)
4. [TS 中文官网](https://www.tslang.cn/docs/home.html)
5. [大前端技能 TypeScript\_从 0 到 1 完全解读，技能加分项](https://www.bilibili.com/video/BV1i541147NW?p=25&spm_id_from=pageDriver)

### 错误显示为中文

tsc --locale zh-CN

### 说一下优点和缺点

优点：

- 可读性
-

## 知识点

never 类型： 代表永远不存在的值的类型，

接口： interface 在 TS 里面至关重要，用来规范类型，描述对象和类的具体结构

typeof 可以用来获取一个变量的声明类型

联合类型 |

交叉类型 &

### Everyday Types(日常类型)

## Enums (枚举)

[官方文档](https://www.tslang.cn/docs/handbook/enums.html)

- 本质就是个对象
- 数字枚举, 如果有的值是表达式要放在最后面；
- 字符串枚举, 如果是字符串的话，就丧失累加的特性了；含字符串成员的枚举当中，不允许使用计算值；
- 不建议数字和字符串混合
- 枚举可以认为是值，也可以是类型
- 枚举的成员也可以作为类型

```js
// demo
enum Direction {
    Right = 1,
    Up,
    Left,
    Down,
}

console.log(Direction.Right);
// X 为 0
enum E1 { X, Y, Z }

//Enum 赋值完了就不存在了
const enum Enum {
    A = 1,
    B = A * 2
}
```

## extends

作用：

- 扩展类型
- 泛型约束
- 类型判断与高阶类型

我们常见下面这种使用方式 `T extends U ? X : Y`

特殊情况，当 T 为联合类型的时候

`T extends U ? never : T` 找出 T 的差集
`T extends U ? T : never` 找出 T 的交集

```js
type Human = {    name: string;  }  type Duck = {    name: string;  }type Bool = Duck extends Human ? 'yes' : 'no'; // Bool => 'yes'
```

`A extends B` 指的是类型 A 可以分配给类型 B，而不是类型 A 是类型 B 的子集

[https://juejin.cn/post/6955816703431278628](https://juejin.cn/post/6955816703431278628)

## infer

在 extends 语句中，还支持 infer 关键字，可以推断一个类型变量，高效的对类型进行模式匹配

经典例子

```js
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;


```

```js
type Response = Promise<number[]>;
type Unpacked<T> = T extends Promise<infer R>? R : T;

type resType = Unpacked<Response>; // resType 类型为number[]

```

infer 推断联合类型

## interface 与 type 区别

参考资料： [https://juejin.cn/post/6844903749501059085](https://juejin.cn/post/6844903749501059085)

相同点： 都可以描述一个对象或者函数；都允许拓展

不同点：

type 可以做很多骚操作，type 可以声明基本【类型别名】，【联合类型】，【元组】等类型
interface 能够声明合并

## 泛型

[专门讲解泛型的文章](https://juejin.cn/post/6844904184894980104)

泛型是什么？

可以使用泛型来创建可重用的组件， 一个组件可以支持多种类型的数据，
这样用户就可以用自己的数据类型来使用组件

我们什么时候使用泛型？

- 当我们的函数，接口或者类，处理多种数据类型的时候
- 当函数，接口或者类，在多个地方使用该数据类型的时候

泛型约束的作用？

- 确保属性的存在
- 检查对象上键是否存在

```js
function getProperty<T, K extends keyof T> (obj: T, key: K): T[K] {
    return obj[key];
}
```

泛型参数默认类型

```js
interface Afun<T = string> {
  name: T;
}
```

泛型条件类型

```js
// 下面这句话的意思是，如果T能够赋值给U，那么就返回X 否则就是Y
T extends U ? X : Y

```

泛型工具类型

## Utility Types (实用类型)

- Partial 可以将类型中的所有属性变成可选属性

#### Record<keys, Type>

```js
interface CatInfo {
  age: number;
  breed: string;
}

type CatName = "miffy" | "boris" | "mordred";

const cats: Record<CatName, CatInfo> = {
  miffy: { age: 10, breed: "Persian" },
  boris: { age: 5, breed: "Maine Coon" },
  mordred: { age: 16, breed: "British Shorthair" },
};
```

实现 Record

```js
type MyRecord<T extends keyof any, U> = {
    [P in T]: U
}
```

## 声明文件

- interface 和 type 是不需要 declare 声明的，
- declare 声明变量，函数，对象，类等
- namespace 命名空间，声明对象

#### 自定义声明文件

1. 全局库的自定义声明文件；
2. 模块化库的自定义声明文件；

```js
// 模块化库： 自定义声明文件
// 1. 写一个第三方的库的声明文件，第一步先更改配置文件
// 2. 新建包的文件夹，比如 types/jquery
// 3. export, import
// 4. 假如并不需要import， 那么就不要写export， 直接 declare
"baseUrl": "./",
"paths": {
  "*": ["types/*"]
},
"esModuleInterop": true,
```

```js
declare module "a" {
    export let a: number
    export function b(): number
    export namespace c{
        let cd: string
    }
}

// 使用
import { a } from 'a';
```

#### 规范

## ts-node

请求的使用库： superagent
获取页面中的内容： cheerio

### TS 题库

[https://github.com/type-challenges/type-challenges/blob/master/README.zh-CN.md](https://github.com/type-challenges/type-challenges/blob/master/README.zh-CN.md)

### TS 工具库

解决自己手写的难题，GitHub 仓库

- [ts-toolbelt](https://github.com/millsp/ts-toolbelt)
- [utility-types](https://github.com/piotrwitek/utility-types)
- [SimplyTyped](https://github.com/andnp/SimplyTyped)
- [几乎排名前 90% 的 JavaScript 库的声明文件存在于 DefinitelyTyped 仓库里](https://github.com/DefinitelyTyped/DefinitelyTyped)
