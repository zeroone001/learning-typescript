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