export { }

/* 
    题目来源：
    https://mp.weixin.qq.com/s/YctoB0qkz5gqXlU3hoYt0g

*/
/* 第一题 */
type User = {
    id: number;
    kind: string;
};
/* 
    T 类型可能是User类型的子类型，可能会包含更多的属性，
    解决方案： 用展开运算符去解决这个问题
 */
function makeCustomer<T extends User>(u: T): T {
    // Error（TS 编译器版本：v4.4.2）
    // Type '{ id: number; kind: string; }' is not assignable to type 'T'.
    // '{ id: number; kind: string; }' is assignable to the constraint of type 'T', 
    // but 'T' could be instantiated with a different subtype of constraint 'User'.
    return {
        ...u, // 解决方案
        id: u.id,
        kind: 'customer'
    }
}


/* 第二题 */
// 本道题我们希望参数 a 和 b 的类型都是一致的，即 a 和 b 同时为 number 或 string 类型。
// 当它们的类型不一致的值，TS 类型检查器能自动提示对应的错误信息。
type SN = string | number;

function f(a: string, b: string): string
function f(a: number, b: number): number

function f(a: SN, b: SN): SN {
    if (typeof a === 'string') {
        return a + ':' + b; // no error but b can be number!
    } else {
        return (a as number) + (b as number); // error as b can be number | string
    }
}

f(2, 3); // Ok
// f(1, 'a'); // Error
// f('a', 2); // Error
f('a', 'b') // Ok

/* 第三题 */

// 如何定义一个 SetOptional 工具类型，
// 支持把给定的 keys 对应的属性变成可选的？
// 对应的使用示例如下所示：

/* 
    分析一下，步骤
    我们需要把传入的参数作为key，设置成可选参数
    非参数，设置成不可选参数




*/
type Foo = {
    a?: number;
    b?: string;
    c: boolean;
}

// 对交叉类型进行扁平化处理
type Simplify<T> = {
    [P in keyof T]: T[P]
}

// Partial<Pick<T, K>>
// Exclude 排除联合类型中的一部分
type SetOptional<T, K extends keyof T> = Simplify<Partial<Pick<T, K>> & Pick<T, Exclude<keyof T, K>>>;

type SetRequired<T, K extends keyof T> = Simplify<Required<Pick<T, K>> & Pick<T, Exclude<keyof T, K>>>;

// 测试用例
type SomeOptional = SetOptional<Foo, 'c' | 'b'>;
// 设置可选参数是required
type SomeRequired = SetRequired<Foo, 'b' | 'c'>;


// type SomeOptional = {
//  a?: number; // 该属性已变成可选的
//  b?: string; // 保持不变
//  c: boolean; 
// }

/* 第四题 */

// 如何定义一个 ConditionalPick 工具类型，
// 支持根据指定的 Condition 条件来生成新的类型，对应的使用示例如下：

/* 
    分析一波：

*/

interface Example {
    a: string;
    b: string | number;
    c: () => void;
    d: {};
}

// 把复合条件的key 找出来
type ConditionalKeys<T, Condition> = {
    [K in keyof T]: T[K] extends Condition ? K : never
}[keyof T]

// Pick<T, ConditionalKeys<T, Condition>>
type ConditionalPick<T, Condition> = Pick<T, ConditionalKeys<T, Condition>>;
// 测试用例：
type StringKeysOnly = ConditionalPick<Example, string>;
   //=> {a: string}

/* 第五题 */


// 定义一个工具类型 AppendArgument，为已有的函数类型增加指定类型的参数，
// 新增的参数名是 x，将作为新函数类型的第一个参数。具体的使用示例如下所示：

type Fn = (a: number, b: string) => number
// 实现
type AppendArgument<F, A> = F extends (...args: infer Args) => infer Return ? 
(x: A, ...args: Args) => Return : never

type FinalFn = AppendArgument<Fn, boolean> 
// (x: boolean, a: number, b: string) => number