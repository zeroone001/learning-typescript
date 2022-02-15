## 题目

题库： [https://github.com/type-challenges/type-challenges/blob/master/README.zh-CN.md](https://github.com/type-challenges/type-challenges/blob/master/README.zh-CN.md)

0. 实现Pick

注意，Pick 和 Omit的区别， Pick 是获取这几个key， Omit 是去除那几个key

```js
interface Todo {
  title: string
  description: string
  completed: boolean
}

type TodoPreview = MyPick<Todo, 'title' | 'completed'>

const todo: TodoPreview = {
    title: 'Clean room',
    completed: false,
}
```

```js
type MyPick<T, K extends keyof T> = {
      [P in K]: T[K]
  };
```

1. 为 numCompare 函数添加类型注解。


```js
function numCompare(first, second) {
  return first >= second ? first : second;
}

```
答： 

```js
function numCompare(first: number, second: number): number {
  return first >= second ? first : second;
}
```

2. 基础类型


```js
let arr: number[] = [1,2,3];

let arr2: Array<number> = [2,3,4];

// 元组类型， 表示一个已知元素类型和数量的数组

let tuple: [number, string] = ['123',123, 321]; 

// 类型断言

let value: any = 'qweqweq';

let n = (value as string).length;
let n2 = (<string>value).length;
```

问：解决 inputBgChange 函数报错，使函数能正常运行

```js
function inputBgChange(): void {
    let oInput: HTMLInputElement;
    if (document.querySelector('.oInput')) {
        oInput = document.querySelector('#oInput');
        oInput.style.background = 'red';
    } else {
        oInput = document.createElement('input');
        oInput.id = 'oInput';
        oInput.style.background = 'red';
        document.body.appendChild(oInput);
    }
}
```

答： 

使用类型断言解决问题

```js
function inputBgChange(): void {
    let oInput: HTMLInputElement;
    if (document.querySelector('.oInput')) {
        oInput = document.querySelector('#oInput') as HTMLInputElement;
        oInput.style.background = 'red';
    } else {
        oInput = document.createElement('input');
        oInput.id = 'oInput';
        oInput.style.background = 'red';
        document.body.appendChild(oInput);
    }
}
```



3. 补充完整接口 User 的定义，并且为 users 提供更加准确的类型注解。

```js

interface User {
  // todo
}

// 将 unknow 替换成更准确的类型
let users: unknown = [
  {
    name: 'Jack Ma',
    age: 17,
    sex: 'male',
  },
  {
    name: 'Tony Ma',
    age: 18,
  },
]

```

答：

```js
interface User {
    // todo
    name: string,
    age: number,
    sex?: string
}

// 将 unknow 替换成更准确的类型
let users: Array<User> = [
    {
        name: 'Jack Ma',
        age: 17,
        sex: 'male',
    },
    {
        name: 'Tony Ma',
        age: 18,
    },
]
```

4. 实现一个 If 工具泛型，接受一个条件 C，若 C 为 true 返回类型 T 类型，否则返回 F 类型。

```js
type If<C, T, F> = any; // todo

type T1 = If<true, boolean, number>;
// T1 为 boolean 类型

type T2 = If<false, boolean, number>;
// T2 为 number 类型

```

答： 
```js
type If<C extends boolean, T, F> = C extends true ? T : F; // todo

type T1 = If<true, boolean, number>;
// T1 为 boolean 类型

type T2 = If<false, boolean, number>;
// T2 为 number 类型
```

5. 实现一个 post 方法，当我们请求地址 url 为 /user/add 时，请求参数 params 中必传字段为名字 name 和年龄 age，性别 sex 为选填字段，其中除了 age 字段类型为 number，其余字段类型都为 string。


```js
import axios from 'axios';

function post(url: any, params: any) {
  return axios.post(url, params)
}

post('/user/del', {name: 'jack Ma', age: 17});
// 报错, url 传参错误

post('/user/add', {name: 'jack Ma'});
// 报错, 缺少请求参数 age 字段

post('/user/add', {name: 'jack Ma', age: 17});
// 请求成功

post('/user/add', {name: 'jack Ma', age: 17, sex: 'male'})
// 请求成功

```
答案：

```js
interface API {
    '/user/add': {
        name: string,
        age: number,
        sex?: string
    }
}

function post<T extends keyof API>(url: T, params: API[T]) {
  return axios.post(url, params);
}

post('/user/del', {name: 'jack Ma', age: 17});
// 报错, url 传参错误

post('/user/add', {name: 'jack Ma'});
// 报错, 缺少请求参数 age 字段

post('/user/add', {name: 'jack Ma', age: 17});
// 请求成功

post('/user/add', {name: 'jack Ma', age: 17, sex: 'male'})
// 请求成功
```

6. 实现一个 Includes<T, K> 工具泛型，T 为一个数组类型，判断 K 是否存在于 T 中，若存在返回 true，否则返回 false

```js
type T1 = Includes<['name','age','sex'], 'name'>
// T1 的期望为 true

type T2 = Includes<['name','age','sex'], 'name'>
// T2 的期望为 false


```
答案： 
```js
type Includes<T extends any[], K> = K extends T[number] ? true : false;

```

7. 实现一个 MyReadOnly<T, K> ，K 应为 T 的属性集，若指定 K ，则将 T 中对应的属性修改成只读属性，若不指定 K ，则将所有属性变为只读属性 (经典中的经典)

```js
interface Person {
  name: string,
  age: number,
}
  
type MyReadOnly<T, K> = any;

const jack: MyReadOnly<Person, 'name'> = {
  name: 'jack',
  age: 17,
}

jack.name = 'jack';
// error

jcak.age = 18;
// success

```

答案： 

```js
type MyReadOnly<T, K extends keyof T = keyof T> = {
      readonly [P in K]: T[P]
  } & T;
```

8. 实现一个 AppendArgX<Fn, X> 工具泛型，对于给定的函数类型 Fn， 和任意的类型 X，在 Fn  函数的传参末尾追加类型为 X 的参数

```js
type Fn = (a: number, b: string) => number

type NewFn = AppendArgX<Fn, boolean> 
// NewFn 期望是 (a: number, b: string, x: boolean) => number

```

答案：
```js
  type AppendArgX<Fn, X> = Fn extends (...args: infer P) => infer R ? (...args: [...P, X])=>R : never;
```

9. 实现一个 GetRequired<T> 工具泛型，将 T 中的所有必需属性提取出来

```js
type RequiredKeys<T> = keyof T extends infer K
  ? K extends keyof T
    ? T[K] extends Required<T>[K]
      ? K
      : never
    : never
  : never;
// Required<T> 是 TypeScript 内置的工具泛型，可以将 T 所有属性设置为必需属性

type GetRequired<T> = {
  [key in RequiredKeys<T>]: T[key]
};


```

10. 实现 Readonly

```js
interface Todo {
    title: string
    description: string
  }

 
  
  const todo: MyReadonly<Todo> = {
    title: "Hey",
    description: "foobar"
  }
  
  todo.title = "Hello" // Error: cannot reassign a readonly property
  todo.description = "barFoo" // Error: cannot reassign a readonly property
```

答案：
```js
 type MyReadonly<T> = {
      readonly [P in keyof T]: T[P]
  };
```
11. 元组转换为对象

```js
const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const

const result: TupleToObject<typeof tuple> // expected { tesla: 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}

```
答案：

```js
type TupleToObject<T extends readonly any[]> = {
    [Property in T[number]]: Property
};
```


1.  实现 Exclude

把某个类型中，属于另一个的类型移除掉


答案：

```js
// 如果T能够赋值给U类型的话，那么就会返回never类型，否则返回T类型
// 实现的效果就是把T类型中的U类型给排除掉
type Exclude<T, U> = T extends U ? never: T;

```

14. 去除所有never成员

答案： 

使用{}[keyof T] 把对象类型变成联合类型

```js
type OmitNever<T> = Pick<T, {
    [K in keyof T]: T[K] extends never ? never : K
}[keyof T]>

type T123 = {
    a: string,
    b: never,
    c: string,
}

type L = OmitNever<T123>;

```

15. 实现一个通用First<T>，它接受一个数组T并返回它的第一个元素的类型。

```js
type arr1 = ['a', 'b', 'c']
type arr2 = [3, 2, 1]

type head1 = First<arr1> // expected to be 'a'
type head2 = First<arr2> // expected to be 3
```

答案：

```js
type First<T extends any[]> = T[0] extends T[number] ? T[0] : never; 
```

16. 对于给定的元组，您需要创建一个通用的Length，选择元组的长度

```js
type tesla = ['tesla', 'model 3', 'model X', 'model Y']
type spaceX = ['FALCON 9', 'FALCON HEAVY', 'DRAGON', 'STARSHIP', 'HUMAN SPACEFLIGHT']

type teslaLength = Length<tesla>  // expected 4
type spaceXLength = Length<spaceX> // expected 5
```

答案：

```js
type Length<T extends any[]> = T['length'];
```

17. 元组转换为联合类型

```js
type TTuple = [string, number];
type Union = ElementOf<TTuple>; // Union 类型为 string | number

```
答案： 

```js
type ElementOf<T> = T extends (infer R)[] ? R : never;
```

18. 实现一个工具 If，它接受条件C、true返回类型T和false返回类型F。C可以是true或false，而T和F可以是任何类型。

```js
type A = If<true, 'a', 'b'>  // expected to be 'a'
type B = If<false, 'a', 'b'> // expected to be 'b'
```
答案：
```js
type If<C extends boolean, T, F> = C extends true ? T: F;
```

19. 在类型系统中实现JavaScript Array.concat函数。类型接受两个参数。输出应该是一个新的数组，其中包括ltr顺序的输入

```js
type Result = Concat<[1], [2]> // expected to be [1, 2]

```

答案:

```js
type Concat<T extends any[], U extends any[]> = [...T, ...U];
```

20. 

```js
type isPillarMen = Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'> // expected to be `false`

```

答案：

```js
type Includes<T extends any[], U> = {
    [K in T[number]]: true
}[U] extends true ? true : false;
```

21. 关于infer的经典题目，实现ReturnType 

```js
const fn = (v: boolean) => {
  if (v)
    return 1
  else
    return 2
}


type a = MyReturnType<typeof fn> // 应推导出 "1 | 2"
```

```js
type MyReturnType<T> = T extends (...args: any) => infer R ? R : never;  

```

22. 不使用 Omit 实现 TypeScript 的 Omit<T, K> 范型。Omit 会创建一个省略 K 中字段的 T 对象。

```js
 interface Todo {
    title: string
    description: string
    completed: boolean
  }
  type TodoPreview = MyOmit<Todo, 'description' | 'title'>;
  
  const todo1233: TodoPreview = {
    completed: false,
  }
```

答案：

```js
type MyOmit<T, K> = {
    [P in Exclude<keyof T, K>]: T[P]
};
```

23. 写一个deepReadonly

```js
type deepReadonly<T> = {
      readonly [K in keyof T]: T[K] extends any[] | number | string | boolean | Function ? T[K] : deepReadonly<T[K]>
  }

```

24. 元组转合集

```js
type TupleToUnion<T extends any[]> = T[number]
```

## 背景

GitHub上看到一个LeetCode的面试题，因为涉及TS的考察的面挺广的，所以记下来, 加深自己的理解。

原题链接， [https://github.com/LeetCode-OpenSource/hire/blob/master/typescript_zh.md](https://github.com/LeetCode-OpenSource/hire/blob/master/typescript_zh.md)

## 题目

EffectModule 定义如下:

```js
interface Action<T> {
  payload?: T;
  type: string;
}

class EffectModule {
  count = 1;
  message = "hello!";

  delay(input: Promise<number>) {
    return input.then(i => ({
      payload: `hello ${i}!`,
      type: 'delay'
    }));
  }

  setMessage(action: Action<Date>) {
    return {
      payload: action.payload!.getMilliseconds(),
      type: "set-message"
    };
  }
}

```

connect之后

```js
type Connected = {
  delay(input: number): Action<string>
  setMessage(action: Date): Action<number>
}
const effectModule = new EffectModule()
const connected: Connected = connect(effectModule)

```
有一个 `type Connect = (module: EffectModule) => any`，将 `any` 替换成题目的解答

## 分析并且解答

1. 首先我们先写一下EffectModule的类型


```js
interface EffectModuleType {
    count: number;
    message: string;
    asyncMethod<T, U>(input: Promise<T>): Promise<Action<U>>;
    syncMethod<T, U>(action: Action<T>): Action<U>;
}
```

2. 接下来，我们的目的是把非函数的属性去掉, 换个思路，也就是说Pick出来，现在让我们获取是函数的类型名

```js
// 取出是函数类型的props
type removeNoFunction<T> = {
  [P in keyof T]: T[P] extends Function ? P : never
}[keyof T]
```

3. Pick一下，就只剩下带函数属性了

```js
type onlyFuncType<T> = Pick<T, removeNoFunction<T>>;
```

4. 接下来需要按照题目要求，把函数变换一下, 这里用到了infer这个知识点

```js
asyncMethod<T, U>(input: Promise<T>): Promise<Action<U>>  变成了
asyncMethod<T, U>(input: T): Action<U> 

// 2

syncMethod<T, U>(action: Action<T>): Action<U>  变成了
syncMethod<T, U>(action: T): Action<U>
```

下面就是对应上面的两个转换

```js
type transformAsyncMethod<T> = T extends (input: Promise<infer R>) =>  Promise<Action<infer M>> ? (input: R) => Action<M> : never;
// 2
type transformSyncMethod<T> = T extends (action: Action<infer R>) => Action<infer M> ? (action: R) => Action<M> : never;

// 最后再汇总一下, 把第一个never替换成transformSyncMethod

type transformMethods<T> = T extends (input: Promise<infer R>) =>  Promise<Action<infer M>> ? (input: R) => Action<M> : T extends (action: Action<infer R>) => Action<infer M> ? (action: R) => Action<M> : never;
```

5. 我们转换函数的方法准备好了，下面开始写一个类型来转换一下

```js
type prevConnect<T> = {
  [P in keyof T]: transformMethods<T[P]>
}
```

6. 最后写一下Connect

```js
type Connect<T> = prevConnect<onlyFuncType<T>>;
```





### 参考资料

[https://juejin.cn/post/6844904147167215624](https://juejin.cn/post/6844904147167215624)


### 参考资料

[https://github.com/type-challenges/type-challenges/blob/master/README.zh-CN.md](https://github.com/type-challenges/type-challenges/blob/master/README.zh-CN.md)