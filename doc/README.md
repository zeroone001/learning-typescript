## 题目

```js
```

0. 实现Pick

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

7. 实现一个 MyReadOnly<T, K> ，K 应为 T 的属性集，若指定 K ，则将 T 中对应的属性修改成只读属性，若不指定 K ，则将所有属性变为只读属性

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
