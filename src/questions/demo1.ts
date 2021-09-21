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
f(1, 'a'); // Error
f('a', 2); // Error
f('a', 'b') // Ok

/* 第三题 */

// 如何定义一个 SetOptional 工具类型，
// 支持把给定的 keys 对应的属性变成可选的？对应的使用示例如下所示：

type Foo = {
    a: number;
    b?: string;
    c: boolean;
}

// 测试用例
type SomeOptional = SetOptional<Foo, 'a' | 'b'>;

   // type SomeOptional = {
   //  a?: number; // 该属性已变成可选的
   //  b?: string; // 保持不变
   //  c: boolean; 
   // }

