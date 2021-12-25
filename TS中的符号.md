# TS 中的一些符号

## ! 非空断言操作符

x! 将 null 和 undefined 从x 的 值域中排除

### 忽略 undefined 和 null 类型

```ts
function myFun (param: string | undefined) {
    const name: string = param!;
}
/* 调用函数时候，忽略undefined类型 */
type NumGenerator = () => number;

function myFunc(numGenerator: NumGenerator | undefined) {
  // Object is possibly 'undefined'.(2532)
  // Cannot invoke an object which is possibly 'undefined'.(2722)
  const num1 = numGenerator(); // Error
  const num2 = numGenerator!(); //OK
}
```

注意： 虽然在 TS 代码中，我们使用了非空断言，使得 const b: number = a!; 
语句可以通过 TypeScript 类型检查器的检查。但在生成的 ES5 代码中，! 非空断言操作符被移除了，所以在浏览器中执行以上代码，在控制台会输出 undefined。

## ？运算符

TypeScript 3.7 实现了呼声最高的 ECMAScript 功能之一：可选链（Optional Chaining）。有了可选链后，我们编写代码时如果遇到 null 或 undefined 就可以立即停止某些表达式的运行。可选链的核心是新的 ?. 运算符

```ts
if(a && a.b) { } 

if(a?.b){ }
/**
* if(a?.b){ } 编译后的ES5代码
* 
* if(
*  a === null || a === void 0 
*  ? void 0 : a.b) {
* }
*/
```

但需要注意的是，?. 与 && 运算符行为略有不同，&& 专门用于检测 falsy 值，比如空字符串、0、NaN、null 和 false 等。而 ?. 只会验证对象是否为 null 或 undefined，对于 0 或空字符串来说，并不会出现 “短路”。

```ts
/* 经典实例 */
function tryGetArrayElement<T>(arr?: T[], index: number = 0) {
  return arr?.[index];
}
/* 搭配函数调用 */
let result = obj.customMethod?.();
```

## ?? 空值合并运算符

当左侧操作数为 null 或 undefined 时，其返回右侧的操作数，否则返回左侧的操作数。

跟 || 有些区别的

```ts
const foo = null ?? 'default string';
console.log(foo); // 输出："default string"

const baz = 0 ?? 42;
console.log(baz); // 输出：0
```

### 不能与 || && 一起使用

若空值合并运算符 ?? 直接与 AND（&&）和 OR（||）操作符组合使用 ?? 是不行的。这种情况下会抛出 SyntaxError

```ts
// '||' and '??' operations cannot be mixed without parentheses.(5076)
null || undefined ?? "foo"; // raises a SyntaxError

// '&&' and '??' operations cannot be mixed without parentheses.(5076)
true && undefined ?? "foo"; // raises a SyntaxError
```

### 与可选链 ?. 操作符的关系

空值合并运算符针对 undefined 与 null 这两个值，可选链式操作符 ?. 也是如此。可选链式操作符，对于访问属性可能为 undefined 与 null 的对象时非常有用。

```js
interface Customer {
  name: string;
  city?: string;
}

let customer: Customer = {
  name: "Semlinker"
};

let customerCity = customer?.city ?? "Unknown city";
console.log(customerCity); // 输出：Unknown city
```

## ?: 可选属性

 TypeScript 中的接口是一个非常灵活的概念，除了可用于对类的一部分行为进行抽象以外，也常用于对「对象的形状（Shape）」进行描述

```ts
interface Person {
  name: string;
  age?: number;
}
```

### Partial<T>

我们可以利用 TypeScript 内置的工具类型 Partial<T> 来快速把某个接口类型中定义的属性变成可选的

```ts
interface PullDownRefreshConfig {
  threshold: number;
  stop: number;
}

/**
 * type PullDownRefreshOptions = {
 *   threshold?: number | undefined;
 *   stop?: number | undefined;
 * }
 */ 
type PullDownRefreshOptions = Partial<PullDownRefreshConfig>
```

### Required<T>

把所有的可选属性，变成必选的

-?移除了可选属性中的？
```ts
type Required<T> = {
    [P in keyof T]-?: T[P]
} 
```

## & 运算符 交叉类型

将多个类型，合并为一个类型

```ts
type PartialPointX = { x: number; };
type Point = PartialPointX & { y: number; };

let point: Point = {
  x: 1,
  y: 1
}
```

### 同名基础类型属性的合并

里面的c 属性，会变成 never， 因为不可能有既是number又是string的属性

```ts
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
```

### 非基础的数据类型，是可以合并成功的

```ts
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

console.log('abc:', abc);
```

## | 联合类型

这个是非常常用的符号

```ts
const sayHello = (name: string | undefined) => { /* ... */ };
```


