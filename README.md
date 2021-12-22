# TypeScript

接口： interface 在 TS 里面至关重要，用来规范类型，描述对象和类的具体结构

typeof 可以用来获取一个变量的声明类型


交叉类型 &

## 基础类型

http://www.semlinker.com/ts-comprehensive-tutorial/

### enum 枚举类型

NORTH
```js
enum Direction {
  NORTH,
  SOUTH,
  EAST,
  WEST,
}
let dir: Direction = Direction.NORTH;
/* 反向映射 */
enum Direction {
  NORTH,
  SOUTH,
  EAST,
  WEST,
}

let dirName = Direction[0]; // NORTH
let dirVal = Direction["NORTH"]; // 0
```

### unknow 类型

可以赋值给unknown类型的值，但是不可以，把unknow类型的值给别的类型的值

将 value 变量类型设置为 unknown 后，这些操作都不再被认为是类型正确的。通过将 any 类型改变为 unknown 类型，我们已将允许所有更改的默认设置，更改为禁止任何更改。
```js
let value: unknown;

value = true; // OK
value = 42; // OK
value = "Hello World"; // OK
value = []; // OK
value = {}; // OK
value = Math.random; // OK
value = null; // OK
value = undefined; // OK
value = new TypeError(); // OK
value = Symbol("type"); // OK
/*  */
let value: unknown;

let value1: unknown = value; // OK
let value2: any = value; // OK
let value3: boolean = value; // Error
let value4: number = value; // Error
let value5: string = value; // Error
let value6: object = value; // Error
let value7: any[] = value; // Error
let value8: Function = value; // Error
```

### tuple 元组

```js
let tupleType: [string, boolean];
tupleType = ["semlinker", true];
```

### void

void 类型， 表示没有任何类型

声明一个 void 类型的变量没有什么作用，因为它的值只能为 undefined 或 null

```js
// 声明函数返回值为void
function warnUser(): void {
  console.log("This is my warning message");
}
```

### null & undefined

```js
let u: undefined = undefined;
let n: null = null;
```

### object, Object 和 {} 类型

object 类型，表示非原始类型

```js
// node_modules/typescript/lib/lib.es5.d.ts
interface ObjectConstructor {
  create(o: object | null): any;
  // ...
}

const proto = {};

Object.create(proto);     // OK
Object.create(null);      // OK
Object.create(undefined); // Error
Object.create(1337);      // Error
Object.create(true);      // Error
Object.create("oops");    // Error
```
Object 类型：它是所有 Object 类的实例的类型

{} 类型描述了一个没有成员的对象。当你试图访问这样一个对象的任意属性时，TypeScript 会产生一个编译时错误

```js
// Type {}
const obj = {};

// Error: Property 'prop' does not exist on type '{}'.
obj.prop = "semlinker";
```

### never

never 类型表示的是那些永不存在的值的类型

使用 never 避免出现新增了联合类型没有对应的实现，
目的就是写出类型绝对安全的代码。

```js
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
  throw new Error(message);
}

function infiniteLoop(): never {
  while (true) {}
}
/* 2 */
type Foo = string | number;

function controlFlowAnalysisWithNever(foo: Foo) {
  if (typeof foo === "string") {
    // 这里 foo 被收窄为 string 类型
  } else if (typeof foo === "number") {
    // 这里 foo 被收窄为 number 类型
  } else {
    // foo 在这里是 never
    const check: never = foo;
  }
}
```

## Declare functions

```js
function myFunction(x: number): number {
  return x + 2;
}
/* void */
let y: number = 0;

function myFunction(x: number): void {
   y = x * 2;
}

/* 匿名函数 */
const myFunction = function (x: number):number {
return x + 2;
}
/* Optional Parameter */
function myFunction(a: number, b?:number): number {
  if (typeof b !== 'undefined'){
    return a+b+5;
  } else {
    return a+5;
  }
}
/* 定义函数类型 */
let IdGenerator: (chars: string, nums: number) => string;

function createUserId(name: string, id: number): string {
  return name + id;
}

IdGenerator = createUserId;
/* 默认参数 */
// 注意，可选参数，要放在普通参数的后面，否则会导致报错
function createUserId(
  name: string = "semlinker",
  id: number,
  age?: number
): string {
  return name + id;
}
/* 剩余参数 */
function myFun (array, ...items) {
}
myFun([], 1,2,3);
/* 函数重载 */
// 在定义重载的时候，一定要把最精确的定义放在最前面
function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: string, b: number): string;
function add(a: number, b: string): string;
function add(a: Combinable, b: Combinable) {
  // type Combinable = string | number;
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  }
  return a + b;
}
```

## array 数组 []

```js
/* 展开运算符 */
let two_array = [0, 1];
let five_array = [...two_array, 2, 3, 4];
```


## Classes 类

在面向对象语言中，类是一种面向对象计算机编程语言的构造，是创建对象的蓝图，
描述了所创建的对象共同的属性和方法

```js
/* 1 */
class Greeter {
  // 静态属性
  static cname: string = "Greeter";
  // 成员属性
  greeting: string;

  // 构造函数 - 执行初始化操作
  constructor(message: string) {
    this.greeting = message;
  }

  // 静态方法
  static getClassName() {
    return "Class name is Greeter";
  }

  // 成员方法
  greet() {
    return "Hello, " + this.greeting;
  }
}

let greeter = new Greeter("world");

// 编译之后的如下

"use strict";
var Greeter = /** @class */ (function () {
    // 构造函数 - 执行初始化操作
    function Greeter(message) {
      this.greeting = message;
    }
    // 静态方法
    Greeter.getClassName = function () {
      return "Class name is Greeter";
    };
    // 成员方法
    Greeter.prototype.greet = function () {
      return "Hello, " + this.greeting;
    };
    // 静态属性
    Greeter.cname = "Greeter";
    return Greeter;
}());
var greeter = new Greeter("world");
/* 2 */
class Astronaut {
   name: string;
   constructor(firstName: string, lastName: string) {
      this.name = firstName + " " + lastName;
   }
   greet() {
      return "Hello, " + this.name;
   }
}

let Bob = new Astronaut("Bob","Smith");

/* extends */
class Panthera {
   roar: string;
   constructor(currentRoar: string) {
      this.roar = currentRoar;
   }
}

class Tiger extends Panthera {
   stripes: boolean = true;

}

let tigger = new Tiger("loud");
console.log(tigger.roar);
console.log(tigger.stripes);
```

## interface 接口

接口和类型别名，都可以用来描述对象的形状或者函数签名

```js
/* 用来描述函数 */
interface SetPoint {
  (x: number, y: number): void;
}
/* 用来描述对象 */
interface Astronaut {
   name: string;
}

function astronautName (astronaut: Astronaut): string {
   return astronaut.name;
}

let bob = {name: "Bob"};
console.log(astronautName(bob));

/* class implements */
interface interfaceName {
   someProperty: number;
}

class className implements interfaceName {
   constructor(x: number) {
      this.someProperty = x;
   }
}

/* class + function */
interface Panthera {
   roar: string;
}

class Tiger implements Panthera {
   roar: string;

   constructor() {
      this.roar = 'rooooaaaarrrr';
   }
}

class Lion implements Panthera {
   roar: string;

   constructor() {
      this.roar = 'ROOOOAAAAARRRRRR';
   }
}

function pantheraSounds(panthera: Panthera): void {
   console.log(`Panthera says ${panthera.roar}`);
}

let tiger = new Tiger();
let lion = new Lion();

pantheraSounds(tiger);
pantheraSounds(lion);

/* optional parameters */
interface giraffeTwo = {
     species: string;
     name: string;
     weight?: number;
     age: number;
     diet: string;
};
/* export  */
export class className {
   // properties and methods
}
import { className } from 'relativefilepath';

let newClass = new className;
/*  */
```

### 类型别名 type

与接口类型不一样，类型别名 可以用于一些其他类型，比如原始类型，联合类型，和元组

```js
type Name = string;
type Name = {
  x: number;
}
/* 联合类型 */
type Name = People | Student;
/* tuple */
type Name = [string, number];
```

## compile TS

```js
npm install -g typescript
```

### 错误显示为中文

命令

`tsc --locale zh-CN`

### 说一下优点和缺点

优点：

- 可读性
-




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

## extends 扩展

[Typescript关键字之extends](https://juejin.cn/post/6955816703431278628)

接口和类型别名都能够被扩展，但语法有所不同
此外，接口和类型别名不是互斥的。接口可以扩展类型别名，而反过来是不行的

作用：

- 扩展类型
- 泛型约束
- 类型判断与高阶类型

我们常见下面这种使用方式 `T extends U ? X : Y`

特殊情况，当 T 为联合类型的时候

`T extends U ? never : T` 找出 T 的差集
`T extends U ? T : never` 找出 T 的交集

```js
type Human = { name: string; } type Duck = { name: string; }type Bool = Duck extends Human ? 'yes' : 'no'; // Bool => 'yes'
```

`A extends B` 指的是类型 A 可以分配给类型 B，而不是类型 A 是类型 B 的子集

```js
// Interface extends interface
interface Name {
  x: number
}
interface People extends Name {
  y: number;
}
/* Type alias extends type alias */
type Name = { x: number };
type People = Name & {y: number};
/* Type alias extends interface */
interface PartialPointX { x: number; }
type Point = PartialPointX & { y: number; };
/* Interface extends type alias */
type PartialPointX = { x: number; };
interface Point extends PartialPointX { y: number; }
```

### implements

类可以以相同的方式实现接口或类型别名，但类不能实现使用类型别名定义的联合类型：

```js
interface Point {
  x: number;
  y: number;
}

class SomePoint implements Point {
  x = 1;
  y = 2;
}
```


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

## 泛型 T

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

/* base 
  下面代表指定了一个泛型，也可以指定两个 <T, K>
*/
function myFunction<T>(a: T): T {
  return a;
}
myFunction(10); // 不指定，可以自动推断
myFunction<string>('str'); // 指定泛型

/* 跟 interface 结合
  T是Person的子类
 */
interface Person {
  name: string
}
function myFun<T extends Person>(a: T): string {
  return a.name;
}
/* 可以同时指定多个 */
function myFunction<T, K>(a: T, b: K): T {
  return a;
}
/* 
  泛型用到了接口上
泛型参数默认类型 */
interface Afun<T = string> {
  name: T;
}
```

泛型条件类型

```js
// 下面这句话的意思是，如果T能够赋值给U，那么就返回X 否则就是Y
T extends U ? X : Y
```



## Utility Types (实用类型) 泛型工具类型

- Partial 可以将类型中的所有属性变成可选属性

### Record<keys, Type>

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

### 自定义声明文件

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

### ! 非空断言

http://www.semlinker.com/ts-non-null-assertion-operator/

```js
let a!;

a = '1';
```

### as 断言 Using type predicates

```js
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}
```

### Exclude

https://www.typescriptlang.org/docs/handbook/utility-types.html#excludetype-excludedunion


### 函数重载

https://www.typescriptlang.org/docs/handbook/2/functions.html#function-overloads

关于函数重载，必须要把精确的定义放在前面，最后函数实现时，需要使用 |操作符或者?操作符，把所有可能的输入类型全部包含进去，以具体实现


### 泛型

```ts
export function swap<T1, T2>(v1: T1, v2: T2): [T2, T1] {
    return [v2, v1];
}
```

## 减少重复代码

http://www.semlinker.com/effective-ts-tips/

```js
/* 一 */
interface Person {
  firstName: string;
  lastName: string;
}
interface PersonWithBirthDate extends Person { 
  birth: Date;
}
type PersonWithBirthDate = Person & { birth: Date };

/* 二，typeof */
const INIT_OPTIONS = {
  width: 640,
  height: 480,
  color: "#00FF00",
  label: "VGA",
};
/* 1 */
interface Options {
  width: number;
  height: number;
  color: string;
  label: string;
}

/* 2，也可以换一种方式
也可以使用 typeof 操作符来快速获取配置对象的「形状」
*/
type Options = typeof INIT_OPTIONS;

/* 三，重复类型 */
interface SaveAction { 
  type: 'save';
  // ...
}

interface LoadAction {
  type: 'load';
  // ...
}

type Action = SaveAction | LoadAction;
type ActionType = 'save' | 'load'; // Repeated types!
// ActionType 可以改为
type ActionType = Action['type'];

/* 四，重复函数 */
function get(url: string, opts: Options): Promise<Response> { /* ... */ } 
function post(url: string, opts: Options): Promise<Response> { /* ... */ }
// 提取统一的类型签名
type HTTPFunction = (url: string, opts: Options) => Promise<Response>;

const get: HTTPFunction = (url, opts) => {};
const post: HTTPFunction = (url, opts) => {};
```

## 使用更精确的类型替代字符串类型

```js
interface Album {
  artist: string; // 艺术家
  title: string; // 专辑标题
  releaseDate: Date; // 发行日期：YYYY-MM-DD 
  recordingType: "studio" | "live"; // 录制类型："live" 或 "studio"
}
/* 二 设置函数的参数类型 */
// 
function pluck(record: any[], key: string): any[] {
  return record.map((r) => r[key]);
}
// 优化
function pluck<T>(record: T[], key: keyof T): T[keyof T][] {
  return record.map((r) => r[key]);
}
// 继续优化
function pluck<T, K extends keyof T>(record: T[], key: K): T[K][] {
   return record.map((r) => r[key]);
}
```

## 定义的类型总是表示有效的状态

```js
interface RequestPending {
  state: "pending";
}

interface RequestError {
  state: "error";
  errorMsg: string;
}

interface RequestSuccess {
  state: "ok";
  pageContent: string;
}

type RequestState = RequestPending | RequestError | RequestSuccess;

interface State {
  currentPage: string;
  requests: { [page: string]: RequestState };
}

function renderPage(state: State) {
  const { currentPage } = state;
  const requestState = state.requests[currentPage];
  switch (requestState.state) {
    case "pending":
      return `页面加载中~~~`;
    case "error":
      return `呜呜呜，加载第${currentPage}页出现异常了...${requestState.errorMsg}`;
    case "ok":
      `<div>第${currentPage}页的内容：${requestState.pageContent}</div>`;
  }
}
```

## 选择条件类型而不是重载声明

```js
function double(x: number | string): number | string;
function double(x: any) {
  return x + x;
}
// 优化
function double<T extends number | string>(x: T): T;
function double(x: any) {
  return x + x;
}
// 继续优化 使用条件类型
function double<T extends number | string>(x: T): T extends string ? string : number {
   return x + x;
}
```

## 字符串字面量类型

```js
/* CardinalDirection 字符串字面量类型 */
type CardinalDirection = 'North' | 'East' | 'South' | 'West';

function move(distance: number, direction: CardinalDirection) {
  // ...
}

move(1, 'North'); // ok
move(1, 'Nurth'); // Error
```

## 一次性创建对象

```js
/* 建议一次性创建对象，
   如果，想要一步步的创建对象怎么办呐， 
   使用类型断言 as
*/
interface Point {
   x: number;
   y: number;
}
const pt = {} as Point;
pt.x = 3;
pt.y = 4;
/* 二 */
const pt = { x: 3, y: 4 };
const id = { name: "Pythagoras" };
const namedPoint = {};
Object.assign(namedPoint, pt, id);

// Property 'id' does not exist on type '{}'.(2339)
namedPoint.name; // Error
// 使用展开运算符来解决
const namedPoint = {...pt, ...id};
namedPoint.name; // OK, type is string
```

## 联合类型 | 和 类型别名

```js
/* 联合类型 */
const myFun = (name: string | undefined) => {

}
/* 'lala' 字面量类型 */
type Name = 'lala' | 'hahah' | 'aaa';
/* 可辨识 */
interface Motorcycle {
  vType: "motorcycle"; // 可辨识属性
  make: number; // year
}
/* 类型守卫 */
// 使用 switch 和 case 运算符来实现类型守卫
function evaluatePrice(vehicle: Vehicle) {
  switch(vehicle.vType) {
    case "car":
      return vehicle.transmission * EVALUATION_FACTOR;
    case "truck":
      return vehicle.capacity * EVALUATION_FACTOR;
    case "motorcycle":
      return vehicle.make * EVALUATION_FACTOR;
  }
}
/* 类型别名 */
type Message = string | string[];
let greet = (message: Message) => {
  // ...
};
```

## 交叉类型 & 

交叉类型，是将多个类型合并为一个类型

通过 & 运算符可以将现有的多种类型叠加到一起成为一种类型，它包含了所需的所有类型的特性

```js
type PartialPointX = { x: number; };
type Point = PartialPointX & { y: number; };

let point: Point = {
  x: 1,
  y: 1
}
/* 同名 基础类型 属性的合并 */
interface X {
  c: string;
  d: string;
}

interface Y {
  c: number;
  e: string
}

type XY = X & Y;
type YX = Y & X;

let p: XY;
let q: YX;
/* 成员 c 的类型会变成 never 呢 
  因为混入后成员 c 的类型为 string & number，
  即成员 c 的类型既可以是 string 类型又可以是 number 类型。
  很明显这种类型是不存在的，所以混入后成员 c 的类型为 never
*/
p = { c: '123', d: "d", e: "e" };

/* 同名 非基础类型 属性的合并 */
interface D { d: boolean; }
interface E { e: string; }
interface F { f: number; }

interface A { x: D; }
interface B { x: E; }
interface C { x: F; }

type ABC = A & B & C;

let abc: ABC = {
  x: {
    d: true,
    e: 'semlinker',
    f: 666
  }
};
/* 成功合并 */
console.log('abc:', abc);
```





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

### 参考资料

1. [十道题目带你走进 TypeScript 世界，掘金](https://juejin.cn/post/6974713100826050591#heading-43)
2. [深入理解 TypeScript，一本书](https://jkchao.github.io/typescript-book-chinese/#why)
3. [声明文件，非常棒的讲解视频](https://www.bilibili.com/video/BV185411574h?p=2)
4. [TS 中文官网](https://www.tslang.cn/docs/home.html)
5. [大前端技能 TypeScript\_从 0 到 1 完全解读，技能加分项](https://www.bilibili.com/video/BV1i541147NW?p=25&spm_id_from=pageDriver)