# TypeScript


## compile 编译上下文

```js
npm install -g typescript
tsc // 命令
```
tsconfig.json 的作用:

用于标识 TypeScript 项目的根路径；
用于配置 TypeScript 编译器；
用于指定编译的文件

tsconfig.json 重要字段:

1. files - 设置要编译的文件的名称；
2. include - 设置需要进行编译的文件，支持路径模式匹配；
3. exclude - 设置无需进行编译的文件，支持路径模式匹配；
4. compilerOptions - 设置与编译流程相关的选项。

## 基础类型

http://www.semlinker.com/ts-comprehensive-tutorial/

### enum 枚举类型


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

## TS 断言 Assertion

```ts
let cid: any = 1;
let customId = cid as number;
let customId = <number>cid;
/* 尖括号语法 */
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;
/* as 语法 */
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;
```

### 非空断言 !

具体而言，x! 将从 x 值域中排除 null 和 undefined 

```ts
function myFunc(maybeString: string | undefined | null) {
  // Type 'string | null | undefined' is not assignable to type 'string'.
  // Type 'undefined' is not assignable to type 'string'. 
  const onlyString: string = maybeString; // Error
  const ignoreUndefinedAndNull: string = maybeString!; // Ok 在后面加叹号
}
/* 调用函数时候，忽略 */
type NumGenerator = () => number;

function myFunc(numGenerator: NumGenerator | undefined) {
  // Object is possibly 'undefined'.(2532)
  // Cannot invoke an object which is possibly 'undefined'.(2722)
  const num1 = numGenerator(); // Error
  const num2 = numGenerator!(); //OK
}
/* 确定赋值断言 */
let x!: number; /* 就在这里加一个叹号，就不会报错了 */
initialize();
// Variable 'x' is used before being assigned.(2454)
console.log(2 * x); // Error

function initialize() {
  x = 10;
}
```

## 类型守卫

类型保护是可执行运行时检查的一种表达式，用于确保该类型在一定的范围内。

### in 关键字

```ts
interface Admin {
  name: string;
  privileges: string[];
}

interface Employee {
  name: string;
  startDate: Date;
}

type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownEmployee) {
  console.log("Name: " + emp.name);
  if ("privileges" in emp) {
    console.log("Privileges: " + emp.privileges);
  }
  if ("startDate" in emp) {
    console.log("Start Date: " + emp.startDate);
  }
}
```

### typeof 关键字

typeof 可以用来获取一个变量的声明类型

typeof 类型保护只支持两种形式：typeof v === "typename" 和 typeof v !== typename，"typename" 必须是 "number"， "string"， "boolean" 或 "symbol"

```ts
function padLeft(value: string, padding: string | number) {
  if (typeof padding === "number") {
      return Array(padding + 1).join(" ") + value;
  }
  if (typeof padding === "string") {
      return padding + value;
  }
  throw new Error(`Expected string or number, got '${padding}'.`);
}
```

### instanceof 关键字

```js
interface Padder {
  getPaddingString(): string;
}

class SpaceRepeatingPadder implements Padder {
  constructor(private numSpaces: number) {}
  getPaddingString() {
    return Array(this.numSpaces + 1).join(" ");
  }
}

class StringPadder implements Padder {
  constructor(private value: string) {}
  getPaddingString() {
    return this.value;
  }
}

let padder: Padder = new SpaceRepeatingPadder(6);

if (padder instanceof SpaceRepeatingPadder) {
  // padder的类型收窄为 'SpaceRepeatingPadder'
}
```

### 自定义类型保护的类型谓词

```ts
function isNumber(x: any): x is number {
  return typeof x === "number";
}

function isString(x: any): x is string {
  return typeof x === "string";
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


## Class 类

在面向对象语言中，类是一种面向对象计算机编程语言的构造，是创建对象的蓝图，
描述了所创建的对象共同的属性和方法

```js
/* 1 
  静态成员 使用 类名 来调用，实例成员 使用 this 来调用
  静态成员 不会被实例继承，只能通过类来调用；

*/
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
/* 
  成员方法定义在了原型上，静态方法直接在这个类上
  类的静态属性， 类的实例属性
  
 */
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

### 私有字段

私有字段以 # 字符开头，有时我们称之为私有名称；
每个私有字段名称都唯一地限定于其包含的类；
不能在私有字段上使用 TypeScript 可访问性修饰符（如 public 或 private）；
私有字段不能在包含的类之外访问，甚至不能被检测到

```ts
class Person {
  #name: string;
  constructor (name: string) {
    this.#name = name;
  }
}
```

### 访问器 get set

```ts
let passcode = "Hello TypeScript";

class Employee {
  private _fullName: string;

  get fullName(): string {
    return this._fullName;
  }

  set fullName(newName: string) {
    if (passcode && passcode == "Hello TypeScript") {
      this._fullName = newName;
    } else {
      console.log("Error: Unauthorized update of employee!");
    }
  }
}

let employee = new Employee();
employee.fullName = "Semlinker";
if (employee.fullName) {
  console.log(employee.fullName);
}
```

### 类的继承

```ts
class Animal {
  name: string;
  
  constructor(theName: string) {
    this.name = theName;
  }
  
  move(distanceInMeters: number = 0) {
    console.log(`${this.name} moved ${distanceInMeters}m.`);
  }
}

class Snake extends Animal {
  constructor(name: string) {
    super(name); // 调用父类的构造函数
  }
  
  move(distanceInMeters = 5) {
    console.log("Slithering...");
    super.move(distanceInMeters);
  }
}

let sam = new Snake("Sammy the Python");
sam.move();
```

### abstract 抽象类

不能被实例化

使用 abstract 关键字声明的类，我们称之为抽象类

只能去实例化实现了所有抽象方法的子类

```js
abstract class Person {
  constructor(public name: string){}

  abstract say(words: string) :void;
}

// Cannot create an instance of an abstract class.(2511)
const lolo = new Person(); // Error
```

### 类方法重载

类不能重载，只是方法的重载

```ts
class ProductService {
    getProducts(): void;
    getProducts(id: number): void;
    getProducts(id?: number) {
      if(typeof id === 'number') {
          console.log(`获取id为 ${id} 的产品信息`);
      } else {
          console.log(`获取所有的产品信息`);
      }  
    }
}

const productService = new ProductService();
productService.getProducts(666); // 获取id为 666 的产品信息
productService.getProducts(); // 获取所有的产品信息
```

## interface 接口

接口和类型别名，都可以用来描述对象的形状或者函数签名

接口： interface 在 TS 里面至关重要，用来规范类型，描述对象和类的具体结构

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

泛型（Generics）是允许同一个函数接受不同类型参数的一种模板。相比于使用 any 类型，使用泛型来创建可复用的组件要更好，因为泛型会保留参数类型

* K（Key）：表示对象中的键类型
* V（Value）：表示对象中的值类型；
* E（Element）：表示元素类型

```ts
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


```js
/* 泛型接口 */
interface Name<T> {
  (arg: T): T;
}
/* 泛型类 */
class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) {
  return x + y;
};
```

## Utility Types 泛型工具类型

### typeof

可以用来获取一个变量声明或者对象的类型

```js
interface Person {
  name: string;
  age: number;
}

const sem: Person = { name: 'semlinker', age: 33 };
type Sem = typeof sem; // Person
function toArray(x: number): Array<number> {
  return [x];
}

type Func = typeof toArray; // -> (x: number) => number[]
```

### keyof

获取某种类型的所有的键，其返回类型是联合类型

其中的原因就是当使用数值索引时，JavaScript 在执行索引操作时，会先把数值索引先转换为字符串索引。
所以 keyof { [x: string]: Person } 的结果会返回 string | number

```ts
interface Person {
  name: string;
  age: number;
}
type K1 = keyof Person; // 'name' | 'age'
type K2 = keyof Person[]; // "length" | "toString" | "pop" | "push" | "concat" | "join" 
type K3 = keyof { [x: string]: Person };  // string | number 这个很特殊
```

### in

用来遍历枚举类型

```ts
type Keys = 'a' | 'b' | 'c';
type Obj = {
  [p in Keys]: string
}
```

### infer

在 extends 语句中，还支持 infer 关键字，可以推断一个类型变量，高效的对类型进行模式匹配

infer 声明一个类型变量，并且对他进行使用

```js
/* 经典示例 */
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

type Response = Promise<number[]>;
type Unpacked<T> = T extends Promise<infer R>? R : T;

type resType = Unpacked<Response>; // resType 类型为number[]
```
### extends

```js
/* 有时候，我们定义的泛型，不想过于灵活，想继承某些类，可以使用extends
  添加泛型约束
*/
interface LengthWise {
  length: number;
}
function myFun<T extends LengthWise>(args: T): T {
  console.log(args.length);
  return args;
}
```
### Partial

- Partial 可以将类型中的所有属性变成可选属性

```ts
/* 定义 */
type Partial<T> = {
  [P in keyof T]?: T[P];
} 
```
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

## 装饰器 Decorators

装饰器是一种特殊类型的声明，它能够被附加到类声明，方法， 访问符，属性或参数上。 
装饰器使用 @expression这种形式，expression求值后必须为一个函数，
它会在运行时被调用，被装饰的声明信息做为参数传入。

```ts
// 装饰器工厂
function color (value: string) { // 这是工厂
  return function (target) { /* 这是装饰器 */
    // do something with "target" and "value"...
  }
}
```
```ts
/* 类装饰器 */
function Greeter(greeting: string) {
  return function (target: Function) {
    target.prototype.greet = function (): void {
      console.log(greeting);
    };
  };
}

@Greeter("Hello TS!")
class Greeting {
  constructor() {
    // 内部实现
  }
}

let myGreeting = new Greeting();
myGreeting.greet(); // console output: 'Hello TS!';
/* 属性装饰器 */
function logProperty(target: any, key: string) {
    delete target[key];
    const backingField = "_" + key;
    Object.defineProperty(target, backingField, {
      writable: true,
      enumerable: true,
      configurable: true
    });
  
    // property getter
    const getter = function (this: any) {
      const currVal = this[backingField];
      console.log(`Get: ${key} => ${currVal}`);
      return currVal;
    };
  
    // property setter
    const setter = function (this: any, newVal: any) {
      console.log(`Set: ${key} => ${newVal}`);
      this[backingField] = newVal;
    };
  
    // Create new property with getter and setter
    Object.defineProperty(target, key, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true
    });
  }
  
class Person { 
@logProperty
public name: string;

constructor(name : string) { 
    this.name = name;
}
}

const p1 = new Person("semlinker");
p1.name = "kakuqo";
```

## TS4.0 新特性

```ts
/* 标记的元组元素 */
/* TypeScript 4.0 支持为元组类型设置标签 */
function addPerson(...args: [name: string, age: number]): void {
  console.log(`Person info: name: ${args[0]}, age: ${args[1]}`);
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

## TS 题库

[https://github.com/type-challenges/type-challenges/blob/master/README.zh-CN.md](https://github.com/type-challenges/type-challenges/blob/master/README.zh-CN.md)

## TS 工具库

解决自己手写的难题，GitHub 仓库

- [ts-toolbelt](https://github.com/millsp/ts-toolbelt)
- [utility-types](https://github.com/piotrwitek/utility-types)
- [SimplyTyped](https://github.com/andnp/SimplyTyped)
- [几乎排名前 90% 的 JavaScript 库的声明文件存在于 DefinitelyTyped 仓库里](https://github.com/DefinitelyTyped/DefinitelyTyped)

## 参考资料

1. [十道题目带你走进 TypeScript 世界，掘金](https://juejin.cn/post/6974713100826050591#heading-43)
2. [深入理解 TypeScript，一本书](https://jkchao.github.io/typescript-book-chinese/#why)
3. [声明文件，非常棒的讲解视频](https://www.bilibili.com/video/BV185411574h?p=2)
4. [TS 中文官网](https://www.tslang.cn/docs/home.html)
5. [大前端技能 TypeScript\_从 0 到 1 完全解读，技能加分项](https://www.bilibili.com/video/BV1i541147NW?p=25&spm_id_from=pageDriver)
6. [1.8W字|了不起的 TypeScript 入门教程（第二版）](http://www.semlinker.com/ts-comprehensive-tutorial/)
7. [TypeScript AST Viewer](https://ts-ast-viewer.com/)
8. [Awesome TypeScript](https://github.com/semlinker/awesome-typescript)

## tsconfig.json

```js
{
  "compilerOptions": {
    /* 基本选项 */
    "target": "es5",                       // 指定 ECMAScript 目标版本: 'ES3' (default), 'ES5', 'ES6'/'ES2015', 'ES2016', 'ES2017', or 'ESNEXT'
    "module": "commonjs",                  // 指定使用模块: 'commonjs', 'amd', 'system', 'umd' or 'es2015'
    "lib": [],                             // 指定要包含在编译中的库文件
    "allowJs": true,                       // 允许编译 javascript 文件
    "checkJs": true,                       // 报告 javascript 文件中的错误
    "jsx": "preserve",                     // 指定 jsx 代码的生成: 'preserve', 'react-native', or 'react'
    "declaration": true,                   // 生成相应的 '.d.ts' 文件
    "sourceMap": true,                     // 生成相应的 '.map' 文件
    "outFile": "./",                       // 将输出文件合并为一个文件
    "outDir": "./",                        // 指定输出目录
    "rootDir": "./",                       // 用来控制输出目录结构 --outDir.
    "removeComments": true,                // 删除编译后的所有的注释
    "noEmit": true,                        // 不生成输出文件
    "importHelpers": true,                 // 从 tslib 导入辅助工具函数
    "isolatedModules": true,               // 将每个文件做为单独的模块 （与 'ts.transpileModule' 类似）.

    /* 严格的类型检查选项 */
    "strict": true,                        // 启用所有严格类型检查选项
    "noImplicitAny": true,                 // 在表达式和声明上有隐含的 any类型时报错
    "strictNullChecks": true,              // 启用严格的 null 检查
    "noImplicitThis": true,                // 当 this 表达式值为 any 类型的时候，生成一个错误
    "alwaysStrict": true,                  // 以严格模式检查每个模块，并在每个文件里加入 'use strict'

    /* 额外的检查 */
    "noUnusedLocals": true,                // 有未使用的变量时，抛出错误
    "noUnusedParameters": true,            // 有未使用的参数时，抛出错误
    "noImplicitReturns": true,             // 并不是所有函数里的代码都有返回值时，抛出错误
    "noFallthroughCasesInSwitch": true,    // 报告 switch 语句的 fallthrough 错误。（即，不允许 switch 的 case 语句贯穿）

    /* 模块解析选项 */
    "moduleResolution": "node",            // 选择模块解析策略： 'node' (Node.js) or 'classic' (TypeScript pre-1.6)
    "baseUrl": "./",                       // 用于解析非相对模块名称的基目录
    "paths": {},                           // 模块名到基于 baseUrl 的路径映射的列表
    "rootDirs": [],                        // 根文件夹列表，其组合内容表示项目运行时的结构内容
    "typeRoots": [],                       // 包含类型声明的文件列表
    "types": [],                           // 需要包含的类型声明文件名列表
    "allowSyntheticDefaultImports": true,  // 允许从没有设置默认导出的模块中默认导入。

    /* Source Map Options */
    "sourceRoot": "./",                    // 指定调试器应该找到 TypeScript 文件而不是源文件的位置
    "mapRoot": "./",                       // 指定调试器应该找到映射文件而不是生成文件的位置
    "inlineSourceMap": true,               // 生成单个 soucemaps 文件，而不是将 sourcemaps 生成不同的文件
    "inlineSources": true,                 // 将代码与 sourcemaps 生成到一个文件中，要求同时设置了 --inlineSourceMap 或 --sourceMap 属性

    /* 其他选项 */
    "experimentalDecorators": true,        // 启用装饰器
    "emitDecoratorMetadata": true          // 为装饰器提供元数据的支持
  }
}
```